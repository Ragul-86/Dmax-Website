import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * The site's single, shared Final CTA section — used on every routed page
 * (Home, Services/Solutions, ProcessPage/Method, FaqPage/Insights, About).
 * Default title/paragraph/buttonLabel below are Home's original copy —
 * every page renders it with no props so the heading, paragraph, and
 * buttons are identical everywhere. Do not give individual pages custom
 * title/paragraph props; that would defeat the "exact same CTA on every
 * page" requirement this component satisfies.
 *
 * Fully simplified per an explicit request: the astronaut/Earth/nebula
 * illustration, the space-themed background image, every glow/decorative
 * effect, and all animations (background motion, button pulse, scroll
 * entrance) are removed entirely — no framer-motion in this file anymore.
 * What remains is a single centered column on a flat #111111 surface:
 * headline, description, CTA button, email link, inside a 36px-radius
 * rounded container with generous (96px) padding. Text content, brand
 * colors (#39E600 accent, white headline/body), and typography classes
 * are all unchanged from before.
 */
export function HomeFinalCTA({
  title = (
    <>
      The Way Decision-Makers Choose Has Changed.{" "}
      <span style={{ color: "#39E600" }}>Has Your Business?</span>
    </>
  ),
  paragraph = "One conversation could reshape how you acquire customers for years to come. Let's build a client acquisition system that helps your business become the first choice.",
  buttonLabel = "Book Your Strategy Call",
  showEmail = true,
}) {
  return (
    <section className="pt-24 pb-20">
      <div className="container-narrow">
        <div
          className="mx-auto flex flex-col items-center justify-center text-center rounded-[36px] p-24"
          style={{ background: "#111111" }}
        >
          <h2
            className="max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-balance leading-[1.05]"
            style={{ color: "#FFFFFF" }}
          >
            {title}
          </h2>
          {paragraph && (
            <p className="mt-5 max-w-xl text-lg" style={{ color: "rgba(255,255,255,0.82)" }}>
              {paragraph}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="group btn-accent">
              {buttonLabel}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            {showEmail && (
              <a
                href="mailto:manoj@dmax.company"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                style={{ color: "#FFFFFF" }}
              >
                manoj@dmax.company
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
