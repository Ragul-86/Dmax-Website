import { useEffect } from "react";
import { Navbar } from "@/components/dmax/Navbar";
import { Process } from "@/components/dmax/Process";
import { Portfolio } from "@/components/dmax/Portfolio";
import { TrustedBrands } from "@/components/dmax/TrustedBrands";
import { HomeFinalCTA } from "@/components/dmax/HomeFinalCTA";
import { Footer } from "@/components/dmax/Footer";
import { Reveal } from "@/components/dmax/Reveal";
import { ProofCarousel } from "@/components/dmax/ProofCarousel";
import founderPortrait from "@/assets/founder-portrait.png";

// About DMAX doc — "The DMAX Method™" — five growth stages
const methodSteps = [
  { n: "01", t: "Market Position", d: "Clarify why your business deserves to be chosen." },
  { n: "02", t: "Market Visibility", d: "Become consistently visible to the right decision-makers." },
  { n: "03", t: "Market Trust", d: "Build confidence before the first conversation." },
  { n: "04", t: "Qualified Conversations", d: "Create meaningful opportunities with people who are ready to buy, partner, or collaborate." },
  { n: "05", t: "Predictable Revenue", d: "Build a business development system that compounds over time." },
];

export default function About() {
  useEffect(() => {
    document.title = "About — DMAX";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      {/* 1. Hero — reverted to original single-column design (no Founder
          image here; that now lives in its own section below). */}
      <header className="pt-40 pb-4 container-x">
        <p className="eyebrow">About DMAX</p>
        <h1 className="mt-4 h1-page text-balance max-w-4xl">
          We Didn't Start DMAX to Build <span className="text-accent">Another Marketing Agency.</span>
        </h1>
        <div className="mt-12 max-w-3xl space-y-5 text-xl text-muted-foreground leading-relaxed">
          <p>We started it because we saw something most businesses were missing.</p>
          <p>Not more leads.</p>
          <p>Not better content.</p>
          <p>A better way to earn trust.</p>
          <p className="text-foreground font-semibold">
            Because trust—not attention—is what drives modern B2B growth.
          </p>
        </div>
      </header>

      {/* 1b. Founder — new standalone section, separate from the hero above.
          Desktop: large portrait left, story right. Mobile: portrait first,
          then name/role, then story (natural DOM order, no grid reordering
          needed). Portrait uses the same soft radial-mask treatment as
          before to dissolve the photo's flat studio backdrop into the
          page's white rather than sitting in a card/frame. DMAX green is
          used once, subtly, on the role label only.

          NOTE — placeholder copy: no real founder name, title, or story
          was available, and none has been invented. Every bracketed
          [placeholder] below should be replaced with the real copy —
          nothing else in this section needs to change when you do. */}
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container-x grid lg:grid-cols-12 gap-x-16 gap-y-10 items-start">
          <Reveal className="lg:col-span-5">
            <img
              src={founderPortrait}
              alt="[Founder Name], Founder of DMAX"
              className="w-full max-w-[440px] h-auto object-contain"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 82% 90% at 50% 40%, black 62%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 82% 90% at 50% 40%, black 62%, transparent 100%)",
              }}
            />
            <div className="mt-6">
              <p className="text-lg font-semibold text-foreground">[Founder Name]</p>
              <p
                className="mt-1 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#39E600" }}
              >
                [Founder Role / Title]
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:pt-4">
            <p className="eyebrow">Founder</p>
            <h2 className="mt-4 h2-section text-balance">[Placeholder founder story headline]</h2>
            <div className="mt-8 space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                [Placeholder — replace with the founder's real story: what they were doing
                before DMAX, and the moment they realized something in B2B growth was broken.]
              </p>
              <p>
                [Placeholder — why DMAX exists: the belief or experience that shaped the DMAX
                Method™ and the kind of businesses it was built to help.]
              </p>
              <p className="text-foreground font-semibold">
                [Placeholder — a short, personal closing line in the founder's own voice.]
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. The Observation — two-column: narrative left, supporting proof-panel right */}
      <section className="py-16 md:py-20 lg:py-28 bg-secondary/40 border-y border-border">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-7">
            <h2 className="h2-section text-balance">B2B buying has changed.</h2>
            <div className="mt-8 space-y-3 text-lg text-muted-foreground leading-relaxed">
              <p>The way most businesses market hasn't.</p>
              <p>Today's decision-makers don't wait for a sales call.</p>
              <p>They research independently.</p>
              <p>They compare alternatives.</p>
              <p>They read your content.</p>
              <p>They visit your website.</p>
              <p>They ask their network.</p>
              <p>By the time they contact you, they've already formed an opinion.</p>
              <p>
                The first conversation is no longer the beginning of the buying journey.
              </p>
              <p>It's often the confirmation of a decision that's already been made.</p>
              <p className="text-foreground font-semibold">
                Businesses that understand this grow differently.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="card-metric grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-none">5+</div>
                <div className="mt-3 text-sm font-semibold text-muted-foreground">Countries Reached</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-none">26%</div>
                <div className="mt-3 text-sm font-semibold text-muted-foreground">Meeting Rate</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. The Problem */}
      <section className="py-16 md:py-20 lg:py-28">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">Great businesses are overlooked every day.</h2>
          <div className="mt-8 space-y-3 text-lg text-muted-foreground leading-relaxed">
            <p>Not because they're less capable.</p>
            <p>Because they're less visible.</p>
            <p>Less understood.</p>
            <p>Less trusted.</p>
            <p>Many businesses respond by doing more marketing.</p>
            <p>More posts.</p>
            <p>More campaigns.</p>
            <p>More outreach.</p>
            <p className="text-foreground font-semibold">
              But activity without trust creates noise—not growth.
            </p>
            <p>That's why some businesses stay busy while others become the obvious choice.</p>
          </div>
        </Reveal>
      </section>

      {/* 4. Our Belief */}
      <section className="py-16 md:py-20 lg:py-28 bg-secondary/40 border-y border-border">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">Trust is built before business is won.</h2>
          <div className="mt-8 space-y-3 text-lg text-muted-foreground leading-relaxed">
            <p>This belief shapes everything we do.</p>
            <p>We believe people don't choose the company shouting the loudest.</p>
            <p>They choose the company they understand.</p>
            <p>The company they've seen consistently.</p>
            <p>The company they already trust.</p>
            <p>That's why our work isn't about generating attention.</p>
            <p>It's about helping businesses earn confidence before they ask for commitment.</p>
            <p className="text-foreground font-semibold">
              When trust comes first, conversations become easier. When conversations improve,
              growth becomes more predictable.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 5. The DMAX Method™ */}
      <Process
        eyebrow={null}
        title={<>The DMAX Method™.</>}
        subtitle="Every business grows through the same five stages. Not because of algorithms. Because of human decision-making."
        steps={methodSteps}
      />
      <Reveal className="container-x pb-20">
        <p className="text-xl font-semibold text-center max-w-2xl mx-auto">
          This isn't a campaign. It's a growth system.
        </p>
      </Reveal>

      {/* 6. Proof — heading/copy unchanged; screenshot carousel added
          directly below, inside the same section (same bg-secondary/40
          background, no new section chrome). Note: the existing
          background here is bg-secondary/40 (a light grey tint), not
          pure white — left as-is per "do not change colors", even
          though the carousel spec assumed a white background. */}
      <section className="py-16 md:py-20 lg:py-28 bg-secondary/40 border-y border-border">
        <Reveal className="container-x max-w-3xl">
          <p className="eyebrow">Proof</p>
          <h2 className="mt-4 h2-section text-balance">
            A philosophy is only valuable if it produces results.
          </h2>
          <div className="mt-8 space-y-3 text-lg text-muted-foreground leading-relaxed">
            <p>Every engagement is measured against business outcomes—not marketing activities.</p>
            <p>That means focusing on questions like:</p>
            <p>Did your business become easier to remember?</p>
            <p>Did more qualified decision-makers engage with you?</p>
            <p>Did more meaningful conversations begin?</p>
            <p>Did your pipeline become healthier?</p>
            <p>Did growth become more predictable?</p>
            <p>
              As DMAX continues to grow, this section will showcase real client stories,
              measurable outcomes, and lessons learned from helping businesses strengthen each
              stage of the DMAX Method™.
            </p>
          </div>
        </Reveal>
        {/* Deliberately NOT container-x here — the carousel breaks out to
            full viewport width on its own (see ProofCarousel.jsx), so
            this wrapper must not cap/center it. */}
        <Reveal delay={0.15} className="mt-12">
          <ProofCarousel />
        </Reveal>
      </section>
      <Portfolio />

      {/* 7. Who We Work With */}
      <TrustedBrands
        variant="badges"
        title="Who We Work With"
        items={[
          "Manufacturers entering international markets.",
          "Business coaches building premium practices.",
          "B2B service companies creating predictable revenue pipelines.",
          "Consultants.",
          "Agencies.",
          "Founders.",
        ]}
        closing="If your business depends on credibility before commitment, you're the kind of business we built DMAX to help."
      />

      {/* 8. Why Now? */}
      <section className="py-16 md:py-20 lg:py-28">
        <Reveal className="container-x max-w-3xl">
          <h2 className="h2-section text-balance">Why Now?</h2>
          <div className="mt-8 space-y-3 text-lg text-muted-foreground leading-relaxed">
            <p>Because your competitors aren't waiting.</p>
            <p>Every day, decision-makers are forming opinions.</p>
            <p>Discovering new companies.</p>
            <p>Following new experts.</p>
            <p>Building new relationships.</p>
            <p>The question isn't whether your market is paying attention.</p>
            <p className="text-foreground font-semibold">The question is whether they're paying attention to you.</p>
            <p>The businesses that earn trust today become tomorrow's preferred choice.</p>
            <p>The businesses that wait become tomorrow's alternatives.</p>
          </div>
        </Reveal>
      </section>

      {/* 9. Final CTA — shared component, same on every page */}
      <HomeFinalCTA />
      <Footer />
    </main>
  );
}
