import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import proof1 from "@/assets/proof/proof-1.jpeg";
import proof2 from "@/assets/proof/proof-2.jpeg";
import proof3 from "@/assets/proof/proof-3.jpeg";
import proof4 from "@/assets/proof/proof-4.jpeg";
import proof5 from "@/assets/proof/proof-5.jpeg";
import proof6 from "@/assets/proof/proof-6.jpeg";
import proof7 from "@/assets/proof/proof-7.jpeg";
import proof8 from "@/assets/proof/proof-8.jpeg";

// The 8 real proof screenshots, saved as .jpeg (not .jpg — matching
// what's actually in client/src/assets/proof/).
const DEFAULT_IMAGES = [proof1, proof2, proof3, proof4, proof5, proof6, proof7, proof8].map(
  (src, i) => ({ src, alt: `Proof screenshot ${i + 1}` }),
);

// Card height per breakpoint — this, not a column count, is what actually
// controls how many cards are visible at once, since each card's width is
// auto (driven by its own real screenshot aspect ratio via object-contain,
// unchanged/uncropped), not a fixed grid column. Pushed significantly
// larger this pass (was 265/285/305/325 — the previous "modest" bump the
// brief said still wasn't enough): desktop (lg/xl) now lands at 560/620px,
// squarely in the requested 520-650px range, with mobile/tablet scaled up
// generously too but kept a bit more conservative so a single card
// doesn't badly overshoot a phone's viewport width and stop feeling like
// "one at a time." object-contain still guarantees no stretching/cropping
// at any of these sizes.
const CARD_HEIGHT_CLASS = "h-[330px] sm:h-[420px] lg:h-[560px] xl:h-[620px]";

