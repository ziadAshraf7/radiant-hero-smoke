import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, transformations } from "@/data/site";
import { BeforeAfter, CtaBand, GoldDivider } from "@/components/ui-bits";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — Deco Sur" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.name} — Deco Sur Projects` },
        { name: "description", content: project.summary },
        { property: "og:title", content: `${project.name} — Deco Sur Projects` },
        { property: "og:description", content: project.summary },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length]!;
  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const transformation = transformations[index % transformations.length]!;

  return (
    <>
      <section className="relative flex min-h-[80vh] items-end pt-20">
        <img
          src={project.image}
          alt={project.name}
          width={1280}
          height={960}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-10 lg:pb-24">
          <p className="eyebrow">{project.category}</p>
          <h1 className="mt-5 text-5xl leading-[1.05] md:text-7xl">{project.name}</h1>
          <GoldDivider className="mt-7" />
          <div className="mt-8 flex flex-wrap gap-x-14 gap-y-6">
            {[
              ["Location", project.location],
              ["Year", project.year],
              ["Area", project.area],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="label-caps text-muted-foreground">{k}</p>
                <p className="mt-2 text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-14 px-6 py-24 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <div>
          <p className="eyebrow">Overview</p>
          <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">{project.summary}</p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.overview}
          </p>
        </div>
        <div>
          <p className="eyebrow">Services applied</p>
          <div className="mt-6">
            {project.services.map((s) => (
              <p key={s} className="border-b border-border py-4 text-sm">
                {s}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-24 lg:px-10">
        <p className="eyebrow">Gallery</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {project.gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.name} detail ${i + 1}`}
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full object-cover"
            />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
          <p className="eyebrow">Before & after</p>
          <div className="mt-8 max-w-3xl">
            <BeforeAfter {...transformation} />
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-20 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <Link
          to="/projects/$id"
          params={{ id: prev.id }}
          className="label-caps flex items-center gap-3 text-muted-foreground hover:text-accent"
        >
          <ArrowLeft size={16} /> {prev.name}
        </Link>
        <Link to="/projects" className="label-caps text-accent">
          All projects
        </Link>
        <Link
          to="/projects/$id"
          params={{ id: next.id }}
          className="label-caps flex items-center gap-3 text-muted-foreground hover:text-accent"
        >
          {next.name} <ArrowRight size={16} />
        </Link>
      </section>

      <CtaBand title="Like what you see?" />
    </>
  );
}
