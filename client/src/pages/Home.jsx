import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/dmax/Navbar";
import { Hero } from "@/components/dmax/Hero";
import { TrustedBrands } from "@/components/dmax/TrustedBrands";
import { SystemShowcase } from "@/components/dmax/SystemShowcase";
import { Process } from "@/components/dmax/Process";
import { Results } from "@/components/dmax/Results";
import { WhyChooseDMAX } from "@/components/dmax/WhyChooseDMAX";
import { HomeFinalCTA } from "@/components/dmax/HomeFinalCTA";
import { Footer } from "@/components/dmax/Footer";
import { Reveal } from "@/components/dmax/Reveal";
import { ProofShowcase } from "@/components/dmax/ProofCarousel";

// Section 4 — "Introducing the Decision-Maker Acquisition System™" — 8 elements
import strategicPositioningImg from "@/assets/system/strategic-positioning.png";
import founderAuthorityImg from "@/assets/system/founder-authority.png";
import thoughtLeadershipImg from "@/assets/system/thought-leadership.png";
import linkedinPresenceImg from "@/assets/system/linkedin-presence.png";
import relationshipBuildingImg from "@/assets/system/relationship-building.png";
import strategicOutreachImg from "@/assets/system/strategic-outreach.png";
import aiAutomationImg from "@/assets/system/ai-automation.png";
import revenueTrackingImg from "@/assets/system/revenue-tracking.png";

// `focal` positions each card's artwork. SystemShowcase now renders the
// complete, uncropped photo via object-fit: contain (guaranteeing zero
// cropping of the astronaut's head/hands, Earth, holograms, or the DMAX
// flag — contain can never cut off any part of the source image by
// definition), backed by a blurred object-cover copy of the SAME image
// that extends to fill the rest of the card so there's never an empty
// gap. `focal` is shared by both layers: it nudges where the complete
// scene sits within the card (mostly a slight vertical bias toward the
// top, so the letterbox/backdrop area concentrates near the bottom,
// under the text) and gives the blurred backdrop a sensible starting
// point for its own cover-crop. Picked per image by eye.
const solutionElements = [
  { title: "Strategic Positioning", image: strategicPositioningImg, focal: "50% 10%" },
  { title: "Founder Authority", image: founderAuthorityImg, focal: "58% 12%" },
  { title: "Thought Leadership", image: thoughtLeadershipImg, focal: "42% 8%" },
  { title: "LinkedIn Presence", image: linkedinPresenceImg, focal: "38% 10%" },
  { title: "Relationship Building", image: relationshipBuildingImg, focal: "50% 12%" },
  { title: "Strategic Outreach", image: strategicOutreachImg, focal: "50% 6%" },
  { title: "AI-Powered Automation", image: aiAutomationImg, focal: "45% 12%" },
  { title: "Revenue Tracking", image: revenueTrackingImg, focal: "40% 10%" },
];

// Section 5 — "Choose Your Path" — three solutions
const paths = [
  {
    title: "Expand into Global Markets",
    audience: "For manufacturers and exporters.",
    desc: "Build relationships with international distributors, procurement leaders, importers, and decision-makers—without opening overseas offices.",
    cta: "Explore Global Expansion",
  },
  {
    title: "Grow Your Coaching Practice",
    audience: "For business coaches.",
    desc: "Position your expertise to attract qualified decision-makers who are actively looking for guidance and transformation.",
    cta: "Explore Coaching Growth",
  },
  {
    title: "Build a Predictable Revenue Pipeline",
    audience: "For B2B founders and service businesses.",
    desc: "Create a repeatable system that consistently starts conversations with qualified decision-makers instead of relying on referrals.",
    cta: "Explore B2B Growth",
  },
];

