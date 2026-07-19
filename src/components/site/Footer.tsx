import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Facebook, Linkedin } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-carbon/50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {SITE.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Instagram, Twitter, Youtube, Facebook, Linkedin].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground transition hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
            Legal
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="transition hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="transition hover:text-primary">Terms of Service</a></li>
            <li><a href="#" className="transition hover:text-primary">Cookie Settings</a></li>
            <li><a href="#" className="transition hover:text-primary">Press Kit</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Audi F1 Concept. A tribute project. Not affiliated with AUDI AG.</p>
          <p className="font-mono uppercase tracking-widest">
            <span className="text-primary">◉</span> Engineered in Neuburg · Raced worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
