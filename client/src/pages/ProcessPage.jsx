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
          <h1 className="mx-auto mt-5 max-w-[1150px] text-[2.25rem] md:text-[3rem] lg:text-[4.25rem] font-bold leading-[1.02] tracking-tight text-balance text-foreground">
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

      {/* Premium editorial spacer — Warm White → Light Gray transition
          (outgoing header's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-warm" />

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
              {/* Typography-only pass on these 5 cards: every element bumped
                  up the scale while keeping the same relative hierarchy —
                  title (now text-3xl) > quote/question (text-2xl) > intro
                  lead (text-lg, newly given an explicit size — it had none
                  before) > problem-label/bullets/closing (text-base, up
                  from text-sm) > step number (text-sm, up from text-xs).
                  Closing also gets font-bold (was font-semibold) per the
                  brief. Paragraph-to-paragraph gaps (mt-5→mt-6, mt-3→mt-4)
                  and bullet-to-bullet gap (space-y-1.5→space-y-2.5) opened
                  up slightly for breathing room; leading-relaxed added to
                  the label/closing lines so multi-line wraps get the same
                  more-generous line-height as the rest of the card. Grid
                  split (col-span-4/8), card padding/border/shadow/bg, and
                  the entrance animation are all untouched. */}
              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <div className="text-sm font-semibold text-accent">{s.n}</div>
                  <h3 className="mt-2 text-3xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-2xl font-medium leading-snug text-foreground">{s.quote}</p>
                </div>
                <div className="md:col-span-8">
                  <p className="text-lg leading-relaxed text-muted-foreground">{s.lead}</p>
                  <p className="mt-6 text-base font-semibold leading-relaxed text-foreground">{s.problemLabel}</p>
                  <ul className="mt-4 space-y-2.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-base text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="mt-2.5 size-1 rounded-full bg-accent shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {s.closing && (
                    <p className="mt-6 text-base font-bold leading-relaxed text-foreground">{s.closing}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium editorial spacer — White → Black transition (outgoing
          expanded stage-detail cards section's own background; no
          spacer was added right above between the "Growth Bottleneck"
          heading and the Process timeline, or between the timeline and
          these stage-detail cards — both pairs are explicitly documented
          in this file as designed to read as one continuous flow, not
          separate chapters, so they're treated the same way the site's
          other intentionally-fused same-background bands are). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      {/* "Every Stage Builds the Next" — LAYOUT REDESIGN per the latest
          brief: this is no longer a two-column (image | copy) row. It's
          now one large image "canvas" with the copy overlaid on top of
          it (upper-right), like an Apple/SpaceX story panel — but the
          astronaut is still a real <img> element, not a CSS
          background-image, per the brief's explicit "don't use the image
          as the section background" constraint. A dark gradient (peaking
          ~60% black, concentrated behind the text, fading to fully clear
          toward the bottom-left where the astronaut reads unobstructed)
          sits between the image and the text purely for legibility.
          Content, wording, and every individual animation primitive
          (the image's own fade+slide-in motion.div, the text's Reveal
          fade-up, each statement row's staggered fade-up) are all kept
          exactly as they were — only their layout/positioning classes
          changed. Below md, there isn't room to overlay this much copy
          legibly on top of an image, so it gracefully falls back to the
          original stacked order (image, then text below it) with no
          overlay/gradient — still the same content and animations, just
          not layered. Only this section was touched; every other section
          on this page is untouched. */}
      <section className="py-24 md:py-32 lg:py-40 bg-deep-black overflow-hidden">
        {/* Container widened: container-narrow (1144px content) was still
            leaving visible side margins. This card now uses the same
            full-bleed technique as the ProofCarousel elsewhere on the
            site (100vw + negative auto-margins to break out of the
            centered layout), with only a small px gutter left — 95-98%
            of the viewport instead of container-narrow's ~1144px cap, so
            the card reads as edge-to-edge. Scoped to just this card; every
            other section on this page keeps container-narrow untouched. */}
        <div
          className="px-4 sm:px-6 lg:px-8"
          style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
        >
          {/* BUG FIX: the previous pass made this a flex container
              (md:flex md:items-center md:justify-end) and turned the text
              into a plain, non-positioned flex child so it would grow
              safely with content — but that's what made it vanish. Per
              CSS stacking rules, positioned elements (the image and
              gradient below, both md:absolute) always paint *after*, and
              therefore on top of, any non-positioned/static sibling in
              the same stacking context — regardless of DOM order. With
              the text left as position:static, the absolute image (and
              especially the absolute gradient) were painting over it
              completely. Fixed by giving the text its own explicit
              position:absolute + z-index (see below) so it's back in the
              same stacking mechanism as its siblings, just on top of them
              this time — exactly image z-1 / overlay z-10, as specced. */}
          <div className="relative overflow-hidden rounded-3xl bg-deep-black md:min-h-[760px] lg:min-h-[880px] xl:min-h-[960px]">
            {/* Image — a standalone <img>, not a background-image. Fills
                the entire card: width:100%, height:100%, object-fit:cover
                — laid out normally on mobile (stacked above the text,
                untouched) and switched to fully filling the whole
                "canvas" box (`md:absolute md:inset-0`) from md up.
                Explicit z-[1] — the base layer. Same fade+slide-in-from-
                left entrance as before. */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              // min-h on the mobile-only branch (overridden by md:absolute
              // md:inset-0 from md up, where the card's own min-h governs
              // instead): the image has no HTML width/height attributes,
              // so below md it was sized purely by its own intrinsic
              // dimensions once loaded — a real CLS source, jumping from
              // 0 height to full height as it comes in. This reserves a
              // reasonable floor up front so the page doesn't visibly hop.
              className="min-h-[220px] sm:min-h-[280px] md:absolute md:inset-0 md:z-[1] md:min-h-0"
            >
              <img
                src={methodGrowthJourney}
                alt="An astronaut walking beside a rising line of glowing growth milestones"
                className="w-full h-auto rounded-3xl md:h-full md:w-full md:object-cover"
                style={{ filter: "brightness(1.05) contrast(1.05)" }}
              />
            </motion.div>

            {/* Dark gradient overlay — switched from the old diagonal
                (aimed at a right-anchored column) to a centered radial
                fade, matching the text's new centered position: 40-60%
                black concentrated behind the middle of the image, fading
                to fully transparent toward all four edges so the
                astronaut and any glowing pathway/icon nearer the edges
                stay clearly visible. Sits just above the image (z-[2])
                but still well below the text (z-10). Desktop/tablet (md+)
                only — on the mobile stacked layout the text isn't on top
                of the image, so no overlay is needed there. */}
            <div
              aria-hidden
              className="hidden md:block md:absolute md:inset-0 md:z-[2] md:rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 62% 58% at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.15) 68%, rgba(0,0,0,0) 85%)",
              }}
            />

            {/* Text — rebuilt into a true editorial two-column layout per
                the latest brief (no longer a single centered column).
                Outer position/size unchanged: still position:absolute +
                z-10 above the image (z-1) and gradient (z-2), still
                vertically centered on the image via top-1/2/
                -translate-y-1/2, still the same w-[80%] max-w-[1000px]
                box sitting in the gradient's darkened middle — so the
                background image, its size/position, and the overlay are
                completely untouched; only what's rendered *inside* this
                box changed. text-center removed in favor of explicit
                text-left throughout, since every element is now left-
                aligned within its column instead of centered. */}
            <Reveal className="mt-8 md:mt-0 md:absolute md:z-10 md:inset-x-0 md:mx-auto md:top-1/2 md:-translate-y-1/2 md:w-[80%] md:max-w-[1000px] md:px-6 md:py-8 lg:px-8 lg:py-11 xl:px-10 xl:py-14">
              <p className="eyebrow text-left" style={{ color: "rgba(255,255,255,0.55)" }}>
                The DMAX Method™
              </p>
              <h2 className="mt-4 h2-section text-balance text-left" style={{ color: "#FFFFFF" }}>
                Every stage builds the next.
              </h2>

              {/* Two-column body. items-center vertically centers the
                  left/right column blocks against each other (per spec)
                  even though they're different heights. Gap: gap-x-12
                  (48px) at the md/tablet tier — "reduce spacing while
                  maintaining two columns" — stepping up to gap-x-20/24
                  (80/96px) at lg/xl, inside the requested 80-120px
                  desktop range. Below md, grid-cols-1 (default) stacks
                  the right column under the left one in source order,
                  with gap-y-10 between them. */}
              <div className="mt-10 md:mt-12 grid md:grid-cols-2 gap-y-10 md:gap-x-12 lg:gap-x-20 xl:gap-x-24 md:items-center">
                {/* LEFT COLUMN — rebuilt per the latest brief: the
                    framework line was one long wrapping sentence, which
                    read as cramped/unbalanced next to the right column.
                    Now each stage is its own line with a leading accent-
                    colored arrow (the "stacked, arrow-led" option from
                    the brief — cleaner than a horizontal chain at this
                    column width), space-y-3 between stages (was none,
                    since it used to be one run-on line), and font-bold
                    (was font-semibold — "increase font weight slightly").
                    Supporting sentence sits 40px below the flow (mt-10).
                    Text/copy, color, and the section's single Reveal
                    fade-up (no new per-line animation added) are
                    unchanged; only this column's internal markup. */}
                <div className="text-left">
                  <div className="space-y-3">
                    {[
                      "Market Position",
                      "Market Visibility",
                      "Market Trust",
                      "Qualified Conversations",
                      "Predictable Revenue",
                    ].map((stage, i) => (
                      <div key={stage} className="text-lg font-bold" style={{ color: "#FFFFFF" }}>
                        {i > 0 && (
                          <span aria-hidden style={{ color: "var(--color-accent)" }}>
                            →{" "}
                          </span>
                        )}
                        {stage}
                      </div>
                    ))}
                  </div>
                  <p className="mt-10 text-lg leading-relaxed" style={{ color: "#D8D8D8" }}>
                    Most businesses try to jump straight to lead generation.
                  </p>
                </div>

                {/* RIGHT COLUMN — "We don't." as this column's own heading,
                    then the four accent-marked statements directly under
                    it, all left-aligned so the bullet rows sit flush
                    under the heading (each row's own marker+gap-3 gives
                    the bullet text its natural, expected slight indent). */}
                <div className="text-left">
                  <p className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
                    We don't.
                  </p>
                  <div className="mt-6 space-y-5">
                    {[
                      "Because without positioning, visibility creates noise.",
                      "Without visibility, trust never develops.",
                      "Without trust, conversations rarely become business.",
                      "Growth isn't built by chasing tactics.",
                    ].map((line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-3"
                      >
                        <span aria-hidden className="mt-[2px] text-base leading-none" style={{ color: "var(--color-accent)" }}>
                          ✦
                        </span>
                        <p className="text-lg leading-relaxed text-left" style={{ color: "#D8D8D8" }}>
                          {line}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BOTTOM — closing statement, centered below both columns
                  (this one element stays centered per the brief; the rest
                  of the section is left-aligned). */}
              <div className="mt-10 md:mt-12 flex justify-center">
                <div className="relative pl-5">
                  <span aria-hidden className="absolute left-0 top-0.5 bottom-0.5 w-[3px] rounded-full bg-accent" />
                  <p className="text-lg font-bold leading-relaxed text-left" style={{ color: "#FFFFFF" }}>
                    It's built by strengthening each stage of the system.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Premium editorial spacer — Black → White transition (outgoing
          "Every stage builds the next" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-deep-black" />

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

      {/* Premium editorial spacer — White → Black transition before the
          Footer. */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      <Footer />
    </main>
  );
}
