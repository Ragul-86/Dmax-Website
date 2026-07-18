import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Zap, Sparkles } from "lucide-react";
import astronaut from "@/assets/hero-astronaut.png";

import moon from "@/assets/hero-moon.png";
import stars from "@/assets/hero-stars.jpg";

// One-word step names from "Our Method" — "Discover / Position / Build / Scale."
const services = ["Discover.", "Position.", "Build.", "Scale."];

// Verbatim headline, split across two lines: "Become the First Choice" / "in Your Market."
const headline = ["Become the First Choice", "in Your Market."];

/**
 * "DMAX AI Suit Activation" — plays once per browser session.
 *
 * This is a MODULE-scope flag, deliberately not React state and not
 * sessionStorage. It needs to survive client-side route navigation away
 * from and back to Home (the JS module stays loaded in memory the whole
 * time, so this flag stays set — Hero unmounts/remounts on every route
 * change, but the module itself doesn't reload), while resetting on an
 * actual hard refresh (which reloads the whole JS bundle from scratch,
 * re-initializing this to `false`). sessionStorage was deliberately
 * avoided: it survives a hard refresh too, which would contradict
 * "replay only after a full browser refresh."
 */
let heroActivationPlayed = false;

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sy = useSpring(ry, { stiffness: 120, damping: 14 });
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 800 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 8);
        rx.set(-py * 8);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Decide once, synchronously, whether THIS mount is the first time the
  // Hero has ever mounted since the page's JS loaded. Reduced-motion
  // visitors skip the activation sequence entirely and land straight on
  // the idle state (no suit-activation flashes/sweeps for them, per
  // "respect prefers-reduced-motion").
  const [playActivation] = useState(() => {
    const isFirstMount = !heroActivationPlayed;
    heroActivationPlayed = true;
    return isFirstMount;
  });
  const runActivation = playActivation && !reduceMotion;
  // Idle loops pick up right where activation hands off (~2.8s total
  // sequence) — or start immediately if activation was skipped (repeat
  // visit or reduced motion).
  const idleStart = runActivation ? 2.8 : 0;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Cinematic scroll-linked transforms — astronaut floats up + scales down
  const astroY = useTransform(scrollYProgress, [0, 1], ["0vh", "-40vh"]);
  const astroScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const astroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  // Moon — slower parallax, stays in view longer
  const moonY = useTransform(scrollYProgress, [0, 1], ["0vh", "-15vh"]);

  // Stars subtle parallax
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Mouse parallax — very subtle, max ±4px (±1.5deg for the astronaut's
  // slight rotation), per "Interaction > Mouse Movement" spec. One shared
  // pointer source (0..1 normalized position), three independently
  // sprung outputs so the astronaut/moon/background each respond at a
  // slightly different strength — reads as depth, not three identical copies.
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const bgX = useSpring(useTransform(mvX, [-0.5, 0.5], [-2, 2]), { stiffness: 60, damping: 20 });
  const bgY = useSpring(useTransform(mvY, [-0.5, 0.5], [-2, 2]), { stiffness: 60, damping: 20 });
  const moonPX = useSpring(useTransform(mvX, [-0.5, 0.5], [-4, 4]), { stiffness: 80, damping: 18 });
  const moonPY = useSpring(useTransform(mvY, [-0.5, 0.5], [-3, 3]), { stiffness: 80, damping: 18 });
  const astroRotate = useSpring(useTransform(mvX, [-0.5, 0.5], [-1.5, 1.5]), { stiffness: 90, damping: 16 });
  const astroPY = useSpring(useTransform(mvY, [-0.5, 0.5], [-4, 4]), { stiffness: 90, damping: 16 });

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
    <section ref={sectionRef} className="relative pt-32 pb-24 overflow-hidden min-h-[88vh]">
      {/* Background — split into its own absolute layer (previously the
          `bg-hero` class sat directly on <section>) purely so it can carry
          its own slow "camera drift" scale independent of the text
          content's layout/box. Same gradient token, same visual result at
          rest — this does not change the background composition, only how
          it's mounted so it can be animated on its own. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-hero"
        style={{ x: bgX, y: bgY }}
        initial={runActivation ? { opacity: 0, filter: "brightness(0.7)" } : false}
        animate={{ opacity: 1, filter: "brightness(1)", scale: reduceMotion ? 1 : [1, 1.02] }}
        transition={{
          opacity: { duration: 0.7, ease: "easeOut" },
          filter: { duration: 0.8, delay: runActivation ? 0.6 : 0, ease: "easeOut" },
          scale: reduceMotion
            ? { duration: 0 }
            : { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: idleStart },
        }}
      />

      {/* ===== Cinematic object layer ===== */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Stars overlay — dark mode only (unchanged), fades in as
            activation step 2 (0.3s). A second, subtle twinkling-dot layer
            (the sitewide .stars system, also dark-mode-only, matching the
            same visibility convention as the JPG texture) is added for
            "random twinkle, different delays" during idle. */}
        <motion.div
          style={{ y: starsY, x: bgX }}
          initial={runActivation ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: runActivation ? 0.3 : 0 }}
          className="absolute inset-0"
        >
          <img
            src={stars}
            alt=""
            loading="lazy"
            className="stars-overlay absolute inset-0 w-[120%] h-full object-cover"
          />
          <div className="stars absolute inset-0" />
        </motion.div>

        {/* Moon — top-right. Nested layers: scroll-linked depart (outer,
            unchanged) → idle continuous rotation (new, replaces the old
            slow 140s CSS spin so it matches the "Earth" idle spec exactly)
            + mouse parallax shift, both on the same middle layer. */}
        <motion.div
          style={{ y: moonY }}
          className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-[36rem] sm:w-[48rem] lg:w-[56rem] aspect-square"
        >
          <motion.div
            initial={runActivation ? { opacity: 0, scale: 0.96 } : false}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: reduceMotion ? 0 : 360,
            }}
            transition={{
              opacity: { duration: 0.8, delay: runActivation ? 0.6 : 0, ease: "easeOut" },
              scale: { duration: 0.8, delay: runActivation ? 0.6 : 0, ease: "easeOut" },
              rotate: reduceMotion
                ? { duration: 0 }
                : { duration: 45, repeat: Infinity, ease: "linear", delay: idleStart },
            }}
            className="relative h-full"
          >
            {/* h-full cascades a definite box down to the <img> BEFORE it
                loads (this wrapper's own size is fixed by the aspect-square
                + explicit width above it, not by the image), so nothing
                resizes/jumps once the moon PNG finishes downloading. */}
            <motion.div style={{ x: moonPX, y: moonPY }} className="relative h-full">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.35),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle_at_35%_35%,rgba(180,200,255,0.45),transparent_65%)]" />
              <img
                src={moon}
                alt=""
                loading="lazy"
                className="relative w-full h-full object-contain moon-float opacity-90 drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Astronaut — free-floating. Nested layers: scroll-linked depart
            (outer, unchanged position/size) → activation entrance + idle
            float/tilt loop (middle, replaces the old 16s diagonal
            "astro-travel" CSS keyframe with the new gentle float spec) →
            mouse-parallax rotate/shift (inner) → image + activation
            overlay effects (innermost). */}
        <motion.div
          style={{ y: astroY, scale: astroScale, opacity: astroOpacity }}
          className="absolute bottom-[8%] left-[3%] w-[26rem] sm:w-[36rem] lg:w-[52rem] aspect-[3/2]"
        >
          <motion.div
            initial={runActivation ? { opacity: 0, scale: 0.94 } : false}
            animate={{
              opacity: 1,
              scale: 1,
              y: reduceMotion ? 0 : [0, -8, 0],
              rotate: reduceMotion ? 0 : [0, 1.5, 0, -1.5, 0],
            }}
            transition={{
              opacity: { duration: 0.7, delay: runActivation ? 0.35 : 0, ease: "easeOut" },
              scale: { duration: 0.7, delay: runActivation ? 0.35 : 0, ease: "easeOut" },
              y: reduceMotion
                ? { duration: 0 }
                : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: idleStart },
              rotate: reduceMotion
                ? { duration: 0 }
                : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: idleStart },
            }}
            className="relative h-full"
          >
            {/* aspect-[3/2] above matches hero-astronaut.png's actual
                ~1536x1024 canvas exactly, and h-full cascades a definite
                box down to the <img> before it loads, so the astronaut
                never resizes/jumps once the PNG finishes downloading — and
                because the ratio is exact (not approximate), object-contain
                fills the box edge-to-edge with zero letterboxing, so the
                percentage-positioned LED/visor overlays below stay
                pixel-aligned to the pose exactly as before. */}
            <motion.div style={{ rotate: astroRotate, y: astroPY }} className="relative h-full">
              <img
                src={astronaut}
                alt=""
                loading="eager"
                width={1536}
                height={1024}
                className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
              />

              {/* ===== DMAX AI Suit Activation — overlay effects =====
                  hero-astronaut.png is a single flattened photo with no
                  separate visor/LED/backpack layers, and there is no
                  image-generation/editing tool available this session to
                  bake these into the source art. Per your direction, these
                  are re-enabled as CSS overlays tuned by eye to this exact
                  pose (helmet ~37-46% / 44-52%, chest panel ~34-40% /
                  56-63%, shoulders, backpack edge, and both hands) — a
                  deliberate, disclosed approximation, not a claim that
                  these are pixels inside the PNG. */}

              {/* Step 4 — visor scan-line sweep, 1.0s */}
              {runActivation && !reduceMotion && (
                <motion.div
                  aria-hidden
                  className="absolute overflow-hidden rounded-full"
                  style={{ left: "37%", top: "44%", width: "9%", height: "8%" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1.0, duration: 0.5, ease: "easeInOut" }}
                >
                  <motion.div
                    className="absolute inset-x-0 h-1/3"
                    style={{
                      background:
                        "linear-gradient(rgba(56,224,0,0), rgba(56,224,0,0.9), rgba(56,224,0,0))",
                    }}
                    initial={{ top: "-40%" }}
                    animate={{ top: "120%" }}
                    transition={{ delay: 1.0, duration: 0.5, ease: "easeInOut" }}
                  />
                </motion.div>
              )}

              {/* Step 5 — helmet HUD reflection, brief flash only (not
                  permanent), 1.3s */}
              {runActivation && !reduceMotion && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    left: "38%",
                    top: "44%",
                    width: "6%",
                    height: "5%",
                    background: "radial-gradient(closest-side, rgba(255,255,255,0.75), rgba(255,255,255,0) 75%)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1.3, duration: 0.5, ease: "easeInOut" }}
                />
              )}

              {/* Step 6 — chest LED, powers on 1.5s then idle-breathes */}
              <motion.div
                aria-hidden
                className="absolute rounded-full"
                style={{
                  left: "36%",
                  top: "58%",
                  width: "1.6%",
                  aspectRatio: "1 / 1",
                  background: "#39E600",
                  boxShadow: "0 0 8px 2px rgba(56,224,0,0.8)",
                }}
                initial={runActivation ? { opacity: 0 } : false}
                animate={{ opacity: reduceMotion ? 1 : [0.65, 1, 0.65] }}
                transition={{
                  delay: runActivation ? 1.5 : 0,
                  duration: reduceMotion ? 0.4 : 2.5,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Step 7 — shoulder LEDs, power on 1.7s */}
              {[{ l: "30%", t: "49%" }, { l: "41%", t: "55%" }].map((p, idx) => (
                <motion.div
                  key={`shoulder-${idx}`}
                  aria-hidden
                  className="absolute rounded-full"
                  style={{
                    left: p.l,
                    top: p.t,
                    width: "1.2%",
                    aspectRatio: "1 / 1",
                    background: "#39E600",
                    boxShadow: "0 0 6px 1.5px rgba(56,224,0,0.75)",
                  }}
                  initial={runActivation ? { opacity: 0 } : false}
                  animate={{ opacity: reduceMotion ? 1 : [0.65, 1, 0.65] }}
                  transition={{
                    delay: runActivation ? 1.7 : 0,
                    duration: reduceMotion ? 0.4 : 2.5,
                    repeat: reduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Step 8 — wrist LEDs, power on 1.9s */}
              {[{ l: "47%", t: "59%" }, { l: "19%", t: "77%" }].map((p, idx) => (
                <motion.div
                  key={`wrist-${idx}`}
                  aria-hidden
                  className="absolute rounded-full"
                  style={{
                    left: p.l,
                    top: p.t,
                    width: "1%",
                    aspectRatio: "1 / 1",
                    background: "#39E600",
                    boxShadow: "0 0 5px 1px rgba(56,224,0,0.7)",
                  }}
                  initial={runActivation ? { opacity: 0 } : false}
                  animate={{ opacity: reduceMotion ? 1 : [0.65, 1, 0.65] }}
                  transition={{
                    delay: runActivation ? 1.9 : 0,
                    duration: reduceMotion ? 0.4 : 2.5,
                    repeat: reduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Step 9 — backpack LED, powers on 2.05s */}
              <motion.div
                aria-hidden
                className="absolute rounded-full"
                style={{
                  left: "28%",
                  top: "47%",
                  width: "1.3%",
                  aspectRatio: "1 / 1",
                  background: "#39E600",
                  boxShadow: "0 0 6px 1.5px rgba(56,224,0,0.75)",
                }}
                initial={runActivation ? { opacity: 0 } : false}
                animate={{ opacity: reduceMotion ? 1 : [0.65, 1, 0.65] }}
                transition={{
                  delay: runActivation ? 2.05 : 0,
                  duration: reduceMotion ? 0.4 : 2.5,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Step 10 — green energy ring, expands around the whole
                  astronaut once at 2.2s */}
              {runActivation && !reduceMotion && (
                <motion.div
                  aria-hidden
                  className="absolute rounded-full border-2"
                  style={{
                    left: "37%",
                    top: "60%",
                    width: "22%",
                    aspectRatio: "1 / 1",
                    x: "-50%",
                    y: "-50%",
                    borderColor: "rgba(56,224,0,0.7)",
                  }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.3, 4.2] }}
                  transition={{ delay: 2.2, duration: 0.6, ease: "easeOut" }}
                />
              )}

              {/* Step 11 — small glowing particles orbit briefly, 2.3s */}
              {runActivation && !reduceMotion && (
                <motion.div
                  aria-hidden
                  className="absolute"
                  style={{ left: "37%", top: "58%", width: 0, height: 0 }}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 140, opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 2.3, duration: 0.9, ease: "easeOut" }}
                >
                  {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                    <span
                      key={`particle-${idx}`}
                      className="absolute rounded-full"
                      style={{
                        width: 3 + (idx % 3),
                        height: 3 + (idx % 3),
                        background: "#39E600",
                        boxShadow: "0 0 6px 1px rgba(56,224,0,0.8)",
                        transform: `rotate(${angle}deg) translateX(${70 + (idx % 3) * 14}px)`,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== Hero content ===== */}
      <div className="container-x relative z-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.04] border border-foreground/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            The Decision-Maker Acquisition System™
          </motion.div>

          <h1 className="mt-7 font-display font-bold tracking-tight text-balance text-foreground text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[1.02]">
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
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            Build a predictable client acquisition system that creates trust before the first
            sales conversation. For founders, business coaches, manufacturers, exporters, and B2B
            service businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 rounded-2xl bg-foreground text-background p-5 flex flex-wrap items-center justify-between gap-4 shadow-elevation max-w-xl"
          >
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <p className="text-sm font-medium">
                If you're invisible during that process, you're already losing opportunities.
              </p>
            </div>
            <Link
              to="/contact"
              className="text-xs font-semibold uppercase tracking-widest text-accent hover:brightness-110"
            >
              Book a Strategy Call →
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            {services.map((s) => (
              <li key={s} className="inline-flex items-center gap-2">
                <span className="size-1 rounded-full bg-accent" /> {s}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            {/* Buttons themselves are untouched (same classes/markup as
                before). Each is wrapped in a motion.div that (a) plays a
                subtle ambient "breathing" glow loop — step 12 of the
                activation sequence, picking up at 2.6s on first load and
                continuing forever in idle — and (b) swaps to a stronger
                glow on hover via whileHover. Framer-driven on both states
                deliberately, so the two don't fight: an inline style set
                by `animate` always beats an external CSS :hover rule for
                the same property, so hover has to be Framer's whileHover
                too, not a Tailwind hover: class, to actually take effect. */}
            <motion.div
              className="inline-flex rounded-full"
              animate={{
                boxShadow: reduceMotion
                  ? "0 0 0px rgba(56,224,0,0)"
                  : [
                      "0 0 0px rgba(56,224,0,0)",
                      "0 0 22px -2px rgba(56,224,0,0.5)",
                      "0 0 0px rgba(56,224,0,0)",
                    ],
              }}
              transition={{
                duration: reduceMotion ? 0 : 2.6,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
                delay: runActivation ? 2.6 : 0,
              }}
              whileHover={{ boxShadow: "0 0 28px -2px rgba(56,224,0,0.55)" }}
            >
              <Link to="/contact" className="group btn-primary">
                Book a Strategy Call
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              className="inline-flex rounded-full"
              animate={{
                boxShadow: reduceMotion
                  ? "0 0 0px rgba(56,224,0,0)"
                  : [
                      "0 0 0px rgba(56,224,0,0)",
                      "0 0 16px -2px rgba(56,224,0,0.35)",
                      "0 0 0px rgba(56,224,0,0)",
                    ],
              }}
              transition={{
                duration: reduceMotion ? 0 : 2.6,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
                delay: runActivation ? 2.75 : 0,
              }}
              whileHover={{ boxShadow: "0 0 24px -4px rgba(56,224,0,0.4)" }}
            >
              <a href="#process" className="btn-secondary">
                See How It Works
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right column — floating HUD metric cards with pointer tilt */}
        <div className="hidden lg:block lg:col-span-5 relative h-[28rem]">
          <TiltCard className="absolute top-4 left-2 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="glass-dark text-white rounded-2xl px-4 py-3 flex items-center gap-3 float-slower"
            >
              <div className="size-9 rounded-xl bg-accent/20 grid place-items-center">
                <TrendingUp className="size-4 text-accent" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Qualified Business Conversations</div>
                <div className="text-sm font-semibold">100+</div>
              </div>
            </motion.div>
          </TiltCard>

          <TiltCard className="absolute bottom-32 right-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="glass-dark text-white rounded-2xl px-4 py-3 flex items-center gap-3 float-slow"
            >
              <div className="size-9 rounded-xl bg-accent/20 grid place-items-center">
                <Zap className="size-4 text-accent" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Sales Opportunities Created</div>
                <div className="text-sm font-semibold">280+</div>
              </div>
            </motion.div>
          </TiltCard>

          <TiltCard className="absolute bottom-4 right-16 z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="glass-dark text-white rounded-2xl px-4 py-3 flex items-center gap-3 float-slower"
            >
              <div className="size-9 rounded-xl bg-accent/20 grid place-items-center">
                <Sparkles className="size-4 text-accent" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">Countries Reached</div>
                <div className="text-sm font-semibold">5+</div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
