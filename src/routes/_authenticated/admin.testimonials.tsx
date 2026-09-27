import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { StatCard, StatusBadge, TextBtn, fmtDate } from "@/components/dash-ui";

type T = Database["public"]["Tables"]["testimonials"]["Row"];

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  head: () => ({
    meta: [
      { title: "Admin Testimonials — Deco Sur" },
      { name: "description", content: "Moderate client testimonials." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminTestimonials,
});

function AdminTestimonials() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () =>
      (await supabase.from("testimonials").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const all = q.data ?? [];
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
  const update = async (id: string, patch: Partial<T>) => {
    await supabase.from("testimonials").update(patch).eq("id", id);
    refresh();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    refresh();
  };
  const avg = all.length ? (all.reduce((s, t) => s + t.rating, 0) / all.length).toFixed(1) : "—";

  const Section = ({ title, items }: { title: string; items: T[] }) => (
    <div className="mt-12">
      <h2 className="font-display text-3xl">{title} ({items.length})</h2>
      <div className="mt-6 flex flex-col gap-4">
        {items.length === 0 && <p className="text-sm text-muted-foreground">None.</p>}
        {items.map((t) => (
          <div key={t.id} className="border border-border bg-surface p-5">
            <p className="text-sm leading-relaxed">“{t.quote}”</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <StatusBadge status={t.status} />
              {t.featured && <span className="label-caps text-accent">Featured</span>}
              <span>
                {t.author_name} · {t.project} · {"★".repeat(t.rating)} · {fmtDate(t.created_at)}
              </span>
            </div>
            <div className="mt-4">
              {t.status !== "published" && (
                <TextBtn onClick={() => update(t.id, { status: "published" })}>Approve</TextBtn>
              )}
              {t.status !== "rejected" && (
                <TextBtn onClick={() => update(t.id, { status: "rejected", featured: false })}>Reject</TextBtn>
              )}
              {t.status === "published" && (
                <TextBtn onClick={() => update(t.id, { featured: !t.featured })}>
                  {t.featured ? "Unfeature" : "Feature"}
                </TextBtn>
              )}
              <TextBtn danger onClick={() => remove(t.id)}>Delete</TextBtn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Average rating" value={avg} />
        <StatCard label="Total testimonials" value={all.length} />
        <StatCard label="Pending" value={all.filter((t) => t.status === "pending").length} />
      </div>
      <Section title="Pending" items={all.filter((t) => t.status === "pending")} />
      <Section title="Published" items={all.filter((t) => t.status === "published")} />
      <Section title="Rejected" items={all.filter((t) => t.status === "rejected")} />
    </div>
  );
}
