import { createFileRoute } from "@tanstack/react-router";
import { images, processSteps, team, values } from "@/data/site";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui-bits";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Studio — Deco Sur" },
      { name: "description", content: "Deco Sur is an interior and exterior design studio built on restraint, craft and longevity." },
      { property: "og:title", content: "About the Studio — Deco Sur" },
      { property: "og:description", content: "Meet the team and the values behind Deco Sur's quiet, considered interiors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The studio"
        title="Quiet rooms, made with intent."
        text="Deco Sur is a small studio of designers and makers creating interiors and exteriors that feel calm, warm and built to last."
        image={images.heroLiving}
      />

      <section className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <img src={images.heroKitchen} alt="Deco Sur kitchen interior" loading="lazy" width={1024} height={1536} className="aspect-[4/5] w-full object-cover" />
        <div>
          <p className="eyebrow">Our story</p>
          <p className="mt-6 font-display text-3xl leading-snug md:text-4xl">
            We started with one belief: a room should be edited, not decorated.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            Over a decade of homes, hotels and wellness spaces, we have refined an approach that puts
            light, proportion and material first. Every project is led by a senior designer from the
            first conversation to the final styling.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Values" title="What we hold to" />
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="border-t border-accent/40 pt-6">
                <h3 className="text-2xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
        <SectionHeading eyebrow="Team" title="The people behind the work" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="border border-border p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent font-display text-2xl text-accent">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-6 text-2xl">{m.name}</h3>
              <p className="label-caps mt-2 text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Process" title="How a project unfolds" />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {processSteps.map((s) => (
              <div key={s.no}>
                <p className="font-display text-4xl text-accent">{s.no}</p>
                <h3 className="mt-3 text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Let's talk about your space." />
    </>
  );
}
