import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import astronaut from "@/assets/astronaut.png";

export function CTA({
  title = (
    <>
      Ready to Build a Client Acquisition System That{" "}
      <span className="text-accent">Compounds Every Week</span>?
    </>
  ),
  paragraph = "Every month you delay is another month your competitors strengthen their authority while potential clients overlook your business. Let's build a LinkedIn system that creates lasting visibility, stronger relationships, and predictable revenue.",
  buttonLabel = "Book Your Free Strategy Call Today.",
  showEmail = true,
}) {
  return (
    <section className="pt-24 pb-20">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-[36px] scene-dark dark:scene-light p-10 md:p-16 text-white dark:text-graphite shadow-elevation">
          <div className="stars stars-force absolute inset-0 opacity-60 dark:hidden" aria-hidden />
          <div className="grid md:grid-cols-12 gap-10 items-center relative">
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance leading-[1.05] text-white dark:text-graphite">
                {title}
              </h2>
              {paragraph && (
                <p className="mt-5 max-w-xl text-lg text-white/80 dark:text-graphite/75">{paragraph}</p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="group btn-accent">
                  {buttonLabel}
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                {showEmail && (
                  <a
                    href="mailto:manoj@dmax.company"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 dark:border-black/15 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:bg-white/5 dark:hover:bg-black/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white dark:text-graphite"
                  >
                    manoj@dmax.company
                  </a>
                )}
              </div>
            </div>
            <div className="md:col-span-4 relative hidden md:block h-72">
              <img
                src={astronaut}
                alt=""
                aria-hidden
                loading="lazy"
                className="float-slow absolute inset-0 m-auto h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
