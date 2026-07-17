import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to the very top on every route change (navbar links, CTA
 * buttons, any <Link>/navigate() call) — regardless of where the previous
 * page was scrolled to. Runs before paint (useLayoutEffect) so the new
 * page never flashes at the old scroll position first.
 *
 * Deliberately keyed on `pathname` only (not `hash`) — same-page hash
 * anchors (e.g. clicking "#process" while already on /process) don't
 * change the pathname, so this effect never re-fires for them and native
 * browser anchor scrolling keeps working exactly as before, untouched.
 *
 * If a route change lands with a hash already attached (e.g. a cross-page
 * link to "/faq#featured-insights"), that hash is read from the render
 * closure and used to scroll to the target section instead of the top —
 * retried across a few frames in case the destination is still mounting
 * (lazy-loaded route chunk), falling back to top if it never appears.
 *
 * When Lenis smooth-scroll is active (desktop, no reduced-motion), a plain
 * window.scrollTo(0,0) gets overwritten on the next frame by Lenis's own
 * remembered scroll target. Telling Lenis itself to jump — immediately,
 * no animation — fixes that. Falls back to window.scrollTo for
 * mobile/tablet and reduced-motion, where Lenis never mounts.
 */
export function ScrollToTop() {
  const location = useLocation();
  const { pathname } = location;

  useLayoutEffect(() => {
    const scrollTop = () => {
      const lenis = typeof window !== "undefined" ? window.__lenis : null;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      if (typeof window !== "undefined") window.scrollTo(0, 0);
    };

    const hash = location.hash;
    if (!hash) {
      scrollTop();
      return;
    }

    const id = hash.slice(1);
    let raf;
    let attempts = 0;
    const tryScrollToHash = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < 30) {
        raf = requestAnimationFrame(tryScrollToHash);
      } else {
        scrollTop();
      }
    };
    raf = requestAnimationFrame(tryScrollToHash);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
