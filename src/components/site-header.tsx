import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

const nav = [
  { to: "/projects", label: "Projects" },
  { to: "/before-after", label: "Before & After" },
  { to: "/services", label: "Services" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", search: { redirect: undefined }, replace: true });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="font-display text-xl tracking-[0.3em] uppercase">
          Deco<span className="text-accent"> Sur</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="label-caps text-muted-foreground transition-colors hover:text-accent"
              activeProps={{ className: "label-caps text-accent" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="btn-ghost hidden lg:inline-flex">
            Contact
          </Link>
          {!loading &&
            (session ? (
              <>
                <Link to="/dashboard" className="btn-ghost hidden lg:inline-flex">
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="label-caps hidden text-muted-foreground transition-colors hover:text-accent lg:inline-flex"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" search={{ redirect: undefined }} className="btn-ghost hidden lg:inline-flex">
                Sign in
              </Link>
            ))}
          <button
            type="button"
            aria-label="Toggle menu"
            className="text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-5">
            {[...nav, { to: "/contact", label: "Contact" } as const].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="label-caps text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            {!loading &&
              (session ? (
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="label-caps text-accent"
                >
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" search={{ redirect: undefined }} onClick={() => setOpen(false)} className="label-caps text-accent">
                  Sign in
                </Link>
              ))}
          </div>
        </nav>
      )}
    </header>
  );
}
