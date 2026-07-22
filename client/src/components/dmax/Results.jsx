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
      className="metric-column relative flex min-h-[196px] sm:min-h-[212px] lg:min-h-[228px] xl:min-h-[240px] flex-col justify-center gap-4 bg-surface-warm px-7 py-12 md:px-8 md:py-14"
    >
      {/* Number and suffix ("+", "%", "L") as a single typographic unit:
          no wrapping span around either one, no flex container, no
          vertical-align/transform/relative-positioning override. This is
          the minimum possible markup — react-countup's own rendered
          output and the suffix text sit as plain siblings inside one
          block, inheriting the exact same font-size/line-height/weight/
          color from this div, so there is nothing left that could shift
          one out of line with the other. Every metric (100+, 150+, 280+,
          5+, 10L, 26%) now shares identical color/weight/size too — no
          card is singled out, so every value carries equal visual
          weight. */}
      <div className="text-5xl md:text-6xl xl:text-[4.5rem] font-bold tracking-tight tabular-nums leading-none text-foreground">
        {inView ? <CountUp end={n} duration={2.2} separator={separator} /> : 0}
        {suffix}
      </div>
      {/* min-h reserves the same box regardless of whether this label
          wraps to one line or two — that's what keeps every number
          sitting on the exact same baseline across the whole row,
          instead of shifting up/down based on label length. */}
      <div className="flex min-h-[2.75rem] items-start text-sm font-medium leading-snug text-muted-foreground">
        {m.label}
      </div>
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
    // bg-surface-warm — the "Results/Proof" step of the locked sitewide
    // background rhythm, right after the Deep Black Method section.
    <section id="results" className="py-20 md:py-28 lg:py-36 bg-surface-warm">
      <div className="container-narrow">
        {/* Left-aligned intro — the metrics container below stays
            centered as a whole (it's the full width of container-narrow,
            same as the heading's own left edge), but the heading itself
            reads left-to-right like a normal editorial lead-in rather
            than a centered banner. */}
        <div className="max-w-xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] text-balance text-foreground">
            {title}
          </h2>
        </div>

        {/* Six equal-width columns in one premium rounded/bordered
            container. Hairline dividers (both directions) come from the
            grid painting `--color-border` as its own background under a
            1px gap, with every cell painting back over it — cheap and
            perfectly consistent at any column count. No single metric is
            emphasized anymore: every MetricCard renders identically, and
            `.metric-column`'s hover (lift + shadow + outline, see
            styles.css) only ever affects the one column under the
            pointer. */}
        <div
          ref={gridRef}
          className={`metrics-grid mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 ${desktopCols} gap-px rounded-[22px] border border-border bg-border`}
        >
          {metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
