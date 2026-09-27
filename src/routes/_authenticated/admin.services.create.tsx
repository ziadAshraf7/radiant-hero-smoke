import { createFileRoute } from "@tanstack/react-router";
import { ServiceForm } from "@/components/service-form";

export const Route = createFileRoute("/_authenticated/admin/services/create")({
  head: () => ({
    meta: [
      { title: "Create Service — Deco Sur Admin" },
      { name: "description", content: "Add a new studio service." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <div>
      <h2 className="mb-8 font-display text-3xl">Create service</h2>
      <ServiceForm />
    </div>
  ),
});
