import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/dmax/Navbar";
import { Process } from "@/components/dmax/Process";
import { WhyChooseDMAX } from "@/components/dmax/WhyChooseDMAX";
import { HomeFinalCTA } from "@/components/dmax/HomeFinalCTA";
import { Footer } from "@/components/dmax/Footer";
import { Reveal } from "@/components/dmax/Reveal";
import methodGrowthJourney from "@/assets/images/method-growth-journey.jpg";

// DMAX Method doc — 5-stage "DMAX Method™" — condensed for the card grid
const methodSteps = [
  {
    n: "01",
    t: "Market Position",
    d: "“Why should I choose you?” Before people choose you, they need to understand you.",
  },
  {
    n: "02",
    t: "Market Visibility",
    d: "“I've never heard of you.” Great businesses deserve to be discovered.",
  },
  {
    n: "03",
    t: "Market Trust",
    d: "“Can I trust this business?” Trust should exist before the first conversation.",
  },
  {
    n: "04",
    t: "Qualified Conversations",
    d: "“Let's talk.” The right conversation changes everything.",
  },
  {
    n: "05",
    t: "Predictable Revenue",
    d: "Growth you can plan for. Not because of luck. Because you've built a system.",
  },
];

// Full detail per stage, from the Method doc — rendered as expanded cards below the grid
const stageDetails = [
  {
    n: "01",
    title: "Market Position",
    quote: "“Why should I choose you?”",
    lead: "If your market can't answer this in seconds, you're competing with everyone.",
    problemLabel: "You may have a Position problem if...",
    bullets: [
      "Prospects compare you mainly on price.",
      "You struggle to explain what makes you different.",
      "You attract enquiries that aren't the right fit.",
    ],
    closing: "Before people choose you... They need to understand you.",
  },
  {
    n: "02",
    title: "Market Visibility",
    quote: "“I've never heard of you.”",
    lead: "You might be the best in your industry. But if the right decision-makers don't see you consistently, opportunities will always feel limited.",
    problemLabel: "You may have a Visibility problem if...",
    bullets: [
      "Most new business comes through referrals.",
      "Your competitors appear more often than you.",
      "Inbound enquiries are inconsistent.",
    ],
    closing: "Great businesses deserve to be discovered.",
  },
  {
    n: "03",
    title: "Market Trust",
    quote: "“Can I trust this business?”",
    lead: "Visibility gets attention. Trust earns conversations. Modern decision-makers research long before they respond. Every interaction shapes whether you're remembered—or ignored.",
    problemLabel: "You may have a Trust problem if...",
    bullets: [
      "Prospects disappear after the first meeting.",
      "Sales cycles take longer than they should.",
      "You're constantly proving your credibility.",
    ],
    closing: "Trust should exist before the first conversation.",
  },
  {
    n: "04",
    title: "Qualified Conversations",
    quote: "“Let's talk.”",
    lead: "Business doesn't grow through impressions. It grows through conversations with people who have a genuine need, the authority to decide, and the confidence to move forward.",
    problemLabel: "You may have a Conversation problem if...",
    bullets: [
      "You're speaking to the wrong people.",
      "Meetings rarely become opportunities.",
      "Outreach feels like a numbers game.",
    ],
    closing: "The right conversation changes everything.",
  },
  {
    n: "05",
    title: "Predictable Revenue",
    quote: "Growth you can plan for.",
    lead: "When positioning, visibility, trust, and conversations work together, revenue becomes more predictable. Not because of luck. Because you've built a system. One that continues creating opportunities month after month.",
    problemLabel: "This is what predictable growth looks like.",
    bullets: [
      "More qualified opportunities.",
      "Better clients.",
      "Stronger market positioning.",
      "Less dependence on referrals.",
      "Greater confidence in your next quarter.",
    ],
    closing: null,
  },
];

