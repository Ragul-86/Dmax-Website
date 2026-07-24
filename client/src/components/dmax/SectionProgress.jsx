import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Sitewide "section progress" indicator — used on every major section
 * across Home, Solutions, Method, Insights, About, and Contact.
 *
 * Deliberately NOT a border or card outline: just one thin (2px, fully
 * rounded) hairline sitting a little above the section's own bottom edge.
 * Transparent at rest. The instant a section becomes the one crossing the
 * vertical center of the viewport, the line draws in left-to-right
 * (700-900ms, ease-out, transform-origin: left) and lights up DMAX green
 * with a soft glow — never neon, never flashing. The moment the NEXT
 * section takes over the center, this line fades back to transparent
 * (a quicker, separate fade) while the next section's own line starts
 * drawing in. Only one line is ever active at a time.
 *
 * "Active" is intentionally defined as "this section currently owns the
 * viewport's vertical center" (an IntersectionObserver with a thin
 * center-band rootMargin), not "any part of the section is visible" —
 * the latter would light up several tall sections at once. Because only
 * one section's bounds can contain that center line at any moment, the
 * "only one active at a time" requirement falls out of the geometry
 * itself rather than needing a shared cross-component scroll-spy store.
 *
 * Usage: swap the section's own `<section className="...">…</section>`
 * for `<SectionProgress className="...">…</SectionProgress>` — or
 * `as="header"` for the page-hero elements that use a <header> tag. Every
 * other prop (id, style, etc.) and all children pass straight through;
 * this only adds the ref, the observer, and the line.
 */
export function SectionProgress({ as: Tag = "section", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    // rootMargin shrinks the observer's effective viewport to a thin
    // horizontal band across the vertical center (-45% off the top AND
    // bottom leaves a 10%-tall strip in the middle) — a section is only
    // "intersecting" while it physically spans that center strip, which
    // is what makes single-active-section behavior automatic.
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`relative ${className}`} {...rest}>
      {children}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 md:inset-x-10 bottom-4 md:bottom-6 h-[2px] rounded-full"
        style={{ background: "var(--color-accent)", transformOrigin: "left" }}
        initial={false}
        animate={
          isActive
            ? { scaleX: 1, opacity: 1, boxShadow: "0 0 10px 1px rgba(57,230,0,0.45)" }
            : { scaleX: 0, opacity: 0, boxShadow: "0 0 0 0 rgba(57,230,0,0)" }
        }
        transition={
          isActive
            ? { duration: 0.8, ease: "easeOut" }
            : { duration: 0.35, ease: "easeOut" }
        }
      />
    </Tag>
  );
}
