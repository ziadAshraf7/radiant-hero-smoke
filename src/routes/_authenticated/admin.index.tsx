import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/dash-ui";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Overview — Deco Sur" },
      { name: "description", content: "Studio statistics and quick actions." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminHome,
});

async function count(table: "profiles" | "projects" | "services" | "testimonials" | "faqs", pending = false) {
  let q = supabase.from(table).select("*", { count: "exact", head: true });
  if (pending) q = q.eq("status", "pending");
  return (await q).count ?? 0;
}

function AdminHome() {
  const stats = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [users, projects, services, testimonials, pending, faqs] = await Promise.all([
        count("profiles"),
        count("projects"),
        count("services"),
        count("testimonials"),
        count("testimonials", true),
        count("faqs"),
      ]);
      return { users, projects, services, testimonials, pending, faqs };
    },
  });
  const s = stats.data;
  const v = (n?: number) => (n === undefined ? "…" : n);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total users" value={v(s?.users)} />
        <StatCard label="Total projects" value={v(s?.projects)} />
        <StatCard label="Total services" value={v(s?.services)} />
        <StatCard label="Total testimonials" value={v(s?.testimonials)} />
        <StatCard label="Pending testimonials" value={v(s?.pending)} />
        <StatCard label="FAQs" value={v(s?.faqs)} />
      </div>
      <h2 className="mt-16 font-display text-3xl">Quick actions</h2>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link to="/admin/users" className="btn-ghost">Manage users</Link>
        <Link to="/admin/projects" className="btn-ghost">Manage projects</Link>
        <Link to="/admin/testimonials" className="btn-ghost">Manage testimonials</Link>
        <Link to="/admin/faqs" className="btn-ghost">Manage FAQs</Link>
        <Link to="/admin/services" className="btn-ghost">Manage services</Link>
      </div>
    </div>
  );
}
