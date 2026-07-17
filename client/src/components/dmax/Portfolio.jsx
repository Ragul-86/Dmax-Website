import { motion } from "framer-motion";

// Verbatim from the source document — currently the only real case study
// provided ("Repeat this layout for each client" once more are available).
const caseStudy = {
  client: "Business Coach",
  challenge: "Relied entirely on referrals with no predictable inbound enquiries.",
  built: ["Personal Brand Strategy", "LinkedIn Content System", "Lead Magnet", "Email Automation", "Appointment Funnel"],
  results: ["18 Qualified Appointments", "4 New Clients", "₹12 Lakhs Revenue Generated"],
};

export function Portfolio() {
  return (
    <section id="portfolio" className="py-16 md:py-20 lg:py-28">
      <div className="container-x">
        <p className="eyebrow">Featured Success Story</p>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-8 card-lift rounded-3xl border border-border bg-card shadow-card overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="aspect-[21/9] bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 relative"
          >
            <div className="absolute inset-0 grid place-items-center px-6">
              <span className="text-5xl md:text-7xl font-bold tracking-tight text-foreground/15 text-center">
                {caseStudy.client}
              </span>
            </div>
          </motion.div>

          <div className="p-8 md:p-10 grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Client</div>
              <div className="mt-1 text-xl font-semibold">{caseStudy.client}</div>
              <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">Challenge</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">What We Built</div>
              <ul className="mt-3 space-y-1.5">
                {caseStudy.built.map((b) => (
                  <li key={b} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="mt-2 size-1 rounded-full bg-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Results in 90 Days</div>
              <ul className="mt-3 space-y-2">
                {caseStudy.results.map((r) => (
                  <li key={r} className="text-sm font-semibold text-accent">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
