import { Link } from "react-router-dom";
import { Linkedin, Instagram, ShieldCheck } from "lucide-react";
import logo from "@/assets/dmax-logo-dark.png";
import { SOCIAL_LINKS } from "@/lib/social";

// Company column trimmed to Home/About/Services/Contact only — Process,
// FAQ, and Results were removed from footer navigation per request (the
// routes themselves still exist in App.jsx and are still reachable via
// the Navbar; they're just no longer duplicated down here). No placeholder
// "#" links either (there's no standalone Privacy/Terms route, so those
// were removed rather than left as dead links; same reasoning removed the
// old YouTube/Twitter/Facebook icons that had no real profile anywhere in
// this project. LinkedIn + Instagram are DMAX's real company profiles —
// see @/lib/social.js — so those are the two icons kept here).
const companyLinks = [
  { l: "Home", to: "/" },
  { l: "About", to: "/about" },
  { l: "Services", to: "/services" },
  { l: "Contact", to: "/contact" },
];

// The three real solutions from the /services page (pages/Services.jsx's
// `solutions` array) — not invented service names. All three currently
// live on the same page (no per-solution anchor/route exists), so each
// link points to /services, same as every other real internal link here.
const serviceLinks = [
  { l: "Expand into Global Markets", to: "/services" },
  { l: "Grow Your Coaching Practice", to: "/services" },
  { l: "Build a Predictable Revenue Pipeline", to: "/services" },
];

export function Footer() {
  return (
    <footer className="relative bg-pure-black text-white">
      <div className="container-x py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <img src={logo} alt="DMAX" className="h-10 w-auto" />
          <p className="mt-6 text-sm text-white/60 max-w-sm leading-relaxed">
            We don't sell content. We don't sell outreach. We build business acquisition systems.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DMAX on LinkedIn"
              className="size-11 rounded-full border border-white/10 grid place-items-center transition-all duration-300 hover:bg-accent hover:text-white hover:border-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.94]"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DMAX on Instagram"
              className="size-11 rounded-full border border-white/10 grid place-items-center transition-all duration-300 hover:bg-accent hover:text-white hover:border-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.94]"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        <Col title="Company" items={companyLinks} />
        <Col title="Services" items={serviceLinks} />

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-widest text-white/40">Contact</div>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <a href="tel:+918667041373" className="hover:text-accent">
                +91 86670 41373
              </a>
            </li>
            <li>
              <a href="mailto:manoj@dmax.company" className="hover:text-accent">
                manoj@dmax.company
              </a>
            </li>
            <li className="text-white/60 leading-relaxed">
              No. 6, 2nd Floor,
              <br />
              Angeripalayam Road,
              <br />
              Tiruppur – 641602
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} DMAX. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5 text-accent">
            <ShieldCheck className="size-3.5" /> SSL Secured
          </span>
          <span>Made with Precision. Built for Performance.</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, items }) {
  return (
    <div className="md:col-span-2">
      <div className="text-xs uppercase tracking-widest text-white/40">{title}</div>
      <ul className="mt-5 space-y-3 text-sm text-white/70">
        {items.map((i) => (
          <li key={i.l}>
            <Link to={i.to} className="hover:text-accent transition-colors">
              {i.l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
