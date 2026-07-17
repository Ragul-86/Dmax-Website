import { body } from "express-validator";

/**
 * Mirrors the original Zod schema used on the TanStack Start server
 * function (src/lib/contact.functions.ts) so validation behavior and
 * error messages stay identical after the MERN conversion.
 */
export const contactValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name is too long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .isLength({ max: 255 })
    .withMessage("Email is too long")
    .normalizeEmail(),

  body("company")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 120 })
    .withMessage("Company name is too long"),

  body("budget")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 60 })
    .withMessage("Budget is too long"),

  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Tell us a little more (10+ chars)")
    .isLength({ max: 2000 })
    .withMessage("Message is too long"),
];
