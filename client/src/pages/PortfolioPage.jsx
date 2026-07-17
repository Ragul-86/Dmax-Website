import { useEffect } from "react";
import { Navbar } from "@/components/dmax/Navbar";
import { Portfolio } from "@/components/dmax/Portfolio";
import { Results } from "@/components/dmax/Results";
import { Testimonials } from "@/components/dmax/Testimonials";
import { CTA } from "@/components/dmax/CTA";
import { Footer } from "@/components/dmax/Footer";

export default function PortfolioPage() {
  useEffect(() => {
    document.title = "Portfolio — DMAX Case Studies";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <header className="pt-40 pb-12 container-x">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Portfolio</p>
        <h1 className="mt-4 text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-4xl">
          Work that <span className="text-accent">compounds</span>.
        </h1>
      </header>
      <Portfolio />
      <Results />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
