import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/dmax/Navbar";
import { Contact } from "@/components/dmax/Contact";
import { Footer } from "@/components/dmax/Footer";
import { Reveal } from "@/components/dmax/Reveal";

// "Book Your Strategy Session" hero — right-column card. This exact list
// (and the CTA/secondary copy below) was given verbatim in the brief as
// the card's required content; "Book Your Strategy Session" as the CTA
// label reuses this page's own eyebrow text rather than inventing a new
// phrase.
const sessionIncludes = [
  "45 Minute Strategy Session",
  "Growth Bottleneck Assessment™",
  "Personalized Recommendations",
  "Opportunity Roadmap",
  "Live Q&A",
  "Online Meeting",
];

function StrategySessionCard() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-border bg-card p-10 md:p-12 shadow-elevation transition-transform duration-300 ease-out hover:-translate-y-2">
      <span aria-hidden className="absolute inset-x-10 top-0 h-[2px] rounded-full bg-accent/40" />
      <ul className="space-y-4">
        {sessionIncludes.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <Check className="size-5 shrink-0 text-accent" />
            <span className="text-base font-medium text-foreground">{item}</span>
          </li>
        ))}
      </ul>
      <a href="#contact" className="group btn-primary mt-9 w-full">
        Book Your Strategy Session
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
      <p className="mt-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        No obligation • Complimentary
      </p>
    </div>
  );
}

// "What You'll Leave With" — editorial timeline. Titles are the
// meaning-preserving rewrite of the original leaveWith list given
// verbatim in the brief (e.g. "A complimentary Growth Bottleneck
// Assessment™" → "Growth Bottleneck Assessment™"), used exactly as
// specified rather than the original wording.
const leaveWithTimeline = [
  { n: "01", t: "Growth Bottleneck Assessment™" },
  { n: "02", t: "Your biggest growth constraint, clearly identified." },
  { n: "03", t: "A prioritized roadmap for predictable growth." },
  { n: "04", t: "Practical next steps you can implement immediately." },
];

function TimelineDivider({ delay }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-px w-full origin-left bg-border"
    />
  );
}

