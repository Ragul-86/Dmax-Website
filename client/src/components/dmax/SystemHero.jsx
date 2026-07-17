import { motion, useReducedMotion } from "framer-motion";
import ctaBackground from "@/assets/cta/cta-background.png";
import earthImg from "@/assets/cta/earth.png";
import earthGlowImg from "@/assets/cta/earth-glow.png";
import astronautStanding from "@/assets/cta/cta-astronaut-standing.png";

/**
 * Cinematic intro block for the "Introducing the Decision-Maker
 * Acquisition System™" section — sits ABOVE the existing <SystemShowcase />
 * 8-card grid (which is rendered separately, right after this, completely
 * unchanged) so none of the 8 items are lost. This component only supplies
 * the new heading/paragraph + astronaut/Earth/nebula illustration; the
 * grid below keeps its own heading suppressed (SystemShowcase is called
 * with no `title` from Home.jsx) so the copy isn't duplicated.
 *
 * NOTE: reuses the same 4 image layers as the Home Final CTA
 * (cta-background.png / earth.png / earth-glow.png /
 * cta-astronaut-standing.png) since no new assets were supplied for this
 * section and the brief explicitly asked for "exactly like the premium
 * Home CTA." Flagged in chat — say the word if you'd rather this section
 * use different art.
 *
 * Layout: 45% text / 55% illustration on md+ (reversed ratio from the
 * Final CTA's 55/45, since the astronaut is meant to be the main visual
 * focus here). Text keeps the site's normal heading/paragraph
 * typography and colors on the normal page background — only the right
 * column is a self-contained dark cinematic panel (same scene-dark
 * language as the CTA), so brand colors/typography outside that panel are
 * untouched. Mobile stacks to a single column, text first, illustration
 * below.
 */
export function SystemHero({
  eyebrow = null,
  title = <>Introducing the Decision-Maker Acquisition System™</>,
  subtitle = "A system designed to help expertise-driven businesses become the first choice before decision-makers are ready to buy.",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="py-16 md:py-20 lg:py-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[45%_55%] md:gap-12 lg:gap-16 items-center">
          {/* Left 45% — heading/paragraph, same typography, colors and
              spacing as the rest of the site; nothing here changed. */}
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className={`${eyebrow ? "mt-4" : ""} h2-section text-balance`}>{title}</h2>
            {subtitle && <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
          </div>

          {/* Right 55% — self-contained cinematic panel. Only this box is
              dark; the rest of the section keeps the normal light page
              background. */}
          <div className="relative h-[280px] sm:h-[340px] md:h-[380px] lg:h-[460px] overflow-hidden rounded-[32px] scene-dark shadow-elevation">
            <motion.div
              aria-hidden
              className="absolute inset-0 overflow-hidden"
              animate={reduceMotion ? undefined : { scale: [1, 1.05] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
              }
            >
              {/* Nebula / background — very slow Ken Burns drift, independent of the scale above */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${ctaBackground})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: "brightness(0.8) saturate(0.9)",
                }}
                animate={reduceMotion ? undefined : { x: [0, -10, 0], y: [0, 6, 0] }}
                transition={reduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Stars — random twinkle, reuses the site-wide stars system */}
              <div className="stars stars-force absolute inset-0 opacity-50 dark:hidden" />

              {/* Earth + glow — huge, mostly outside the right edge, behind the astronaut */}
              <div
                className="absolute"
                style={{ right: "-260px", top: "50%", transform: "translateY(-50%)", width: 480, height: 480, zIndex: 1 }}
              >
                <motion.img
                  src={earthGlowImg}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain"
                  animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
                  transition={reduceMotion ? undefined : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                  src={earthImg}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain"
                  animate={reduceMotion ? undefined : { rotate: [0, 360] }}
                  transition={reduceMotion ? undefined : { duration: 45, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Astronaut — main visual focus, front and center-right, overlapping Earth */}
              <motion.img
                src={astronautStanding}
                alt=""
                loading="lazy"
                style={{
                  position: "absolute",
                  right: "6%",
                  bottom: 0,
                  height: "92%",
                  width: "auto",
                  maxWidth: "58%",
                  objectFit: "contain",
                  zIndex: 2,
                  filter: "drop-shadow(0 24px 32px rgba(0,0,0,0.45))",
                }}
                animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [-2, 2, -2] }}
                transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
