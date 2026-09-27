import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs, images } from "@/data/site";
import { CtaBand, PageHero } from "@/components/ui-bits";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Working with Deco Sur" },
      {
        name: "description",
        content:
          "How Deco Sur projects start, how long they take and how fees are structured — the questions clients ask most.",
      },
      { property: "og:title", content: "FAQ — Working with Deco Sur" },
      { property: "og:description", content: "Process, timelines and investment, answered plainly." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState<string | null>(faqs[0]?.question ?? null);
  const visible = category === "All" ? faqs : faqs.filter((f) => f.category === category);

  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="FAQ"
        text="Straight answers on process, programme and cost."
        image={images.coastal}
      />

      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={
                c === category
                  ? "label-caps border border-accent px-5 py-3 text-accent"
                  : "label-caps border border-border px-5 py-3 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12">
          {visible.map((f) => {
            const isOpen = open === f.question;
            return (
              <div key={f.question} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : f.question)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="label-caps">{f.question}</span>
                  {isOpen ? (
                    <Minus size={16} className="shrink-0 text-accent" />
                  ) : (
                    <Plus size={16} className="shrink-0 text-accent" />
                  )}
                </button>
                {isOpen && (
                  <p className="pb-7 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand title="Still have a question?" text="Write to the studio and we will answer personally." />
    </>
  );
}
