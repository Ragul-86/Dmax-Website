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

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
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
