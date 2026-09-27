import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Armchair, Leaf, Box, Circle } from "lucide-react";
import { useEffect } from "react";
import {
  images,
  projects,
  services,
  expertise,
  processSteps,
  transformations,
  testimonials,
  faqs,
} from "@/data/site";
import {
  BeforeAfter,
  CtaBand,
  GoldDivider,
  ProjectCard,
  SectionHeading,
} from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deco Sur — Bespoke Interiors, Timeless Spaces" },
      {
        name: "description",
        content:
          "Deco Sur designs beautiful, functional interiors and exteriors tailored to your lifestyle — residential and commercial, concept to completion.",
      },
      { property: "og:title", content: "Deco Sur — Bespoke Interiors, Timeless Spaces" },
      {
        property: "og:description",
        content: "A premium interior and exterior design studio. Design. Craft. Inspire.",
      },
       { property: "og:type", content: "website" },
       { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const features = [
  { Icon: Armchair, title: "Bespoke Design", text: "Custom interiors designed around you." },
  { Icon: Leaf, title: "Quality Craftsmanship", text: "Premium materials and attention to every detail." },
  { Icon: Box, title: "End-to-End Service", text: "From concept to completion, we handle everything." },
  { Icon: Circle, title: "Timeless Elegance", text: "Spaces that are beautiful today and for years to come." },
];

function ScrollReveals() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    document.body.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      document.body.classList.remove("motion-ready");
    };
  }, []);

  return null;
}

