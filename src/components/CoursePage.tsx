import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  variant: "fungi" | "bacteria";
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  audience: string[];
  format: string[];
  prerequisites: string[];
  children: ReactNode;
}

export function CoursePage({ variant, eyebrow, title, subtitle, heroImage, heroAlt, audience, format, prerequisites, children }: Props) {
  const grad = variant === "fungi" ? "bg-gradient-fungi" : "bg-gradient-bacteria";
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 opacity-40">
          <img src={heroImage} alt={heroAlt} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent dark:from-background" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white ${grad}`}>
              {eyebrow}
            </span>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg text-white/85 sm:text-xl">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#schedule" className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/90">
                View schedule
              </a>
              <Link to="/" className="inline-flex items-center rounded-md border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">
                Other courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard title="Target Audience" items={audience} />
          <InfoCard title="Training Format" items={format} />
          <InfoCard title="Pre-requisites" items={prerequisites} />
        </div>
      </section>

      <section id="schedule" className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Course schedule</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">5-Day Intensive Course</h2>
          <p className="mt-3 text-muted-foreground">Monday through Friday — each day mixes morning lectures, hands-on practicals, case discussions, and synthesis.</p>
        </div>
        <div className="space-y-6">{children}</div>
      </section>

      <Footer />
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-foreground/85">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
