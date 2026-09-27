import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { images, transformations } from "@/data/site";
import { BeforeAfter, CtaBand, PageHero } from "@/components/ui-bits";

export const Route = createFileRoute("/before-after")({
  head: () => ({
    meta: [
      { title: "Before & After — Deco Sur Transformations" },
      {
        name: "description",
        content:
          "See Deco Sur transformations side by side: dated rooms rebuilt into warm, layered, architectural spaces.",
      },
      { property: "og:title", content: "Before & After — Deco Sur Transformations" },
      {
        property: "og:description",
        content: "Residential and commercial transformations, shown before and after.",
      },
    ],
  }),
  component: BeforeAfterPage,
});

const filters = ["All", "Residential", "Commercial"] as const;

function BeforeAfterPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible =
    filter === "All" ? transformations : transformations.filter((t) => t.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Transformations"
        title="Before & After"
        text="The clearest way to understand what a considered renovation changes."
        image={images.afterLiving}
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

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {visible.map((t) => (
            <BeforeAfter key={t.id} {...t} />
          ))}
        </div>
      </section>

      <CtaBand title="Ready to transform your space?" />
    </>
  );
}
