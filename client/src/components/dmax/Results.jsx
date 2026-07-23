import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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

function MetricCard({ m, i, inView, reduceMotion }) {
  const { n, suffix, separator } = parseMetric(m.value);
  const staticNumber = separator ? n.toLocaleString() : String(n);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: reduceMotion ? 0 : i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      // items-center + text-center: the number and label are now
      // horizontally centered on the same axis (they were left-aligned
      // by default, since block-level children stretch full-width and
      // inherit left text-align). justify-start (not justify-center) is
      // kept on the *vertical* axis deliberately: content is anchored to
      // the top of the card's padded box instead of being vertically
      // centered as a block. With justify-center, cards whose label
      // happens to wrap differently end up with a taller/shorter total
      // content block, which shifts that card's *number* up or down
      // relative to the others when centered — exactly the shared-
      // baseline bug fixed last pass. Anchoring from the top keeps every
      // number at the same fixed vertical offset regardless of label
      // wrap, while the new items-center/text-center below fixes today's
      // horizontal-centering complaint independently of that axis.
      // Padding (px-7/8, py-12/14) was already symmetric left/right, so
      // nothing there was actually pushing content off-center — the
      // shift was purely the missing horizontal-centering classes.
      // `group` scopes the hover color-change below to this one card only
      // (Tailwind's group-hover never leaks to sibling cards — each card
      // is its own independent group). The lift/shadow/outline hover
      // behavior stays in styles.css on .metric-column; only the new
      // green number/label colors and the left accent bar are added here.
      className="metric-column group relative flex min-h-[196px] sm:min-h-[212px] lg:min-h-[228px] xl:min-h-[240px] flex-col justify-start items-center text-center gap-4 bg-surface-warm px-7 py-12 md:px-8 md:py-14"
    >
      {/* Minimal left accent bar — hidden at rest (scale-y-0), grows in
          on hover only for this card (group-hover), matching the subtle
          left-border treatment already used elsewhere on the site for
          hover states. Divider lines (the grid's own border/gap system)
          are untouched. */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-center scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
      />
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
          weight. Reduced motion: render the final value directly instead
          of animating the count. Hover: number turns DMAX green, this
          card only (group-hover), 300ms — color is the only thing that
          changes, size/weight/position stay exactly the same. */}
      <div className="text-5xl md:text-6xl xl:text-[4.5rem] font-bold tracking-tight tabular-nums leading-none text-foreground transition-colors duration-300 ease-out group-hover:text-accent">
        {reduceMotion ? staticNumber : inView ? <CountUp end={n} duration={2} separator={separator} /> : 0}
        {suffix}
      </div>
      {/* min-h reserves the same box regardless of whether this label
          wraps to one line or two — that's what keeps every number
          sitting on the exact same baseline across the whole row,
          instead of shifting up/down based on label length. Hover:
          label also turns DMAX green, same 300ms, this card only. */}
      <div className="flex min-h-[2.75rem] items-start text-sm font-medium leading-snug text-muted-foreground transition-colors duration-300 ease-out group-hover:text-accent">
        {m.label}
      </div>
    </motion.div>
  );
}

export function Results({ eyebrow = "Results", title = <>Our Impact</>, metrics = defaultMetrics }) {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();

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
        {/* Heading — now centered horizontally (was left-aligned) and
            given its own fade-up entrance, per the latest brief. Same
            max-w-xl measure for readability, same typography classes,
            same eyebrow/title copy — only alignment and animation
            changed. mx-auto centers the block itself within
            container-narrow; text-center centers the eyebrow/heading
            text inside it. */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl mx-auto text-center"
        >
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] text-balance text-foreground">
            {title}
          </h2>
        </motion.div>

        {/* Six equal-width columns in one premium rounded/bordered
            container. Hairline dividers (both directions) come from the
            grid painting `--color-border` as its own background under a
            1px gap, with every cell painting back over it — cheap and
            perfectly consistent at any column count. No single metric is
            emphasized anymore: every MetricCard renders identically, and
            `.metric-column`'s hover (lift + shadow + outline, see
            styles.css) only ever affects the one column under the
            pointer. Container itself now gets its own subtle fade +
            upward-movement entrance, separate from each card's own
            stagger reveal below. */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`metrics-grid mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 ${desktopCols} gap-px rounded-[22px] border border-border bg-border`}
        >
          {metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} i={i} inView={inView} reduceMotion={reduceMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
