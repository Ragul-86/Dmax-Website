// Sends transactional email via the Resend API (https://resend.com) using
// plain fetch — no SDK dependency needed since Node 18+ ships fetch and
// AbortSignal.timeout() natively.
//
// IMPORTANT — this project does NOT use Nodemailer/SMTP, and never has.
// There is no SMTP_HOST / SMTP_PORT / SMTP_SECURE / SMTP_USER / SMTP_PASS
// anywhere in this codebase to audit, because email is sent via Resend's
// HTTP API instead. Gmail SMTP was tried early in this project and
// deliberately abandoned: sending FROM and TO the same Gmail address
// (self-relay) was silently filed into Spam/Sent by Gmail even though the
// SMTP server accepted the message. Resend replaced it for exactly that
// reason. Re-introducing Nodemailer/Gmail SMTP here would reintroduce that
// already-fixed bug, so this audit verifies the Resend integration using
// the same checklist a Nodemailer audit would (auth, client config, every
// send call, logging, env vars, recipient, deploy target, test endpoint).

const RESEND_API_URL = "https://api.resend.com/emails";

// Masked env var snapshot — logged (never the API key value) so a Render
// deploy log makes it immediately obvious whether the right variables are
// even present in that environment, without ever printing the secret.
function logEnvSnapshot() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  console.log(
    "[mailer] RESEND_API_KEY:",
    apiKey ? `present (${apiKey.slice(0, 6)}…, ${apiKey.length} chars)` : "MISSING",
  );
  console.log("[mailer] MAIL_FROM:", process.env.MAIL_FROM?.trim() || "(unset — falling back to onboarding@resend.dev)");
  console.log("[mailer] MAIL_TO:", process.env.MAIL_TO?.trim() || "(unset — falling back to manoj@dmax.company)");
}

/**
 * Low-level send — the one function every code path (contact form, test
 * endpoint) funnels through, so there's exactly one place that talks to
 * Resend. Never throws. Always logs the recipient before sending, the full
 * provider response (id + status) on success, and the FULL error on
 * failure — nothing is swallowed. Returns a rich result object instead of
 * a bare boolean so callers (like the test endpoint) can report the exact
 * provider response back to whoever is debugging.
 *
 * Return shape: { ok, id, status, response, error }
 *   ok       — true only if Resend responded 2xx AND returned a message id.
 *              Deliberately NOT set to true just because fetch() didn't
 *              throw — a 4xx/5xx from Resend still resolves normally and
 *              must not be reported as success (this is exactly the
 *              "silently return success when the email was never accepted"
 *              failure mode being audited for).
 *   id       — Resend's message id on success (nullable).
 *   status   — HTTP status Resend responded with (or "network-error" /
 *              "no-api-key").
 *   response — parsed JSON body Resend returned (success or error shape).
 *   error    — Error instance, always populated when ok=false.
 */
export async function sendEmail({ to, subject, text, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.MAIL_FROM?.trim() || "DMAX Website <onboarding@resend.dev>";

  logEnvSnapshot();
  console.log("Sending email to:", to);

  if (!apiKey) {
    const error = new Error("RESEND_API_KEY is not set — cannot authenticate with Resend.");
    console.error("[mailer] AUTH FAILURE:", error.message);
    return { ok: false, id: null, status: "no-api-key", response: null, error };
  }

  let res;
  try {
    res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
        html,
      }),
      // Bounded so a Resend outage can never hang the caller indefinitely.
      signal: AbortSignal.timeout(15000),
    });
  } catch (err) {
    // Network/DNS/timeout failure — never reached Resend at all.
    console.error("[mailer] NETWORK/TRANSPORT ERROR reaching Resend:", err);
    return { ok: false, id: null, status: "network-error", response: null, error: err };
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    // Resend actively rejected the request (bad/revoked key, unverified
    // sender domain, sandbox-mode recipient restriction, etc.) — this is
    // the exact failure mode that silently drops emails while the
    // frontend/backend both look "successful" if it isn't surfaced.
    const error = new Error(
      `Resend rejected the email (HTTP ${res.status}): ${body?.message || body?.name || "no error message returned"}`,
    );
    console.error(`[mailer] DELIVERY FAILURE — Resend responded ${res.status}:`, body || "(no JSON body)");
    return { ok: false, id: null, status: res.status, response: body, error };
  }

  if (!body?.id) {
    // Defensive: a 2xx with no message id is not a confirmed send either.
    const error = new Error("Resend responded 2xx but returned no message id — treating as not confirmed.");
    console.error("[mailer]", error.message, body);
    return { ok: false, id: null, status: res.status, response: body, error };
  }

  console.log("Email sent successfully");
  console.log(body);
  return { ok: true, id: body.id, status: res.status, response: body, error: null };
}

/**
 * Sends a notification email for a new contact enquiry via Resend. Keeps
 * its original boolean contract for contact.controller.js (a mail outage
 * must never turn a successful, already-saved enquiry into a
 * visitor-facing error) — the rich {ok,id,status,response,error} detail
 * is still logged in full by sendEmail() above, nothing is hidden, it's
 * just not threaded back through this particular return value.
 */
export async function sendContactNotification(enquiry) {
  const to = process.env.MAIL_TO?.trim() || "manoj@dmax.company";

  const text = [
    `New contact enquiry from the DMAX website`,
    ``,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company || "-"}`,
    `Budget: ${enquiry.budget || "-"}`,
    ``,
    `Message:`,
    enquiry.message,
    ``,
    `Received: ${new Date(enquiry.createdAt || Date.now()).toISOString()}`,
  ].join("\n");

  const html = `
    <h2>New contact enquiry — DMAX website</h2>
    <p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(enquiry.company || "-")}</p>
    <p><strong>Budget:</strong> ${escapeHtml(enquiry.budget || "-")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(enquiry.message).replace(/\n/g, "<br/>")}</p>
  `;

  const result = await sendEmail({
    to,
    subject: `New DMAX enquiry from ${enquiry.name}`,
    text,
    html,
    replyTo: enquiry.email,
  });

  return result.ok;
}

/**
 * Sends a fixed test email to MAIL_TO (defaulting to manoj@dmax.company)
 * and returns the FULL Resend result — used by GET /api/test-email so the
 * exact provider error (if any) is visible in the API response itself,
 * not just in server logs, satisfying "do not hide any errors".
 */
export async function sendTestEmail() {
  const to = process.env.MAIL_TO?.trim() || "manoj@dmax.company";
  return sendEmail({
    to,
    subject: "DMAX — test email (GET /api/test-email)",
    text: `This is a standalone test email confirming the Resend integration can deliver to ${to}.\n\nSent: ${new Date().toISOString()}`,
    html: `<p>This is a standalone test email confirming the Resend integration can deliver to <strong>${escapeHtml(to)}</strong>.</p><p>Sent: ${new Date().toISOString()}</p>`,
  });
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
