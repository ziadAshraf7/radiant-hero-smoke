import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Project } from "@/data/site";

export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-border" />
      <span className="h-px w-8 bg-accent" />
      <span className="h-px w-16 bg-border" />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "flex flex-col items-center text-center" : "flex flex-col"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 max-w-3xl text-4xl leading-[1.1] md:text-5xl">{title}</h2>
      <GoldDivider className={centered ? "mt-7" : "mt-7 self-start"} />
      {text && (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {text}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden pt-20">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        width={1280}
        height={960}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40" />
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="fade-up max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-5xl leading-[1.05] md:text-7xl">{title}</h1>
          <GoldDivider className="mt-7" />
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$id"
      params={{ id: project.id }}
      className="group block overflow-hidden bg-surface"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          width={1280}
          height={960}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/20 transition-opacity duration-500 group-hover:opacity-0" />
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-5">
        <div>
          <p className="label-caps">{project.name}</p>
          <p className="mt-2 text-xs text-muted-foreground">{project.category}</p>
        </div>
        <ArrowRight
          size={18}
          className="text-accent transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

export function CtaBand({
  title = "Let's design something lasting.",
  text = "Tell us about your space and we will come back with a considered first direction.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center px-6 py-24 text-center lg:px-10">
        <p className="eyebrow">Start a project</p>
        <h2 className="mt-5 max-w-2xl text-4xl leading-[1.1] md:text-5xl">{title}</h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">{text}</p>
        <Link to="/contact" className="btn-gold mt-9">
          Book a consultation <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export function BeforeAfter({
  before,
  after,
  title,
  text,
}: {
  before: string;
  after: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group bg-surface">
      <div className="grid grid-cols-2">
        <figure className="relative">
          <img src={before} alt={`${title} before`} loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover opacity-70" />
          <figcaption className="label-caps absolute bottom-3 left-3 bg-background/70 px-3 py-1 text-muted-foreground">
            Before
          </figcaption>
        </figure>
        <figure className="relative">
          <img src={after} alt={`${title} after`} loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover" />
          <figcaption className="label-caps absolute bottom-3 left-3 bg-accent px-3 py-1 text-accent-foreground">
            After
          </figcaption>
        </figure>
      </div>
      <div className="px-6 py-6">
        <p className="label-caps">{title}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
