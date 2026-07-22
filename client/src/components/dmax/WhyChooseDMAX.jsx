import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

/**
 * Reusable "Why Businesses/Clients Choose DMAX" block — used on the Home
 * page ("Why Businesses Choose DMAX") and the About page ("Why Clients
 * Choose DMAX"), each with its own real copy from the source document.
 */
export function WhyChooseDMAX({
  eyebrow,
  title,
  leadLines = [],
  intro,
  bulletsLabel,
  bullets = [],
  closingLines = [],
  // Section keeps its grey band by default; pages can pass `banded={false}`
  // when the previous section already carries a band, so two shaded
  // sections never sit back-to-back.
  banded = true,
  // Optional variant: "comparison" renders leadLines as alternating
  // "Most agencies… / We…" pairs in a two-column layout with a divider —
  // used only by the Home page's "Why DMAX" section. Every other call
  // site (e.g. the Process page's "Why Businesses Choose DMAX", which uses
  // a different leadLines shape entirely) omits this and keeps the
  // original single-card rendering, untouched.
  variant = "card",
}) {
  if (variant === "comparison") {
    const pairs = [];
    for (let i = 0; i < leadLines.length; i += 2) {
      pairs.push([leadLines[i], leadLines[i + 1]]);
    }

    return (
      <section className={`py-20 md:py-28 lg:py-36 ${banded ? "bg-surface-gray border-y border-border" : "bg-background"}`}>
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto">
            <div className="mx-auto max-w-xl text-center">
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-balance text-foreground">
                {title}
              </h2>
            </div>

            {pairs.length > 0 && (
              <div className="mt-10 md:mt-12 rounded-[22px] border border-border overflow-hidden">
                {pairs.map(([most, dmax], i) => (
                  <motion.div
                    key={most}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6 px-6 py-6 md:px-8 md:py-7 ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <p className="text-base md:text-lg text-muted-foreground leading-snug">{most}</p>

                    <span className="hidden sm:grid size-8 place-items-center rounded-full border border-border bg-secondary/40 text-muted-foreground shrink-0 justify-self-center">
                      <ArrowRight className="size-4" />
                    </span>
                    <span className="sm:hidden inline-flex size-8 items-center justify-center rounded-full border border-border bg-secondary/40 text-muted-foreground">
                      <ArrowRight className="size-4 rotate-90" />
                    </span>

                    <p className="flex items-start gap-2 text-base md:text-lg font-semibold text-foreground leading-snug">
                      <span className="mt-2.5 size-1.5 rounded-full bg-accent shrink-0" />
                      {dmax}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {intro && (
              <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground leading-relaxed">{intro}</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 md:py-28 lg:py-36 ${banded ? "bg-surface-gray border-y border-border" : ""}`}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="card-lift rounded-3xl bg-card border border-border p-8 md:p-12 shadow-card max-w-4xl mx-auto"
        >
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="mt-4 h2-section text-balance" style={{ fontSize: "clamp(1.75rem, 1.4rem + 1.6vw, 3rem)" }}>
            {title}
          </h2>

          {leadLines.length > 0 && (
            <div className="mt-6 space-y-1 text-lg text-foreground">
              {leadLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}

          {intro && <p className="mt-6 text-muted-foreground leading-relaxed">{intro}</p>}

          {bullets.length > 0 && (
            <>
              {bulletsLabel && <p className="mt-6 text-sm font-semibold">{bulletsLabel}</p>}
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 size-5 rounded-full bg-accent/15 grid place-items-center shrink-0">
                      <Check className="size-3 text-accent" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </>
          )}

          {closingLines.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border space-y-1 text-sm text-muted-foreground">
              {closingLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