export default function ProcessPage() {
  useEffect(() => {
    document.title = "Method — DMAX";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      {/* Method intro — deliberately smaller/quieter than a page Hero: this
          is the bridge into the <Process /> timeline below, which should
          read as the section's real visual hero. Heading is ~20-25%
          smaller than the shared .h1-page scale (custom sizes here, not
          .h1-page itself, so every other page's header is untouched),
          tighter but still legible line-height, and green is now confined
          to the single phrase "Growth System" instead of the whole second
          sentence. Body copy is the same seven sentences regrouped into
          five flowing paragraphs (no wording changed beyond the commas
          needed to merge "bad product." / "Or poor service." / "Or an
          inexperienced team." into one sentence, exactly as spec'd) so it
          reads as editorial copy, not a slide's bullet stack. Top padding
          trimmed ~30% (pt-40 → pt-28); heading and body copy each have
          their own column width (see below). */}
      {/* Warm White step of the locked background rhythm — wrapped in a
          full-width bg element with container-narrow nested inside for
          padding, since applying the background straight to
          container-narrow would only paint the 1240px content box, not
          the full section width (same fix used on Services.jsx's header).
          Typography/copy/layout inside are untouched. */}
      <header className="bg-surface-warm pb-4">
        <div className="container-narrow pt-28 md:pt-32 lg:pt-36 text-center">
          <p className="eyebrow">Method</p>
          {/* Heading gets its own wide measure (~1150px, independent from the
              narrower body column below) so it can use the section's full
              available width instead of being trapped in the ~576-760px
              column that was causing the excess left/right whitespace. At
              container-narrow's actual content width (1240px minus its own
              padding, ~1144px at desktop) this effectively fills the
              available space while container-narrow's existing
              padding/auto-margin system still supplies the outer desktop
              gutter and large-screen breathing room — no change to that
              shared container needed. */}
          <h1 className="mx-auto mt-5 max-w-[1150px] text-[2.25rem] md:text-[3rem] lg:text-[4.25rem] font-bold leading-[1.15] tracking-tight text-balance text-foreground">
            More Marketing Isn't the Answer. A Better{" "}
            <span className="text-accent">Growth System</span> Is.
          </h1>
          {/* Supporting content widened to ~950px (900-1000px range) per the
              latest pass — still its own, narrower measure than the 1150px
              heading above it, but no longer cramped down at 680px. */}
          <div className="mx-auto mt-8 max-w-[950px] space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Most businesses don't struggle because they have a bad product, poor service, or an
              inexperienced team.
            </p>
            <p>
              They struggle because the right decision-makers never discover them early enough to
              trust them.
            </p>
            <p>That's why growth feels unpredictable.</p>
            <p>One month is great. The next depends on referrals, repeat customers, or luck.</p>
            <p className="text-foreground font-bold">It doesn't have to.</p>
          </div>
        </div>
      </header>

      {/* Growth Bottlenecks step of the locked background rhythm: Very
          Light Gray (was Warm White) — separates it from the Warm White
          header above it. Top padding kept generous (unchanged) so
          there's still comfortable space below the page header; bottom
          padding trimmed and the bottom border dropped so this heading/
          subheading reads as the timeline's own intro instead of a
          separate section — the remaining ~56-80px gap is split between
          this section's pb and <Process tightTop />'s own reduced top
          spacing below. */}
      <section className="pt-20 md:pt-28 lg:pt-36 pb-8 md:pb-10 lg:pb-12 bg-surface-gray border-t border-border">
        {/* Heading and subheading now get their own column widths (1150px
            / 950px) instead of sharing one max-w-3xl (768px) wrapper —
            same widening treatment as the page header above, so this
            heading can use the section's actual available width instead
            of sitting in a narrow column with unused space on both
            sides. */}
        <Reveal className="container-narrow text-center">
          <h2 className="mx-auto max-w-[1150px] h2-section text-balance">
            Every Business Has a Growth Bottleneck.
          </h2>
          <p className="mx-auto mt-4 max-w-[950px] text-lg text-muted-foreground">
            The question is: which one is holding yours back?
          </p>
        </Reveal>
      </section>

      <Process eyebrow={null} title={null} steps={methodSteps} tightTop />

      {/* Expanded per-stage detail from the Method doc */}
      <section className="pb-20 md:pb-24 lg:pb-32">
        <div className="container-narrow space-y-6">
          {stageDetails.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
              className="card-lift rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card"
            >
              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <div className="text-xs font-semibold text-accent">{s.n}</div>
                  <h3 className="mt-2 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-lg font-medium text-foreground">{s.quote}</p>
                </div>
                <div className="md:col-span-8">
                  <p className="text-muted-foreground leading-relaxed">{s.lead}</p>
                  <p className="mt-5 text-sm font-semibold text-foreground">{s.problemLabel}</p>
                  <ul className="mt-3 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="mt-2 size-1 rounded-full bg-accent shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {s.closing && (
                    <p className="mt-5 text-sm font-semibold text-foreground">{s.closing}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* "Every Stage Builds the Next" — the Method page's signature
          storytelling section. Deep Black background (unchanged from the
          earlier background-rhythm pass), now restructured into a
          premium 45/55 editorial two-column layout: the approved
          astronaut/growth-journey image on the left, the exact original
          copy on the right (same eyebrow → heading → framework line →
          paragraphs → closing bold line, nothing reworded, reordered, or
          removed — "We don't." stays inline as its own bold beat inside
          the paragraph flow, exactly as before). Only this section was
          touched; every other section on this page is untouched. */}
      <section className="py-24 md:py-32 lg:py-40 bg-deep-black overflow-hidden">
        <div className="container-narrow grid lg:grid-cols-[45%_55%] gap-x-14 xl:gap-x-20 gap-y-14 items-center">
          {/* Left column — image only. object-contain preserves the
              photo's original proportions (no crop, no stretch); the
              soft drop-shadow plus a faint edge-fade mask are the only
              "adjustments" applied, both within the brief's allowed list
              (soft premium shadow / slight blend with background) — no
              new graphics, holograms, or workflow edits. */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[560px]"
          >
            <img
              src={methodGrowthJourney}
              alt="An astronaut walking beside a rising line of glowing growth milestones"
              className="w-full h-auto object-contain rounded-2xl"
              style={{
                filter: "brightness(1.05) contrast(1.05) drop-shadow(0 30px 60px rgba(0,0,0,0.55))",
                WebkitMaskImage:
                  "radial-gradient(ellipse 92% 92% at 50% 50%, black 78%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 92% 92% at 50% 50%, black 78%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* Right column — exact original copy, capped at ~600px per
              spec, with the same hierarchy as before: small label →
              heading → framework line → paragraphs → final bold
              statement. Stagger reveal via Reveal's built-in per-child
              motion, just no longer center-aligned across the full
              section width. */}
          <Reveal className="max-w-[600px]">
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>
              The DMAX Method™
            </p>
            <h2 className="mt-4 h2-section text-balance" style={{ color: "#FFFFFF" }}>
              Every stage builds the next.
            </h2>
            <div className="mt-8 text-lg font-semibold" style={{ color: "#FFFFFF" }}>
              Market Position → Market Visibility → Market Trust → Qualified Conversations → Predictable Revenue
            </div>
            <div className="mt-10 space-y-4 text-lg leading-relaxed" style={{ color: "#D8D8D8" }}>
              <p>Most businesses try to jump straight to lead generation.</p>
              <p className="font-semibold" style={{ color: "#FFFFFF" }}>We don't.</p>
              <p>Because without positioning, visibility creates noise.</p>
              <p>Without visibility, trust never develops.</p>
              <p>Without trust, conversations rarely become business.</p>
              <p>Growth isn't built by chasing tactics.</p>
              <p className="font-semibold" style={{ color: "#FFFFFF" }}>
                It's built by strengthening each stage of the system.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DMAX Workflow step of the locked background rhythm: Pure White.
          This component's own default (banded=true) would otherwise
          render its usual Light Gray band, which would sit directly
          after the Deep Black section above — banded={false} switches it
          to the plain white/transparent variant (inherits the page's own
          bg-background) so the rhythm reads Black → White here. Copy,
          card layout, and animation are untouched. */}
      <WhyChooseDMAX
        title="Why Businesses Choose DMAX"
        leadLines={["We don't sell LinkedIn.", "We don't sell content.", "We don't sell outreach."]}
        intro="We build a business development system designed around one objective: helping your business become the obvious choice before the first conversation."
        closingLines={[
          "Whether you're entering new markets... growing a coaching practice... or building a predictable revenue pipeline...",
          "The principle stays the same.",
          "The businesses that earn trust first are the businesses that grow consistently.",
        ]}
        banded={false}
      />

      {/* Final CTA — shared component, same on every page */}
      <HomeFinalCTA />
      <Footer />
    </main>
  );
}
