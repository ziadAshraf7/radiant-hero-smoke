import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ServiceForm } from "@/components/service-form";

export const Route = createFileRoute("/_authenticated/admin/services/$id/edit")({
  head: () => ({
    meta: [
      { title: "Edit Service — Deco Sur Admin" },
      { name: "description", content: "Edit a studio service." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EditService,
});

function EditService() {
  const { id } = Route.useParams();
  const q = useQuery({
    queryKey: ["service", id],
    queryFn: async () => (await supabase.from("services").select("*").eq("id", id).maybeSingle()).data,
  });
  if (q.isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!q.data) return <p className="text-sm text-muted-foreground">Service not found.</p>;
  return (
    <div>
      <h2 className="mb-8 font-display text-3xl">Edit service</h2>
      <ServiceForm initial={q.data} />
    </div>
  );
}
