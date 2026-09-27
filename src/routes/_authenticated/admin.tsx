import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Deco Sur" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const tabs = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/users", label: "Users", exact: false },
  { to: "/admin/projects", label: "Projects", exact: false },
  { to: "/admin/testimonials", label: "Testimonials", exact: false },
  { to: "/admin/faqs", label: "FAQs", exact: false },
  { to: "/admin/services", label: "Services", exact: false },
] as const;

export function useIsAdmin() {
  const { user } = useSession();
  return useQuery({
    queryKey: ["is-admin", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.rpc("has_role", { _user_id: user!.id, _role: "admin" });
      return !!data;
    },
  });
}

function AdminLayout() {
  const isAdmin = useIsAdmin();

  return (
    <section className="mx-auto min-h-screen max-w-[1300px] px-6 pt-36 pb-24 lg:px-10">
      <p className="eyebrow">Studio Admin</p>
      <h1 className="mt-4 font-display text-5xl">Admin dashboard</h1>
      {isAdmin.isLoading || isAdmin.data === undefined ? (
        <p className="mt-12 text-sm text-muted-foreground">Checking access…</p>
      ) : !isAdmin.data ? (
        <div className="mt-12">
          <p className="text-sm text-muted-foreground">You don't have admin access.</p>
          <Link to="/dashboard" className="btn-ghost mt-6 inline-block">
            Back to my dashboard
          </Link>
        </div>
      ) : (
        <>
          <nav className="mt-12 flex flex-wrap gap-8 border-b border-border">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                activeOptions={{ exact: t.exact }}
                className="label-caps -mb-px border-b-2 border-transparent pb-4 text-muted-foreground hover:text-accent"
                activeProps={{ className: "label-caps -mb-px border-b-2 border-accent pb-4 text-accent" }}
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="mt-12">
            <Outlet />
          </div>
        </>
      )}
    </section>
  );
}
