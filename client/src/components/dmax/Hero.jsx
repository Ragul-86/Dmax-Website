import { useMotionValue, useReducedMotion, useSpring, useTransform, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import astronaut from "@/assets/hero-astronaut.png";

// One-word step names from "Our Method" — "Discover / Position / Build / Scale."
const services = ["Discover.", "Position.", "Build.", "Scale."];

// Verbatim headline, split across two lines: "Become the First Choice" / "in Your Market."
const headline = ["Become the First Choice", "in Your Market."];

// Real, existing site stats (same numbers previously shown in the floating
// glass HUD cards) — moved into the left column as clean, non-glass
// "supporting trust elements" per the Apple/Tony Robbins editorial brief.
const trustStats = [
  { value: "100+", label: "Qualified Conversations" },
  { value: "280+", label: "Opportunities Created" },
  { value: "5+", label: "Countries Reached" },
];

/**
 * Hero — premium editorial two-column composition.
 *
 * LEFT: eyebrow, headline, description, CTA row, trust strip, stat row.
 * RIGHT: the astronaut, large, allowed to bleed slightly past the
 * container's right edge on desktop.
 *
 * Deliberately restrained on purpose: no gradient background, no
 * glassmorphism, no decorative shapes, no multi-step "activation"
 * sequence — a calm, minimal, high-end surface with the astronaut itself
 * as the section's one visual focal point. Motion is limited to simple
 * fade-up/mask-reveal entrances plus a very subtle mouse-parallax on the
 * astronaut — nothing continuous, nothing glowing, nothing bouncing.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  // Very subtle mouse-parallax on the astronaut only — a few px of drift,
  // not a scene of independently moving layers.
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const astroPX = useSpring(useTransform(mvX, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 20 });
  const astroPY = useSpring(useTransform(mvY, [-0.5, 0.5], [-6, 6]), { stiffness: 80, damping: 20 });

  const handleMouseMove = reduceMotion
    ? undefined
    : (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mvX.set((e.clientX - rect.left) / rect.width - 0.5);
        mvY.set((e.clientY - rect.top) / rect.height - 0.5);
      };
  const handleMouseLeave = reduceMotion
    ? undefined
    : () => {
        mvX.set(0);
        mvY.set(0);
      };

  return (
    // Desktop (lg+): min-h-screen (a floor, not a hard cap) so the Hero
    // fills one full viewport and centers content when it fits, but can
    // never clip anything — the previous pass used a fixed lg:h-screen
    // combined with overflow-hidden on both this section and the grid
    // below, which hard-capped the box at exactly 100vh and silently
    // clipped the last two stacked items (the stats row and the
    // Discover/Position/Build/Scale list) whenever the real content was
    // taller than one viewport at a given screen height. Dropping the
    // fixed height/overflow-hidden on the grid restores the flex item's
    // default "min-height: auto" sizing, so it grows to fit its content
    // first and is only ever centered within *extra* space, never
    // clipped. No typography, colors, spacing-between-elements, or
    // animations were changed anywhere below.
    <section className="relative overflow-hidden bg-surface-warm pt-36 pb-20 lg:min-h-screen lg:pt-0 lg:pb-0 lg:flex lg:flex-col">
      {/* Navbar-clearance spacer (desktop only) — Navbar is fixed/overlaid
          (h-20 md:h-24, not in document flow), so the centered content
          below needs a fixed gap matching its real height reserved above
          it; the rest of the viewport height is handed to the
          flex-1 grid below for vertical centering. */}
      <div className="hidden lg:block lg:h-24 lg:shrink-0" aria-hidden="true" />

      {/* Astronaut — background-integrated visual, desktop only (lg+),
          per the Hero redesign brief: no longer a normal content element
          in the grid, now an absolutely-positioned layer against the
          *section* so it can span the section's full height and read as
          part of the page background rather than a boxed image. No
          bg/border/shadow anywhere in this layer — object-contain plus a
          left-edge mask (fading it toward transparent as it approaches
          the text side) is what gives the soft blend into bg-surface-warm;
          the image itself is presumably still 100% visible/uncropped since
          object-contain never crops. Explicit z-0, with the content grid
          below given z-10, so the text is always guaranteed to paint on
          top regardless of DOM/stacking-context edge cases (the exact
          bug class hit earlier on the Method page's image overlay).
          Sized to ~48% of the section width (inside the requested
          45-50%) and up to 92% of the section's own height (capped at
          88vh) so it's dramatically larger/more present than the old
          content-height-matched sizing — "fills the right half of the
          Hero." Below lg, this is hidden entirely; the original stacked
          astronaut image further down (unchanged) covers "mobile: place
          the astronaut behind or below the content" exactly as it did
          before this redesign — same asset, same mouse-parallax values,
          just moved from being a grid item to a background layer. */}
      <div className="hidden lg:block absolute inset-y-0 right-0 z-0 w-[48%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ x: astroPX, y: astroPY }}
          className="relative flex h-full items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={astronaut}
            alt="DMAX — astronaut, the visual identity of the Decision-Maker Acquisition System"
            loading="eager"
            width={1024}
            height={1536}
            className="h-[92%] max-h-[88vh] w-auto object-contain"
            style={{
              WebkitMaskImage: "linear-gradient(to left, black 60%, transparent 100%)",
              maskImage: "linear-gradient(to left, black 60%, transparent 100%)",
            }}
          />
        </motion.div>
      </div>

      {/* grid-cols uses fr, not %, so the 48/52 split is computed on the
          space actually remaining after the column gap — percentage tracks
          would sum to 100% of the container *plus* the gap on top, silently
          overflowing it by the gap width on every desktop breakpoint. z-10
          added so this content always paints above the new background
          astronaut layer above, regardless of stacking-context edge
          cases. Column split, gap, and left-column position are all
          otherwise unchanged from before this redesign. */}
      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-[48fr_52fr] lg:gap-x-6 lg:flex-1">
        {/* ===== Left — content ===== */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            The Decision-Maker Acquisition System™
          </motion.div>

          <h1 className="mt-8 font-display font-bold tracking-tight text-balance text-foreground text-[clamp(2.5rem,5.6vw,5.25rem)] leading-[1.05]">
            {headline.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.2 + li * 0.18, ease: [0.2, 0.7, 0.2, 1] }}
                  className="block"
                >
                  {li === 1 ? <span className="text-accent">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-7 max-w-[36rem] text-lg text-muted-foreground leading-relaxed"
          >
            Build a predictable client acquisition system that creates trust before the first
            sales conversation. For founders, business coaches, manufacturers, exporters, and B2B
            service businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to="/contact" className="group btn-primary">
              Book a Strategy Call
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#process" className="btn-secondary">
              See How It Works
            </a>
          </motion.div>

          {/* Supporting trust elements — real stats, thin-divider layout,
              no cards/glass/float. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-border pt-8"
          >
            {trustStats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8">
                <div>
                  <div className="text-2xl font-bold tracking-tight text-foreground">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
                {i < trustStats.length - 1 && <span className="h-8 w-px bg-border" aria-hidden />}
              </div>
            ))}
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            {services.map((s) => (
              <li key={s} className="inline-flex items-center gap-2">
                <span className="size-1 rounded-full bg-accent" /> {s}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ===== Right — the astronaut, mobile/tablet ONLY now (lg:hidden).
            At lg+ the astronaut lives in the new background-integrated
            layer above instead; below lg, this is exactly the original
            stacked-image treatment, unchanged — the grid is a single
            column down there anyway, so this simply renders as its own
            row below the text, satisfying "mobile: astronaut behind or
            below the content" the same way it always has. */}
        <div
          className="flex justify-center lg:hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ x: astroPX, y: astroPY }}
            className="w-full max-w-[26rem] sm:max-w-[28rem] lg:w-auto lg:max-w-none lg:h-full lg:flex lg:items-center lg:justify-center"
          >
            <img
              src={astronaut}
              alt="DMAX — astronaut, the visual identity of the Decision-Maker Acquisition System"
              loading="eager"
              width={1024}
              height={1536}
              className="w-full h-auto lg:h-full lg:w-auto max-w-full lg:max-h-[90vh] object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
