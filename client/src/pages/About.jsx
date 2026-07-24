import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import { Navbar } from "@/components/dmax/Navbar";
import { Process } from "@/components/dmax/Process";
import { TrustedBrands } from "@/components/dmax/TrustedBrands";
import { HomeFinalCTA } from "@/components/dmax/HomeFinalCTA";
import { Footer } from "@/components/dmax/Footer";
import { Reveal } from "@/components/dmax/Reveal";
import { ProofCarousel } from "@/components/dmax/ProofCarousel";
import founderPortrait from "@/assets/founder-portrait.png";

// "Proof" section — each card's title/question is the exact same six
// "Did...?" outcome questions already in this section's copy, just
// restructured from stacked sentences into a grid. Nothing invented.
const proofCards = [
  { title: "Easier to Remember", q: "Did your business become easier to remember?" },
  { title: "Qualified Decision-Makers", q: "Did more qualified decision-makers engage with you?" },
  { title: "Meaningful Conversations", q: "Did more meaningful conversations begin?" },
  { title: "Healthier Pipeline", q: "Did your pipeline become healthier?" },
  { title: "Predictable Growth", q: "Did growth become more predictable?" },
];

// "Why Now?" section — right-column flow. Same nine sentences as the
// original copy, just regrouped (one sentence, "Because your competitors
// aren't waiting.", moves to the left column's big statement instead);
// nothing reworded.
const whyNowGroups = [
  {
    type: "text",
    content:
      "Every day, decision-makers are forming opinions. Discovering new companies. Following new experts. Building new relationships.",
  },
  { type: "text", content: "The question isn't whether your market is paying attention." },
  { type: "callout", content: "The question is whether they're paying attention to you." },
  {
    type: "text",
    content:
      "The businesses that earn trust today become tomorrow's preferred choice. The businesses that wait become tomorrow's alternatives.",
  },
];

