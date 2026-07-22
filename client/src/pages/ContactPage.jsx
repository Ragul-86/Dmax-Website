import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/dmax/Navbar";
import { Contact } from "@/components/dmax/Contact";
import { Footer } from "@/components/dmax/Footer";
import { Reveal } from "@/components/dmax/Reveal";

const leaveWith = [
  "A complimentary Growth Bottleneck Assessment™",
  "Your biggest growth constraint—clearly identified.",
  "A prioritized roadmap for improving your business development system.",
  "Practical next steps you can apply immediately.",
];

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

const whoWeWorkWith = [
  "Manufacturing & Export Businesses",
  "Business Coaches & Consultants",
  "B2B Service Businesses",
  "Agencies",
  "Professional Service Firms",
];

export default function ContactPage() {
  useEffect(() => {
    document.title = "Book Your Strategy Session — DMAX";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <header className="pt-40 pb-4 container-x">
        <p className="eyebrow">Book Your Strategy Session</p>
        <h1 className="mt-4 h1-page text-balance max-w-4xl">
          Includes Your Complimentary <span className="text-accent">Growth Bottleneck Assessment™</span>
        </h1>
        <div className="mt-8 max-w-2xl space-y-3 text-lg text-muted-foreground leading-relaxed">
          <p>Every business reaches a point where working harder no longer creates better results.</p>
          <p>More marketing isn't always the answer.</p>
          <p>More sales activity isn't always the answer.</p>
          <p className="text-foreground font-semibold">
            The first step is understanding what's actually limiting your growth.
          </p>
          <p>
            In this 45-minute strategy session, we'll evaluate your business using the DMAX
            Method™ and identify the biggest opportunity to create more qualified conversations
            and more predictable revenue.
          </p>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            45 Minutes • Online • By Application
          </p>
        </div>
      </header>

      {/* What You'll Leave With — Warm White step (first band after the header) */}
      <section className="py-20 md:py-24 lg:py-32 bg-surface-warm border-y border-border">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">What You'll Leave With</h2>
          <div className="mt-6 space-y-2 text-lg text-muted-foreground leading-relaxed">
            <p>This isn't a sales presentation.</p>
            <p>It's a working session focused on your business.</p>
            <p>By the end of our conversation, you'll receive:</p>
          </div>
          <ul className="mt-6 space-y-3 text-lg">
            {leaveWith.map((l) => (
              <li key={l} className="flex items-start gap-3">
                <span className="mt-2.5 size-1.5 rounded-full bg-accent shrink-0" />
                {l}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-semibold text-foreground">
            Whether we work together or not, you'll leave with greater clarity than you arrived
            with.
          </p>
        </Reveal>
      </section>

      {/* Is This Strategy Session Right for You? — White step */}
      <section className="py-20 md:py-24 lg:py-32">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">Is This Strategy Session Right for You?</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            This session is designed for founders and business leaders who want to grow with
            intention—not guesswork. It's especially valuable if you're trying to:
          </p>
          <ul className="mt-6 space-y-3 text-lg">
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

      {/* What Happens During the Session? — Gray step */}
      <section className="py-20 md:py-24 lg:py-32 bg-surface-gray border-y border-border">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <h2 className="h2-section text-balance">What Happens During the Session?</h2>
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Business Leaders Book This Session — White step */}
      <section className="py-20 md:py-24 lg:py-32">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">Why Business Leaders Book This Session</h2>
          <p className="mt-6 text-lg text-muted-foreground">Because they're asking questions like:</p>
          <ul className="mt-6 space-y-3 text-lg">
            {whyBookQuestions.map((q) => (
              <li key={q} className="flex items-start gap-3">
                <span className="mt-2.5 size-1.5 rounded-full bg-accent shrink-0" />
                {q}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-semibold text-foreground">
            If these questions sound familiar, this strategy session was built for you.
          </p>
        </Reveal>
      </section>

      {/* Who We Work With — Gray step */}
      <section className="py-20 md:py-24 lg:py-32 bg-surface-gray border-y border-border">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">Who We Work With</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We partner with businesses where trust influences every buying decision.
          </p>
          <ul className="mt-6 space-y-3 text-lg">
            {whoWeWorkWith.map((w) => (
              <li key={w} className="flex items-start gap-3">
                <span className="mt-2.5 size-1.5 rounded-full bg-accent shrink-0" />
                {w}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted-foreground">
            If your business depends on building credibility before winning clients, you'll
            benefit from this conversation.
          </p>
        </Reveal>
      </section>

      {/* Before You Book — White step */}
      <section className="py-20 md:py-24 lg:py-32">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">Before You Book</h2>
          <div className="mt-6 space-y-2 text-lg text-muted-foreground leading-relaxed">
            <p>This strategy session is valuable because it's prepared—not improvised.</p>
            <p>Before we meet, you'll complete a short questionnaire about your business and growth goals.</p>
            <p className="text-foreground font-semibold">
              That allows us to spend our time solving problems, not collecting information.
            </p>
          </div>
        </Reveal>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
