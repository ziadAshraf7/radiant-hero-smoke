import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { field, StatusBadge, fmtDate } from "@/components/dash-ui";

export const Route = createFileRoute("/_authenticated/dashboard/testimonials")({
  head: () => ({
    meta: [
      { title: "My Testimonials — Deco Sur" },
      { name: "description", content: "Submit and track your testimonials." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardTestimonials,
});

function DashboardTestimonials() {
  const { user } = useSession();
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"all" | "pending" | "published">("all");
  const [form, setForm] = useState({ project: "", quote: "", rating: 5 });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const list = useQuery({
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    setMsg(null);
    const { error } = await supabase.from("testimonials").insert({
      user_id: user.id,
      author_name: (user.user_metadata?.["full_name"] as string) || user.email || "Client",
      project: form.project.trim(),
      quote: form.quote.trim(),
      rating: form.rating,
    });
    setBusy(false);
    if (error) return setMsg(error.message);
    setForm({ project: "", quote: "", rating: 5 });
    setMsg("Thank you — your testimonial is pending review.");
    qc.invalidateQueries({ queryKey: ["my-testimonials"] });
  }

  const items = (list.data ?? []).filter((t) => filter === "all" || t.status === filter);

  return (
    <div className="grid gap-16 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-3xl">Add testimonial</h2>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <input
            required
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            placeholder="Project or room"
            className={field}
          />
          <textarea
            required
            rows={4}
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            placeholder="Your testimonial"
            className={field}
          />
          <div>
            <p className="label-caps text-muted-foreground">Rating</p>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className={`text-2xl ${n <= form.rating ? "text-accent" : "text-muted-foreground"}`}
                  aria-label={`${n} stars`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          {msg && <p className="text-sm text-accent">{msg}</p>}
          <button type="submit" disabled={busy} className="btn-gold self-start disabled:opacity-60">
            {busy ? "Sending…" : "Submit testimonial"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-display text-3xl">My testimonials</h2>
        <div className="mt-6 flex gap-6">
          {(["all", "pending", "published"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`label-caps ${filter === f ? "text-accent" : "text-muted-foreground"}`}
            >
              {f} ({(list.data ?? []).filter((t) => f === "all" || t.status === f).length})
            </button>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-6">
          {items.length === 0 && <p className="text-sm text-muted-foreground">Nothing here yet.</p>}
          {items.map((t) => (
            <blockquote key={t.id} className="border-l-2 border-accent pl-6">
              <p className="text-sm leading-relaxed text-muted-foreground">“{t.quote}”</p>
              <footer className="mt-3 flex items-center gap-3">
                <StatusBadge status={t.status} />
                <span className="text-xs text-muted-foreground">
                  {t.project} · {"★".repeat(t.rating)} · {fmtDate(t.created_at)}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}
