// Single source of truth for DMAX's official company social links — used
// by both the sitewide Footer and the bottom-right FloatingSocialButtons
// widget. Keep these in sync by importing from here rather than
// hardcoding the URLs again; if a handle ever changes, it only needs to
// change in this one file.
//
// Note: this is deliberately separate from the founder's *personal*
// LinkedIn profile (https://www.linkedin.com/in/manoj-rajappan/) used on
// the About page's Founder card and the Contact page sidebar — those are
// Manoj's own profile, not the company page, and are intentionally left
// as-is.
export const SOCIAL_LINKS = {
  // Public company page — the admin/dashboard link itself
  // (…/admin/dashboard/?editPageActiveTab=info) isn't a public URL, so
  // this points at the plain public page for the same company (ID
  // 105847085) that dashboard belongs to.
  linkedin: "https://www.linkedin.com/company/105847085/",
  // Share-link tracking param (?igsh=…) stripped — this is the permanent
  // public profile URL for the same account.
  instagram: "https://www.instagram.com/dmaxnow/",
};
