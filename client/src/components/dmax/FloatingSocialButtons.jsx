import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/social";

// "Fade in after approximately 600–800px of scrolling" — 700 is the
// midpoint of that range. Same threshold governs fading back out on the
// way back to the top (it's a live scroll-position check, not a one-time
// reveal), so scrolling up past this point hides the widget again.
const SHOW_AFTER_PX = 700;

// Rough footprint (offset-from-bottom + button stack + container padding)
// the widget reserves at its largest (desktop) size. Used only to decide
// *whether* the shared <footer> is starting to intrude on that zone —
// doesn't need to be pixel-exact per breakpoint, just generous enough
// that the lift kicks in slightly before any real visual overlap.
const WIDGET_RESERVE_PX = 220;
const FOOTER_CLEARANCE_PX = 24;

/**
 * Sitewide floating social widget — no surrounding glass pill/capsule
 * anymore (that container, its border, and its backdrop blur were
 * removed per request); just two independent circular buttons in their
 * official brand colors (Instagram gradient, LinkedIn blue #0A66C2) with
 * the real lucide Instagram/Linkedin glyphs in white — brand colors are
 * on the button fill, the icons themselves are untouched/unrecolored line
 * art. Mounted once in App.jsx so it persists across every page.
 *
 * The outer <motion.div> below is now purely a positioning/animation
 * coordinator — no background, border, blur, radius, or shadow of its
 * own — so both buttons still show/hide and lift together as one unit
 * without any visible "container" around them. Each button carries its
 * own premium shadow independently.
 *
 * Hidden at page load; appears once the user has scrolled ~700px, and
 * hides again on the way back to the top (see SHOW_AFTER_PX). Also lifts
 * itself out of the way if the shared <footer> starts intruding into its
 * resting zone — found via a plain `document.querySelector("footer")`
 * rather than any prop/context, so no other component needs to change for
 * this to work. Both checks run off a single rAF-throttled scroll/resize
 * listener rather than per-frame work, so there's no unnecessary
 * re-rendering while the user scrolls normally.
 *
 * Only transform/opacity/box-shadow are ever animated (no layout
 * properties), and everything here is a one-shot transition driven by
 * scroll position or hover/tap — nothing loops continuously.
 */
const items = [
  {
    key: "instagram",
    href: SOCIAL_LINKS.instagram,
    label: "DMAX on Instagram",
    Icon: Instagram,
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  },
  {
    key: "linkedin",
    href: SOCIAL_LINKS.linkedin,
    label: "DMAX on LinkedIn",
    Icon: Linkedin,
    background: "#0A66C2",
  },
];

export function FloatingSocialButtons() {
  const [visible, setVisible] = useState(false);
  const [lift, setLift] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);

      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const restingTop = window.innerHeight - WIDGET_RESERVE_PX;
        const overlap = restingTop - footerTop;
        setLift(overlap > 0 ? overlap + FOOTER_CLEARANCE_PX : 0);
      } else {
        setLift(0);
      }
    };

    const onScrollOrResize = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        measure();
        frameRef.current = null;
      });
    };

    measure();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <motion.div
      aria-hidden={!visible}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? -lift : 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="fixed z-30 flex flex-col items-center gap-4 right-5 bottom-5 sm:right-6 sm:bottom-6 lg:right-8 lg:bottom-8 xl:right-10 xl:bottom-10"
    >
      {items.map(({ key, href, label, Icon, background }) => (
        <motion.a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          tabIndex={visible ? 0 : -1}
          whileHover={{ scale: 1.08, y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.15, ease: "easeOut" } }}
          style={{ background }}
          className="transform-gpu flex size-[52px] sm:size-14 lg:size-[60px] xl:size-16 items-center justify-center rounded-full text-white shadow-[0_12px_32px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-shadow duration-[220ms] ease-out hover:shadow-[0_16px_40px_rgba(0,0,0,0.24)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          <Icon className="size-[22px] sm:size-6 lg:size-[26px] xl:size-7" />
        </motion.a>
      ))}
    </motion.div>
  );
}