// Full-bleed breakout — the classic "calc(50% - 50vw)" margin trick. This
// is what makes the carousel span edge-to-edge across the viewport
// (immersive, "more screenshots coming" feel) while the heading/subtitle
// above it stay put inside the section's normal centered container — the
// two are independent elements, so widening just this one doesn't touch
// the other. No horizontal padding is added back on top of it: cards can
// sit almost flush with the edge, which is the point. `body { overflow-x:
// hidden }` (already set sitewide in styles.css) absorbs the sub-pixel
// 100vw-vs-scrollbar rounding some browsers introduce, so this never
// causes page-level horizontal scroll.
const FULL_BLEED_STYLE = { width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" };

// How far a card can scale down as it drifts away from center — 1.0 at
// dead-center down to this floor at the edges of the visible track. Sits
// inside the requested "adjacent slides ~85-90%" range.
const MIN_SCALE = 0.87;

function ProofCard({ image, onClick, reduceMotion }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${image.alt} in full size`}
      // Resting shadow slightly richer than before (a touch more spread/
      // opacity) to read as real depth at the larger card size, still a
      // soft two-layer shadow, not a heavy drop shadow. Hover scale
      // (1.05) is separate from — and layered on top of — the
      // continuous center-based active/adjacent scale applied to this
      // card's wrapper div (see ProofTrackCard below): they live on two
      // different DOM nodes so they never fight over the same
      // `transform` property. Rounded corners, border, and background
      // are unchanged.
      className={`group relative shrink-0 cursor-pointer pointer-events-auto ${CARD_HEIGHT_CLASS} overflow-hidden rounded-[24px] border border-border bg-white shadow-[0_2px_6px_rgba(0,0,0,0.05),0_10px_24px_-6px_rgba(0,0,0,0.09)] ${
        reduceMotion
          ? "hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.16)]"
          : "transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.05] hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.18)]"
      }`}
    >
      <img
        src={image.src}
        alt={image.alt}
        draggable={false}
        className={`${CARD_HEIGHT_CLASS} w-auto object-contain select-none`}
        loading="lazy"
      />
    </button>
  );
}

function Lightbox({ images, index, setIndex, onClose }) {
  const touchStartX = useRef(null);

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length, setIndex],
  );
  const goNext = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length, setIndex],
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, goPrev, goNext]);

  const image = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 sm:p-8 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Proof screenshot viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) (delta > 0 ? goPrev : goNext)();
        touchStartX.current = null;
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 sm:right-6 sm:top-6 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="size-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous screenshot"
        className="absolute left-2 sm:left-6 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <ChevronLeft className="size-6" />
      </button>

      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[88vh] max-w-[88vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next screenshot"
        className="absolute right-2 sm:right-6 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <ChevronRight className="size-6" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium tracking-wide text-white/60">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
}

/**
 * Premium infinite proof-screenshot marquee + click-to-enlarge lightbox.
 * Placed directly below the "Proof Behind Every Number" section copy on
 * Home.jsx — inherits that section's own background/spacing; this
 * component adds no section chrome of its own (no heading, no background
 * color, no captions/labels/buttons on the cards — the screenshots are
 * the only content) so it can't visually alter the section around it.
 * Deliberately full-bleed (see FULL_BLEED_STYLE below): it breaks out of
 * the section's centered `container-narrow` to span the full viewport
 * edge-to-edge, independent of the heading/subtitle above it (which stay
 * inside that same centered container, untouched) — that's what gives
 * the immersive "screenshots flowing off both edges, more always coming"
 * feel instead of a boxed-in gallery.
 *
 * Auto-scroll is driven by a manual requestAnimationFrame loop (not a CSS
 * keyframe animation) specifically so drag/hover/auto-scroll can all
 * share one `offset` value without fighting each other — a CSS animation
 * and a JS-driven drag both trying to own `transform` on the same element
 * is exactly the kind of conflict this site has hit before. The track
 * renders the image list twice back to back; once the offset passes one
 * full set's width it wraps by that width, so the loop has no visible
 * seam no matter how long you watch it. Drifts right-to-left (translateX
 * decreases → content moves left, new cards enter from the right).
 *
 * "Active/adjacent" scale: same rAF loop also measures, every frame, how
 * close each rendered card sits to the track's own horizontal center and
 * applies a continuous scale (1.0 dead-center → MIN_SCALE at the edges)
 * directly to that card's wrapper div. This is layered on top of the
 * exact same drag/auto-scroll mechanics — nothing about navigation,
 * drag behavior, or the auto-drift itself changed, it's a purely visual
 * effect riding along on top of the existing position data.
 */
export function ProofCarousel({ images = DEFAULT_IMAGES }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const setWidthRef = useRef(0);
  const offsetRef = useRef(0);

  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  // Drag-vs-click disambiguation: a plain click is a pointerdown+pointerup
  // with ~zero movement. Only once movement crosses DRAG_THRESHOLD do we
  // commit to "this is a drag" (set isDraggingRef + capture the pointer).
  // Committing to drag-mode immediately on pointerdown — the previous
  // behavior — hijacks the browser's click delivery for every tap, which
  // is exactly why screenshot cards stopped opening.
  const DRAG_THRESHOLD = 6; // px
  const pointerRef = useRef({ id: null, startX: 0, startOffset: 0, captured: false });

  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Measure one full set's width (track holds the list twice) so the
  // offset can wrap seamlessly.
  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [images]);

  // Recomputes each card's center-based scale. Two passes (all reads,
  // then all writes) so this never triggers layout thrashing across the
  // ~16 rendered cards.
  const updateCardScales = () => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    const measurements = cardRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { el, centerX: r.left + r.width / 2, halfWidth: r.width / 2 };
    });

    measurements.forEach((m) => {
      if (!m) return;
      const dist = Math.abs(m.centerX - centerX);
      const range = containerRect.width / 2 + m.halfWidth;
      const t = range > 0 ? Math.min(dist / range, 1) : 0;
      const scale = 1 - t * (1 - MIN_SCALE);
      m.el.style.transform = `scale(${scale})`;
    });
  };

  // Auto-scroll drift loop — skipped entirely under prefers-reduced-motion
  // (drag/manual interaction still works either way). Also drives the
  // continuous active/adjacent card scaling every frame, whether or not
  // the drift itself is currently paused (hover/drag), so scales stay in
  // sync with whatever position the track is actually at.
  useEffect(() => {
    if (reduceMotion) return;
    let raf;
    let last = performance.now();
    // Bumped further: 34 → 46 → 70 → 140 px/sec (2× the previous value,
    // per this request). Still a plain linear px/sec constant (no
    // easing), still wraps seamlessly via the same modulo-offset logic
    // below (no seam/flicker/jump at loop restart), still pauses only on
    // hover/drag (existing interaction, not a "pause between loops").
    // Spacing, card sizes, hover effects, and layout are untouched.
    const SPEED = 140; // px/sec

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!isHoveringRef.current && !isDraggingRef.current && setWidthRef.current > 0) {
        offsetRef.current += SPEED * dt;
        if (offsetRef.current >= setWidthRef.current) {
          offsetRef.current -= setWidthRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
        }
      }
      updateCardScales();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const applyOffset = (next) => {
    const w = setWidthRef.current;
    if (w > 0) {
      next = ((next % w) + w) % w;
    }
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-next}px)`;
    }
    updateCardScales();
  };

  const onPointerDown = (e) => {
    // Only mouse/touch/pen primary buttons; just record where the
    // gesture started — do NOT capture the pointer or mark as dragging
    // yet, so a plain tap/click is left completely alone and reaches the
    // card's onClick normally.
    pointerRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startOffset: offsetRef.current,
      captured: false,
    };
  };
  const onPointerMove = (e) => {
    const p = pointerRef.current;
    if (p.id !== e.pointerId) return;
    const delta = e.clientX - p.startX;
    if (!isDraggingRef.current) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return; // still just a click/tap
      // Movement crossed the threshold — commit to drag mode now.
      isDraggingRef.current = true;
      if (!p.captured) {
        e.currentTarget.setPointerCapture?.(e.pointerId);
        p.captured = true;
      }
    }
    applyOffset(p.startOffset - delta);
  };
  const endDrag = (e) => {
    const p = pointerRef.current;
    if (p.captured && e?.currentTarget?.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(p.id);
      } catch {
        /* noop */
      }
    }
    isDraggingRef.current = false;
    pointerRef.current = { id: null, startX: 0, startOffset: 0, captured: false };
  };

  const openAt = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  // Reduced-motion fallback: a plain, single-set, natively scrollable row
  // (no duplicate list, no auto-drift, no wrap trickery, no continuous
  // center-scale effect) — fully accessible, still lets people browse and
  // click through to enlarge.
  if (reduceMotion) {
    return (
      <>
        <div className="overflow-x-auto" style={FULL_BLEED_STYLE}>
          <div className="flex w-max gap-10">
            {images.map((image, i) => (
              <ProofCard key={image.src} image={image} onClick={() => openAt(i)} reduceMotion />
            ))}
          </div>
        </div>
        {lightboxIndex !== null && (
          <Lightbox images={images} index={lightboxIndex} setIndex={setLightboxIndex} onClose={closeLightbox} />
        )}
      </>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ ...FULL_BLEED_STYLE, touchAction: "pan-y" }}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={(e) => {
          isHoveringRef.current = false;
          endDrag(e);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* Gap increased 32px → 40px (gap-8 → gap-10) so the much larger
            cards still read as comfortably spaced, not crowded. */}
        <div ref={trackRef} className="flex w-max gap-10" style={{ willChange: "transform" }}>
          {[...images, ...images].map((image, i) => (
            <div
              key={`${image.src}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="shrink-0"
              style={{ willChange: "transform" }}
            >
              <ProofCard image={image} onClick={() => openAt(i % images.length)} />
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex} setIndex={setLightboxIndex} onClose={closeLightbox} />
      )}
    </>
  );
}
