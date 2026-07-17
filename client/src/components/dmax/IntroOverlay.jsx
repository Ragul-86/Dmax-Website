import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/dmax-logo-official.png";

/**
 * Cinematic page-load sequence (~1.6s). Skips on reduced-motion
 * and after the first session visit.
 */
export function IntroOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("dmax-intro-seen");
    if (reduce || seen) return;
    setShow(true);
    const t = window.setTimeout(() => {
      sessionStorage.setItem("dmax-intro-seen", "1");
      setShow(false);
    }, 1700);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-0 z-[60] bg-background grid place-items-center"
        >
          <motion.img
            src={logo}
            alt="DMAX"
            initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="h-10 md:h-12 w-auto"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
