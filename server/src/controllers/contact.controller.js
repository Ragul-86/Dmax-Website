import { validationResult } from "express-validator";
import { ContactEnquiry } from "../models/ContactEnquiry.js";
import { sendContactNotification } from "../utils/mailer.js";

// Short random id so the several log lines for one request can be grepped
// together in Render's logs (e.g. "[contact:a1b2c3]").
function reqId() {
  return Math.random().toString(36).slice(2, 8);
}

export async function createContactEnquiry(req, res, next) {
  const id = reqId();
  const tStart = Date.now();
  const elapsed = () => `${Date.now() - tStart}ms`;
  console.log(`[contact:${id}] request received`);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`[contact:${id}] validation failed (${elapsed()})`);
      return res.status(400).json({
        ok: false,
        message: errors.array()[0]?.msg || "Invalid input",
        errors: errors.array(),
      });
    }

    const { name, email, company = "", budget = "", message } = req.body;

    console.log(`[contact:${id}] mongo save started (${elapsed()})`);
    const enquiry = await ContactEnquiry.create({
      name,
      email,
      company,
      budget,
      message,
      ip: req.ip,
    });
    console.log(`[contact:${id}] mongo save completed (${elapsed()})`);

    // The enquiry is already durably saved at this point — everything
    // below is best-effort notification. A slow or failing SMTP server
    // must never turn a successful save into a visitor-facing error, and
    // (per mailer.js's connectionTimeout/greetingTimeout/socketTimeout) can
    // never hang past ~35s worst case even if the SMTP host is unreachable.
    console.log(`[contact:${id}] smtp send started (${elapsed()})`);
    const emailed = await sendContactNotification(enquiry);
    console.log(`[contact:${id}] smtp send completed ok=${emailed} (${elapsed()})`);
    if (emailed) {
      enquiry.emailNotified = true;
      await enquiry.save();
    }

    console.log(`[contact:${id}] response returned (${elapsed()})`);
    return res.status(201).json({
      ok: true,
      message: "Enquiry received. We'll get back within one business day.",
      data: {
        id: enquiry._id,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (err) {
    console.error(`[contact:${id}] failed after ${elapsed()}:`, err.message);
    return next(err);
  }
}

export async function listContactEnquiries(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);

    const [items, total] = await Promise.all([
      ContactEnquiry.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ContactEnquiry.countDocuments(),
    ]);

    return res.json({
      ok: true,
      data: items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return next(err);
  }
}
