import { api } from "./client";

/**
 * Client-side validation mirroring the backend's express-validator rules.
 * Kept dependency-free (no zod) so the bundle stays lean; messages match
 * the original schema exactly for a pixel/UX-identical experience.
 */
export function validateContact(values) {
  const errors = {};

  const name = (values.name || "").trim();
  if (!name) errors.name = "Name is required";
  else if (name.length > 100) errors.name = "Name is too long";

  const email = (values.email || "").trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRe.test(email)) errors.email = "Enter a valid email";
  else if (email.length > 255) errors.email = "Email is too long";

  const company = (values.company || "").trim();
  if (company.length > 120) errors.company = "Company name is too long";

  const budget = (values.budget || "").trim();
  if (budget.length > 60) errors.budget = "Budget is too long";

  const message = (values.message || "").trim();
  if (message.length < 10) errors.message = "Tell us a little more (10+ chars)";
  else if (message.length > 2000) errors.message = "Message is too long";

  return errors;
}

/**
 * Submits a contact enquiry to the Express + MongoDB backend.
 * Returns { ok: true } on success, throws Error(message) on failure.
 */
export async function submitContact(data) {
  try {
    const res = await api.post("/contact", data);
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.errors?.[0]?.msg ||
      "Could not save your message. Please try again.";
    throw new Error(message);
  }
}
