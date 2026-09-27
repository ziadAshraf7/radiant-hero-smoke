import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { images, testimonials } from "@/data/site";
import { CtaBand, PageHero } from "@/components/ui-bits";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Deco Sur Clients" },
      {
        name: "description",
        content: "What private and commercial clients say about working with the Deco Sur studio.",
      },
      { property: "og:title", content: "Testimonials — Deco Sur Clients" },
      { property: "og:description", content: "Client words on design, delivery and living with the result." },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Client voices"
        title="Testimonials"
        text="The studio's reputation is built on repeat clients and referrals."
        image={images.heroLiving}
      />

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="border-l border-accent bg-surface p-8">
              <p className="font-display text-2xl leading-snug">“{t.quote}”</p>
              <footer className="mt-6">
                <p className="label-caps">{t.name}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-2xl px-6 py-24 lg:px-10">
          <p className="eyebrow">Leave a review</p>
          <h2 className="mt-5 text-4xl">Worked with us?</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            We would like to hear how the space is living. Reviews are published after the studio
            reviews them.
          </p>

          {sent ? (
            <p className="mt-10 border border-accent p-6 text-sm">
              Thank you — your review has been received and will be reviewed by the studio.
            </p>
          ) : (
            <form
              className="mt-10 flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                required
                placeholder="Your name"
                className="border border-border bg-background px-4 py-4 text-sm outline-none focus:border-accent"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="border border-border bg-background px-4 py-4 text-sm outline-none focus:border-accent"
              />
              <textarea
                required
                rows={5}
                placeholder="Your review"
                className="border border-border bg-background px-4 py-4 text-sm outline-none focus:border-accent"
              />
              <button type="submit" className="btn-gold self-start">
                Submit review
              </button>
            </form>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