// Section 8 — "Our Method" — condensed 4-step homepage teaser
const methodSteps = [
  { n: "01", t: "Discover", d: "Understand your business, market, and growth goals." },
  { n: "02", t: "Position", d: "Create a market position that differentiates your business." },
  { n: "03", t: "Build", d: "Develop authority, visibility, and meaningful engagement." },
  { n: "04", t: "Scale", d: "Optimize your acquisition system for sustainable growth." },
];

// Section 9 — "The Numbers" — measured by business outcomes, not vanity metrics
const numbers = [
  { value: "10L", label: "₹ Pipeline Influenced" },
  { value: "100+", label: "Qualified Business Conversations" },
  { value: "150+", label: "Decision-Maker Engagement" },
  { value: "280+", label: "Sales Opportunities Created" },
  { value: "5+", label: "Countries Reached" },
  { value: "26%", label: "Meeting Rate" },
];

// Section 11 — "Insights" — article teasers
const insightArticles = [
  "Why Exporters Fail on LinkedIn",
  "The New B2B Buying Journey",
  "Why Referrals Don't Scale",
  "Building Authority Before Outreach",
];

export default function Home() {
  useEffect(() => {
    document.title = "DMAX — Become the First Choice in Your Market.";
  }, []);

  return (
    <main className="relative bg-background text-foreground">
      <Navbar />

      {/* 1. Hero — headline, supporting text, primary + secondary CTA */}
      <Hero />

      {/* 2. The Reality — Tony Robbins-style editorial section: large
          left-aligned headline in a 7-of-12-column block, short supporting
          copy, and one oversized visual panel as the section's single
          focal point. The panel is a large typographic treatment of the
          section's own existing closing line (no new image/illustration
          invented, no new copy written) — a bold pull-quote block on a
          dark surface, which is the "focal point" without adding any
          decorative graphic. First band after the Hero: Warm White step
          of the sitewide background rhythm. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-warm border-y border-border">
        <div className="container-x grid lg:grid-cols-12 gap-x-12 gap-y-12 items-center">
          <Reveal className="lg:col-span-7">
            <h2 className="h2-section text-balance">Decision-Makers Have Changed.</h2>
            <div className="mt-8 max-w-xl space-y-3 text-lg text-muted-foreground leading-relaxed">
              <p>Your future clients don't make decisions after one sales call.</p>
              <p>They research.</p>
              <p>They compare.</p>
              <p>They observe.</p>
              <p>They build trust long before they respond to your email or schedule a meeting.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-3xl bg-foreground p-10 md:p-12 shadow-elevation">
              <p className="text-2xl md:text-[1.75rem] font-bold leading-[1.25] tracking-tight text-balance text-background">
                If you're invisible during that process, you're{" "}
                <span style={{ color: "var(--accent)" }}>already losing opportunities.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. The Cost of Doing Nothing — White step */}
      <section className="py-20 md:py-28 lg:py-36">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">The Hidden Cost of an Invisible Business</h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            Every month you rely only on referrals or random outreach, you risk:
          </p>
          <ul className="mt-6 space-y-3 text-lg">
            {[
              "Missed business opportunities",
              "Longer sales cycles",
              "Lower pricing power",
              "Competitors becoming the obvious choice",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-2.5 size-1.5 rounded-full bg-accent shrink-0" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-semibold text-foreground">
            The cost isn't just fewer leads—it's lost revenue and lost market position.
          </p>
        </Reveal>
      </section>

      {/* 4. The Solution — clean content section, no illustration */}
      <SystemShowcase
        eyebrow={null}
        title={<>Introducing the Decision-Maker Acquisition System™</>}
        subtitle="A system designed to help expertise-driven businesses become the first choice before decision-makers are ready to buy."
        items={solutionElements}
        closing="Every element works together to create predictable business growth."
      />

      {/* 5. Choose Your Path — Apple product-selection-card composition:
          spacious equal-height cards, strong title, one card (the middle
          one) subtly emphasized via a black/white inversion rather than
          an extra color, so it reads as "recommended" without breaking
          the restrained palette. Gray step of the background rhythm. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-gray border-y border-border">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Solutions</p>
            <h2 className="mt-4 h2-section text-balance">Choose Your Path.</h2>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {paths.map((p, i) => {
              const emphasized = i === 1;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
                  className={`card-lift flex flex-col rounded-3xl p-10 md:p-12 ${
                    emphasized
                      ? "bg-foreground text-background shadow-elevation md:-translate-y-2"
                      : "border border-border bg-card shadow-card"
                  }`}
                >
                  <div
                    className={`text-xs uppercase tracking-widest ${
                      emphasized ? "" : "text-accent"
                    }`}
                    style={emphasized ? { color: "var(--accent)" } : undefined}
                  >
                    {p.audience}
                  </div>
                  <h3 className="mt-4 text-2xl md:text-[28px] font-bold tracking-tight leading-tight">
                    {p.title}
                  </h3>
                  <p
                    className={`mt-4 text-base leading-relaxed flex-1 ${
                      emphasized ? "opacity-80" : "text-muted-foreground"
                    }`}
                  >
                    {p.desc}
                  </p>
                  <Link
                    to="/services"
                    className={`mt-8 pt-6 inline-flex items-center gap-2 text-sm font-semibold border-t hover:brightness-110 ${
                      emphasized ? "border-background/15" : "border-border text-accent"
                    }`}
                    style={emphasized ? { color: "var(--accent)" } : undefined}
                  >
                    {p.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Why It Works — White step */}
      <section className="py-20 md:py-28 lg:py-36">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">Modern Decision-Makers Trust Before They Buy.</h2>
          <div className="mt-8 space-y-3 text-lg text-muted-foreground leading-relaxed">
            <p>Trust isn't built during the sales meeting. It comes from repeated exposure.</p>
            <p>
              It's built through consistent visibility, valuable insights, and meaningful
              interactions long before the first conversation.
            </p>
            <p className="text-foreground font-semibold">
              That's why we build systems instead of isolated marketing campaigns.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 8. Our Method */}
      <Process
        eyebrow={null}
        title={<>Our Method.</>}
        subtitle="System that builds for Consistent Growth."
        steps={methodSteps}
      />

      {/* 9. The Numbers */}
      <Results
        eyebrow={null}
        title={<>Every strategy is measured by business outcomes—not vanity metrics.</>}
        metrics={numbers}
      />

      {/* 9b. Results — "Selected Work" showcase (see ProofShowcase in
          ProofCarousel.jsx), moved here from the About page's Proof
          section so it exists in exactly one place on the site. Sits
          directly under the Numbers section so the story reads as
          Numbers → Proof → (Why DMAX / client validation) in one
          continuous flow. Apple-style featured-project + supporting-cards
          layout, built from the same real screenshots as before — no
          invented client names, challenges, or outcomes, since none
          exist for these. Gray step of the background rhythm. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-gray border-y border-border">
        <Reveal className="container-x max-w-3xl">
          <p className="eyebrow">Results</p>
          <h2 className="mt-4 h2-section text-balance">Proof Behind Every Number</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Every metric above is backed by real conversations, real opportunities, and real
            business outcomes.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="container-x mt-12">
          <ProofShowcase />
        </Reveal>
      </section>

      {/* 10. Why DMAX */}
      <WhyChooseDMAX
        variant="comparison"
        banded={false}
        title="Why DMAX."
        leadLines={[
          "Most agencies focus on content & deliver marketing activities.",
          "We build business acquisition systems.",
          "Most agencies optimize social media.",
          "We optimize trust with decision-makers.",
          "Most agencies measure impressions.",
          "We measure conversations, opportunities and revenue.",
        ]}
      />

      {/* 11. Insights */}
      <TrustedBrands title="Insights" items={insightArticles} linkTo="/faq#featured-insights" />

      {/* 12. Final CTA — shared component, same on every page */}
      <HomeFinalCTA />

      <Footer />
    </main>
  );
}
