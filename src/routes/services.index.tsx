import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { images, processSteps, services } from "@/data/site";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui-bits";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Deco Sur Design Studio" },
      {
        name: "description",
        content:
          "Interior design, exterior and facade work, custom joinery, lighting design, project management and styling by Deco Sur.",
      },
      { property: "og:title", content: "Services — Deco Sur Design Studio" },
      {
        property: "og:description",
        content: "Six disciplines, one studio: concept, detailing, delivery and styling.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Services"
        text="One studio holding design, detailing, procurement and delivery together."
        image={images.aurora}
      />

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group bg-surface"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-6 py-6">
                <p className="label-caps group-hover:text-accent">{s.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.excerpt}</p>
                <ArrowRight
                  size={16}
                  className="mt-5 text-accent transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Our approach" title="Six steps, no surprises" />
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s) => (
              <div key={s.no} className="border-t border-border pt-6">
                <p className="font-display text-3xl text-accent">{s.no}</p>
                <p className="label-caps mt-4">{s.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
