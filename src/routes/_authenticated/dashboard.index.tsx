import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { StatusBadge, fmtDate } from "@/components/dash-ui";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Deco Sur" },
      { name: "description", content: "Your Deco Sur client overview." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardHome,
});

function DashboardHome() {
  const { user } = useSession();
  const profile = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle()).data,
  });
  const recent = useQuery({
    queryKey: ["my-testimonials", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (
        await supabase
          .from("testimonials")
          .select("*")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false })
      ).data ?? [],
  });

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Welcome to your private client area. Manage your profile and share your experience with the
          studio.
        </p>
      </div>

      <div className="border border-border bg-surface p-8">
        <h2 className="font-display text-2xl">Profile summary</h2>
        <dl className="mt-6 space-y-4 text-sm">
          <Row k="Name" v={profile.data?.full_name || "—"} />
          <Row k="Email" v={user?.email ?? "—"} />
          <Row k="Member since" v={user ? fmtDate(user.created_at) : "—"} />
          <Row k="Status" v={profile.data?.is_active === false ? "Inactive" : "Active"} />
        </dl>
        <Link to="/dashboard/profile" className="btn-ghost mt-8 inline-block">
          Manage profile
        </Link>
      </div>

      <div className="border border-border bg-surface p-8">
        <h2 className="font-display text-2xl">Recent testimonials</h2>
        {recent.data && recent.data.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">You haven't submitted any yet.</p>
        )}
        <ul className="mt-6 space-y-4">
          {recent.data?.slice(0, 3).map((t) => (
            <li key={t.id} className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="line-clamp-2 text-sm">“{t.quote}”</p>
                <p className="mt-1 text-xs text-muted-foreground">{fmtDate(t.created_at)}</p>
              </div>
              <StatusBadge status={t.status} />
            </li>
          ))}
        </ul>
        <Link to="/dashboard/testimonials" className="btn-ghost mt-8 inline-block">
          My testimonials
        </Link>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border/60 pb-3">
      <dt className="label-caps text-muted-foreground">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
