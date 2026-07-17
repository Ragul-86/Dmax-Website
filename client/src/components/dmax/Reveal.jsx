import { motion } from "framer-motion";

/**
 * Shared scroll-reveal wrapper for text-only sections (headings + paragraph
 * blocks). Deliberately simpler than the card-grid stagger reveal — no
 * scale, no stagger delay curve, a single calm easeOut — so section-level
 * copy reads as a distinct, quieter motion language from card reveals,
 * per the site's motion system (cards stagger, sections fade-up).
 */
export function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
