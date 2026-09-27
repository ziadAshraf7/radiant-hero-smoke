import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { field, Field } from "@/components/dash-ui";

type S = Database["public"]["Tables"]["services"]["Row"];
type Form = Omit<S, "id" | "created_at">;

const blank: Form = {
  title_en: "", description_en: "", excerpt_en: "", title_fr: "", description_fr: "", excerpt_fr: "",
  image_url: "", service_type: "interior", slug: "", is_active: true, sort_order: 0,
};

export function ServiceForm({ initial }: { initial?: S }) {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(() => {
    if (!initial) return blank;
    const { id: _i, created_at: _c, ...rest } = initial;
    return rest;
  });
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof Form) => (e: { target: { value: string } }) =>
    setForm({ ...form, [k]: k === "sort_order" ? Number(e.target.value) : e.target.value });

  async function save(e: FormEvent) {
    e.preventDefault();
    const row = { ...form, slug: form.slug || form.title_en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") };
    const { error: err } = initial
      ? await supabase.from("services").update(row).eq("id", initial.id)
      : await supabase.from("services").insert(row);
    if (err) return setError(err.message);
    navigate({ to: "/admin/services" });
  }
  async function remove() {
    if (!initial || !confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", initial.id);
    navigate({ to: "/admin/services" });
  }

  return (
    <form onSubmit={save} className="grid max-w-4xl gap-10">
      <div className="grid gap-10 md:grid-cols-2">
        <fieldset className="grid gap-5">
          <p className="eyebrow">English</p>
          <input required placeholder="Title" value={form.title_en} onChange={set("title_en")} className={field} />
          <textarea rows={2} placeholder="Excerpt" value={form.excerpt_en} onChange={set("excerpt_en")} className={field} />
          <textarea rows={5} placeholder="Description" value={form.description_en} onChange={set("description_en")} className={field} />
        </fieldset>
        <fieldset className="grid gap-5">
          <p className="eyebrow">French</p>
          <input placeholder="Titre" value={form.title_fr} onChange={set("title_fr")} className={field} />
          <textarea rows={2} placeholder="Extrait" value={form.excerpt_fr} onChange={set("excerpt_fr")} className={field} />
          <textarea rows={5} placeholder="Description" value={form.description_fr} onChange={set("description_fr")} className={field} />
        </fieldset>
      </div>
      <fieldset className="grid gap-5 md:grid-cols-2">
        <p className="eyebrow md:col-span-2">Service information</p>
        <Field label="Image URL"><input value={form.image_url} onChange={set("image_url")} className={field} /></Field>
        <Field label="Service type"><input value={form.service_type} onChange={set("service_type")} className={field} /></Field>
        <Field label="Slug"><input placeholder="auto from title" value={form.slug} onChange={set("slug")} className={field} /></Field>
        <Field label="Sort order"><input type="number" value={form.sort_order} onChange={set("sort_order")} className={field} /></Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
          Active
        </label>
      </fieldset>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-4">
        <button className="btn-gold">Save service</button>
        <button type="button" className="btn-ghost" onClick={() => navigate({ to: "/admin/services" })}>Cancel</button>
        {initial && (
          <button type="button" onClick={remove} className="label-caps ml-auto text-destructive">Delete</button>
        )}
      </div>
    </form>
  );
}
