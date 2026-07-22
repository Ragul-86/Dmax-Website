import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/dmax/Navbar";
import { Services } from "@/components/dmax/Services";
import { HomeFinalCTA } from "@/components/dmax/HomeFinalCTA";
import { Footer } from "@/components/dmax/Footer";
import { Reveal } from "@/components/dmax/Reveal";
import positionAstronaut from "@/assets/topics/topic-market-position-leader.png";
import visibilityAstronaut from "@/assets/topics/topic-market-visibility-scanner.png";
import trustAstronaut from "@/assets/topics/topic-market-trust-shield.png";
import conversationsAstronaut from "@/assets/topics/topic-qualified-conversations-holographic.png";
import revenueAstronaut from "@/assets/topics/topic-predictable-revenue-analytics.png";

// "Explore by Topic" — five topic cards, exact descriptions from the doc.
// `focal` gives each card its own object-position so the 5 crops aren't
// identical — tuned per composition (full-body vs. helmet close-up vs.
// torso-with-prop). `hologram` positions a small independent glow
// animation roughly where that card's holographic prop sits in the photo
// (scanner/shield/comms/chart) — Market Position has none since that
// photo has no holographic element, just the astronaut and the planet.
const topics = [
  { image: positionAstronaut, focal: "32% 30%", title: "Market Position", desc: "Clarify why customers should choose your business over every alternative." },
  { image: visibilityAstronaut, focal: "42% 22%", hologram: { type: "pulse", x: "72%", y: "28%" }, title: "Market Visibility", desc: "Learn how modern businesses earn attention from the right decision-makers." },
  { image: trustAstronaut, focal: "46% 36%", hologram: { type: "ripple", x: "68%", y: "42%" }, title: "Market Trust", desc: "Understand how credibility influences buying decisions long before a sales conversation begins." },
  { image: conversationsAstronaut, focal: "45% 30%", hologram: { type: "shimmer", x: "68%", y: "35%" }, title: "Qualified Conversations", desc: "Discover practical ways to create more meaningful business opportunities." },
  { image: revenueAstronaut, focal: "40% 33%", hologram: { type: "glow", x: "68%", y: "30%" }, title: "Predictable Revenue", desc: "Build systems that support long-term growth instead of relying on short-term tactics." },
];

// "Featured Insights" — six article cards, exact copy from the doc
const featuredInsights = [
  {
    title: "Why Great Businesses Stay Invisible",
    desc: "Most businesses don't lose because they're less capable. They lose because they're less visible to the people who matter most.",
  },
  {
    title: "Decision-Makers Don't Buy the Way They Used To",
    desc: "The modern buying journey begins long before the first meeting. Understanding that journey changes how businesses grow.",
  },
  {
    title: "Referrals Are Valuable. Systems Are Better.",
    desc: "Referrals can fuel growth. Systems make it predictable. Here's why every growing business eventually needs both.",
  },
  {
    title: "Why Trust Is Your Greatest Competitive Advantage",
    desc: "Price attracts attention. Trust wins decisions. Learn why credibility has become one of the strongest drivers of business growth.",
  },
  {
    title: "The Five Growth Bottlenecks Limiting Most Businesses",
    desc: "Every business reaches a point where growth slows. The challenge is identifying what's actually causing it. Discover the five bottlenecks behind inconsistent growth—and how to remove them.",
  },
  {
    title: "Entering New Markets Without Opening New Offices",
    desc: "International expansion isn't only about geography. It's about building visibility and trust with the right decision-makers before your competitors do.",
  },
];

export default function FaqPage() {
  useEffect(() => {
    document.title = "Insights — DMAX";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      {/* 1. Hero */}
      <header className="container-narrow pt-40 pb-4 text-center">
        <p className="eyebrow">Insights</p>
        <h1 className="mx-auto mt-4 h1-page max-w-4xl text-balance">
          Better thinking builds <span className="text-accent">better businesses.</span>
        </h1>
        <div className="mx-auto mt-8 max-w-2xl space-y-3 text-lg text-muted-foreground leading-relaxed">
          <p>The way B2B companies grow has changed.</p>
          <p>Decision-makers research before they respond.</p>
          <p>Trust is built before the first meeting.</p>
          <p>
            And the businesses that understand this create opportunities long before their
            competitors know they exist.
          </p>
          <p>
            Insights is where we share what we're learning about modern B2B growth—through
            practical ideas, strategic frameworks, and real-world observations.
          </p>
          <p className="text-foreground font-semibold">Not marketing trends. Business thinking.</p>
        </div>
      </header>

      {/* 2. What You'll Discover — Warm White step (first band after the header) */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-warm border-y border-border">
        <Reveal className="container-narrow mx-auto max-w-3xl text-center">
          <h2 className="h2-section text-balance">The principles behind predictable growth.</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Our insights focus on the questions ambitious founders ask every day.
          </p>
          <ul className="mx-auto mt-6 max-w-md space-y-3 text-left text-lg">
            {[
              "How do we become the obvious choice in our market?",
              "Why has our growth become inconsistent?",
              "How do decision-makers evaluate suppliers today?",
              "How can we enter new markets with confidence?",
              "How do we reduce dependence on referrals?",
              "How do we build trust before the first conversation?",
            ].map((q) => (
              <li key={q} className="flex items-start gap-3">
                <span className="mt-2.5 size-1.5 rounded-full bg-accent shrink-0" />
                {q}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-semibold text-foreground">
            Every article is written to help you make better business decisions—not just better
            marketing decisions.
          </p>
        </Reveal>
      </section>

      {/* 3. Explore by Topic */}
      <Services eyebrow={null} title={<>Explore by Topic</>} items={topics} columns="lg:grid-cols-5" />

      {/* 4. Featured Insights — Gray step */}
      <section id="featured-insights" className="py-20 md:py-28 lg:py-36 scroll-mt-24 bg-surface-gray border-y border-border">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Featured Insights</p>
          </div>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredInsights.map((a, i) => (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
                className="card-lift flex flex-col rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card"
              >
                <h3 className="text-xl font-semibold">{a.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{a.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Read Insight <ArrowRight className="size-4" />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Philosophy — White step */}
      <section className="py-20 md:py-28 lg:py-36">
        <Reveal className="container-narrow mx-auto max-w-3xl text-center">
          <p className="eyebrow">Our Philosophy</p>
          <div className="mt-6 space-y-3 text-lg text-muted-foreground leading-relaxed">
            <p>We don't publish content because algorithms reward consistency.</p>
            <p className="text-foreground font-semibold">
              We publish because informed founders make better decisions.
            </p>
            <p>
              If one idea helps you avoid a costly mistake, uncover a new opportunity, or rethink
              how your business grows, it's worth sharing.
            </p>
            <p>That's the purpose of every insight we create.</p>
          </div>
        </Reveal>
      </section>

      {/* 6. Final CTA — shared component, same on every page */}
      <HomeFinalCTA />

      <Footer />
    </main>
  );
}
