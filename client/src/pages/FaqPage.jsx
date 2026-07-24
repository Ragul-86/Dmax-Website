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
  { image: positionAstronaut, focal: "32% 30%", title: "Why Exporters Fail on LinkedIn", desc: "Discover the common mistakes exporters make on LinkedIn and learn how to build credibility that attracts international buyers instead of chasing leads." },
  { image: visibilityAstronaut, focal: "42% 22%", hologram: { type: "pulse", x: "72%", y: "28%" }, title: "The New B2B Buying Journey", desc: "Understand how modern decision-makers research, compare, and build trust before contacting your business." },
  { image: trustAstronaut, focal: "46% 36%", hologram: { type: "ripple", x: "68%", y: "42%" }, title: "Why Referrals Don't Scale", desc: "Referrals are valuable, but they are unpredictable. Learn why sustainable businesses build systems instead of relying on word-of-mouth alone." },
  { image: conversationsAstronaut, focal: "45% 30%", hologram: { type: "shimmer", x: "68%", y: "35%" }, title: "Building Authority Before Outreach", desc: "Authority creates trust before the first message. Learn how positioning increases response rates and improves sales conversations." },
  { image: revenueAstronaut, focal: "40% 33%", hologram: { type: "glow", x: "68%", y: "30%" }, title: "Why Is My LinkedIn Content Not Converting to Clients?", desc: "Find out why your content gets views but not enquiries, and how to create content that builds trust and generates qualified opportunities." },
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

      {/* 1. Hero — Insights intro. Same widening/height-reduction treatment
          used on the Method and Services page headers: heading and body
          copy each get their own column width (1150px / 950px) instead of
          sharing one ~672-896px wrapper, green is confined to a single
          word ("businesses") instead of the whole second line, and the
          six one-sentence lines are grouped into four flowing paragraphs
          — no wording changed, the first three were already complete
          sentences and are simply joined with spaces. Heading uses custom
          sizes (not the shared .h1-page class) so About/Contact/Results/
          Services headers are unaffected; tracking-tight matches
          .h1-page's own -0.025em letter-spacing. Top padding trimmed ~20%
          (pt-40 → pt-32). */}
      {/* Warm White step of the locked background rhythm — wrapped in a
          full-width bg element with container-narrow nested inside for
          padding, since applying the background straight to
          container-narrow would only paint the 1240px content box, not
          the full section width (same fix used on Services.jsx and
          ProcessPage.jsx's headers). Typography/copy/layout untouched. */}
      <header className="bg-surface-warm pb-4">
        <div className="container-narrow pt-28 md:pt-32 lg:pt-36 text-center">
          <p className="eyebrow">Insights</p>
          <h1 className="mx-auto mt-4 max-w-[1150px] text-[2.625rem] md:text-[3.75rem] lg:text-[4.75rem] font-bold leading-[1.02] tracking-tight text-balance text-foreground">
            Better thinking builds better <span className="text-accent">businesses</span>.
          </h1>
          <div className="mx-auto mt-8 max-w-[950px] space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              The way B2B companies grow has changed. Decision-makers research before they respond.
              Trust is built before the first meeting.
            </p>
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
        </div>
      </header>

      {/* 2. What You'll Discover — Warm White step (first band after the
          header). REDESIGNED per the latest brief: the old centered
          bullet list (max-w-md, small dot markers) is gone — this is the
          same bullet-row pattern used all over the rest of the site
          (Services cards, WhyChooseDMAX, etc.), which read as generic
          here. Replaced with six large, full-width "question strip" rows
          — a numbered index (DMAX green, bold) + a bold one-line
          question, separated by a single hairline divider between each
          row (no divider above the first or below the last), no card/
          bullet/icon/accordion/timeline/tabs anywhere. Heading, intro,
          and the closing statement keep their original centered max-w-3xl
          treatment; only the middle list section changed shape and, to
          let each question comfortably fit on one line, widened from
          max-w-md (448px) to max-w-5xl (1024px) — still well inside
          container-narrow's own ~1144px content box, so no outer
          container/section change was needed. Section padding/background/
          colors are untouched. */}
      {/* Bottom padding split from the original shared py-20/28/36 into its
          own reduced values (pt- unchanged) — this section's gap into
          "Explore by Topic" below was reading as an oversized ~390px dead
          zone (this section's full pb-36/144px + a spacer div + Explore-
          by-Topic's own full pt-36/144px). The spacer div is removed
          entirely and each side's own padding is cut by roughly 75-80%
          so only 32/48/64px (mobile/tablet/desktop) remains from this
          section, pairing with Explore by Topic's matching top-padding
          cut below for a combined 32/48/64px total gap. Top padding,
          content, typography, and everything else in this section is
          untouched. */}
      <section className="pt-20 md:pt-28 lg:pt-36 pb-4 md:pb-6 lg:pb-8 bg-surface-warm border-y border-border">
        <Reveal className="container-narrow">
          <div className="text-center">
            {/* Heading gets its own wider, full-bleed-style container so it
                can reach well past container-narrow's ~1144px content cap.
                h2-section's fluid clamp still climbs to 60px at desktop
                viewports independent of container width, so at ~1144px
                this line was wrapping. Breaking just the h2 out (100vw
                technique, same as ProcessPage's full-bleed card) gives it
                enough room to sit on one line at any viewport >=1280px
                without touching font-size/weight/family. xl:whitespace-nowrap
                (Tailwind's xl = 1280px, matching the desktop requirement)
                hard-guarantees no wrap from that breakpoint up; below xl it
                wraps naturally per available space (tablet/mobile,
                unchanged). The intro paragraph directly below keeps its
                original max-w-3xl centered treatment untouched. */}
            <div
              className="px-4"
              style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
            >
              <h2 className="mx-auto max-w-[1500px] h2-section text-balance xl:whitespace-nowrap">
                The principles behind predictable growth.
              </h2>
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
              Our insights focus on the questions ambitious founders ask every day.
            </p>
          </div>

          <div className="mx-auto mt-14 md:mt-16 max-w-5xl">
            {[
              "How do we become the obvious choice in our market?",
              "Why has our growth become inconsistent?",
              "How do decision-makers evaluate suppliers today?",
              "How can we enter new markets with confidence?",
              "How do we reduce dependence on referrals?",
              "How do we build trust before the first conversation?",
            ].map((q, i) => (
              <div
                key={q}
                className={`group flex items-center gap-6 md:gap-10 py-8 md:py-10 cursor-pointer transition-colors duration-300 ease-out hover:border-accent ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <span className="w-14 md:w-16 shrink-0 text-2xl md:text-3xl font-bold text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="flex-1 text-left text-xl md:text-2xl font-bold leading-snug text-foreground lg:whitespace-nowrap transition-transform duration-300 ease-out group-hover:translate-x-2">
                  {q}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-14 md:mt-16 max-w-3xl text-center text-xl font-semibold text-foreground">
            Every article is written to help you make better business decisions—not just better
            marketing decisions.
          </p>
        </Reveal>
      </section>

      {/* No spacer div here (removed) — this section's reduced bottom
          padding above and "Explore by Topic"'s reduced top padding below
          now supply a combined ~32/48/64px gap (mobile/tablet/desktop)
          directly, without an extra empty element. */}

      {/* 3. Explore by Topic */}
      <Services eyebrow={null} title={<>Explore by Topic</>} items={topics} columns="lg:grid-cols-5" wide />

      {/* Premium editorial spacer — White → Light Gray transition
          (outgoing "Explore by Topic" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      {/* 4. Featured Insights — Light Gray step of the locked background
          rhythm (already the correct color; only vertical spacing
          increased slightly per spec, py-20/28/36 → py-24/32/40 and the
          gap above the grid nudged mt-16 → mt-20). Grid layout, cards,
          and copy are untouched. */}
      <section id="featured-insights" className="py-24 md:py-32 lg:py-40 scroll-mt-24 bg-surface-gray border-y border-border">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Featured Insights</p>
          </div>
          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="mt-3 text-base text-muted-foreground leading-relaxed flex-1">{a.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Read Insight <ArrowRight className="size-4" />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Premium editorial spacer — Light Gray → Black transition
          (outgoing "Featured Insights" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-gray" />

      {/* 5. Our Philosophy — "Why Insights Matter" step of the locked
          background rhythm: Deep Black, the page's signature keynote
          moment. Editorial two-column spread (left 40% pull-quote, right
          60% supporting copy) is unchanged, as is the Reveal animation —
          only background and text-color treatment change.
          text-foreground/muted-foreground are theme classes tuned for a
          light background, so they're swapped for literal inline color
          overrides here (white for the eyebrow/pull-quote/closing line,
          #D8D8D8 soft-white for the other body lines), matching the
          pattern used on this page's other dark sections. Vertical
          spacing increased (py-14/20/24 → py-24/32/40) so it reads as a
          distinct, deliberate dark moment rather than a compact aside. */}
      <section className="py-24 md:py-32 lg:py-40 bg-deep-black">
        <div className="container-narrow">
          <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[40fr_60fr] items-start gap-y-10 lg:gap-x-16 xl:gap-x-20">
            <Reveal>
              <p className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>Our Philosophy</p>
              <p
                className="mt-5 text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold leading-[1.05] tracking-tight text-balance"
                style={{ color: "#FFFFFF" }}
              >
                We publish because informed founders make better decisions.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:pt-1">
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: "#D8D8D8" }}>
                <p>We don't publish content because algorithms reward consistency.</p>
                <p>
                  If one idea helps you avoid a costly mistake, uncover a new opportunity, or
                  rethink how your business grows, it's worth sharing.
                </p>
                <p className="font-semibold" style={{ color: "#FFFFFF" }}>
                  That's the purpose of every insight we create.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Premium editorial spacer — Black → White transition (outgoing
          "Our Philosophy" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-deep-black" />

      {/* 6. Final CTA — shared component, same on every page */}
      <HomeFinalCTA />

      {/* Premium editorial spacer — White → Black transition before the
          Footer. */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      <Footer />
    </main>
  );
}
