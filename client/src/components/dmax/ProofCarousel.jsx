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
// controls "~3 on desktop / ~2 on tablet / ~1 + peek on mobile", since
// each card's width is auto (driven by its own aspect ratio via
// object-contain), not a fixed grid column.
const CARD_HEIGHT_CLASS = "h-[190px] sm:h-[230px] lg:h-[270px]";

// Full-bleed breakout — the classic "calc(50% - 50vw)" margin trick.
// Unlike the site's usual `-mx-5 md:-mx-8 lg:-mx-12` pattern (which only
// cancels container-x's OWN padding, so content still stops at the
// centered 1200px container's edge), this works from any ancestor width
// and always spans the true viewport edge to edge — which is what "no
// unnecessary gap on wide screens" actually requires here. No horizontal
// padding is added back on top of it: screenshots should be able to
// visually touch the viewport edges as they scroll past, not stop short
// of them. `body { overflow-x: hidden }` (already set sitewide in
// styles.css) absorbs the sub-pixel 100vw-vs-scrollbar rounding some
// browsers introduce, so this never causes page-level horizontal scroll.
const FULL_BLEED_STYLE = { width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" };

function ProofCard({ image, onClick, reduceMotion }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${image.alt} in full size`}
      className={`group relative shrink-0 cursor-pointer pointer-events-auto ${CARD_HEIGHT_CLASS} overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_16px_-4px_rgba(0,0,0,0.06)] ${
        reduceMotion
          ? "hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)]"
          : "transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_10px_28px_-6px_rgba(0,0,0,0.14)]"
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
 * Placed directly below the existing "Proof" section copy in About.jsx —
 * inherits that section's own background/spacing; this component adds no
 * section chrome of its own (no heading, no background color) so it
 * can't visually alter the section around it.
 *
 * Auto-scroll is driven by a manual requestAnimationFrame loop (not a CSS
 * keyframe animation) specifically so drag/hover/auto-scroll can all
 * share one `offset` value without fighting each other — a CSS animation
 * and a JS-driven drag both trying to own `transform` on the same element
 * is exactly the kind of conflict this site has hit before. The track
 * renders the image list twice back to back; once the offset passes one
 * full set's width it wraps by that width, so the loop has no visible
 * seam no matter how long you watch it.
 */
export function ProofCarousel({ images = DEFAULT_IMAGES }) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
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

  // Auto-scroll drift loop — skipped entirely under prefers-reduced-motion
  // (drag/manual interaction still works either way).
  useEffect(() => {
    if (reduceMotion) return;
    let raf;
    let last = performance.now();
    const SPEED = 34; // px/sec — slow, calm drift

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
  // (no duplicate list, no auto-drift, no wrap trickery) — fully
  // accessible, still lets people browse and click through to enlarge.
  if (reduceMotion) {
    return (
      <>
        <div className="overflow-x-auto" style={FULL_BLEED_STYLE}>
          <div className="flex w-max gap-6">
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
        <div ref={trackRef} className="flex w-max gap-6" style={{ willChange: "transform" }}>
          {[...images, ...images].map((image, i) => (
            <ProofCard
              key={`${image.src}-${i}`}
              image={image}
              onClick={() => openAt(i % images.length)}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex} setIndex={setLightboxIndex} onClose={closeLightbox} />
      )}
    </>
  );
}
