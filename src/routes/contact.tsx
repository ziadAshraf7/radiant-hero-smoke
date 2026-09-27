import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { contact, images, services } from "@/data/site";
import { PageHero } from "@/components/ui-bits";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the Studio — Deco Sur" },
      { name: "description", content: "Start a project with Deco Sur. Send an inquiry or visit the studio." },
      { property: "og:title", content: "Contact the Studio — Deco Sur" },
      { property: "og:description", content: "Tell us about your space and we'll be in touch within two working days." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const field =
  "w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your space."
        text="Share a few details and a senior designer will reply within two working days."
        image={images.heroKitchen}
      />
      <section className="mx-auto grid max-w-[1600px] gap-16 px-6 py-24 lg:grid-cols-[1fr_1.4fr] lg:px-10">
        <div className="space-y-8">
          {[
            ["Studio", `${contact.studio}\n${contact.address}`],
            ["Email", contact.email],
            ["Phone", contact.phone],
            ["Hours", contact.hours],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-border pt-5">
              <p className="label-caps text-muted-foreground">{k}</p>
              <p className="mt-2 whitespace-pre-line font-display text-2xl">{v}</p>
            </div>
          ))}
        </div>
        {sent ? (
          <div className="flex flex-col justify-center border border-accent/40 p-12">
            <p className="eyebrow">Thank you</p>
            <p className="mt-4 font-display text-3xl">Your inquiry has been received.</p>
            <p className="mt-4 text-sm text-muted-foreground">We'll be in touch shortly.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="grid gap-8 sm:grid-cols-2"
          >
            <input required placeholder="Full name" className={field} />
            <input required type="email" placeholder="Email" className={field} />
            <input placeholder="Phone" className={field} />
            <select defaultValue="" className={field}>
              <option value="" disabled>Service of interest</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>{s.title}</option>
              ))}
            </select>
            <textarea required rows={5} placeholder="Tell us about the project" className={`${field} sm:col-span-2`} />
            <div className="sm:col-span-2">
              <button type="submit" className="btn-gold">Send inquiry</button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}