function WhyNowFlow() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 70%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-border" />
      <motion.div
        style={{ scaleY: lineScale }}
        className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-accent origin-top"
      />
      <div className="space-y-8">
        {whyNowGroups.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <span className="absolute -left-10 top-1 size-6 rounded-full ring-4 ring-background border border-border bg-background grid place-items-center">
              <span className="size-2 rounded-full bg-accent" />
            </span>
            {g.type === "callout" ? (
              <div className="rounded-2xl border-l-[3px] border-accent bg-accent/5 py-5 pl-6 pr-6">
                <p className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-balance text-foreground">
                  {g.content}
                </p>
              </div>
            ) : (
              <p className="text-lg text-muted-foreground leading-relaxed">{g.content}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// About DMAX doc — "The DMAX Method™" — five growth stages
const methodSteps = [
  { n: "01", t: "Market Position", d: "Clarify why your business deserves to be chosen." },
  { n: "02", t: "Market Visibility", d: "Become consistently visible to the right decision-makers." },
  { n: "03", t: "Market Trust", d: "Build confidence before the first conversation." },
  { n: "04", t: "Qualified Conversations", d: "Create meaningful opportunities with people who are ready to buy, partner, or collaborate." },
  { n: "05", t: "Predictable Revenue", d: "Build a business development system that compounds over time." },
];

// "The Observation" section — right-column visual. Reuses the five
// "They..." research-behavior sentences that already exist in the left
// column's copy (verbatim, not rewritten) as the steps of a vertical
// buying-journey timeline, replacing the old two-number metrics card.
const journeySteps = [
  "They research independently.",
  "They compare alternatives.",
  "They read your content.",
  "They visit your website.",
  "They ask their network.",
];

// "The Problem" section — right-column visual. "Visibility", "Trust", and
// "Growth" are drawn directly from words already in that section's own
// copy ("less visible", "less trusted", "creates noise—not growth"), not
// invented concepts — presented as the right order, in contrast to the
// "activity without trust" trap the left column describes.
const trustFlowSteps = ["Visibility", "Trust", "Growth"];

function TrustFlow() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 65%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-border" />
      <motion.div
        style={{ scaleY: lineScale }}
        className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-accent origin-top"
      />
      <div className="space-y-5">
        {trustFlowSteps.map((step, i) => {
          const isLast = i === trustFlowSteps.length - 1;
          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-border bg-card p-6 md:p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-elevation"
            >
              <span className="absolute -left-10 top-1/2 -translate-y-1/2 size-6 rounded-full ring-4 ring-background border border-border bg-background grid place-items-center text-[11px] font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className={`text-xl md:text-2xl font-bold tracking-tight ${isLast ? "text-accent" : "text-foreground"}`}
              >
                {step}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// "Our Belief" section — right-column visual. These exact five labels
// were given verbatim in the brief's own example flow, and each echoes
// this section's own copy ("...company they understand", "...already
// trust", "conversations become easier", "growth becomes more
// predictable").
const trustFrameworkSteps = ["Visibility", "Understanding", "Trust", "Conversation", "Business Growth"];

// Note: this component's marker/line colors are hardcoded for a dark
// background (deep-black ring/border/line instead of the light-theme
// defaults) since it's rendered exactly once, inside the "Our Belief"
// section below, which is now the page's Deep Black step. Not a
// reusable/shared component, so no dark-mode prop is needed.
function TrustFramework() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 65%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/15" />
      <motion.div
        style={{ scaleY: lineScale }}
        className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-accent origin-top"
      />
      <ol className="space-y-8">
        {trustFrameworkSteps.map((step, i) => {
          const isLast = i === trustFrameworkSteps.length - 1;
          return (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <span className="absolute -left-10 top-0.5 size-6 rounded-full ring-4 ring-deep-black border border-white/15 bg-white/10 grid place-items-center text-[11px] font-semibold text-accent transition-transform duration-300 group-hover:scale-110">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={`text-lg md:text-xl font-semibold tracking-tight ${isLast ? "text-accent" : ""}`}
                style={isLast ? undefined : { color: "#FFFFFF" }}
              >
                {step}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function BuyingJourney() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 65%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card">
      {/* "Buying journey" reuses the exact phrase from the left column's
          own copy ("...the beginning of the buying journey"), not an
          invented label. */}
      <p className="eyebrow">The Buying Journey</p>
      <div className="relative mt-8 pl-10">
        <div className="absolute left-[11px] top-1 bottom-1 w-[2px] bg-border" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[11px] top-1 bottom-1 w-[2px] bg-accent origin-top"
        />
        <ol className="space-y-7">
          {journeySteps.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <span className="absolute -left-10 top-0.5 size-6 rounded-full ring-4 ring-card border border-border bg-background grid place-items-center text-[11px] font-semibold text-accent transition-transform duration-300 group-hover:scale-110">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-base font-medium text-foreground leading-snug">{step}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function About() {
  useEffect(() => {
    document.title = "About — DMAX";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      {/* 1. Hero — matches the shared wide-editorial hero system also used
          by the Solutions (/services) and Method (/process) heroes: same
          container-narrow wrapper + pt-28/32/36 top padding, same
          max-w-[1150px]/custom-size heading treatment, same max-w-[950px]
          space-y-4 body column with a bold closing line. Superseded the
          earlier one-off max-w-[1450px] treatment from the previous pass
          so all three heroes are now pixel-for-pixel identical apart from
          copy — the brief's explicit priority ("only the text should
          change") outweighed that pass's literal 1400-1500px container
          target, since Method's own hero (the reference) is built on
          container-narrow (1240px), not a wider one. Green stays confined
          to "Marketing Agency." only, as set in the previous pass. */}
      {/* Warm White step of the locked background rhythm — wrapped in a
          full-width bg element with container-narrow nested inside for
          padding, since applying the background straight to
          container-narrow would only paint the 1240px content box, not
          the full section width (same fix used on the Services, Method,
          and Insights page headers). Typography/copy/layout untouched. */}
      <header className="bg-surface-warm pb-4">
        <div className="container-narrow pt-28 md:pt-32 lg:pt-36 text-center">
          <p className="eyebrow">About DMAX</p>
          <h1 className="mx-auto mt-5 max-w-[1150px] text-[2.25rem] md:text-[3rem] lg:text-[4.25rem] font-bold leading-[1.02] tracking-tight text-balance text-foreground">
            We Didn't Start DMAX to Build Another{" "}
            <span className="text-accent">Marketing Agency.</span>
          </h1>
          <div className="mx-auto mt-8 max-w-[950px] space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>We started it because we saw something most businesses were missing.</p>
            <p>Not more leads.</p>
            <p>Not better content.</p>
            <p>A better way to earn trust.</p>
            <p className="text-foreground font-bold">
              Because trust—not attention—is what drives modern B2B growth.
            </p>
          </div>
        </div>
      </header>

      {/* Premium editorial spacer — Warm White → Light Gray transition
          (outgoing header's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-warm" />

      {/* 1b. Founder — new standalone section, separate from the hero above.
          Desktop: premium leadership profile card left (42%), story right
          (58%), vertically centered against each other for an
          Apple-editorial balance. Mobile: card first, then story (natural
          DOM order, no grid reordering needed). The old "dual-card" design
          (an outer bg-white wrapper plus a separate bordered portrait
          frame) is now just ONE premium container — the Founder Image
          Card (.founder-image-card in styles.css) — holding only the
          portrait, centered with equal padding on all sides. Name/role/
          LinkedIn button sit below it as plain content, no longer enclosed
          in a card themselves. The image card's background/border/shadow
          invert between light mode (near-black card) and dark mode (white
          card) and animate smoothly (250ms ease-in-out) on theme toggle.
          Portrait image itself (src, object-fit, radial mask) is
          completely untouched — only the surrounding card structure
          changed. */}
      {/* "Our Story" step of the locked background rhythm: Very Light
          Gray — this founder-origin section is the page's own "story"
          moment, separating it from the Warm White hero above. Vertical
          spacing increased slightly (py-20/28/36 → py-24/32/40) per
          spec. Section background/copy are untouched. */}
      <section className="py-24 md:py-32 lg:py-40 bg-surface-gray border-y border-border">
        <div className="container-narrow grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-x-16 gap-y-14 lg:items-center">
          <div className="flex flex-col items-center lg:items-start">
            {/* Entrance (opacity 0→1, y 40→0, 0.8s easeOut) and hover
                (y -10px, scale 1.02, 350ms easeOut) both live on this
                outer wrapper — it's now a plain layout container (no
                bg/border/shadow of its own), just the shared width/motion
                anchor for the image card + name/role/button below it.
                `group` scopes the portrait's hover-scale to this wrapper. */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.35, ease: "easeOut" } }}
              className="group w-full max-w-[560px]"
            >
              {/* Founder Image Card — the ONE single premium container
                  (styles.css: .founder-image-card). Light mode: near-black
                  card; dark mode: white card; background/border/shadow
                  cross-fade 250ms ease-in-out on theme toggle. 24px padding
                  on every side keeps the portrait perfectly centered with
                  equal spacing. Untouched: the image itself, its object-fit,
                  and its radial mask — only the frame around it changed.
                  Always-on subtle float (y: 0 → -8 → 0, 6s, infinite,
                  ease-in-out) plus a scale-up that engages on wrapper hover. */}
              <motion.div
                className="founder-image-card aspect-[560/700] w-full overflow-hidden rounded-[32px] p-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={founderPortrait}
                  alt="Manoj Rajappan, Founder of DMAX"
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{
                    objectPosition: "bottom center",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 82% 90% at 50% 40%, black 62%, transparent 100%)",
                    maskImage:
                      "radial-gradient(ellipse 82% 90% at 50% 40%, black 62%, transparent 100%)",
                  }}
                />
              </motion.div>

              {/* Name/role/button — perfectly centered on the image card's
                  own horizontal center (this block is the exact same width
                  as the card above it), spaced 28px / 8px / 24px per spec.
                  No longer sitting inside a card, so the name now uses the
                  sitewide adaptive text-foreground token (instead of a
                  fixed near-black hex) — it needs to stay legible against
                  this section's own background in both themes, since that
                  background is light gray in light mode but near-black in
                  dark mode. Role keeps its established DMAX-green color,
                  same typography, 2px letter-spacing. */}
              <div className="mt-7 text-center">
                <p className="text-2xl font-semibold text-foreground">Manoj Rajappan</p>
                <p
                  className="mt-2 text-xs font-semibold uppercase"
                  style={{ color: "#39E600", letterSpacing: "2px" }}
                >
                  Founder & CEO
                </p>
                {/* Premium executive LinkedIn profile action — solid
                    #111111 pill (unchanged), a self-contained solid color
                    so it stays legible regardless of the section's own
                    background; still centered, auto-width. Opens the real
                    profile in a new tab with secure rel — the URL itself is
                    never shown, only the "View LinkedIn Profile" label —
                    and carries its own aria-label. Hover: background
                    brightens, pill scales to 1.04, and the LinkedIn icon
                    slides 4px right (all via the .linkedin-pill rule in
                    styles.css). */}
                <a
                  href="https://www.linkedin.com/in/manoj-rajappan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Manoj Rajappan's LinkedIn Profile"
                  className="linkedin-pill mt-6"
                >
                  <Linkedin className="size-[18px]" aria-hidden />
                  <span>View LinkedIn Profile</span>
                </a>
              </div>
            </motion.div>
          </div>

          <Reveal delay={0.1}>
            <div className="max-w-2xl">
              <p className="eyebrow">The person behind the system</p>
              <h2 className="mt-4 h2-section text-balance">
                Built from running the system, not guessing at it.
              </h2>
              <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-8">
                <p>Before DMAX, I spent three years as PA to an international family business coach.</p>
                <p>
                  Client follow-ups. Client coordination. Strategy planning for the companies he
                  advised. Tracking every client on dashboards and trackers, so nothing slipped.
                  Pulling new strategies from global companies and applying them to our
                  clients, testing what actually worked.
                </p>
                <p>
                  I watched an expert with real results struggle to be found by the right people.
                  Not because he lacked skill. Because nobody was running the system behind him.
                </p>
                <p>
                  If that sounds familiar, it should. Most coaches and consultants I talk to are
                  exactly there. Good at the work. Invisible to the people who should be hiring
                  them.
                </p>
                <p className="text-foreground font-semibold">That's the gap DMAX exists to close.</p>
                <p>
                  When I started DMAX in Tirupur, I didn't have a big-city network. Or investors.
                  I had three years of running that system for someone else, and the conviction
                  to build it for people like you.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Premium editorial spacer — Light Gray → White transition
          (outgoing Founder section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-gray" />

      {/* 2. The Observation — premium editorial split (55%/45%) instead of
          a long stacked paragraph next to a small metrics card. Left:
          same eleven sentences, regrouped into three flowing paragraphs
          plus the conclusion set apart at the bottom with a divider for
          emphasis — no wording changed. Right: the old two-number
          card-metric is gone; in its place, a vertical buying-journey
          timeline built from the same five "They..." sentences already in
          the left copy (reused verbatim as step labels), with a
          scroll-driven progress line and a per-step stagger reveal.
          Pure White step of the locked background rhythm (was Warm
          White) — now that the Founder section above carries the Light
          Gray band, this section drops to plain white/transparent
          (inherits the page's own bg-background) to keep colors from
          repeating back-to-back. */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-narrow grid lg:grid-cols-[55fr_45fr] gap-x-14 xl:gap-x-20 gap-y-14 items-start">
          <Reveal>
            <h2 className="h2-section text-balance">B2B buying has changed.</h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>The way most businesses market hasn't.</p>
              <p>
                Today's decision-makers don't wait for a sales call. They research
                independently. They compare alternatives. They read your content. They visit
                your website. They ask their network.
              </p>
              <p>
                By the time they contact you, they've already formed an opinion. The first
                conversation is no longer the beginning of the buying journey. It's often the
                confirmation of a decision that's already been made.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xl font-bold text-foreground text-balance">
                Businesses that understand this grow differently.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <BuyingJourney />
          </Reveal>
        </div>
      </section>

      {/* 3. The Problem — White step. Same editorial split as "The
          Observation" above: left column (55%) keeps the heading and
          regroups the same ten sentences into an Intro → Reasons →
          Response → Conclusion flow (no wording changed); right column
          (45%) replaces the empty whitespace with a Visibility → Trust →
          Growth flow — words already in this section's own copy — instead
          of decorative artwork. */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-narrow grid lg:grid-cols-[55fr_45fr] gap-x-14 xl:gap-x-20 gap-y-14 items-start">
          <Reveal>
            <h2 className="h2-section text-balance">Great businesses are overlooked every day.</h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>Not because they're less capable.</p>
              <p>Because they're less visible. Less understood. Less trusted.</p>
              <p>
                Many businesses respond by doing more marketing. More posts. More campaigns.
                More outreach.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <p className="text-xl font-bold text-foreground text-balance">
                But activity without trust creates noise—not growth.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                That's why some businesses stay busy while others become the obvious choice.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <TrustFlow />
          </Reveal>
        </div>
      </section>

      {/* Premium editorial spacer — White → Black transition (outgoing
          "The Problem" section's own background; no spacer was needed
          between "The Observation" and "The Problem" just above — both
          are the same transparent White band with no color change). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      {/* 4. Our Belief — Deep Black step of the locked background
          rhythm: the page's emotional storytelling / philosophy moment
          ("this belief shapes everything we do"). Same 50/50 editorial
          split as the two sections above, closing statement still
          breaks out of the columns to span the full width as the
          section's emotional takeaway — layout is untouched, only
          background and text-color treatment change. text-foreground/
          muted-foreground are theme classes tuned for a light
          background, so they're swapped for literal inline color
          overrides here (white for headings/bold lines, #D8D8D8
          soft-white for body copy), matching the pattern used on this
          site's other dark sections. Vertical spacing increased
          (py-20/28/36 → py-24/32/40, mt-16/20 closing gap → mt-20/24)
          for a more cinematic, deliberate dark moment. */}
      <section className="py-24 md:py-32 lg:py-40 bg-deep-black">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-x-14 xl:gap-x-20 gap-y-14 items-start">
            <Reveal>
              <h2 className="h2-section text-balance" style={{ color: "#FFFFFF" }}>
                Trust is built before business is won.
              </h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed" style={{ color: "#D8D8D8" }}>
                <p>This belief shapes everything we do.</p>
                <p>
                  We believe people don't choose the company shouting the loudest. They choose
                  the company they understand. The company they've seen consistently. The
                  company they already trust.
                </p>
                <p>
                  That's why our work isn't about generating attention. It's about helping
                  businesses earn confidence before they ask for commitment.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <TrustFramework />
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mx-auto mt-20 md:mt-24 max-w-3xl text-center">
            <p
              className="text-2xl md:text-[1.75rem] font-bold leading-snug tracking-tight text-balance"
              style={{ color: "#FFFFFF" }}
            >
              When trust comes first, conversations become easier. When conversations improve,
              growth becomes more predictable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Premium editorial spacer — Black → White transition (outgoing
          "Our Belief" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-deep-black" />

      {/* 5. The DMAX Method™ */}
      <Process
        eyebrow={null}
        title={<>The DMAX Method™.</>}
        subtitle="Every business grows through the same five stages. Not because of algorithms. Because of human decision-making."
        steps={methodSteps}
      />
      <Reveal className="container-narrow pb-16 md:pb-20 lg:pb-24">
        <p className="text-xl font-semibold text-center max-w-2xl mx-auto">
          This isn't a campaign. It's a growth system.
        </p>
      </Reveal>

      {/* Premium editorial spacer — White → Light Gray transition
          (outgoing Method/closing-line block's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      {/* 6. Proof — deliberately NOT another centered text section: small
          eyebrow → heading → short intro → a modular proof grid, so this
          reads as evidence/outcomes rather than another paragraph block.
          Every card's title and question is one of the same five
          "Did...?" sentences already in this section's copy (verbatim),
          just restructured — nothing rewritten or invented beyond the
          honest "Metric — coming soon" tag, which restates this
          section's own existing closing line (real client outcomes will
          be added here as DMAX grows) rather than fabricating a number.
          The LinkedIn proof carousel — reused as-is from Home, not
          redesigned — sits below the grid per the brief. Gray step of the
          background rhythm. */}
      <section className="py-20 md:py-28 lg:py-36 bg-surface-gray border-y border-border">
        <div className="container-narrow">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Proof</p>
            <h2 className="mt-4 h2-section text-balance">
              A philosophy is only valuable if it produces results.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every engagement is measured against business outcomes—not marketing activities.
              That means focusing on questions like:
            </p>
          </Reveal>

          <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 items-stretch">
            {proofCards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col justify-between rounded-[24px] border border-border bg-card p-7 md:p-8 shadow-card shadow-card-hover transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-accent"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">{c.q}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Metric — coming soon
                  </span>
                  <ArrowRight className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              As DMAX continues to grow, this section will showcase real client stories,
              measurable outcomes, and lessons learned from helping businesses strengthen each
              stage of the DMAX Method™.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-16 md:mt-20">
            <ProofCarousel />
          </Reveal>
        </div>
      </section>

      {/* Premium editorial spacer — Light Gray → White transition
          (outgoing Proof section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-gray" />

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

      {/* Premium editorial spacer — White → Light Gray transition
          (outgoing "Who We Work With" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      {/* 8. Why Now? — "Our Commitment" step of the locked background
          rhythm: Very Light Gray, a soft transition before the Final
          CTA. Asymmetric urgency layout instead of another centered
          heading + stacked paragraphs. Left (42%, sticky on desktop):
          "Why Now?" as a small kicker above one dramatically
          line-broken statement pulled from this section's own copy
          ("Because your competitors aren't waiting.") — not new text.
          Right (58%): the remaining eight sentences regrouped into
          three flowing beats beside a scroll-driven dot timeline, with
          the strongest sentence lifted into its own accent callout. No
          wording changed anywhere — only which column each sentence sits
          in, and the section's own background/spacing. Naturally leads
          into the Final CTA below. */}
      <section className="py-24 md:py-32 lg:py-40 bg-surface-gray border-y border-border">
        <div className="container-narrow grid lg:grid-cols-[42fr_58fr] gap-x-14 xl:gap-x-20 gap-y-12 items-start">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">Why Now?</p>
              <p className="mt-6 text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.05] tracking-tight text-balance text-foreground">
                Because your
                <br />
                competitors
                <br />
                aren't waiting.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <WhyNowFlow />
          </Reveal>
        </div>
      </section>

      {/* Premium editorial spacer — Light Gray → White transition
          (outgoing "Why Now?" section's own background). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-surface-gray" />

      {/* 9. Final CTA — shared component, same on every page */}
      <HomeFinalCTA />

      {/* Premium editorial spacer — White → Black transition before the
          Footer. */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      <Footer />
    </main>
  );
}
