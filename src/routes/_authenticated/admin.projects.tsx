import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { field, Field, Table, TextBtn, fmtDate } from "@/components/dash-ui";

type P = Database["public"]["Tables"]["projects"]["Row"];
const empty = {
  title: "", description: "", category: "Residential", services: "", location: "", duration: "",
  hero_image: "", gallery: "", before_images: "", after_images: "", featured: false,
};
type Form = typeof empty;
const split = (s: string) => s.split(/[\n,]/).map((x) => x.trim()).filter(Boolean);

export const Route = createFileRoute("/_authenticated/admin/projects")({
  head: () => ({
    meta: [
      { title: "Admin Projects — Deco Sur" },
      { name: "description", content: "Manage portfolio projects." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminProjects,
});

function AdminProjects() {
  const qc = useQueryClient();
  const [form, setForm] = useState<Form | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const q = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () =>
      (await supabase.from("projects").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-projects"] });

  function open(p?: P) {
    setEditing(p?.id ?? null);
    setForm(
      p
        ? {
            title: p.title, description: p.description, category: p.category, services: p.services.join(", "),
            location: p.location, duration: p.duration, hero_image: p.hero_image, gallery: p.gallery.join("\n"),
            before_images: p.before_images.join("\n"), after_images: p.after_images.join("\n"), featured: p.featured,
          }
        : empty,
    );
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    const row = {
      ...form, services: split(form.services), gallery: split(form.gallery),
      before_images: split(form.before_images), after_images: split(form.after_images),
    };
    const { error } = editing
      ? await supabase.from("projects").update(row).eq("id", editing)
      : await supabase.from("projects").insert(row);
    if (error) return alert(error.message);
    setForm(null);
    refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    refresh();
  }
  async function toggle(p: P) {
    await supabase.from("projects").update({ featured: !p.featured }).eq("id", p.id);
    refresh();
  }
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm((f) => f && { ...f, [k]: e.target.value });

  if (form)
    return (
      <form onSubmit={save} className="grid max-w-3xl gap-10">
        <h2 className="font-display text-3xl">{editing ? "Edit project" : "Create project"}</h2>
        <fieldset className="grid gap-5">
          <p className="eyebrow">Basic information</p>
          <input required placeholder="Title" value={form.title} onChange={set("title")} className={field} />
          <textarea rows={4} placeholder="Description" value={form.description} onChange={set("description")} className={field} />
          <select value={form.category} onChange={set("category")} className={field}>
            <option className="bg-background">Residential</option>
            <option className="bg-background">Commercial</option>
          </select>
          <input placeholder="Services (comma separated)" value={form.services} onChange={set("services")} className={field} />
          <input placeholder="Location" value={form.location} onChange={set("location")} className={field} />
          <input placeholder="Duration" value={form.duration} onChange={set("duration")} className={field} />
        </fieldset>
        <fieldset className="grid gap-5">
          <p className="eyebrow">Media (image URLs, one per line)</p>
          <Field label="Hero image"><input value={form.hero_image} onChange={set("hero_image")} className={field} /></Field>
          <Field label="Gallery"><textarea rows={3} value={form.gallery} onChange={set("gallery")} className={field} /></Field>
          <Field label="Before images"><textarea rows={2} value={form.before_images} onChange={set("before_images")} className={field} /></Field>
          <Field label="After images"><textarea rows={2} value={form.after_images} onChange={set("after_images")} className={field} /></Field>
        </fieldset>
        <fieldset>
          <p className="eyebrow">Settings</p>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured
          </label>
        </fieldset>
        <div className="flex gap-4">
          <button className="btn-gold">Save project</button>
          <button type="button" className="btn-ghost" onClick={() => setForm(null)}>Cancel</button>
        </div>
      </form>
    );

  return (
    <div>
      <button className="btn-gold mb-8" onClick={() => open()}>Create project</button>
      <Table head={["Project", "Category", "Services", "Featured", "Created", "Actions"]}>
        {(q.data ?? []).map((p) => (
          <tr key={p.id}>
            <td className="px-4 py-3">{p.title}</td>
            <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
            <td className="px-4 py-3 text-muted-foreground">{p.services.join(", ")}</td>
            <td className="px-4 py-3">{p.featured ? "★" : "—"}</td>
            <td className="px-4 py-3 text-muted-foreground">{fmtDate(p.created_at)}</td>
            <td className="px-4 py-3 whitespace-nowrap">
              <TextBtn onClick={() => open(p)}>Edit</TextBtn>
              <TextBtn onClick={() => toggle(p)}>{p.featured ? "Unfeature" : "Feature"}</TextBtn>
              <TextBtn danger onClick={() => remove(p.id)}>Delete</TextBtn>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
