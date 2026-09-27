import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { field, StatusBadge, Table, TextBtn } from "@/components/dash-ui";

type Faq = Database["public"]["Tables"]["faqs"]["Row"];
const empty = { question: "", answer: "", category: "General", is_published: true };

export const Route = createFileRoute("/_authenticated/admin/faqs")({
  head: () => ({
    meta: [
      { title: "Admin FAQs — Deco Sur" },
      { name: "description", content: "Manage frequently asked questions." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminFaqs,
});

function AdminFaqs() {
  const qc = useQueryClient();
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const q = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: async () => (await supabase.from("faqs").select("*").order("sort_order")).data ?? [],
  });
  const list = q.data ?? [];
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-faqs"] });

  async function save(e: FormEvent) {
    e.preventDefault();
    if (editing) await supabase.from("faqs").update(form).eq("id", editing);
    else
      await supabase
        .from("faqs")
        .insert({ ...form, sort_order: (list.at(-1)?.sort_order ?? 0) + 1 });
    setForm(empty);
    setEditing(null);
    refresh();
  }
  function edit(f: Faq) {
    setEditing(f.id);
    setForm({ question: f.question, answer: f.answer, category: f.category, is_published: f.is_published });
  }
  async function remove(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    await supabase.from("faqs").delete().eq("id", id);
    refresh();
  }
  async function move(i: number, dir: -1 | 1) {
    const a = list[i], b = list[i + dir];
    if (!a || !b) return;
    await Promise.all([
      supabase.from("faqs").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("faqs").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    refresh();
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
      <form onSubmit={save} className="flex flex-col gap-5">
        <h2 className="font-display text-2xl">{editing ? "Edit FAQ" : "Create FAQ"}</h2>
        <input required placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className={field} />
        <textarea required rows={4} placeholder="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className={field} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={field} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
          Published
        </label>
        <div className="flex gap-4">
          <button className="btn-gold">{editing ? "Save" : "Create"}</button>
          {editing && (
            <button type="button" className="btn-ghost" onClick={() => { setEditing(null); setForm(empty); }}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <Table head={["Question", "Category", "Order", "Status", "Actions"]}>
        {list.map((f, i) => (
          <tr key={f.id}>
            <td className="px-4 py-3">{f.question}</td>
            <td className="px-4 py-3 text-muted-foreground">{f.category}</td>
            <td className="px-4 py-3 whitespace-nowrap">
              <TextBtn onClick={() => move(i, -1)}>↑</TextBtn>
              <TextBtn onClick={() => move(i, 1)}>↓</TextBtn>
            </td>
            <td className="px-4 py-3"><StatusBadge status={f.is_published ? "published" : "pending"} /></td>
            <td className="px-4 py-3 whitespace-nowrap">
              <TextBtn onClick={() => edit(f)}>Edit</TextBtn>
              <TextBtn danger onClick={() => remove(f.id)}>Delete</TextBtn>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
