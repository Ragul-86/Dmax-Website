import { motion } from "framer-motion";

/**
 * Large, cinematic-poster style card grid for the Home page's
 * "Decision-Maker Acquisition System™" section ONLY. Deliberately a
 * separate component from <Services /> (which stays icon/thumbnail-
 * based and is still used, unchanged, by the Insights "Explore by Topic"
 * grid) so this redesign can't leak into any other section.
 *
 * Section: 1700px max content width, centered. Intro (label/heading/
 * description) is a centered editorial block — Tony Robbins-style — with
 * generous space before the grid. The grid itself is untouched: exactly
 * 4 cards per row on desktop / 2 on tablet / 1 on mobile, same 8 items,
 * same order, same artwork, same count — only the internal composition
 * of each card and the section's global spacing/typography were refined.
 *
 * Card — 380px wide, 540-570px tall, same radius family, image
 * treatment, and hover behavior as before (still a full-bleed photo:
 * a blurred object-cover backdrop under the complete, uncropped photo
 * via object-fit: contain, which by definition can never crop the
 * astronaut's head/hands, Earth, holograms, or the DMAX flag).
 *
 * Content hierarchy — moved from bottom-left to TOP-left (Apple feature-
 * card scan order: label acting as the card's icon-equivalent → title →
 * description) since these items have no separate icon glyph or supplied
 * description copy — the "Mission 0N" tag is the closest existing
 * equivalent to an icon, and no description text was invented for items
 * that don't have one. To keep the top-anchored text legible against the
 * photo, the artwork is now flush to the card's BOTTOM edge (was flush
 * top) and the cinematic gradient fades from the top down (was bottom
 * up) — everything else about the artwork (images, crop-safety,
 * `focal` horizontal bias) is unchanged.
 *
 * Hover: 10px lift, image scales to 1.03, soft DMAX-green glow, deep
 * shadow — 350ms cubic-bezier(.22,1,.36,1), all via `.mission-card` /
 * `.mission-card-img` in styles.css (unchanged).
 */
export function SystemShowcase({ eyebrow, title, subtitle, items = [], closing }) {
  return (
    <section className={`${title ? "pt-[120px]" : "pt-0"} pb-[120px]`}>
      <div className="mx-auto w-full max-w-[1700px] px-5 md:px-8 lg:px-12">
        {title && (
          <div className="mx-auto max-w-3xl text-center">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="mt-4 h2-section text-balance">{title}</h2>
            {subtitle && (
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}

        <div
          className={`${title ? "mt-20 lg:mt-24" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 justify-items-center`}
        >
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mission-card group relative w-full max-w-[380px] h-[460px] sm:h-[480px] lg:h-[500px] cursor-pointer overflow-hidden rounded-[24px] bg-black"
            >
              {/* Image — two layers, same footprint as before (still
                  exactly 100% of the card, same size/radius/layout), but
                  guaranteed to never crop any part of the artwork.
                  Layer 1: a blurred, scaled-up object-cover copy of the
                  same photo fills the entire card as an ambient backdrop
                  (real pixels, just softened) so there's never an empty
                  gap. Layer 2, on top: the complete photo via
                  object-fit: contain — by definition this can never cut
                  off the astronaut's head/hands, Earth, holograms, or
                  the DMAX flag. `focal` (per item, in Home.jsx) nudges
                  both layers toward a considered composition. */}
              <img
                src={s.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl opacity-75"
                style={{ objectPosition: s.focal || "50% 45%" }}
              />
              <div aria-hidden className="absolute inset-0 bg-black/45" />
              {/* Foreground artwork — objectPosition Y is now forced to
                  exactly 100% (flush to the card's BOTTOM edge, was 0%/
                  top) so contain's leftover letterbox space collects at
                  the TOP instead — right where the content block and its
                  gradient now sit. X still comes from each item's `focal`
                  for horizontal framing; nothing about which images are
                  used or their crop-safety changed. */}
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="mission-card-img absolute inset-0 h-full w-full object-contain"
                style={{ objectPosition: `${(s.focal || "50%").split(" ")[0]} 100%` }}
              />

              {/* Cinematic gradient — same 5-stop fade, flipped to run
                  top-down so it sits behind the now top-anchored content
                  instead of the bottom. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0) 100%)",
                }}
              />

              {/* Content — top-left, Apple feature-card scan order: the
                  "Mission 0N" tag (the closest existing equivalent to an
                  icon), then title, then an optional description — never
                  invented, only rendered if `s.desc` actually exists. */}
              <div className="absolute inset-x-0 top-0 p-8">
                <p
                  className="text-[11px] font-semibold uppercase"
                  style={{ color: "var(--accent)", letterSpacing: "3px" }}
                >
                  {`Mission ${String(i + 1).padStart(2, "0")}`}
                </p>
                <h3 className="mt-3 text-[25px] sm:text-[27px] lg:text-[30px] font-extrabold tracking-tight leading-[1.15] text-white text-balance">
                  {s.title}
                </h3>
                {s.desc && (
                  <p
                    className="mt-3 max-w-[94%] text-[15px] font-normal leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {s.desc}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {closing && <p className="mt-10 text-center text-muted-foreground">{closing}</p>}
      </div>
    </section>
  );
}
