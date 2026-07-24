import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import astronautMoon from "@/assets/cta/astronaut-moon-linkedin.png";

/**
 * The site's single, shared Final CTA section — used on every routed page
 * (Home, Services/Solutions, ProcessPage/Method, FaqPage/Insights, About).
 * Default title/paragraph/buttonLabel below are Home's original copy —
 * every page renders it with no props so the heading, paragraph, and
 * buttons are identical everywhere. Do not give individual pages custom
 * title/paragraph props; that would defeat the "exact same CTA on every
 * page" requirement this component satisfies.
 *
 * Astronaut/moon-surface visual system: the supplied astronaut-on-the-
 * moon PNG is now the section's own CSS background-image (cover/center/
 * no-repeat) rather than a separate right-side image container — no
 * boxed astronaut, no card-within-a-card. A flat rgba(0,0,0,0.45)
 * overlay (same top and bottom stop, i.e. uniform darkening, not a
 * left-right fade) sits between the photo and the text for legibility.
 * Text stays left-aligned; content, button size/position/typography/
 * colors are all unchanged from before.
 *
 * Brightness/contrast pass: the image and the dark overlay are now two
 * separate absolutely-positioned layers instead of one baked-together
 * `linear-gradient(...), url(...)` background — that's what lets a CSS
 * `filter` (brightness 1.35 / contrast 1.1 / saturate 1.05) apply to ONLY
 * the photo layer. Applying `filter` to the old single div would have
 * filtered the text/buttons rendered inside it too (filter rasterizes an
 * element and everything painted inside it). The overlay dropped from
 * 0.75 to 0.45 opacity so the astronaut and LinkedIn flag read clearly
 * while the lighter-but-still-present black tint keeps the white text
 * legible. Border radius, background-size/position/repeat, section
 * padding, and the content layer's own padding are all unchanged.
 *
 * NOTE: the source PNG has a plain white margin above the actual photo
 * (the moon/astronaut artwork sits in the lower ~70% of the file); with
 * background-size:cover this margin gets scaled/cropped along with the
 * rest of the image depending on the card's own aspect ratio, so
 * whether any of that white margin remains visible depends on the
 * rendered container's proportions at a given viewport — this couldn't
 * be verified without live rendering in this session.
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
        {/* The padding used to live on this same element as the
            background-image — since background-origin/background-clip
            default to padding-box, that padding was insetting the image
            away from the container's actual edges (a visible gap on all
            four sides, worse under the rounded corners). Padding now
            lives only on the inner content wrapper below; this outer div
            carries nothing but the background, rounded-[36px], and
            overflow-hidden, so the image paints edge-to-edge and gets
            clipped cleanly by the rounded corners. */}
        <div className="relative overflow-hidden rounded-[36px]">
          {/* Photo layer — filter lives here ONLY, isolated from the
              overlay and text below, so brightening/sharpening the
              astronaut never washes out or blurs the copy on top of it. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${astronautMoon})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "brightness(1.35) contrast(1.1) saturate(1.05)",
            }}
          />
          {/* Dark overlay — independent layer, unaffected by the photo's
              filter, so its opacity (now 0.45, down from 0.75) is the only
              thing controlling text legibility. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45))" }}
          />
          <div className="relative z-10 p-10 md:p-24 lg:p-28 text-left">
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
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
      </div>
    </section>
  );
}