function LeaveWithTimeline() {
  return (
    <div className="mt-14 md:mt-16">
      <TimelineDivider delay={0} />
      {leaveWithTimeline.map((item, i) => (
        <div key={item.n}>
          {/* Fixed number column (90px mobile, 100px md+) + a flexible
              title column, identical on every row, so every number is
              right-aligned to the same edge and every title starts at
              the exact same X position — a CSS-grid column, not a
              centered flex row, is what actually guarantees that. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-[90px_1fr] items-center gap-x-8 py-8 md:grid-cols-[100px_1fr] md:gap-x-10 md:py-10"
          >
            <span className="text-right text-4xl font-bold leading-none tracking-tight tabular-nums text-muted-foreground md:text-5xl lg:text-6xl">
              {item.n}
            </span>
            <p className="text-left text-lg font-medium leading-snug text-balance text-foreground md:text-xl lg:text-2xl">
              {item.t}
            </p>
          </motion.div>
          <TimelineDivider delay={i * 0.12 + 0.1} />
        </div>
      ))}
    </div>
  );
}

const rightForYou = [
  "Expand into international markets.",
  "Build a consistent flow of qualified discovery calls for your coaching or consulting business.",
  "Create a predictable revenue pipeline for your B2B business.",
  "Reduce dependence on referrals.",
  "Strengthen your positioning and become the obvious choice in your market.",
];

const sessionSteps = [
  { t: "Understand Your Business", d: "We'll begin by understanding your business model, growth goals, target market, and current challenges." },
  { t: "Conduct Your Growth Bottleneck Assessment™", d: "Using the DMAX Method™, we'll evaluate your business across five critical stages: Market Position → Market Visibility → Market Trust → Qualified Conversations → Predictable Revenue." },
  { t: "Identify Your Highest-Impact Opportunity", d: "Together, we'll identify the one area that will have the greatest impact on your growth if improved first." },
  { t: "Build Your Growth Roadmap", d: "You'll leave with clear priorities and practical recommendations tailored to your business." },
];

const whyBookQuestions = [
  "Why aren't we attracting enough qualified opportunities?",
  "Why does our growth still depend on referrals?",
  "Why aren't qualified prospects booking discovery calls consistently?",
  "Why are competitors winning opportunities we should be winning?",
  "What should we improve first to create the biggest business impact?",
];

// "Who We Work With" — editorial rows. Titles are the original five
// audience names, unchanged; each description is new one-line copy given
// verbatim in the brief (not present in the original list, which had no
// per-audience description at all).
const whoWeWorkWith = [
  {
    title: "Manufacturing & Export Businesses",
    desc: "Helping manufacturers become the obvious choice before international buyers start comparing suppliers.",
  },
  {
    title: "Business Coaches & Consultants",
    desc: "Build authority before prospects ever book a discovery call.",
  },
  {
    title: "B2B Service Businesses",
    desc: "Create predictable opportunities instead of unpredictable referrals.",
  },
  { title: "Agencies", desc: "Become the trusted expert clients remember first." },
  {
    title: "Professional Service Firms",
    desc: "Strengthen credibility before the first conversation begins.",
  },
];

export default function ContactPage() {
  useEffect(() => {
    document.title = "Book Your Strategy Session — DMAX";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      {/* Hero — replaces the old narrow centered header. Full-width
          1400px stage, 55/45 editorial split instead of a centered
          column: left keeps the exact same six sentences (regrouped into
          supporting copy → key benefit statement → session details),
          right is a premium assessment card. Warm White background with
          a very faint radial glow behind the card (same ambient-green
          radial-gradient technique as Hero.jsx's .scene, just much
          fainter and confined near the card). */}
      <header className="relative overflow-hidden bg-surface-warm pt-32 md:pt-36 lg:pt-40 pb-20 md:pb-24 lg:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 78% 45%, rgba(56,224,0,0.07), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-20">
          <div className="grid lg:grid-cols-[55fr_45fr] gap-x-14 xl:gap-x-20 gap-y-14 items-center">
            <Reveal>
              <p className="eyebrow">Book Your Strategy Session</p>
              <h1 className="mt-5 text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] font-extrabold leading-[0.98] tracking-tight text-balance text-foreground">
                Includes Your Complimentary{" "}
                <span className="text-accent">Growth Bottleneck Assessment™</span>
              </h1>

              <div className="mt-8 space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Every business reaches a point where working harder no longer creates better
                  results. More marketing isn't always the answer. More sales activity isn't
                  always the answer.
                </p>
                <p className="text-xl font-bold text-foreground text-balance">
                  The first step is understanding what's actually limiting your growth.
                </p>
                <p>
                  In this 45-minute strategy session, we'll evaluate your business using the
                  DMAX Method™ and identify the biggest opportunity to create more qualified
                  conversations and more predictable revenue.
                </p>
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                45 Minutes • Online • By Application
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <StrategySessionCard />
            </Reveal>
          </div>
        </div>
      </header>

      {/* Premium editorial spacer — Warm White → Light Gray transition
          (outgoing header's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-warm" />

      {/* What You'll Leave With — "Why Contact DMAX" step of the locked
          background rhythm: Very Light Gray (was Warm White, so it no
          longer repeats the Hero's color). Premium editorial timeline
          instead of a centered heading + bullet list: eyebrow → heading
          → four numbered items divided by animated thin lines → closing
          statement. No cards, icons, bullets, or green (per the brief's
          own "don't overuse green" note). Titles and the heading/
          closing statement are the meaning-preserving rewrite given
          verbatim in the brief, not the original wording — see
          leaveWithTimeline above for the mapping back to the original
          copy. Vertical spacing increased slightly (py-20/28/36 →
          py-24/32/40) per the new spec. */}
      <section className="py-24 md:py-32 lg:py-40 bg-surface-gray border-y border-border">
        <div className="container-narrow">
          <div className="mx-auto max-w-[950px]">
            <Reveal className="text-center">
              <p className="eyebrow">What You'll Leave With</p>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-balance text-foreground md:text-5xl lg:text-[3.25rem]">
                Not another marketing presentation.
              </h2>
            </Reveal>

            <LeaveWithTimeline />
          </div>

          {/* Closing statement gets its own wider ~1100px measure
              (independent of the 950px column above) plus a fluid
              clamp() size, specifically so "You'll leave with clarity—
              whether we work together or not." can stay on one line on
              desktop (lg:whitespace-nowrap) without wrapping — while
              still wrapping normally on tablet/mobile, where nowrap is
              not applied. */}
          <Reveal delay={0.15} className="mt-14 md:mt-16">
            <p className="mx-auto max-w-[1100px] text-center text-[clamp(1.5rem,1.1rem+1.4vw,1.75rem)] font-bold leading-snug tracking-tight text-balance text-foreground lg:whitespace-nowrap">
              You'll leave with clarity—whether we work together or not.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Premium editorial spacer — Light Gray → White transition
          (outgoing "What You'll Leave With" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-gray" />

      {/* Is This Strategy Session Right for You? — White step */}
      <section className="py-20 md:py-28 lg:py-36">
        <Reveal className="container-narrow mx-auto max-w-3xl text-center">
          <h2 className="h2-section text-balance">Is This Strategy Session Right for You?</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            This session is designed for founders and business leaders who want to grow with
            intention—not guesswork. It's especially valuable if you're trying to:
          </p>
          <ul className="mx-auto mt-6 max-w-lg space-y-3 text-left text-lg">
            {rightForYou.map((l) => (
              <li key={l} className="flex items-start gap-3">
                <span className="mt-2.5 size-1.5 rounded-full bg-accent shrink-0" />
                {l}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted-foreground">
            If you're looking for shortcuts or overnight success, we're probably not the right
            partner.
          </p>
        </Reveal>
      </section>

      {/* Premium editorial spacer — White → Light Gray transition
          (outgoing "Is This Strategy Session Right for You?" section's
          own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      {/* What Happens During the Session? — Gray step */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-gray border-y border-border">
        <div className="container-narrow">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="h2-section text-balance">What Happens During the Session?</h2>
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessionSteps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
                className="card-lift flex flex-col rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card"
              >
                <div className="text-xs font-semibold text-accent">0{i + 1}</div>
                <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium editorial spacer — Light Gray → White transition
          (outgoing "What Happens During the Session?" section's own
          background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-gray" />

      {/* Why Business Leaders Book This Session — White step. Wide
          editorial split (max-w-[1450px], own gutter, not container-
          narrow) instead of a narrow centered column: left (32%) heading
          + intro line, right (68%) the five questions as a plain
          divided list — no bullets, no cards, no heavy borders, just
          thin full-width dividers and a subtle hover color shift. Closing
          statement spans the full wide container, centered, above a thin
          divider, with more weight/spacing for emphasis.
          One-line-on-desktop fix: container widened 1350px→1450px (inside
          the requested 1400-1500px range) and the column split moved from
          40/60 to 32/68 in the right column's favor — switched from
          percentage tracks (40%/60%) to fr tracks (32fr/68fr) since
          percentage columns plus a gap can silently overflow/clip (the
          gap doesn't shrink the percentages to compensate), the same fix
          already used elsewhere on this site for multi-column splits.
          Left column content, section spacing, font family, and colors
          are all untouched — see the question <motion.p> below for the
          actual nowrap treatment. */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-[1450px] px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[32fr_68fr] gap-x-14 xl:gap-x-20 gap-y-12 items-center">
            <Reveal>
              <h2 className="h2-section text-balance">Why Business Leaders Book This Session</h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Because they're asking questions like:
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <TimelineDivider delay={0} />
                {whyBookQuestions.map((q, i) => (
                  <div key={q}>
                    {/* lg:whitespace-nowrap forces a single line at
                        desktop (matches the same lg: threshold already
                        used by this file's "You'll leave with clarity…"
                        line); lg:overflow-hidden + lg:text-ellipsis are a
                        pure safety net for the longest question strings
                        and only visually truncate if the wider container/
                        column above still isn't quite enough — text,
                        font-family, colors, and row spacing (py-6) are
                        unchanged. Below lg (tablet/mobile) none of these
                        three apply, so wrapping stays natural there. */}
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="py-6 text-lg font-medium text-foreground transition-colors duration-300 ease-out hover:text-accent md:text-xl lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis"
                    >
                      {q}
                    </motion.p>
                    <TimelineDivider delay={i * 0.08 + 0.1} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-16 md:mt-20">
            <div className="mx-auto h-px w-full max-w-3xl bg-border" />
            <p className="mx-auto mt-10 max-w-3xl text-center text-2xl font-bold leading-snug tracking-tight text-balance text-foreground md:text-[1.75rem]">
              If these questions sound familiar, this strategy session was built for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Premium editorial spacer — White → Light Gray transition
          (outgoing "Why Business Leaders Book This Session" section's
          own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      {/* Who We Work With — Gray step. Wide editorial split (max-w-[1350px],
          own gutter, not container-narrow) instead of a centered bulleted
          list: left (40%) headline + one short line, right (60%) each
          audience as a large plain row — no bullets, cards, pills, or
          shadows, just thin dividers and a hover state (text nudges 6px
          right, a green accent bar grows in on the left edge). Closing
          statement spans the full wide container, centered, with larger
          type and more spacing. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-gray border-y border-border">
        <div className="mx-auto max-w-[1350px] px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[40fr_60fr] gap-x-14 xl:gap-x-20 gap-y-12 items-center">
            <Reveal>
              <h2 className="h2-section text-balance">Who We Work With</h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                We partner with businesses where trust influences every buying decision.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <TimelineDivider delay={0} />
                {whoWeWorkWith.map((item, i) => (
                  <div key={item.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative py-7 pl-7 md:py-8"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 bottom-0 w-[3px] origin-center scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
                      />
                      <div className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-balance text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-base text-muted-foreground leading-relaxed md:text-lg">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                    <TimelineDivider delay={i * 0.08 + 0.1} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-16 md:mt-20">
            <div className="mx-auto h-px w-full max-w-3xl bg-border" />
            <p className="mx-auto mt-10 max-w-3xl text-center text-2xl font-bold leading-snug tracking-tight text-balance text-foreground md:text-[1.75rem]">
              If your business depends on building credibility before winning clients, you'll
              benefit from this conversation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Premium editorial spacer — Light Gray → Black transition
          (outgoing "Who We Work With" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-gray" />

      {/* Before You Book — "Ready to Scale Your Business?" step of the
          locked background rhythm: Deep Black, the page's emotional
          conversion moment right before the actual booking action below.
          Copy, structure, and the Reveal animation are untouched — only
          background and text-color treatment change. text-foreground/
          muted-foreground are theme classes tuned for a light
          background, so they're swapped for literal inline color
          overrides here (white for the heading and the bold closing
          line, #D8D8D8 soft-white for the other body lines), matching
          the pattern used on this site's other dark sections. Top
          padding increased for a more premium editorial feel; bottom
          padding increased only modestly so the previously-fixed
          ~120-160px gap down to <Contact /> below isn't reopened. */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-28 bg-deep-black">
        <Reveal className="container-narrow mx-auto max-w-3xl text-center">
          <h2 className="h2-section text-balance" style={{ color: "#FFFFFF" }}>
            Before You Book
          </h2>
          <div className="mx-auto mt-6 space-y-2 text-lg leading-relaxed" style={{ color: "#D8D8D8" }}>
            <p>This strategy session is valuable because it's prepared—not improvised.</p>
            <p>Before we meet, you'll complete a short questionnaire about your business and growth goals.</p>
            <p className="font-semibold" style={{ color: "#FFFFFF" }}>
              That allows us to spend our time solving problems, not collecting information.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Premium editorial spacer — Black → White transition (outgoing
          "Before You Book" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-deep-black" />

      <Contact />

      {/* Premium editorial spacer — White → Black transition before the
          Footer. */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      <Footer />
    </main>
  );
}
