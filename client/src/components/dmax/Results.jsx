import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const defaultMetrics = [
  { n: 50, suffix: "+", v: "Businesses Helped" },
];

function parseMetric(value) {
  // Accepts values like "50+", "1,000+", "15+" and splits into a CountUp-able
  // number plus the exact suffix (including separators) for verbatim display.
  const match = String(value).match(/^([\d,]+)(.*)$/);
  if (!match) return { n: 0, suffix: value, separator: "" };
  const [, digits, suffix] = match;
  const hasComma = digits.includes(",");
  return { n: parseInt(digits.replace(/,/g, ""), 10), suffix, separator: hasComma ? "," : "" };
}

function MetricCard({ m, i, inView, emphasized }) {
  const { n, suffix, separator } = parseMetric(m.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-center gap-3 bg-background px-7 py-12 md:px-8 md:py-14 transition-colors duration-300 hover:bg-secondary/30"
    >
      {/* Accent bar — always on for the one emphasized metric, reveals on
          hover for every other one. */}
      <span
        className={`pointer-events-none absolute top-0 left-0 right-0 h-[2px] origin-left bg-accent transition-transform duration-300 ease-out ${
          emphasized ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />

      <div
        className="text-6xl md:text-7xl xl:text-[5rem] font-bold tracking-tight tabular-nums leading-none"
        style={{ color: emphasized ? "var(--accent)" : "var(--color-foreground)" }}
      >
        {inView ? <CountUp end={n} duration={2.2} separator={separator} /> : 0}
        {suffix}
      </div>
      <div className="text-sm font-medium leading-snug text-muted-foreground">{m.label}</div>
    </motion.div>
  );
}

export function Results({ eyebrow = "Results", title = <>Our Impact</>, metrics = defaultMetrics }) {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-10%" });

  // 1 col mobile → 3 cols tablet (sm+) → N cols desktop (xl+, 1280px). The
  // grid itself paints the border color as its background with a 1px gap,
  // and every cell paints over it with the page background — that produces
  // perfect hairline dividers between cells at any column count or wrap
  // point, on every breakpoint, without any fragile per-index border logic.
  const desktopCols =
    metrics.length >= 6
      ? "xl:grid-cols-6"
      : metrics.length === 5
        ? "xl:grid-cols-5"
        : "xl:grid-cols-4";

  return (
    <section id="results" className="py-20 md:py-28 lg:py-36 bg-background">
      <div className="container-x">
        {/* Larger, more confident heading — this section needs to
            establish trust and authority immediately, not read as a
            minor stat strip. */}
        <div className="max-w-xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] text-balance text-foreground">
            {title}
          </h2>
        </div>

        <div
          ref={gridRef}
          className={`mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-3 ${desktopCols} gap-px rounded-[22px] border border-border bg-border overflow-hidden`}
        >
          {metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} i={i} inView={inView} emphasized={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
