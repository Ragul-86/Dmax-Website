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

function MetricCard({ m, i, inView }) {
  const { n, suffix, separator } = parseMetric(m.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-center gap-2 bg-background px-6 py-9 md:px-7 md:py-10 transition-colors duration-300 hover:bg-secondary/30"
    >
      {/* Accent bar — reveals on hover instead of a heavy card lift/shadow */}
      <span className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />

      <div className="text-4xl md:text-5xl xl:text-[3.25rem] font-bold tracking-tight tabular-nums leading-none text-foreground transition-colors duration-300 group-hover:text-accent">
        {inView ? <CountUp end={n} duration={2.2} separator={separator} /> : 0}
        {suffix}
      </div>
      <div className="text-[0.8rem] font-medium leading-snug text-muted-foreground">{m.label}</div>
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
    <section id="results" className="py-16 md:py-20 lg:py-28 bg-background">
      <div className="container-x">
        {/* Restrained heading — a stat strip earns its authority from the
            numbers, not from a full-weight section headline. */}
        <div className="max-w-xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight leading-[1.2] text-balance text-foreground">
            {title}
          </h2>
        </div>

        <div
          ref={gridRef}
          className={`mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 ${desktopCols} gap-px rounded-[22px] border border-border bg-border overflow-hidden`}
        >
          {metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
