import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, GraduationCap, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/dmax/Navbar";
import { TrustedBrands } from "@/components/dmax/TrustedBrands";
import { HomeFinalCTA } from "@/components/dmax/HomeFinalCTA";
import { Footer } from "@/components/dmax/Footer";
import { Reveal } from "@/components/dmax/Reveal";

// DMAX Solution doc — "Choose Your Path" — three full solutions
const solutions = [
  {
    icon: Globe,
    title: "Expand into Global Markets.",
    audience: "For Manufacturing & Export Businesses",
    intro:
      "New markets don't begin with trade shows. They begin with trust. Build meaningful relationships with distributors, importers, procurement leaders, and strategic partners—before your competitors do.",
    builtFor: "Manufacturers • Exporters • Industrial Suppliers • Engineering Companies",
    achieve: [
      "Build credibility in new markets",
      "Connect with qualified international decision-makers",
      "Generate export opportunities",
      "Reduce dependence on trade fairs and referrals",
      "Create a repeatable international business development system",
    ],
    cta: "Explore Global Markets",
  },
  {
    icon: GraduationCap,
    title: "Grow Your Coaching Practice.",
    audience: "For Business Coaches",
    intro:
      "The right clients aren't looking for more coaches. They're looking for someone they can trust. Build authority that earns attention, starts conversations, and fills your calendar with qualified opportunities.",
    builtFor: "Business Coaches • Executive Coaches • Leadership Coaches • Consultants • Fitness Coaches • Life Coaching • Sales Coaching",
    achieve: [
      "Attract qualified discovery calls",
      "Build authority in your niche",
      "Create consistent demand for your coaching programs",
      "Shorten the trust-building process",
      "Grow without relying solely on referrals",
    ],
    cta: "Grow Your Practice",
  },
  {
    icon: TrendingUp,
    title: "Build a Predictable Revenue Pipeline.",
    audience: "For B2B Service Businesses",
    intro:
      "Referrals are valuable. Predictability is better. Create a system that consistently attracts decision-makers, starts qualified conversations, and generates new business opportunities.",
    builtFor: "B2B Service Businesses • Agencies • Professional Services • SaaS Companies",
    achieve: [
      "Generate qualified business conversations",
      "Build authority with decision-makers",
      "Reduce dependence on referrals",
      "Create a consistent pipeline of opportunities",
      "Scale business development with confidence",
    ],
    cta: "Build Your Pipeline",
  },
];

