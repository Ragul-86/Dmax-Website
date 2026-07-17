import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

// Verbatim from the source document. Only the 7 questions were provided —
// no answers exist yet, so this renders as a plain list (no accordion).
const faqs = [
  "How long does it take?",
  "Do I need to create content myself?",
  "What if I don't have a large audience?",
  "Will this work for my industry?",
  "Do you guarantee results?",
  "What makes DMAX different?",
  "Do you manage everything?",
];

export function FAQ() {
  return (
    <section className="py-32 bg-secondary/40 border-y border-border">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 h2-section text-balance">FAQs</h2>
          <p className="mt-5 text-muted-foreground">
            Still curious? Email{" "}
            <a className="text-foreground underline underline-offset-4" href="mailto:manoj@dmaxnow.com">
              manoj@dmaxnow.com
            </a>
            .
          </p>
        </Reveal>
        <div className="lg:col-span-7">
          <ul className="w-full">
            {faqs.map((q, i) => (
              <motion.li
                key={q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                className="border-b border-border py-6 text-left text-lg font-semibold"
              >
                {q}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
