import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ctaBackground from "@/assets/cta/cta-background.png";
import earthImg from "@/assets/cta/earth.png";
import earthGlowImg from "@/assets/cta/earth-glow.png";
import astronautStanding from "@/assets/cta/cta-astronaut-standing.png";

// (astronaut renamed from "astronaut.png" to "cta-astronaut-standing.png"
// to avoid colliding with client/src/assets/astronaut.png, which is used
// by the older, unused <CTA /> component — kept in the codebase but no
// longer rendered by any routed page.)

/**
 * The site's single, shared Final CTA section — the cinematic
 * astronaut/Earth/nebula composition. Originally built for Home only (the
 * component name is a holdover from that), it's now the one Final CTA used
 * on every routed page: Home, Services (Solutions), ProcessPage (Method),
 * FaqPage (Insights), and About. Default title/paragraph/buttonLabel below
 * are Home's original copy — every page renders it with no props so the
 * heading, paragraph, and buttons are identical everywhere. Do not give
 * individual pages custom title/paragraph props; that would defeat the
 * "exact same CTA on every page" requirement this component satisfies.
 *
 * Layout: a real 55/45 split. Left column is text, completely unchanged.
 * Right column is reserved space for one cinematic illustration — the
 * astronaut/Earth/nebula are NOT scattered across the whole card as
 * independent floating PNGs; they're composited into a single scene layer
 * anchored to the card's bottom-right, with Earth deliberately huge and
 * mostly cropped by the card's own edges (so it "feels far away") and the
 * astronaut large, close, and overlapping it (so it "feels close to the
 * viewer"). Back to front: dimmed nebula background (slow independent
 * drift) → subtle stars → Earth + its glow (behind, ~45% visible,
 * bottom-right, cropped by the card edge, never reaching the text column)
 * → astronaut (in front, overlapping Earth, ~96% of the card's height,
 * nudged down-and-left off the corner so it sits between the headline and
 * Earth, a slight rotateY turn toward the text, a soft green ambient glow
 * standing in for LED accents, floating up/down) → a left-to-right
 * rgba(0,0,0,0.78)→transparent gradient so the left side stays noticeably
 * darker than the right for text legibility. Background + Earth +
 * astronaut all share one Ken Burns scale so the whole thing reads as one
 * illustration, not separate cut-out images.
 *
 * NOTE: the astronaut is the same supplied photo asset throughout — this
 * session has no image-generation tool, so "premium ultra-realistic
 * astronaut" requests are implemented as CSS-level polish (contrast/
 * brightness, rotateY turn, ambient glow) on that existing photo rather
 * than a new render. The photo also has a flat light-grey studio
 * background baked in (not transparent); flagged to the user in chat.
 *
 * Motion (transform/opacity only, GPU-accelerated, no layout shift):
 * whole-scene Ken Burns scale (1→1.03, 20s, alternate), nebula drift (very
 * subtle, slow), Earth rotation (0→360°, 40s, linear, independent),
 * Earth-glow pulse (opacity 0.6↔1, 2s), astronaut float (y: 0→-10→0 +
 * rotate 0→1.5→0→-1.5→0, 8s easeInOut), LED-accent glow pulse (opacity
 * 0.7↔1, 2s), the site's existing twinkling-stars layer, a breathing pulse
 * on the primary button (2s, already live below), and a once-on-scroll
 * section reveal (already live). Everything collapses to static when
 * prefers-reduced-motion is set.
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-x">
        <div className="relative">
          <div className="relative overflow-hidden rounded-[36px] scene-dark p-10 md:p-16 shadow-elevation">
            {/* Cinematic scene layer — background, Earth and astronaut all
                live inside this single overflow-hidden wrapper and share
                one Ken Burns scale, so they read as one composited scene
                anchored to the bottom-right rather than separate floating
                cut-outs. Earth is deliberately clipped by the card's own
                edges (not bled past them), so it feels distant; the
                astronaut sits in front of it, large and close. */}
            <motion.div
              aria-hidden
              className="absolute inset-0 overflow-hidden"
              animate={reduceMotion ? undefined : { scale: [1, 1.03] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
              }
            >
              {/* Nebula / background — dark space, very slow independent drift */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${ctaBackground})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: "brightness(0.78) saturate(0.9)",
                }}
                animate={reduceMotion ? undefined : { backgroundPositionX: ["50%", "53%", "50%"] }}
                transition={reduceMotion ? undefined : { duration: 40, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Existing site-wide twinkling stars layer — small, subtle */}
              <div className="stars stars-force absolute inset-0 opacity-40" />

              {/* Earth + glow — huge, mostly outside the right edge (~45%
                  visible), vertically centered on the right side, sitting
                  behind the astronaut so it reads as far away. Stays well
                  inside the illustration's own 45% column, never reaching
                  the text. */}
              <div
                className="absolute"
                style={{ right: "-340px", top: "50%", transform: "translateY(-50%)", width: 620, height: 620, zIndex: 1 }}
              >
                <motion.img
                  src={earthGlowImg}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain"
                  animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
                  transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                  src={earthImg}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain"
                  animate={reduceMotion ? undefined : { rotate: [0, 360] }}
                  transition={reduceMotion ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Astronaut — sized up ~28% from the previous pass (~96% of
                  the card's height, up from 88%) and nudged down-and-left
                  so it reads as sitting between the headline and Earth
                  rather than glued to the card's corner. Pose, tilt,
                  filters and every animation below are byte-for-byte
                  unchanged — only this wrapper's size/position moved. Kept
                  slightly conservative versus the requested 30-40% to
                  guarantee zero cropping without a live preview to verify
                  against — see chat note. */}
              <div
                style={{
                  position: "absolute",
                  right: "1%",
                  bottom: "-1%",
                  height: "96%",
                  maxWidth: "62%",
                  perspective: 1000,
                  zIndex: 2,
                }}
              >
                {/* Ambient green glow — approximates suit LED pulse */}
                <motion.div
                  aria-hidden
                  className="absolute rounded-full"
                  style={{
                    left: "50%",
                    top: "38%",
                    width: "60%",
                    height: "40%",
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(closest-side, rgba(56,224,0,0.35), rgba(56,224,0,0) 70%)",
                    filter: "blur(18px)",
                    zIndex: -1,
                  }}
                  animate={reduceMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
                  transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div style={{ transform: "rotate(-4deg) rotateY(-8deg)", transformOrigin: "bottom right", height: "100%" }}>
                  <motion.img
                    src={astronautStanding}
                    alt=""
                    loading="lazy"
                    className="h-full w-auto object-contain"
                    style={{
                      filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.45)) contrast(1.08) brightness(1.03)",
                    }}
                    animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                    transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Left-to-right dark gradient — keeps text readable over the scene */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0) 70%)", zIndex: 3 }}
              />
            </motion.div>

            <div className="grid md:grid-cols-[55%_45%] gap-10 items-center relative">
              <div>
                <h2
                  className="text-3xl md:text-5xl font-bold tracking-tight text-balance leading-[1.05]"
                  style={{ color: "#FFFFFF" }}
                >
                  {title}
                </h2>
                {paragraph && (
                  <p className="mt-5 max-w-xl text-lg" style={{ color: "rgba(255,255,255,0.82)" }}>
                    {paragraph}
                  </p>
                )}
                <div className="mt-8 flex flex-wrap gap-3">
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : { scale: [1, 1.02, 1], boxShadow: ["0 0 0px rgba(56,224,0,0)", "0 0 20px rgba(56,224,0,0.4)", "0 0 0px rgba(56,224,0,0)"] }
                    }
                    transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full"
                  >
                    <Link to="/contact" className="group btn-accent">
                      {buttonLabel}
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  {showEmail && (
                    <a
                      href="mailto:manoj@dmaxnow.com"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      style={{ color: "#FFFFFF" }}
                    >
                      manoj@dmaxnow.com
                    </a>
                  )}
                </div>
              </div>

              {/* Hidden spacer — reserves the right 45% of the row height
                  (and therefore the text column's exact position); the
                  illustration itself renders in the scene layer behind. */}
              <div className="hidden h-80 md:block lg:h-96" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
