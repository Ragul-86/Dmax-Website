import { Linkedin, Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/social";

/**
 * Sitewide floating social rail — fixed to the left edge, vertically
 * centered, mounted once in App.jsx (outside <Routes>) so it persists
 * across every page without being re-declared per-route.
 *
 * Container reuses the site's own established `.glass` utility (already
 * defined in styles.css: rgba(255,255,255,0.65) + blur(32px) saturate(200%)
 * + a hairline border, with a `.dark` variant) rather than inventing a new
 * frosted-glass recipe — same premium Apple/Linear glassmorphism language
 * used elsewhere on the site, automatically theme-aware.
 *
 * Responsive: hidden on mobile (< md) so it never obstructs small-screen
 * content, a smaller pill from md (tablet) up, full 44px icon size from lg
 * (desktop) up.
 *
 * Icon hover: fill goes DMAX green, glyph turns white, pill scales 1.08
 * and nudges 6px toward the page content (translate-x-1.5), 300ms — same
 * mechanical hover recipe as the footer's social icons, just combined with
 * the extra scale/slide motion this floating rail asked for.
 */
const items = [
  { key: "linkedin", href: SOCIAL_LINKS.linkedin, label: "DMAX on LinkedIn", Icon: Linkedin },
  { key: "instagram", href: SOCIAL_LINKS.instagram, label: "DMAX on Instagram", Icon: Instagram },
];

export function FloatingSocialBar() {
  return (
    <div
      className="glass hidden md:flex fixed left-4 lg:left-6 top-1/2 z-30 -translate-y-1/2 flex-col items-center gap-2 lg:gap-3 rounded-full p-1.5 lg:p-2 shadow-[0_8px_32px_-10px_rgba(15,15,20,0.25)]"
    >
      {items.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-9 lg:size-11 items-center justify-center rounded-full border border-border text-foreground/70 transition-all duration-300 ease-out hover:scale-[1.08] hover:translate-x-1.5 hover:border-accent hover:bg-accent hover:text-white active:scale-100"
        >
          <Icon className="size-4 lg:size-[18px]" />
        </a>
      ))}
    </div>
  );
}
