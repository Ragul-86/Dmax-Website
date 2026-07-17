import { Router } from "express";
import { contactValidationRules } from "../validators/contact.validator.js";
import { createContactEnquiry, listContactEnquiries } from "../controllers/contact.controller.js";

const router = Router();

// POST /api/contact — public: submit a new enquiry (used by the contact form)
router.post("/", contactValidationRules, createContactEnquiry);

// GET /api/contact — internal: list enquiries (paginated). Consider adding
// auth middleware here before exposing this beyond trusted admin tooling.
router.get("/", listContactEnquiries);

export default router;
