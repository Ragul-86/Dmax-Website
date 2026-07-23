import { motion, useMotionValue, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";

const defaultItems = [
  { icon: Sparkles, title: "Brand Foundation" },
];

// Per-hologram-type animation keyframes — each reads as a distinct
// "independent" light behavior (pulse / ripple / shimmer / glow) rather
// than every card breathing in lockstep. These are honest approximations:
// the scanner/shield/hologram/chart are baked into the flat source photos
// (no image-generation or per-layer editing available this session), so
// this overlays a small animated green light roughly where that prop sits
// in each photo, rather than literally animating pixels inside the PNG.
const HOLOGRAM_ANIM = {
  pulse: { // Market Visibility — scanner
    animate: { scale: [0.85, 1.2, 0.85], opacity: [0.4, 0.8, 0.4] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
  ripple: { // Market Trust — shield
    animate: { scale: [0.7, 1.35, 0.7], opacity: [0.55, 0, 0.55] },
    transition: { duration: 2.6, repeat: Infinity, ease: "easeOut" },
  },
  shimmer: { // Qualified Conversations — comms hologram
    animate: { opacity: [0.35, 0.7, 0.35], x: [-4, 4, -4] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  glow: { // Predictable Revenue — growth chart
    animate: { opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.08, 0.95] },
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
};

/**
 * The image-led artwork band for one "Explore by Topic" card. Split out
 * from the main map loop so it can own its own hooks (mouse-parallax
 * spring values) — hooks can't be called conditionally inside a bare
 * .map() callback.
 *
 * Three independent motion layers, each on its own element so their
 * transforms don't collide:
 *   1. Outer layer — subtle mouse-parallax (spring-eased x/y, ±5px).
 *   2. Middle layer — continuous float (y: 0→-10→0, 6s) + slow breathing
 *      scale (1→1.03→1, 9s, deliberately off-sync from the float so it
 *      doesn't feel mechanical).
 *   3. The <img> itself — static-to-hover zoom (1.18 → 1.22), plain CSS
 *      transition, independent of the two motion layers above it.
 * A small hologram-glow overlay (see HOLOGRAM_ANIM) sits above the image
 * for the 4 topics that have a holographic prop in the photo.
 */
function TopicArtwork({ s }) {
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 150, damping: 16, mass: 0.4 });
  const springY = useSpring(mvY, { stiffness: 150, damping: 16, mass: 0.4 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mvX.set(relX * 10);
    mvY.set(relY * 8);
  };
  const handleMouseLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  const holo = s.hologram && HOLOGRAM_ANIM[s.hologram.type];

  return (
    <div
      // Height raised 180px → 230px (+27.8%, inside the requested
      // 20-30% card-height / "image as dominant visual" range) — the
      // rest of the card (title/body) grows a bit too from the
      // typography bump below, so total card height increases in
      // proportion without needing a separate hard-coded height rule.
      className="relative -mx-7 -mt-7 md:-mx-8 md:-mt-8 h-[230px] w-[calc(100%+3.5rem)] md:w-[calc(100%+4rem)] overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Soft green ambient glow, contained within the artwork band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-85 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(60% 65% at 62% 32%, rgba(57,230,0,0.26), rgba(57,230,0,0) 72%)",
        }}
      />

      {/* Layer 1 — mouse parallax */}
      <motion.div className="absolute inset-0 bg-white" style={{ x: springX, y: springY }}>
        {/* Layer 2 — float + breathing scale. Sized 16px taller than its
            parent (anchored at the top) so that translating up to -10px
            never uncovers the bottom edge of the static clip window above
            — that under-run was the cause of the seam/line appearing
            mid-animation. The extra height is always clipped away by the
            outer overflow-hidden except during the float's upward travel,
            when it's revealed instead of a gap — and since it's still deep
            inside the fade-to-white zone, what's revealed is white, not a
            raw image edge. */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[calc(100%+16px)] bg-white"
          animate={{ y: [0, -10, 0], scale: [1, 1.03, 1] }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden bg-white"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <img
              src={s.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 block h-full w-full scale-[1.18] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.22]"
              style={{ objectPosition: s.focal || "50% 30%" }}
            />

            {/* Independent hologram-prop glow (scanner/shield/comms/chart) */}
            {holo && (
              <motion.div
                aria-hidden
                className="absolute rounded-full transition-[filter] duration-500 group-hover:brightness-125"
                style={{
                  left: s.hologram.x || "65%",
                  top: s.hologram.y || "30%",
                  width: "42%",
                  height: "42%",
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(closest-side, rgba(57,230,0,0.55), rgba(57,230,0,0) 75%)",
                  filter: "blur(6px)",
                }}
                animate={holo.animate}
                transition={holo.transition}
              />
            )}

            {/* Premium layered fade — dissolves the artwork into the white card */}
            <div
              className="absolute inset-x-0 bottom-0 h-3/5"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 60%, #FFFFFF 100%)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Services({
  eyebrow = "Services",
  title = <>Our Services</>,
  subtitle,
  items = defaultItems,
  closing,
  columns = "lg:grid-cols-3",
  // Opt-in only — used exclusively by ServicesPage.jsx's <Services /> call
  // to turn the intro into a restrained, editorial lead-in (smaller/
  // lighter heading, tight ~720px measure, small green accent bar instead
  // of a colored heading, more air before the card grid) so the cards
  // read as the section's primary visual focus. FaqPage.jsx's "Explore by
  // Topic" usage doesn't pass this, so it keeps the original intro
  // untouched.
  editorial = false,
  // Opt-in only — used exclusively by FaqPage.jsx's "Explore by Topic"
  // call, to widen the section's container well past the sitewide
  // container-narrow cap. ServicesPage.jsx's <Services editorial /> call
  // (a dead, unrouted page — not linked from App.jsx) omits this and
  // keeps the standard container-narrow width, so this can't affect any
  // live page other than the one it's meant for.
  wide = false,
}) {
  return (
    <section
      id="services"
      className={editorial ? "pt-14 md:pt-20 lg:pt-24 pb-20 md:pb-28 lg:pb-36" : "py-20 md:py-28 lg:py-36"}
    >
      {/* wide: max-w-[1760px] (inside the requested 1700-1800px range,
          ~95% of a 1920px viewport) with a slightly wider desktop gutter
          (px-12 vs container-narrow's 48px, i.e. same value, just applied
          directly here since this isn't the shared container-narrow
          class) so the "Explore by Topic" cards get dramatically more
          room without the section running edge-to-edge. */}
      <div className={wide ? "mx-auto max-w-[1760px] px-5 sm:px-8 lg:px-12" : "container-narrow"}>
        <div className={`mx-auto text-center ${editorial ? "max-w-[720px]" : "max-w-3xl"}`}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {editorial && (
            <div aria-hidden className="mx-auto mt-4 h-[3px] w-9 rounded-full bg-accent" />
          )}
          <h2
            className={
              editorial
                ? "mt-5 text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-balance text-foreground"
                : "mt-4 h2-section text-balance"
            }
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={
                editorial
                  ? "mx-auto mt-4 max-w-[620px] text-lg text-muted-foreground leading-relaxed"
                  : "mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
              }
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className={`${editorial ? "mt-20 md:mt-24" : "mt-16"} grid md:grid-cols-2 ${columns} gap-6`}>
          {items.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className={`group card-service${s.image ? " card-service-image relative overflow-hidden" : ""}`}
            >
              {s.image ? (
                <TopicArtwork s={s} />
              ) : (
                <div className="card-icon inline-flex size-12 items-center justify-center overflow-hidden rounded-2xl bg-foreground text-background transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110 group-hover:-rotate-3">
                  <s.icon className="size-5" />
                </div>
              )}
              {/* Title: text-xl/semibold → text-2xl/bold ("slightly larger
                  and bolder", same wording/hierarchy). Body: text-sm →
                  text-base (one typography step up); leading-relaxed is a
                  relative multiplier so it automatically delivers more
                  actual line-height at the bigger font-size too. */}
              <h3 className={`${s.image ? "relative mt-4" : "mt-6"} text-2xl font-bold`}>{s.title}</h3>
              {s.desc && <p className="mt-3 text-base text-muted-foreground leading-relaxed">{s.desc}</p>}
              {s.bullets && s.bullets.length > 0 && (
                <>
                  <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">What's Included</div>
                  <ul className="mt-3 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="mt-2 size-1 rounded-full bg-accent shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.article>
          ))}
        </div>

        {closing && <p className="mt-10 text-center text-muted-foreground">{closing}</p>}
      </div>
    </section>
  );
}
