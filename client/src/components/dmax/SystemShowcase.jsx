import { motion } from "framer-motion";

/**
 * Large, cinematic-poster style card grid for the Home page's
 * "Decision-Maker Acquisition System™" section ONLY. Deliberately a
 * separate component from <Services /> (which stays icon/thumbnail-
 * based and is still used, unchanged, by the Insights "Explore by Topic"
 * grid) so this redesign can't leak into any other section.
 *
 * Section: 1700px max content width, centered, 120px vertical section
 * padding, 48px grid gap. Exactly 3 cards per row on desktop, 2 on
 * tablet, 1 on mobile.
 *
 * Card — 380px wide, 540-570px tall (reduced again from the prior
 * 420-460/620-660px pass, for a lighter, more Apple-editorial
 * proportion), same radius, gradient, content, and hover behavior as
 * before. Only the image
 * treatment changed: instead of a single object-fit: cover image (which
 * necessarily trimmed part of every wide ~4:3 scene to fill this
 * narrower ~0.78-aspect card), each card now layers a blurred,
 * scaled-up object-cover copy of the photo as an ambient backdrop
 * (fills the card completely, so there's never an empty gap) underneath
 * the complete, uncropped photo via object-fit: contain — which by
 * definition cannot cut off any part of the source image, guaranteeing
 * the astronaut's head/hands, Earth, holograms, and the DMAX flag are
 * always fully visible. The foreground artwork is forced to
 * objectPosition Y: 0% — flush against the card's top edge, zero gap —
 * so all of contain's leftover letterbox space lands at the bottom,
 * under the gradient/text, instead of splitting top and bottom. Each
 * item's `focal` field (set in Home.jsx) still supplies the horizontal
 * (X) bias per image; only its Y component is no longer used for the
 * foreground layer.
 *
 * Gradient — exact 5-stop cinematic fade baked directly onto the image:
 * transparent → rgba(0,0,0,.25) → rgba(0,0,0,.55) → rgba(0,0,0,.85) →
 * rgba(0,0,0,.95), evenly spaced bottom-to-top, so it only aids
 * legibility without ever fully hiding the photo.
 *
 * Content — bottom-left, 36px padding: MISSION 0N label (13px, 600,
 * 4px letter-spacing, DMAX green), title (48px, extra-bold/800, white),
 * optional description (19px, regular, rgba(255,255,255,.85) — only
 * rendered if the data actually supplies one; no copy invented for
 * items that don't have it).
 *
 * Hover: 10px lift, image scales to 1.03, soft DMAX-green glow, deep
 * shadow — 350ms cubic-bezier(.22,1,.36,1), all via `.mission-card` /
 * `.mission-card-img` in styles.css.
 */
export function SystemShowcase({ eyebrow, title, subtitle, items = [], closing }) {
  return (
    <section className={`${title ? "pt-[120px]" : "pt-0"} pb-[120px]`}>
      <div className="mx-auto w-full max-w-[1700px] px-5 md:px-8 lg:px-12">
        {title && (
          <div className="max-w-3xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="mt-4 h2-section text-balance">{title}</h2>
            {subtitle && <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
          </div>
        )}

        <div
          className={`${title ? "mt-16" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center`}
        >
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mission-card group relative w-full max-w-[380px] h-[540px] sm:h-[555px] lg:h-[570px] cursor-pointer overflow-hidden rounded-[32px] bg-black"
            >
              {/* Image — two layers, same footprint as before (still
                  exactly 100% of the card, same size/radius/layout), but
                  now guaranteed to never crop any part of the artwork.
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
              {/* Foreground artwork — objectPosition Y is forced to exactly
                  0% (not just "close to top") so the image's top edge is
                  pixel-flush with the card's top edge/rounded corners, no
                  matter how much letterbox space object-fit: contain
                  leaves over. A Y value like "10%" still reserves a
                  visible strip at the top for the remainder of the gap —
                  only 0% guarantees zero gap. All of the resulting
                  leftover space is pushed to the bottom, under the
                  gradient/text, where it's already expected. X still
                  comes from each item's `focal` for horizontal framing. */}
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="mission-card-img absolute inset-0 h-full w-full object-contain"
                style={{ objectPosition: `${(s.focal || "50%").split(" ")[0]} 0%` }}
              />

              {/* Cinematic gradient — transparent → .25 → .55 → .85 → .95,
                  baked directly onto the image, readability only. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0) 100%)",
                }}
              />

              {/* Content — bottom-left, 36px padding */}
              <div className="absolute inset-x-0 bottom-0 p-9">
                <p
                  className="text-[13px] font-semibold uppercase"
                  style={{ color: "#39E600", letterSpacing: "4px" }}
                >
                  {`Mission ${String(i + 1).padStart(2, "0")}`}
                </p>
                <h3 className="mt-3 text-[34px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.05] text-white text-balance">
                  {s.title}
                </h3>
                {s.desc && (
                  <p
                    className="mt-3 max-w-[92%] text-[19px] font-normal leading-snug line-clamp-3"
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