export default function Services() {
  useEffect(() => {
    document.title = "Services — DMAX";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      {/* 1. Hero — matches the shared wide-editorial hero system also used
          by the Method (/process) and About (/about) heroes: same
          container-narrow wrapper + pt-28/32/36 top padding, same
          max-w-[1150px]/custom-size heading treatment, same max-w-[950px]
          space-y-4 body column with a bold (not semibold) closing line.
          Only this page's own copy differs — classes are identical across
          all three so they read as one designed-together system. */}
      {/* Warm White step of the locked background rhythm — wrapped in a
          full-width bg element with container-narrow nested inside for
          padding, since applying the background straight to
          container-narrow would only paint the 1240px content box, not
          the full section width. Typography/layout inside are untouched. */}
      <header className="bg-surface-warm pb-4">
        <div className="container-narrow pt-28 md:pt-32 lg:pt-36 text-center">
          <p className="eyebrow">Services</p>
          <h1 className="mx-auto mt-5 max-w-[1150px] text-[2.25rem] md:text-[3rem] lg:text-[4.25rem] font-bold leading-[1.15] tracking-tight text-balance text-foreground">
            One System. <span className="text-accent">Three Ways to Grow.</span>
          </h1>
          <div className="mx-auto mt-8 max-w-[950px] space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>Every business is different.</p>
            <p>The way people choose isn't.</p>
            <p>Decision-makers trust businesses they know before they need them.</p>
            <p>
              That's why every DMAX solution is built on the same foundation—helping your
              business become the obvious choice before the first conversation.
            </p>
            <p className="text-foreground font-bold">
              Choose the path that matches where you want to grow.
            </p>
          </div>
        </div>
      </header>

      {/* 2–4. Expand into Global Markets / Grow Your Coaching Practice / Build a Predictable Revenue Pipeline
          — three equal-width, equal-height product cards in a clean grid.
          Each card is a flex column; the "Achieve" list carries flex-1, so
          it absorbs any leftover space and the CTA always lands on the same
          baseline across all three cards regardless of copy length. */}
      {/* Light Gray step of the locked background rhythm — separates
          this section from the Warm White hero above and lets the white
          .card-service cards stand out on their own. Padding bumped
          slightly (py-20/28/36 → py-24/32/40) per spec, layout/content
          unchanged. */}
      <section className="py-24 md:py-32 lg:py-40 bg-surface-gray border-y border-border">
        <div className="container-narrow">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`group card-service flex h-full flex-col ${
                  i === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="card-icon inline-flex size-12 items-center justify-center rounded-2xl bg-foreground text-background transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110 group-hover:-rotate-3">
                  <s.icon className="size-5" />
                </div>
                {/* Typography-only readability pass on these cards: every
                    text element bumped up the Tailwind scale (which
                    carries its paired line-height along with it, since
                    leading-snug/leading-relaxed are relative multipliers
                    that grow with font-size automatically — satisfies
                    "increase line-height proportionally" with no extra
                    classes needed). Card width/height, colors, icons,
                    the bullet dot, margins between blocks (mt-6/mt-3/
                    mt-2.5/mt-2/mt-8), and all animations are untouched.
                    Equal card heights across a row are already handled
                    by the parent grid's `items-stretch` (grid rows
                    auto-equalize to the tallest cell), so no explicit
                    height/min-height was needed even though these cards
                    now run taller. */}
                <div className="mt-6 text-base font-semibold uppercase tracking-widest text-accent">{s.audience}</div>
                <h3 className="mt-2.5 text-2xl font-semibold leading-snug">{s.title}</h3>
                <p className="mt-3 text-xl text-muted-foreground leading-relaxed">{s.intro}</p>

                <div className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Built for</div>
                <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{s.builtFor}</p>

                <div className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">What You'll Achieve</div>
                <ul className="mt-3 space-y-2 flex-1">
                  {s.achieve.map((a) => (
                    <li key={a} className="text-lg text-muted-foreground leading-relaxed flex items-start gap-2">
                      <span className="mt-2 size-1 rounded-full bg-accent shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="mt-8 pt-6 border-t border-border inline-flex items-center gap-2 text-xl font-semibold text-accent hover:brightness-110"
                >
                  {s.cta}
                  <ArrowRight className="card-arrow size-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust Comes Before Business — Deep Black step of the locked
          background rhythm. This is the page's emotional/cinematic
          storytelling moment (Apple keynote + Tony Robbins editorial),
          set against the surrounding Warm White → Light Gray → White
          rhythm. Copy, structure, and the Reveal animation are
          untouched — only background and text-color treatment change.
          text-foreground/muted-foreground are theme classes tuned for a
          light background, so they're swapped for literal inline color
          overrides here (white for the heading and the bold closing
          line, #D8D8D8 soft-white for the other body lines) — same
          pattern used elsewhere on the site for dark sections.
          Vertical spacing brought back down: an earlier pass had pushed
          this to py-28/36/44 plus oversized internal mt-10/12/16 gaps to
          "increase spacing," which ended up reading as excessive empty
          space above the heading and below the closing line. Section
          padding now matches this page's own header/cards sections
          (py-24/32/40) instead of running larger than the rest of the
          page, and the internal heading→paragraph and paragraph→
          paragraph gaps are back to the site's normal flowing-copy
          rhythm (mt-8/mt-6, with the bold mid-statement kept at mt-8 for
          a touch of emphasis, not the previous mt-16). No content,
          typography, colors, or animations were touched. */}
      <section className="py-24 md:py-32 lg:py-40 bg-deep-black">
        <Reveal className="container-narrow mx-auto max-w-[900px] text-center">
          <h2 className="h2-section text-balance" style={{ color: "#FFFFFF" }}>
            Trust comes before business.
          </h2>

          <div className="mt-8">
            <p className="text-lg leading-relaxed" style={{ color: "#D8D8D8" }}>
              Long before someone schedules a meeting…
            </p>

            <p className="mt-6 text-lg leading-relaxed text-balance" style={{ color: "#D8D8D8" }}>
              They search • They compare • They read • They observe
            </p>

            <p className="mt-8 text-lg font-bold leading-relaxed text-balance" style={{ color: "#FFFFFF" }}>
              The businesses that earn trust first are usually the businesses that win.
            </p>

            <p className="mt-6 text-lg leading-relaxed" style={{ color: "#D8D8D8" }}>
              DMAX helps you become one of them.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 6. One Framework */}
      <TrustedBrands
        variant="chips"
        heading={{ primary: "One Framework.", secondary: "Adapted to your business." }}
        items={[
          "Positioning.",
          "Authority.",
          "Thought Leadership.",
          "Strategic Relationships.",
          "Meaningful Conversations.",
          "Sustainable Growth.",
        ]}
        closing="Every solution is powered by the Founder Acquisition System™. Not separate services. One integrated system designed to help your business become the obvious choice."
      />

      {/* 7. Final CTA — shared component, same on every page */}
      <HomeFinalCTA />
      <Footer />
    </main>
  );
}
