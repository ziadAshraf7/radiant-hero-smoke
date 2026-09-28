import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
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
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number, el: HTMLElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div className="group bg-surface">
      <div
        className="relative aspect-[4/3] touch-none select-none overflow-hidden"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX, e.currentTarget);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX, e.currentTarget);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        style={{ cursor: "ew-resize" }}
      >
        <img
          src={after}
          alt={`${title} after`}
          loading="lazy"
          width={1280}
          height={960}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={before}
            alt={`${title} before`}
            loading="lazy"
            width={1280}
            height={960}
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>

        <span className="label-caps pointer-events-none absolute bottom-3 left-3 bg-background/70 px-3 py-1 text-muted-foreground">
          Before
        </span>
        <span className="label-caps pointer-events-none absolute bottom-3 right-3 bg-accent px-3 py-1 text-accent-foreground">
          After
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-accent"
          style={{ left: `${pos}%` }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Compare before and after: ${title}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                setPos((p) => Math.max(0, p - 2));
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                setPos((p) => Math.min(100, p + 2));
              }
            }}
            className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-accent bg-background/80 text-accent shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18-6-6 6-6" />
              <path d="m15 6 6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-6 py-6">
        <p className="label-caps">{title}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