function Home() {
  return (
    <>
      <ScrollReveals />
      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative grid min-h-[78vh] grid-cols-2 overflow-hidden lg:grid-cols-[35fr_30fr_35fr]">
          <div className="hero-visual hero-visual-left absolute inset-y-0 left-0 w-1/2 overflow-hidden lg:relative lg:inset-auto lg:order-1 lg:w-auto">
            <img
              src={images.heroLiving}
              alt="Warm neutral living room with layered cushions and wood-slat wall"
              width={1024}
              height={1536}
              className="hero-focus h-full w-full object-cover"
            />
            <div className="hero-opacity-cover absolute inset-0" />
            <div className="hero-smoke" aria-hidden="true">
              <span className="hero-smoke-wisp hero-smoke-wisp-one" />
              <span className="hero-smoke-wisp hero-smoke-wisp-two" />
              <span className="hero-smoke-wisp hero-smoke-wisp-three" />
            </div>
          </div>

          <div className="relative z-10 col-span-2 flex flex-col items-center justify-center px-6 py-20 text-center lg:order-2 lg:col-span-1 lg:py-0">
            <div className="hero-copy-reveal flex flex-col items-center">
              <p className="eyebrow">Bespoke Interiors • Timeless Spaces</p>
              <h1 className="mt-8 text-6xl leading-[1.05] md:text-7xl">
                Design.
                <br />
                Craft.
                <br />
                Inspire.
              </h1>
              <GoldDivider className="mt-9" />
              <p className="mt-7 max-w-xs text-sm leading-relaxed text-muted-foreground">
                We create beautiful, functional spaces tailored to your lifestyle and vision.
              </p>
              <Link to="/projects" className="btn-gold mt-10">
                View our projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hero-visual hero-visual-right absolute inset-y-0 right-0 w-1/2 overflow-hidden lg:relative lg:inset-auto lg:order-3 lg:w-auto">
            <img
              src={images.heroKitchen}
              alt="Moody kitchen with marble waterfall island and pendant lighting"
              loading="lazy"
              width={1024}
              height={1536}
              className="hero-focus hero-focus-delayed h-full w-full object-cover"
            />
            <div className="hero-opacity-cover absolute inset-0" />
            <div className="hero-smoke" aria-hidden="true">
              <span className="hero-smoke-wisp hero-smoke-wisp-one" />
              <span className="hero-smoke-wisp hero-smoke-wisp-two" />
              <span className="hero-smoke-wisp hero-smoke-wisp-three" />
            </div>
          </div>
        </div>

        {/* Bottom band */}
        <div className="border-t border-border bg-background">
          <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-14 lg:grid-cols-2 lg:px-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
              {features.map(({ Icon, title, text }) => (
                <div key={title} data-reveal className="reveal-rise reveal-stagger">
                  <Icon size={22} strokeWidth={1} className="text-accent" />
                  <p className="label-caps mt-5">{title}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            <div className="-mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
              {projects.map((p) => (
                <div key={p.id} data-reveal className="reveal-image reveal-stagger w-56 shrink-0 snap-start lg:w-auto">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-[1600px] px-6 pb-8 lg:px-10">
            <p className="label-caps text-muted-foreground/60">Scroll to explore</p>
            <span className="mt-3 block h-10 w-px bg-border" />
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section data-reveal className="reveal-rise mx-auto max-w-[1600px] px-6 py-28 lg:px-10">
        <SectionHeading
          eyebrow="Selected work"
          title="A portfolio built on restraint"
          text="Residential and commercial interiors where materials, light and proportion do the talking."
        />
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <div key={p.id} data-reveal className="reveal-image reveal-stagger">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link to="/projects" className="btn-ghost">
            All projects <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Expertise */}
      <section data-reveal className="reveal-rise border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Our expertise"
            title="Four disciplines, one studio"
            text="We hold design, detailing, procurement and delivery in-house so intent survives the build."
          />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {expertise.map((e) => (
              <div key={e.title} data-reveal className="reveal-line reveal-stagger border-t border-border pt-6">
                <p className="label-caps">{e.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section data-reveal className="reveal-rise mx-auto max-w-[1600px] px-6 py-28 lg:px-10">
        <SectionHeading eyebrow="Design process" title="Six steps, no surprises" />
        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s) => (
            <div key={s.no} data-reveal className="reveal-line reveal-stagger border-t border-border pt-6">
              <p className="font-display text-3xl text-accent">{s.no}</p>
              <p className="label-caps mt-4">{s.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before & after */}
      <section data-reveal className="reveal-rise border-y border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10">
          <SectionHeading
            eyebrow="Before & after"
            title="The transformation is the proof"
            text="Same rooms, rethought from the structure out."
          />
          <div className="mt-16 grid gap-4 lg:grid-cols-2">
            {transformations.slice(0, 2).map((t) => (
              <div key={t.id} data-reveal className="reveal-image reveal-stagger">
                <BeforeAfter {...t} />
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/before-after" className="btn-ghost">
              See all transformations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section data-reveal className="reveal-rise mx-auto max-w-[1600px] px-6 py-28 lg:px-10">
        <SectionHeading eyebrow="Services" title="How we can help" />
        <div className="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              data-reveal
              className="reveal-line reveal-stagger group border-t border-border pt-6"
            >
              <p className="label-caps group-hover:text-accent">{s.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.excerpt}</p>
              <ArrowRight size={16} className="mt-5 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section data-reveal className="reveal-rise border-y border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10">
          <SectionHeading eyebrow="Client voices" title="What clients say" />
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {testimonials.slice(0, 2).map((t) => (
              <blockquote key={t.name} data-reveal className="reveal-rise reveal-stagger border-l border-accent pl-8">
                <p className="font-display text-2xl leading-snug">“{t.quote}”</p>
                <footer className="mt-6">
                  <p className="label-caps">{t.name}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/testimonials" className="btn-ghost">
              All testimonials <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section data-reveal className="reveal-rise mx-auto max-w-[1600px] px-6 py-28 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading align="left" eyebrow="FAQ" title="Good to know" />
          <div>
            {faqs.slice(0, 4).map((f) => (
              <div key={f.question} data-reveal className="reveal-line reveal-stagger border-b border-border py-6">
                <p className="label-caps">{f.question}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
              </div>
            ))}
            <Link to="/faq" className="btn-ghost mt-10">
              All questions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div data-reveal className="reveal-rise">
        <CtaBand />
      </div>
    </>
  );
}
