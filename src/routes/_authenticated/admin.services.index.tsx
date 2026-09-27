import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { field, StatusBadge, Table, TextBtn } from "@/components/dash-ui";

export const Route = createFileRoute("/_authenticated/admin/services/")({
  head: () => ({
    meta: [
      { title: "Admin Services — Deco Sur" },
      { name: "description", content: "Manage studio services." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminServices,
});

function AdminServices() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [sort, setSort] = useState<"sort_order" | "title_en">("sort_order");
  const q = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => (await supabase.from("services").select("*")).data ?? [],
  });
  const list = (q.data ?? [])
    .filter((s) => s.title_en.toLowerCase().includes(search.toLowerCase()) || s.slug.includes(search.toLowerCase()))
    .filter((s) => status === "all" || (status === "active" ? s.is_active : !s.is_active))
    .sort((a, b) => (sort === "title_en" ? a.title_en.localeCompare(b.title_en) : a.sort_order - b.sort_order));

  async function toggle(id: string, is_active: boolean) {
    await supabase.from("services").update({ is_active }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-services"] });
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end gap-6">
        <input placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} className={`${field} max-w-xs`} />
        <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className={`${field} max-w-[10rem]`}>
          <option className="bg-background" value="all">All</option>
          <option className="bg-background" value="active">Active</option>
          <option className="bg-background" value="inactive">Inactive</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${field} max-w-[10rem]`}>
          <option className="bg-background" value="sort_order">Sort order</option>
          <option className="bg-background" value="title_en">Title</option>
        </select>
        <Link to="/admin/services/create" className="btn-gold ml-auto">Create service</Link>
      </div>
      <Table head={["English title", "Type", "Slug", "Status", "Order", "Actions"]}>
        {list.map((s) => (
          <tr key={s.id}>
            <td className="px-4 py-3">{s.title_en}</td>
            <td className="px-4 py-3 text-muted-foreground">{s.service_type}</td>
            <td className="px-4 py-3 text-muted-foreground">{s.slug}</td>
            <td className="px-4 py-3"><StatusBadge status={s.is_active ? "active" : "inactive"} /></td>
            <td className="px-4 py-3">{s.sort_order}</td>
            <td className="px-4 py-3 whitespace-nowrap">
              <Link to="/admin/services/$id/edit" params={{ id: s.id }} className="label-caps mr-3 text-muted-foreground hover:text-accent">
                Edit
              </Link>
              <TextBtn onClick={() => toggle(s.id, !s.is_active)}>{s.is_active ? "Deactivate" : "Activate"}</TextBtn>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
