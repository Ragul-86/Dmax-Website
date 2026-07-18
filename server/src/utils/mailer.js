// Sends the contact-form notification email via the Resend API
// (https://resend.com) using plain fetch — no SDK dependency needed since
// Node 18+ ships fetch and AbortSignal.timeout() natively, so nothing new
// has to be installed on Render.
//
// Switched from Gmail SMTP because sending FROM and TO the same Gmail
// address (self-relay) was being silently filed into Spam/Sent by Gmail
// even though the SMTP server accepted the message — Resend sends via a
// proper transactional mail API instead, which doesn't have that problem.

const RESEND_API_URL = "https://api.resend.com/emails";

/**
 * Sends a notification email for a new contact enquiry via Resend.
 * Never throws — logs and returns false on failure so a mail outage
 * never blocks the enquiry from being saved/returned to the user.
 */
export async function sendContactNotification(enquiry) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[mailer] RESEND_API_KEY not configured — skipping email notification");
    return false;
  }

  const to = process.env.MAIL_TO?.trim() || "dmaxworldwide@gmail.com";
  // Resend only allows sending from an address on a domain you've verified
  // in the Resend dashboard. Until a real domain is verified there,
  // "onboarding@resend.com" is Resend's built-in sandbox sender and works
  // out of the box (in sandbox mode it can only deliver to the email the
  // Resend account was signed up with). Once dmaxnow.com (or similar) is
  // verified in Resend, set MAIL_FROM to something like
  // "DMAX <hello@dmaxnow.com>" to send from your own domain instead.
  const from = process.env.MAIL_FROM?.trim() || "DMAX Website <onboarding@resend.com>";

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

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject: `New DMAX enquiry from ${enquiry.name}`,
        text,
        html,
      }),
      // Bounded so a Resend outage can never hang the contact-form request
      // indefinitely — mirrors the same protection the old SMTP timeouts gave.
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[mailer] Resend API responded ${res.status}: ${body}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[mailer] Failed to send notification email via Resend:", err.message);
    return false;
  }
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
