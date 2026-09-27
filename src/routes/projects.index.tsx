import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { images, projects } from "@/data/site";
import { CtaBand, PageHero, ProjectCard } from "@/components/ui-bits";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Deco Sur Interior Design Studio" },
      {
        name: "description",
        content:
          "Selected residential and commercial interiors by Deco Sur — apartments, villas, wellness and hospitality spaces.",
      },
      { property: "og:title", content: "Projects — Deco Sur Interior Design Studio" },
      {
        property: "og:description",
        content: "Browse the Deco Sur portfolio of bespoke residential and commercial interiors.",
      },
    ],
  }),
  component: ProjectsPage,
});

const filters = ["All", "Residential", "Commercial"] as const;

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects"
        text="Every space here was designed, detailed and delivered by the studio."
        image={images.warmLuxury}
      />

      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
        <div className="flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={
                f === filter
                  ? "label-caps border border-accent px-5 py-3 text-accent"
                  : "label-caps border border-border px-5 py-3 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <CtaBand title="Your project could be next." />
    </>
  );
}
