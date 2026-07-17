import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Youtube, Facebook, ShieldCheck } from "lucide-react";
import logo from "@/assets/dmax-logo-dark.png";

export function Footer() {
  return (
    <footer className="relative bg-ink text-white">
      <div className="container-x py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <img src={logo} alt="DMAX" className="h-10 w-auto" />
          <p className="mt-6 text-sm text-white/60 max-w-sm leading-relaxed">
            We don't sell content. We don't sell outreach. We build business acquisition systems.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: Linkedin, name: "LinkedIn" },
              { Icon: Instagram, name: "Instagram" },
              { Icon: Youtube, name: "YouTube" },
              { Icon: Twitter, name: "Twitter" },
              { Icon: Facebook, name: "Facebook" },
            ].map(({ Icon, name }) => (
              <a
                key={name}
                href="#"
                aria-label={`DMAX on ${name}`}
                className="size-11 rounded-full border border-white/10 grid place-items-center transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.94]"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <Col
          title="Company"
          items={[
            { l: "About", to: "/about" },
            { l: "Results", to: "/results" },
            { l: "Process", to: "/process" },
            { l: "Contact", to: "/contact" },
          ]}
        />
        <Col
          title="Services"
          items={[
            { l: "Expand into Global Markets", to: "/services" },
            { l: "Grow Your Coaching Practice", to: "/services" },
            { l: "Build a Predictable Revenue Pipeline", to: "/services" },
            { l: "FAQ", to: "/faq" },
          ]}
        />

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-widest text-white/40">Contact</div>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>+91 86670 41373</li>
            <li>
              <a href="mailto:manoj@dmaxnow.com" className="hover:text-accent">
                manoj@dmaxnow.com
              </a>
            </li>
            <li className="text-white/60 leading-relaxed">
              No. 6, 2nd Floor,
              <br />
              Angeripalayam Rd,
              <br />
              Tirupur – 641602
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} DMAX. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-accent">
              <ShieldCheck className="size-3.5" /> SSL Secured
            </span>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
          </div>
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
