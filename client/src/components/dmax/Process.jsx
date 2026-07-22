import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const defaultSteps = [
  { n: "01", t: "Strategy Session", d: "Understand your business, audience, offer, and goals." },
  { n: "02", t: "Authority Positioning", d: "Optimize your profile and messaging so you're seen as the obvious choice." },
  { n: "03", t: "Content Engine", d: "Develop and publish content that builds trust with your ideal clients." },
  { n: "04", t: "Lead Capture", d: "Create lead magnets, landing pages, and automated nurturing systems." },
  { n: "05", t: "Appointment System", d: "Turn interested prospects into qualified sales conversations." },
  { n: "06", t: "Optimize & Scale", d: "Measure, improve, and compound results every month." },
];

export function Process({
  eyebrow = "Process",
  title = (
    <>
      How We Build Your <span className="text-accent">Revenue System</span>.
    </>
  ),
  subtitle,
  steps = defaultSteps,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Responsive column count is driven by how many steps this instance
  // renders — 5-step (Home) and 6-step (Process page) frameworks each
  // get their own explicit breakpoints so desktop always fits every
  // card on one row, tablet shows 2–3 per row, and mobile stacks to 1.
  const gridColsClass =
    steps.length === 5
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      : steps.length === 6
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section id="process" className="py-20 md:py-28 lg:py-36 scroll-mt-24">
      <div className="container-x">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <h2 className="mt-4 h2-section text-balance">{title}</h2>}
          {subtitle && <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
        </div>

        <div ref={ref} className="relative mt-16">
          {/* Progress line — vertical on mobile, horizontal from lg */}
          <div className="absolute lg:top-6 lg:left-0 lg:right-0 lg:h-[2px] left-6 top-0 bottom-0 w-[2px] lg:w-auto bg-border" />
          <motion.div
            style={{ scaleX: lineScale, scaleY: lineScale }}
            className="absolute lg:top-6 lg:left-0 lg:right-0 lg:h-[2px] lg:origin-left left-6 top-0 bottom-0 w-[2px] lg:w-auto bg-accent origin-top lg:scale-y-100"
          />

          <ol className={`relative grid ${gridColsClass} gap-5 lg:pt-12 pl-14 lg:pl-0`}>
            {steps.map((s, i) => {
              const start = i / steps.length;
              const end = (i + 0.5) / steps.length;
              return <Step key={s.n} s={s} i={i} start={start} end={end} progress={scrollYProgress} />;
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ s, i, start, end, progress }) {
  const opacity = useTransform(progress, [start, end], [0.4, 1]);
  const dotOpacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.li
      style={{ opacity }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-process relative"
    >
      {/* Step dot — fills with accent as progress crosses it, visually
          reinforcing the connecting line drawn between steps above. */}
      <span className="absolute -left-[3.25rem] top-8 lg:left-1/2 lg:-top-[1.85rem] lg:-translate-x-1/2 size-4 rounded-full ring-4 ring-background border border-border bg-muted overflow-hidden">
        <motion.span
          style={{ opacity: dotOpacity }}
          className="absolute inset-0 bg-accent rounded-full"
        />
      </span>
      <div className="text-xs font-semibold text-accent">{s.n}</div>
      <div className="mt-3 text-2xl font-semibold">{s.t}</div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
    </motion.li>
  );
}
