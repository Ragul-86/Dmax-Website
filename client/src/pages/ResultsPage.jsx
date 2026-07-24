import { useEffect } from "react";
import { Navbar } from "@/components/dmax/Navbar";
import { Results } from "@/components/dmax/Results";
import { CTA } from "@/components/dmax/CTA";
import { Footer } from "@/components/dmax/Footer";

// "The Numbers" — measured by business outcomes, not vanity metrics
const impactMetrics = [
  { value: "10L", label: "₹ Pipeline Influenced" },
  { value: "100+", label: "Qualified Business Conversations" },
  { value: "150+", label: "Decision-Maker Engagement" },
  { value: "280+", label: "Sales Opportunities Created" },
  { value: "5+", label: "Countries Reached" },
  { value: "26%", label: "Meeting Rate" },
];

export default function ResultsPage() {
  useEffect(() => {
    document.title = "Results — DMAX";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <header className="container-narrow pt-28 md:pt-32 lg:pt-36 pb-4 text-center">
        <p className="eyebrow">Results</p>
        <h1 className="mx-auto mt-4 h1-page max-w-4xl text-balance">
          Real Business Stories. Real Growth. <span className="text-accent">Real Revenue.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Every strategy is measured by business outcomes—not vanity metrics.
        </p>
      </header>

      <Results
        eyebrow={null}
        title={<>Every strategy is measured by business outcomes—not vanity metrics.</>}
        metrics={impactMetrics}
      />
      <CTA />

      {/* Premium editorial spacer — White → Black transition before the
          Footer (the header/Results/CTA sections above are all part of
          the site's "White" band — bg-background/bg-surface-warm are
          visually near-identical — so no spacer was needed between
          them). */}
      <div aria-hidden="true" className="h-14 md:h-20 lg:h-[100px] bg-background" />

      <Footer />
    </main>
  );
}
