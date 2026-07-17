import nodemailer from "nodemailer";

let transporter = null;

/**
 * Lazily builds a Nodemailer transporter from SMTP_* env vars.
 * Returns null (instead of throwing) when SMTP isn't configured yet,
 * so the contact form still works (saves to MongoDB) in environments
 * where email hasn't been set up.
 */
function getTransporter() {
  if (transporter) return transporter;

  // .trim() guards against a trailing newline/space sneaking in when SMTP
  // credentials are pasted into a dashboard env var field (Render, Vercel,
  // etc.) — a blank-looking but whitespace-only value would otherwise pass
  // the falsy check below and then fail auth in a confusing way.
  const SMTP_HOST = process.env.SMTP_HOST?.trim();
  const SMTP_PORT = process.env.SMTP_PORT?.trim();
  const SMTP_USER = process.env.SMTP_USER?.trim();
  const SMTP_PASS = process.env.SMTP_PASS?.trim();

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(process.env.SMTP_SECURE).trim().toLowerCase() === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // Explicit timeouts so a bad SMTP host/port/firewall can never hang the
    // request indefinitely — nodemailer's defaults exist but aren't tight
    // enough for an API request a visitor is sitting in front of. Each
    // stage gets its own cap; total worst case is bounded well under the
    // client's request timeout.
    connectionTimeout: 10000, // time to establish the TCP connection
    greetingTimeout: 10000, // time to receive the SMTP greeting after connecting
    socketTimeout: 15000, // time allowed for the socket to be idle mid-transaction
  });

  return transporter;
}

/**
 * Sends a notification email for a new contact enquiry.
 * Never throws — logs and returns false on failure so a mail outage
 * never blocks the enquiry from being saved/returned to the user.
 */
export async function sendContactNotification(enquiry) {
  const t = getTransporter();
  if (!t) {
    console.warn("[mailer] SMTP not configured — skipping email notification");
    return false;
  }

  const to = process.env.MAIL_TO || "dmaxworldwide@gmail.com";
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

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
    await t.sendMail({
      from,
      to,
      replyTo: enquiry.email,
      subject: `New DMAX enquiry from ${enquiry.name}`,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error("[mailer] Failed to send notification email:", err.message);
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
