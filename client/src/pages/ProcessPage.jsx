import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/dmax/Navbar";
import { Process } from "@/components/dmax/Process";
import { WhyChooseDMAX } from "@/components/dmax/WhyChooseDMAX";
import { HomeFinalCTA } from "@/components/dmax/HomeFinalCTA";
import { Footer } from "@/components/dmax/Footer";
import { Reveal } from "@/components/dmax/Reveal";

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
      <header className="container-narrow pt-40 pb-4 text-center">
        <p className="eyebrow">Method</p>
        <h1 className="mx-auto mt-4 h1-page max-w-4xl text-balance">
          More Marketing Isn't the Answer. <span className="text-accent">A Better Growth System Is.</span>
        </h1>
        <div className="mx-auto mt-8 max-w-2xl space-y-3 text-lg text-muted-foreground leading-relaxed">
          <p>Most businesses don't struggle because they have a bad product.</p>
          <p>Or poor service.</p>
          <p>Or an inexperienced team.</p>
          <p>
            They struggle because the right decision-makers never discover them early enough to
            trust them.
          </p>
          <p>That's why growth feels unpredictable.</p>
          <p>One month is great. The next depends on referrals, repeat customers, or luck.</p>
          <p className="text-foreground font-semibold">It doesn't have to.</p>
        </div>
      </header>

      {/* First band after the header: Warm White step of the sitewide
          background rhythm. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-warm border-y border-border">
        <Reveal className="container-narrow mx-auto max-w-3xl text-center">
          <h2 className="h2-section text-balance">Every Business Has a Growth Bottleneck.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The question is: which one is holding yours back?
          </p>
        </Reveal>
      </section>

      <Process eyebrow={null} title={null} steps={methodSteps} />

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

      {/* The DMAX Method™ diagram summary */}
      <section className="pb-20 md:pb-24 lg:pb-32">
        <Reveal className="container-narrow mx-auto max-w-3xl text-center">
          <p className="eyebrow">The DMAX Method™</p>
          <h2 className="mt-4 h2-section text-balance">Every stage builds the next.</h2>
          <div className="mt-6 text-lg font-semibold text-foreground">
            Market Position → Market Visibility → Market Trust → Qualified Conversations → Predictable Revenue
          </div>
          <div className="mt-8 space-y-3 text-lg text-muted-foreground leading-relaxed">
            <p>Most businesses try to jump straight to lead generation.</p>
            <p className="text-foreground font-semibold">We don't.</p>
            <p>Because without positioning, visibility creates noise.</p>
            <p>Without visibility, trust never develops.</p>
            <p>Without trust, conversations rarely become business.</p>
            <p>Growth isn't built by chasing tactics.</p>
            <p className="text-foreground font-semibold">
              It's built by strengthening each stage of the system.
            </p>
          </div>
        </Reveal>
      </section>

      <WhyChooseDMAX
        title="Why Businesses Choose DMAX"
        leadLines={["We don't sell LinkedIn.", "We don't sell content.", "We don't sell outreach."]}
        intro="We build a business development system designed around one objective: helping your business become the obvious choice before the first conversation."
        closingLines={[
          "Whether you're entering new markets... growing a coaching practice... or building a predictable revenue pipeline...",
          "The principle stays the same.",
          "The businesses that earn trust first are the businesses that grow consistently.",
        ]}
      />

      {/* Final CTA — shared component, same on every page */}
      <HomeFinalCTA />
      <Footer />
    </main>
  );
}
