import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const quotes = [
  { q: "Within 30 days we received a qualified inbound lead and converted a Rs.40,000 MEP course sale — with zero paid ads.", a: "Maven Centre of Excellence", r: "Education · MEP Training" },
  { q: "Three serious consulting inquiries within 50 days. One converted into a Rs.5,00,000 engagement.", a: "Excite Growth Partner", r: "Consulting" },
  { q: "8 corporate training leads from LinkedIn in 70 days. Closed 2 programs worth Rs.60,000 each.", a: "Corporate Trainer & Facilitator", r: "Training" },
];

// Parallax speeds — front 100%, middle 80%, back 60%
const speeds = [60, 30, 10];

export function Testimonials() {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-secondary/40 border-y border-border overflow-hidden">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">05 — Testimonials</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Coaches & founders who <span className="text-accent">get chosen</span>.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {quotes.map((t, i) => (
            <ParallaxCard key={t.a} t={t} speed={speeds[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({ t, speed, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.figure
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      className="card-lift rounded-3xl bg-card border border-border p-8 shadow-card"
    >
      <div className="text-accent text-2xl leading-none">"</div>
      <blockquote className="mt-3 text-base leading-relaxed text-foreground">{t.q}</blockquote>
      <figcaption className="mt-6 pt-6 border-t border-border">
        <div className="text-sm font-semibold">{t.a}</div>
        <div className="text-xs text-muted-foreground">{t.r}</div>
      </figcaption>
    </motion.figure>
  );
}
