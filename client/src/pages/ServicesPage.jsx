import { useEffect } from "react";
import { Navbar } from "@/components/dmax/Navbar";
import { Services } from "@/components/dmax/Services";
import { Process } from "@/components/dmax/Process";
import { CTA } from "@/components/dmax/CTA";
import { Footer } from "@/components/dmax/Footer";

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Services — DMAX Performance Marketing";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <header className="pt-40 pb-12 container-x">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Services</p>
        <h1 className="mt-4 text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-4xl">
          Six disciplines, <span className="text-accent">one revenue system</span>.
        </h1>
      </header>
      <Services />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}
