import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/dmax-logo-official.png";
import logoDark from "@/assets/dmax-logo-dark.png";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Home", to: "/" },
  { label: "Solutions", to: "/services" },
  { label: "Method", to: "/process" },
  { label: "Insights", to: "/faq" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/75 backdrop-blur-xl border-b border-foreground/5"
            : "bg-transparent"
        }`}
      >
        <nav className="container-x flex h-20 items-center justify-between">
          <Link to="/" aria-label="DMAX home" onClick={() => setOpen(false)} className="inline-flex items-center">
            <img src={logo} alt="DMAX" className="h-7 md:h-8 w-auto block dark:hidden" />
            <img src={logoDark} alt="DMAX" className="h-7 md:h-8 w-auto hidden dark:block" />
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-foreground/70">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end
                  className={({ isActive }) =>
                    `relative py-1 transition-colors hover:text-foreground after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 ${
                      isActive ? "text-foreground after:scale-x-100" : "hover:after:scale-x-100"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <Link
              to="/contact"
              className="hidden lg:inline-flex group items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-foreground/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              Book a Strategy Call
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-background/60 backdrop-blur-md transition-all duration-300 hover:border-foreground/25 active:scale-[0.94]"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu — premium glass overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/85 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative pt-28 px-6 pb-10 flex flex-col h-full"
            >
              <ul className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-3xl font-semibold tracking-tight text-foreground border-b border-foreground/10"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-10 btn-primary"
              >
                Book a Strategy Call <ArrowRight className="size-4" />
              </Link>
              <p className="mt-auto pt-10 text-xs text-muted-foreground">
                © {new Date().getFullYear()} DMAX
              </p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
