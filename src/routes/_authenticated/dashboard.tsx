import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardLayout,
});

const tabs = [
  { to: "/dashboard", label: "Overview", exact: true },
  { to: "/dashboard/profile", label: "Profile", exact: false },
  { to: "/dashboard/testimonials", label: "Testimonials", exact: false },
] as const;

function DashboardLayout() {
  const { user } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", search: { redirect: undefined }, replace: true });
  }

  return (
    <section className="mx-auto min-h-screen max-w-[1200px] px-6 pt-36 pb-24 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Client Area</p>
          <h1 className="mt-4 font-display text-5xl">
            Hello{user?.user_metadata?.["full_name"] ? `, ${user.user_metadata["full_name"]}` : ""}.
          </h1>
        </div>
        <button type="button" onClick={handleSignOut} className="btn-ghost">
          Sign out
        </button>
      </div>

      <nav className="mt-12 flex gap-8 border-b border-border">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            activeOptions={{ exact: tab.exact }}
            className="label-caps -mb-px border-b-2 border-transparent pb-4 text-muted-foreground transition-colors hover:text-accent"
            activeProps={{ className: "label-caps -mb-px border-b-2 border-accent pb-4 text-accent" }}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="mt-12">
        <Outlet />
      </div>
    </section>
  );
}
