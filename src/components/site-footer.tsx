import { Link } from "@tanstack/react-router";
import { contact } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl tracking-[0.3em] uppercase">
            Deco<span className="text-accent"> Sur</span>
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Interior and exterior design studio. Bespoke interiors, timeless spaces, delivered from
            first concept to final styling.
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            <Link to="/projects" className="hover:text-accent">Projects</Link>
            <Link to="/services" className="hover:text-accent">Services</Link>
            <Link to="/before-after" className="hover:text-accent">Before &amp; After</Link>
            <Link to="/about" className="hover:text-accent">About</Link>
            <Link to="/faq" className="hover:text-accent">FAQ</Link>
          </div>
        </div>

        <div>
          <p className="eyebrow">Studio</p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            <span>{contact.address}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <Link to="/contact" className="text-accent hover:text-accent-soft">
              Start a project
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <span>© {new Date().getFullYear()} Deco Sur. All rights reserved.</span>
          <span className="label-caps">Bespoke interiors · Timeless spaces</span>
        </div>
      </div>
    </footer>
  );
}
