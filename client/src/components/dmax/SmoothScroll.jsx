import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global Lenis smooth-scroll. Desktop only (skips on coarse pointer
 * and prefers-reduced-motion).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Pin Lenis's own internal scroll target to exactly 0 the instant it's
    // constructed, synchronously, before its raf loop starts. Lenis reads
    // whatever the native scroll position happens to be at construction
    // time to seed itself — on first load that can briefly disagree with
    // where the page visually is (native scroll restoration, or
    // ScrollToTop's separate effect not having run yet), and Framer
    // Motion's scroll-linked Hero transforms would then animate from that
    // stale seed to the corrected one a frame later, reading as a jump.
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    // Expose the instance so route-change scroll resets (see ScrollToTop.jsx)
    // can tell Lenis to jump too — calling window.scrollTo(0,0) alone would
    // be overwritten on the next animation frame by Lenis's own remembered
    // target, which is what was causing pages to open at the previous
    // scroll position.
    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  return null;
}
