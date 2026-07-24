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
  // Opt-in only — used exclusively by Home.jsx's "Our Method" instance to
  // satisfy the locked background-rhythm's "Method = Deep Black" step
  // (Apple-keynote-style dark section). About.jsx and ProcessPage.jsx both
  // call <Process /> without this prop, so their light styling is
  // completely unaffected. Inline styles (not classes) are used for every
  // color override below so they always win regardless of the shared
  // .card-process / .eyebrow / .h2-section rule order.
  dark = false,
  // Opt-in only — used exclusively by ProcessPage.jsx, which renders its
  // own "Every Business Has a Growth Bottleneck." heading/subheading
  // directly above this component (with eyebrow/title left null there)
  // and wants that heading to read as this timeline's intro rather than
  // a separate section. Drops this section's own top padding and shrinks
  // the gap before the timeline (mt-16 → responsive 24/32/32px); the rest
  // of the ~56-80px total gap comes from ProcessPage's own reduced bottom
  // padding on that preceding section. Home.jsx's and About.jsx's
  // <Process /> usages don't pass this, so their spacing is unchanged.
  tightTop = false,
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
    <section
      id="process"
      // Padding: tightTop (ProcessPage.jsx only) and the dark-only py
      // below (Home.jsx's "Our Method." instance) are both opt-in and
      // mutually exclusive in practice — About.jsx passes neither prop,
      // so its spacing is completely unaffected either way. This section
      // and the full-bleed photo section before it on Home.jsx are two
      // fully independent <section> elements; this top padding
      // (pt-20/28/36, the sitewide standard) is now chosen purely on
      // this section's own merit as a self-contained chapter, not
      // balanced or coordinated against the previous section's own
      // bottom padding — each section owns its own spacing. Bottom
      // padding (pb-16/20/24) is unrelated to this and stays as-is; it
      // exists to keep the Warm White "Results" section right after this
      // one from reading as an oversized gap, which is a separate,
      // still-valid fix from the earlier spacing audit.
      className={`${
        tightTop
          ? "pt-0 pb-20 md:pb-28 lg:pb-36"
          : dark
            ? "pt-20 md:pt-28 lg:pt-36 pb-16 md:pb-20 lg:pb-24"
            : "py-20 md:py-28 lg:py-36"
      } scroll-mt-24 ${dark ? "method-section bg-deep-black border-t border-white/10" : ""}`}
    >
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="eyebrow" style={dark ? { color: "rgba(255,255,255,0.55)" } : undefined}>
              {eyebrow}
            </p>
          )}
          {title && (
            <h2
              className="mt-4 h2-section text-balance"
              style={dark ? { color: "#FFFFFF" } : undefined}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={`mx-auto mt-5 max-w-2xl text-lg ${dark ? "" : "text-muted-foreground"}`}
              style={dark ? { color: "rgba(255,255,255,0.72)" } : undefined}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div ref={ref} className={`relative ${tightTop ? "mt-6 md:mt-8 lg:mt-8" : "mt-16"}`}>
          {/* Progress line — vertical on mobile, horizontal from lg */}
          <div
            className={`absolute lg:top-6 lg:left-0 lg:right-0 lg:h-[2px] left-6 top-0 bottom-0 w-[2px] lg:w-auto ${dark ? "bg-white/15" : "bg-border"}`}
          />
          <motion.div
            style={{ scaleX: lineScale, scaleY: lineScale }}
            className="absolute lg:top-6 lg:left-0 lg:right-0 lg:h-[2px] lg:origin-left left-6 top-0 bottom-0 w-[2px] lg:w-auto bg-accent origin-top lg:scale-y-100"
          />

          <ol className={`relative grid ${gridColsClass} gap-6 lg:pt-12 pl-14 lg:pl-0`}>
            {steps.map((s, i) => {
              const start = i / steps.length;
              const end = (i + 0.5) / steps.length;
              return (
                <Step key={s.n} s={s} i={i} start={start} end={end} progress={scrollYProgress} dark={dark} />
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ s, i, start, end, progress, dark }) {
  const opacity = useTransform(progress, [start, end], [0.4, 1]);
  const dotOpacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.li
      style={{
        opacity,
        // .card-process's background/border come from a plain CSS rule
        // (var(--color-card) / var(--color-border)), tuned for the site's
        // light theme. Inline styles override that unconditionally without
        // touching the shared class — so About/ProcessPage's usages (dark
        // never passed) are byte-for-byte unaffected.
        ...(dark && { background: "var(--charcoal)", borderColor: "rgba(255,255,255,0.1)" }),
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-process relative"
    >
      {/* Step dot — fills with accent as progress crosses it, visually
          reinforcing the connecting line drawn between steps above. */}
      <span
        className={`absolute -left-[3.25rem] top-8 lg:left-1/2 lg:-top-[1.85rem] lg:-translate-x-1/2 size-4 rounded-full ring-4 overflow-hidden ${
          dark ? "ring-deep-black border border-white/15 bg-white/10" : "ring-background border border-border bg-muted"
        }`}
      >
        <motion.span
          style={{ opacity: dotOpacity }}
          className="absolute inset-0 bg-accent rounded-full"
        />
      </span>
      <div className="text-xs font-semibold text-accent">{s.n}</div>
      <div className="mt-3 text-2xl font-semibold" style={dark ? { color: "#FFFFFF" } : undefined}>
        {s.t}
      </div>
      <p
        className={`mt-3 text-base leading-relaxed ${dark ? "" : "text-muted-foreground"}`}
        style={dark ? { color: "rgba(255,255,255,0.68)" } : undefined}
      >
        {s.d}
      </p>
    </motion.li>
  );
}
