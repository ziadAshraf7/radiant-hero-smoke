import { createFileRoute, notFound } from "@tanstack/react-router";
import { projects, services } from "@/data/site";
import { CtaBand, GoldDivider, ProjectCard } from "@/components/ui-bits";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service not found — Deco Sur" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} — Deco Sur Services` },
        { name: "description", content: service.excerpt },
        { property: "og:title", content: `${service.title} — Deco Sur Services` },
        { property: "og:description", content: service.excerpt },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const related = projects.slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[64vh] items-end pt-20">
        <img
          src={service.image}
          alt={service.title}
          width={1280}
          height={960}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/35" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-10 lg:pb-24">
          <p className="eyebrow">Service</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] md:text-6xl">{service.title}</h1>
          <GoldDivider className="mt-7" />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-14 px-6 py-24 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <div>
          <p className="eyebrow">Overview</p>
          <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">{service.excerpt}</p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            {service.description}
          </p>
        </div>
        <div>
          <p className="eyebrow">What we deliver</p>
          <div className="mt-6">
            {service.deliverables.map((d) => (
              <p key={d} className="border-b border-border py-4 text-sm">
                {d}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
          <p className="eyebrow">Related projects</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Interested in ${service.title.toLowerCase()}?`} />
    </>
  );
}
