import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
        <div className="container-x">
          <p className="eyebrow text-center">{title}</p>

          {/* Grid (not flex-wrap) so the row count is exact at every
              breakpoint: 1 per row mobile, 2 per row tablet, 3 per row
              desktop — six items resolve to a clean two-row grid on
              desktop, evenly spaced by the grid gap. */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 justify-items-center">
            {items.map((b) => (
              <span
                key={b}
                tabIndex={0}
                className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-center text-sm font-medium tracking-wide text-foreground/80 transition-colors duration-200 ease-out hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:border-accent focus-visible:text-accent"
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

  if (variant === "chips") {
    return (
      <section className="py-20 md:py-28 lg:py-36 bg-background">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance text-foreground">
              {heading?.primary}
            </h2>
            <p className="mt-2 text-lg md:text-xl font-medium text-muted-foreground text-balance">
              {heading?.secondary}
            </p>
          </div>

          <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-3">
            {items.map((b) => (
              <span
                key={b}
                tabIndex={0}
                className="inline-flex items-center rounded-full border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 ease-out hover:border-accent hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:border-accent focus-visible:bg-accent/10 focus-visible:text-accent"
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
