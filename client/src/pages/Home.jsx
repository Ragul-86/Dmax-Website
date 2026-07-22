import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, GraduationCap, TrendingUp, Target, Clock, TrendingDown, Users } from "lucide-react";
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
import { ProofCarousel } from "@/components/dmax/ProofCarousel";

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

// Section 5 — "Choose Your Path" — three solutions. `icon` reuses the
// exact same icon already assigned to each of these three solutions on
// the Services page (Globe / GraduationCap / TrendingUp) — not a new
// icon set, just the established mapping, so the card can lead with an
// icon per the Apple feature-card hierarchy without inventing anything.
const paths = [
  {
    icon: Globe,
    title: "Expand into Global Markets",
    audience: "For manufacturers and exporters.",
    desc: "Build relationships with international distributors, procurement leaders, importers, and decision-makers—without opening overseas offices.",
    cta: "Explore Global Expansion",
  },
  {
    icon: GraduationCap,
    title: "Grow Your Coaching Practice",
    audience: "For business coaches.",
    desc: "Position your expertise to attract qualified decision-makers who are actively looking for guidance and transformation.",
    cta: "Explore Coaching Growth",
  },
  {
    icon: TrendingUp,
    title: "Build a Predictable Revenue Pipeline",
    audience: "For B2B founders and service businesses.",
    desc: "Create a repeatable system that consistently starts conversations with qualified decision-makers instead of relying on referrals.",
    cta: "Explore B2B Growth",
  },
];

