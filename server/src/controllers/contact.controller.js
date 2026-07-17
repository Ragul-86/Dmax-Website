import { validationResult } from "express-validator";
import { ContactEnquiry } from "../models/ContactEnquiry.js";
import { sendContactNotification } from "../utils/mailer.js";

export async function createContactEnquiry(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: errors.array()[0]?.msg || "Invalid input",
        errors: errors.array(),
      });
    }

    const { name, email, company = "", budget = "", message } = req.body;

    const enquiry = await ContactEnquiry.create({
      name,
      email,
      company,
      budget,
      message,
      ip: req.ip,
    });

    // Fire-and-forget: email failure must never block the saved enquiry.
    const emailed = await sendContactNotification(enquiry);
    if (emailed) {
      enquiry.emailNotified = true;
      await enquiry.save();
    }

    return res.status(201).json({
      ok: true,
      message: "Enquiry received. We'll get back within one business day.",
      data: {
        id: enquiry._id,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (err) {
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
