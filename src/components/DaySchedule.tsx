import type { ReactNode } from "react";

type Variant = "fungi" | "bacteria";

interface Resource { name: string; url: string }
interface Section { heading: string; items: (string | ReactNode)[] }

export interface DayModule {
  day: string;
  title: string;
  sections: Section[];
  tools?: Resource[];
}

export function DaySchedule({ day, title, sections, tools, variant }: DayModule & { variant: Variant }) {
  const accent = variant === "fungi" ? "bg-gradient-fungi" : "bg-gradient-bacteria";
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-elevated">
      <div className={`absolute inset-x-0 top-0 h-1 ${accent}`} />
      <div className="p-7 sm:p-9">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white ${accent}`}>
            {day}
          </span>
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h3>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <div key={s.heading}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.heading}</h4>
              <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-foreground/90">
                {s.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {tools && tools.length > 0 && (
          <div className="mt-7 rounded-xl bg-surface p-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tools & Resources</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {tools.map((t) => (
                <a
                  key={t.url}
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
