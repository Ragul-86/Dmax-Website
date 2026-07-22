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

      {/* 1. Hero */}
      <header className="container-narrow pt-40 pb-4 text-center">
        <p className="eyebrow">Services</p>
        <h1 className="mx-auto mt-4 h1-page max-w-4xl text-balance">
          One System. <span className="text-accent">Three Ways to Grow.</span>
        </h1>
        <div className="mx-auto mt-8 max-w-2xl space-y-3 text-lg text-muted-foreground leading-relaxed">
          <p>Every business is different.</p>
          <p>The way people choose isn't.</p>
          <p>Decision-makers trust businesses they know before they need them.</p>
          <p>
            That's why every DMAX solution is built on the same foundation—helping your business
            become the obvious choice before the first conversation.
          </p>
          <p className="text-foreground font-semibold">
            Choose the path that matches where you want to grow.
          </p>
        </div>
      </header>

      {/* 2–4. Expand into Global Markets / Grow Your Coaching Practice / Build a Predictable Revenue Pipeline
          — three equal-width, equal-height product cards in a clean grid.
          Each card is a flex column; the "Achieve" list carries flex-1, so
          it absorbs any leftover space and the CTA always lands on the same
          baseline across all three cards regardless of copy length. */}
      {/* First band after the header: Warm White step of the sitewide
          background rhythm. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-warm border-y border-border">
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
                <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-accent">{s.audience}</div>
                <h3 className="mt-2.5 text-xl font-semibold leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.intro}</p>

                <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Built for</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.builtFor}</p>

                <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">What You'll Achieve</div>
                <ul className="mt-3 space-y-2 flex-1">
                  {s.achieve.map((a) => (
                    <li key={a} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                      <span className="mt-2 size-1 rounded-full bg-accent shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="mt-8 pt-6 border-t border-border inline-flex items-center gap-2 text-sm font-semibold text-accent hover:brightness-110"
                >
                  {s.cta}
                  <ArrowRight className="card-arrow size-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why It Works — White step */}
      <section className="py-20 md:py-28 lg:py-36">
        <Reveal className="container-narrow mx-auto max-w-3xl text-center">
          <h2 className="h2-section text-balance">Trust comes before business.</h2>
          <div className="mt-8 space-y-3 text-lg text-muted-foreground leading-relaxed">
            <p>Long before someone schedules a meeting…</p>
            <p>They search.</p>
            <p>They compare.</p>
            <p>They read.</p>
            <p>They observe.</p>
            <p className="text-foreground font-semibold">
              The businesses that earn trust first are usually the businesses that win.
            </p>
            <p>DMAX helps you become one of them.</p>
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
