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
    <section className="relative overflow-hidden bg-background pt-36 pb-20 lg:pt-40 lg:pb-0">
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        {/* ===== Left — content ===== */}
        <div className="lg:col-span-6">
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

          {/* Trust strip — same line as before, simplified (no pulse-glow
              button wrapper, no backdrop-blur). */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-8 max-w-[36rem] rounded-2xl bg-foreground p-5 text-background"
          >
            <div className="flex items-center gap-3">
              <span className="size-2 shrink-0 rounded-full bg-accent" />
              <p className="text-sm font-medium">
                If you're invisible during that process, you're already losing opportunities.
              </p>
            </div>
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

        {/* ===== Right — the astronaut, large, allowed to bleed slightly
            past the container's edge on desktop for an editorial feel. ===== */}
        <div
          className="lg:col-span-6 lg:-mr-8 xl:-mr-16"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ x: astroPX, y: astroPY }}
            className="mx-auto w-full max-w-[30rem] lg:max-w-none lg:w-[110%]"
          >
            <img
              src={astronaut}
              alt="DMAX — astronaut, the visual identity of the Decision-Maker Acquisition System"
              loading="eager"
              width={1536}
              height={1024}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
