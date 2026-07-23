import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Factory, GraduationCap, Building2, Briefcase, Rocket, Landmark } from "lucide-react";

// variant="badges" only — one icon per business-type item, matched by
// position (this variant is currently used exactly once, for About.jsx's
// "Who We Work With" list, in this fixed order: manufacturers, coaches,
// B2B service companies, consultants, agencies, founders). Falls back to
// Building2 for any item beyond this list.
const BADGE_ICONS = [Factory, GraduationCap, Building2, Briefcase, Landmark, Rocket];

export function TrustedBrands({
  title = "Trusted by coaches, founders & training institutes",
  items = [],
  closing,
  // Optional: when provided, every item renders as an actual clickable
  // navigation link (to this destination) instead of plain static text —
  // used for the Home "Insights" article-title list. Every other call site
  // (e.g. "Who We Work With") omits this and keeps the exact original
  // plain-text logo-bar rendering.
  linkTo,
  // Optional variant: "chips" renders the framework-items presentation
  // (split two-line heading + pill chips) used only by the Services page's
  // "One Framework. Adapted to your business." section. Every other call
  // site omits this and keeps the original plain logo-bar rendering
  // exactly as it was.
  variant = "logos",
  // Only used by variant="chips" — same title text, split into a primary
  // and secondary heading line. No copy is added or reworded, just the
  // existing sentence broken across two visual weights.
  heading,
}) {
  if (variant === "badges") {
    return (
      <section className="py-20 md:py-28 lg:py-36 bg-background">
        <div className="container-narrow">
          {/* Small eyebrow → large editorial heading (the section's own
              title text, "Who We Work With") → one short, purely
              functional framing sentence — the only new copy added here,
              kept deliberately plain rather than promotional. Every
              business-type item and the closing line below are still the
              exact original text. */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Ideal Clients</p>
            <h2 className="mt-4 h2-section text-balance">{title}</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              See if your business fits one of these categories.
            </p>
          </div>

          {/* Premium icon-card grid, replacing the old pill row. 24px
              radius, generous padding, soft shadow, thin neutral border.
              Hover: 8px lift, scale 1→1.02, deeper shadow, icon turns
              accent green, and a thin accent bar animates in across the
              top edge — all plain Tailwind group-hover transitions, 300ms. */}
          <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {items.map((b, i) => {
              const Icon = BADGE_ICONS[i % BADGE_ICONS.length];
              return (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-[24px] border border-border bg-card p-8 shadow-card transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-elevation"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                  <Icon className="size-7 text-foreground transition-colors duration-300 group-hover:text-accent" />
                  <p className="mt-5 text-base font-semibold leading-snug text-foreground">{b}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Closing sentence — unchanged text, now a centered premium
              callout instead of a pill. */}
          {closing && (
            <div className="mx-auto mt-14 md:mt-16 max-w-2xl rounded-3xl border border-border bg-card px-8 py-10 md:px-10 md:py-12 text-center shadow-card">
              <p className="text-lg md:text-xl font-semibold leading-relaxed text-balance text-foreground">
                {closing}
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "chips") {
    return (
      <section className="py-20 md:py-28 lg:py-36 bg-background">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance text-foreground">
              {heading?.primary}
            </h2>
            <p className="mt-2 text-lg md:text-xl font-medium text-muted-foreground text-balance">
              {heading?.secondary}
            </p>
          </div>

          {/* Framework pills, enlarged: px-5/py-2.5 + text-sm (≈40px tall)
              → px-7-8/py-3.5-4 + text-base (≈52-56px tall), a ~30-35%
              size bump on both axes purely from bigger padding + a
              slightly larger font (one Tailwind step, "slightly" per the
              brief, not a full redesign). rounded-full, resting border/
              background colors, and gap-based equal spacing between
              pills are unchanged in kind — gap only nudged 12px→16px to
              stay visually balanced against the larger pills. Hover/
              focus is still the one "active/green" state (border-accent
              + bg-accent/10 + text-accent, unchanged) — now layered with
              a 3px lift, a soft green glow (color-mix off the same
              --color-accent token so it tracks the theme instead of a
              hardcoded hex), and a cursor-pointer affordance, all on a
              300ms transition (was 200ms) — comfortably inside the
              250-300ms ask. flex-wrap (unchanged) still lets pills wrap
              to as many rows as each breakpoint needs. */}
          <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4">
            {items.map((b) => (
              <span
                key={b}
                tabIndex={0}
                className="inline-flex items-center justify-center rounded-full border border-border bg-secondary/40 px-7 py-3.5 md:px-8 md:py-4 text-base font-medium text-foreground cursor-pointer transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_10px_28px_-8px_color-mix(in_oklch,var(--color-accent)_55%,transparent)] focus-visible:outline-none focus-visible:-translate-y-[3px] focus-visible:border-accent focus-visible:bg-accent/10 focus-visible:text-accent focus-visible:shadow-[0_10px_28px_-8px_color-mix(in_oklch,var(--color-accent)_55%,transparent)]"
              >
                {b}
              </span>
            ))}
          </div>

          {closing && (
            <p className="mt-10 md:mt-12 mx-auto max-w-xl text-center text-base md:text-lg text-muted-foreground leading-relaxed">
              {closing}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 lg:py-36 border-y border-border bg-surface-gray">
      <div className="container-x">
        <p className="eyebrow text-center">{title}</p>
        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 ${
            linkTo ? "" : "opacity-70"
          }`}
        >
          {items.map((b) =>
            linkTo ? (
              <Link
                key={b}
                to={linkTo}
                className="group inline-flex items-center gap-1.5 py-1 text-base md:text-lg font-medium text-foreground relative transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:text-accent"
              >
                <span className="relative">
                  {b}
                  <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
                <ArrowRight className="size-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ) : (
              <span key={b} className="text-sm tracking-[0.22em] font-semibold text-foreground/60">
                {b}
              </span>
            ),
          )}
        </div>
        {closing && (
          <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">{closing}</p>
        )}
      </div>
    </section>
  );
}
