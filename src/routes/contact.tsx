import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "At least 10 characters").max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Audi Formula 1" },
      { name: "description", content: "Get in touch with the Audi F1 team — media enquiries, sponsorship, careers and general questions." },
      { property: "og:title", content: "Contact — Audi Formula 1" },
      { property: "og:description", content: "Get in touch with the Audi F1 team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newsletterOk, setNewsletterOk] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = schema.safeParse({
      name: fd.get("name"), email: fd.get("email"),
      subject: fd.get("subject"), message: fd.get("message"),
    });
    if (!res.success) {
      const es: Record<string, string> = {};
      for (const i of res.error.issues) es[i.path[0] as string] = i.message;
      setErrors(es);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <div className="pt-32 pb-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>Contact</SectionEyebrow>
        <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.95] sm:text-7xl">
          Talk to <span className="text-gradient-red">the team.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Media, sponsorship or fan mail — we answer every message.
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <Reveal>
          <div className="glass hairline rounded-2xl p-8">
            {sent ? (
              <div className="grid min-h-[420px] place-items-center text-center">
                <div>
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 font-display text-3xl font-bold">Message received</h3>
                  <p className="mt-2 text-muted-foreground">We'll be in touch within 48 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" error={errors.name} />
                  <Field label="Email" name="email" type="email" error={errors.email} />
                </div>
                <Field label="Subject" name="subject" error={errors.subject} />
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    maxLength={1000}
                    className="w-full resize-none rounded-md border border-border bg-background/50 p-4 text-sm outline-none transition focus:border-primary"
                    placeholder="How can we help?"
                  />
                  {errors.message && <p className="mt-1 text-xs text-primary">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
                >
                  Send message
                  <Send className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <SectionEyebrow>HQ</SectionEyebrow>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium">Audi Motorsport GmbH</div>
                    <div className="text-muted-foreground">Ingolstädter Straße, 85080 Neuburg an der Donau, Germany</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:media@audi-f1.example" className="hover:text-primary">media@audi-f1.example</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+49 (0) 841 89 000</span>
                </li>
              </ul>
              <div className="mt-6 flex gap-2">
                {[Instagram, Twitter, Youtube, Linkedin].map((I, i) => (
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition hover:border-primary hover:text-primary" aria-label="Social">
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Neuburg map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=11.169%2C48.723%2C11.229%2C48.751&layer=mapnik&marker=48.737%2C11.199"
                className="h-64 w-full grayscale"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass rounded-2xl p-6">
              <SectionEyebrow>Newsletter</SectionEyebrow>
              <p className="text-sm text-muted-foreground">Race weekend summaries, tech deep-dives and paddock stories.</p>
              {newsletterOk ? (
                <div className="mt-4 flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 p-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> You're subscribed.
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setNewsletterOk(true); }}
                  className="mt-4 flex gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="you@team.com"
                    className="flex-1 rounded-md border border-border bg-background/50 px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                  />
                  <button className="rounded-md bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/90">
                    Join
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({
  label, name, type = "text", error,
}: {
  label: string; name: string; type?: string; error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        maxLength={type === "email" ? 255 : 120}
        className="w-full rounded-md border border-border bg-background/50 px-3 py-2.5 text-sm outline-none transition focus:border-primary"
      />
      {error && <p className="mt-1 text-xs text-primary">{error}</p>}
    </div>
  );
}