// Section 3 — "The Hidden Cost of an Invisible Business" — same four risk
// phrases as before (verbatim, previously a bullet list), each now paired
// with a simple illustrative icon for the card grid.
const risks = [
  { icon: Target, title: "Missed business opportunities" },
  { icon: Clock, title: "Longer sales cycles" },
  { icon: TrendingDown, title: "Lower pricing power" },
  { icon: Users, title: "Competitors becoming the obvious choice" },
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

  // "Choose Your Path" — one active card at a time, defaulting to the
  // center card (index 1) exactly as it was emphasized before.
  const [activePath, setActivePath] = useState(1);

  return (
    <main className="relative bg-background text-foreground">
      <Navbar />

      {/* 1. Hero — headline, supporting text, primary + secondary CTA */}
      <Hero />

      {/* 2. The Reality — premium editorial two-column composition: a
          60/40 split with the headline/copy on the left (natural
          left-to-right reading flow) and the existing black statement
          card on the right, vertically centered against the left
          content. Stacks to a single column (text, then card) on tablet
          and mobile. Text and card content/design unchanged. First of
          three stacked sections (this one, "Hidden Cost", and the
          Decision-Maker Acquisition grid below) sharing one continuous
          Light Gray band — the "Decision Maker" step of the locked
          sitewide background rhythm, right after the Warm White Hero. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-gray">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] items-center gap-y-12 lg:gap-x-20 xl:gap-x-24">
            <Reveal>
              <h2 className="h2-section text-balance">Decision-Makers Have Changed.</h2>
              <div className="mt-8 max-w-xl space-y-3 text-lg text-muted-foreground leading-relaxed">
                <p>Your future clients don't make decisions after one sales call.</p>
                <p>They research.</p>
                <p>They compare.</p>
                <p>They observe.</p>
                <p>They build trust long before they respond to your email or schedule a meeting.</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-foreground p-10 md:p-12 shadow-elevation">
                <p className="text-2xl md:text-[1.75rem] font-bold leading-[1.25] tracking-tight text-balance text-background">
                  If you're invisible during that process, you're{" "}
                  <span style={{ color: "var(--accent)" }}>already losing opportunities.</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. The Cost of Doing Nothing — continues the Light Gray
          "Decision Maker" band from section 2 above (no seam between
          them). Title/typography/spacing above untouched. Cards: a single
          4-wide row on desktop (1440px+) instead of the taller 2×2 grid,
          to cut vertical space; 2-up on tablet, 1-up on mobile. Still the
          site's existing .card-service system (24px radius, soft border,
          shadow-card, lift + accent-border on hover) — same visual
          language as the Services grids elsewhere, not a new style. Grid's
          default align-items: stretch keeps all four cards equal height
          per row automatically, regardless of title line-wrap. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-gray">
        <div className="container-narrow">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="h2-section text-balance">The Hidden Cost of an Invisible Business</h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              Every month you rely only on referrals or random outreach, you risk:
            </p>
          </Reveal>

          <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-6 md:gap-7 lg:gap-8">
            {risks.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group card-service"
              >
                <div className="card-icon inline-flex size-12 items-center justify-center overflow-hidden rounded-2xl bg-foreground text-background transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110 group-hover:-rotate-3">
                  <r.icon className="size-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{r.title}</h3>
              </motion.div>
            ))}
          </div>

          <Reveal className="mx-auto mt-10 md:mt-12 max-w-3xl text-center">
            <p className="text-xl font-semibold text-foreground">
              The cost isn't just fewer leads—it's lost revenue and lost market position.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. The Solution — clean content section, no illustration */}
      <SystemShowcase
        eyebrow={null}
        title={<>Introducing the Decision-Maker Acquisition System™</>}
        subtitle="A system designed to help expertise-driven businesses become the first choice before decision-makers are ready to buy."
        items={solutionElements}
        closing="Every element works together to create predictable business growth."
      />

      {/* 5. Choose Your Path — Apple product-selection-card composition,
          now interactive: exactly one card is "active" at a time (black
          background, white type, 1.03 scale, soft elevated shadow),
          defaulting to the center card exactly as before. Clicking any
          other card smoothly activates it and returns the previous one to
          white — a 400ms ease-in-out color/scale transition. Content and
          order unchanged; each card's internal layout is now top-left:
          icon → audience label → title → description → CTA. Pure White
          step of the locked background rhythm — a clean break from the
          Light Gray "Decision Maker" band above, right before the dark
          full-bleed Trust section below. */}
      <section className="py-20 md:py-28 lg:py-36 bg-background">
        <div className="container-narrow">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Solutions</p>
            <h2 className="mt-4 h2-section text-balance">Choose Your Path.</h2>
          </Reveal>

          <div className="mt-20 lg:mt-24 grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {paths.map((p, i) => {
              const emphasized = activePath === i;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActivePath(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActivePath(i);
                    }
                  }}
                  aria-pressed={emphasized}
                  className={`flex cursor-pointer flex-col rounded-3xl p-10 md:p-12 text-left transition-all duration-[400ms] ease-in-out ${
                    emphasized
                      ? "bg-foreground text-background shadow-elevation scale-[1.03]"
                      : "border border-border bg-card shadow-card scale-100"
                  }`}
                >
                  <div
                    className={`inline-flex size-12 items-center justify-center rounded-2xl transition-colors duration-[400ms] ease-in-out ${
                      emphasized ? "bg-background/10 text-background" : "bg-foreground text-background"
                    }`}
                  >
                    <p.icon className="size-5" />
                  </div>

                  <div
                    className={`mt-6 text-xs uppercase tracking-widest ${
                      emphasized ? "" : "text-accent"
                    }`}
                    style={emphasized ? { color: "var(--accent)" } : undefined}
                  >
                    {p.audience}
                  </div>
                  <h3 className="mt-2.5 text-2xl md:text-[28px] font-bold tracking-tight leading-tight">
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
                    onClick={(e) => e.stopPropagation()}
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

      {/* 6. Why It Works — full-bleed cinematic editorial section
          (Tony Robbins-inspired). No card, no bordered container behind
          the copy — the typography sits directly on the background photo
          over a dark overlay. All text is unchanged, verbatim.

          Background image: intentionally referenced as a plain CSS
          background (a `public/` path, not a Vite `import`), so the
          section renders correctly today — with a dark neutral fallback
          — and picks up the real photo the instant it's dropped in, with
          zero code changes. To wire up the real photo (a premium
          executive strategy meeting / boardroom shot), add it at:
            client/public/images/trust-executive-meeting.jpg
          (create the `public/images/` folder if it doesn't exist yet). */}
      <section className="relative overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-neutral-900"
          style={{
            backgroundImage: "url(/images/trust-executive-meeting.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {/* Dark overlay — 55%, within the requested 50–60% band */}
        <div aria-hidden className="absolute inset-0 bg-black/55" />

        <motion.div
          className="relative py-28 md:py-36 lg:py-44"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        >
          <div className="mx-auto max-w-2xl px-6 text-center">
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-balance text-white"
            >
              Modern Decision-Makers Trust Before They Buy.
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              Trust isn't built during the sales meeting. It comes from repeated exposure.
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              It's built through consistent visibility, valuable insights, and meaningful
              interactions long before the first conversation.
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-xl font-semibold text-white"
            >
              That's why we build systems instead of isolated marketing campaigns.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* 8. Our Method — Deep Black step of the locked background rhythm
          (Apple-keynote feel). `dark` is scoped to this call site only —
          About.jsx's and ProcessPage.jsx's <Process /> usages are
          untouched and stay on the default light styling. */}
      <Process
        eyebrow={null}
        title={<>Our Method.</>}
        subtitle="System that builds for Consistent Growth."
        steps={methodSteps}
        dark
      />

      {/* 9. The Numbers */}
      <Results
        eyebrow={null}
        title={<>Every strategy is measured by business outcomes—not vanity metrics.</>}
        metrics={numbers}
      />

      {/* 9b. Results — premium infinite proof carousel (see
          <ProofCarousel /> in ProofCarousel.jsx), moved here from the
          About page's Proof section so it exists in exactly one place on
          the site. Sits directly under the Numbers section so the story
          reads as Numbers → Proof → (Why DMAX / client validation) in one
          continuous flow. Same real screenshots and lightbox as before —
          title/subtitle copy unchanged. Warm White step of the locked
          background rhythm — matches the Numbers section directly above
          so "Results/Proof" reads as one continuous band, no border
          seam between them. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-warm">
        <Reveal className="container-narrow mx-auto max-w-3xl text-center">
          <p className="eyebrow">Results</p>
          <h2 className="mt-4 h2-section text-balance">Proof Behind Every Number</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Every metric above is backed by real conversations, real opportunities, and real
            business outcomes.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="container-narrow mt-12">
          <ProofCarousel />
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
