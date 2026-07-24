import { useMotionValue, useReducedMotion, useSpring, useTransform, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import astronaut from "@/assets/hero-astronaut.png";

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
    // Anti-clipping pass — reverses the previous hard
    // height:calc(100vh-96px) + overflow-hidden combination: on any
    // resolution where the real rendered content (line-wrap, font
    // metrics, button height) came out even slightly taller than that
    // fixed budget, overflow-hidden silently clipped text/buttons/stats
    // instead of showing them. Now min-h-screen is a FLOOR only —
    // height stays auto (Tailwind's default, nothing declared), so the
    // section can never be forced shorter than its own content and
    // nothing is ever cut off; overflow-hidden is removed from the
    // section entirely (the astronaut's own absolute wrapper below is
    // already inset-y-0/right-0/w-[48%], fully contained within the
    // section box on its own, so it never relied on this for
    // containment; the small ±8px mouse-parallax drift is nowhere near
    // enough to escape that margin). The per-line
    // <span className="block overflow-hidden"> further down is a
    // separate, self-contained text-reveal-mask technique (clips only
    // the entrance animation of one line within its own line-height
    // box) — unrelated to this bug and left untouched. The tightened
    // lg: gaps between elements (heading/paragraph/CTA/stats) from the
    // previous pass stay in place since they're good practice
    // regardless; only the hard height ceiling and overflow-hidden are
    // reverted. Mobile/tablet (below lg) keep their exact original
    // pt-36/pb-20 flow, untouched.
    <section className="relative bg-surface-warm pt-36 pb-20 lg:min-h-screen lg:pt-0 lg:pb-0 lg:flex lg:flex-col">
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
          45-50%) and, per the viewport-fit pass, capped at 78% of the
          section's own real height (inside the requested 75-80% range;
          was 92%/88vh) — since the wrapper below is `inset-y-0` against
          the section, which now has a hard calc(100vh-96px)-based height
          instead of an open-ended min-h-screen, this percentage now maps
          onto a real, fixed pixel budget instead of an unbounded one, so
          the image can never push the section taller than the viewport.
          object-contain (unchanged) still guarantees the astronaut is
          never cropped. Below lg, this is hidden entirely; the original stacked
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
            className="h-[78%] w-auto object-contain"
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

          {/* Line-to-line gap tightened via leading only (1.05 → 0.95) —
              the two lines are plain stacked block elements with no
              margin between them, so line-height is the only lever that
              controls the visual gap; font-size, weight, color, the
              two-line break, and the reveal animation are all untouched.
              0.95 is a deliberately conservative floor for a clamp(2.5rem,
              5.25rem) display size — tight enough to read as compact/
              premium without risking line 1's descenders touching line
              2's ascenders. */}
          {/* Eyebrow→heading gap tightened at lg: only (mt-8/32px →
              24px), part of the viewport-fit spacing pass — mobile/
              tablet keep the original mt-8. */}
          <h1 className="mt-8 lg:mt-6 font-display font-bold tracking-tight text-balance text-foreground text-[clamp(2.5rem,5.6vw,5.25rem)] leading-[0.95]">
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
            className="mt-7 lg:mt-5 max-w-[36rem] text-lg text-muted-foreground leading-relaxed"
          >
            Build a predictable client acquisition system that creates trust before the first
            sales conversation. For founders, business coaches, manufacturers, exporters, and B2B
            service businesses.
          </motion.p>

          {/* Paragraph→CTA gap tightened at lg: (mt-10/40px → mt-6/24px,
              matching the spec's 24px target) — mobile/tablet unchanged. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 lg:mt-6 flex flex-wrap items-center gap-4"
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
            // CTA→Statistics gap tightened at lg: — the margin+padding
            // combined (mt-10+pt-8=72px) is now mt-4+pt-4=32px, landing
            // at the top of the spec's 24-32px target; mobile/tablet
            // keep the original mt-10/pt-8.
            // Layout fix: flex-wrap could let the three stats wrap onto a
            // second row whenever the left column got narrow. Switched to
            // an explicit 3-column grid (grid-cols-1 below md, always
            // md:grid-cols-3 from 768px up — matching the requested
            // "only stack <768px" rule) so all three sit in one row on
            // every desktop/tablet width, never wrapping, each column an
            // equal 1fr width. items-start top-aligns every number/label
            // pair to the same baseline. Font size, text, and colors are
            // unchanged.
            className="mt-10 lg:mt-4 grid grid-cols-1 md:grid-cols-3 items-start gap-y-5 md:gap-x-8 border-t border-border pt-8 lg:pt-4"
          >
            {trustStats.map((s, i) => (
              // Divider: was a fixed h-8 w-px span living between flex
              // siblings; a grid can't slot a divider element between
              // cells the same way, so it's now a md:border-l on every
              // column after the first (border height matches the cell's
              // own content instead of a fixed 32px, otherwise the same
              // visual vertical rule between each stat). No divider is
              // needed below md, where the stats stack full-width.
              <div
                key={s.label}
                className={i > 0 ? "md:border-l md:border-border md:pl-8" : ""}
              >
                <div className="text-2xl font-bold tracking-tight text-foreground">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
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
