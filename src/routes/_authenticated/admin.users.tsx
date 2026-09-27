import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { adminDeleteUser } from "@/lib/accounts.functions";
import { StatCard, StatusBadge, Table, TextBtn, fmtDate } from "@/components/dash-ui";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({
    meta: [
      { title: "Admin Users — Deco Sur" },
      { name: "description", content: "Manage client accounts." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminUsers,
});

function AdminUsers() {
  const qc = useQueryClient();
  const del = useServerFn(adminDeleteUser);
  const users = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () =>
      (await supabase.from("profiles").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const list = users.data ?? [];
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-users"] });

  async function setActive(id: string, is_active: boolean) {
    await supabase.from("profiles").update({ is_active }).eq("id", id);
    refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this user permanently?")) return;
    try {
      await del({ data: { userId: id } });
      refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total users" value={list.length} />
        <StatCard label="Active" value={list.filter((u) => u.is_active).length} />
        <StatCard label="Inactive" value={list.filter((u) => !u.is_active).length} />
      </div>
      <div className="mt-10">
        <Table head={["Name", "Email", "Status", "Created", "Actions"]}>
          {list.map((u) => (
            <tr key={u.id}>
              <td className="px-4 py-3">{u.full_name || "—"}</td>
              <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
              <td className="px-4 py-3">
                <StatusBadge status={u.is_active ? "active" : "inactive"} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">{fmtDate(u.created_at)}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                {u.is_active ? (
                  <TextBtn onClick={() => setActive(u.id, false)}>Deactivate</TextBtn>
                ) : (
                  <TextBtn onClick={() => setActive(u.id, true)}>Activate</TextBtn>
                )}
                <TextBtn danger onClick={() => remove(u.id)}>Delete</TextBtn>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
