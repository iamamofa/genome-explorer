import type { ReactNode } from "react";

type Variant = "fungi" | "bacteria";

interface Resource { name: string; url: string }
interface Section { heading: string; items: (string | ReactNode)[] }

export interface Step {
  title: string;
  goal?: string;
  instructions?: (string | ReactNode)[];
  code?: { lang?: string; body: string };
  expected?: string;
}

export interface Dataset {
  name: string;
  source: string; // e.g. "Zenodo", "ENA", "SRA"
  accession?: string;
  url: string;
  description: string;
}

export interface DayModule {
  day: string;
  title: string;
  objectives?: string[];
  sections: Section[];
  datasets?: Dataset[];
  steps?: Step[];
  deliverables?: string[];
  reading?: Resource[];
  tools?: Resource[];
}

export function DaySchedule({ day, title, objectives, sections, datasets, steps, deliverables, reading, tools, variant }: DayModule & { variant: Variant }) {
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

        {objectives && objectives.length > 0 && (
          <div className="mt-6 rounded-xl border border-border bg-surface p-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Learning objectives</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {objectives.map((o) => (
                <li key={o} className="flex gap-2 text-[15px] text-foreground/90">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

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

        {datasets && datasets.length > 0 && (
          <div className="mt-7">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Public datasets to download</h4>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {datasets.map((d) => (
                <a
                  key={d.url}
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary"
                >
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white ${accent}`}>
                      {d.source}
                    </span>
                    {d.accession && (
                      <span className="font-mono text-xs text-muted-foreground">{d.accession}</span>
                    )}
                  </div>
                  <h5 className="mt-2 font-semibold text-foreground">{d.name}</h5>
                  <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {steps && steps.length > 0 && (
          <div className="mt-7">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Hands-on practical — step by step</h4>
            <ol className="mt-3 space-y-4">
              {steps.map((st, i) => (
                <li key={i} className="rounded-xl border border-border bg-surface p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-semibold text-primary">STEP {String(i + 1).padStart(2, "0")}</span>
                    <h5 className="font-display text-lg font-semibold">{st.title}</h5>
                  </div>
                  {st.goal && <p className="mt-2 text-sm italic text-muted-foreground">Goal: {st.goal}</p>}
                  {st.instructions && (
                    <ul className="mt-3 space-y-1.5 text-[15px] text-foreground/90">
                      {st.instructions.map((ins, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                          <span>{ins}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {st.code && (
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-foreground/95 p-4 font-mono text-[13px] leading-relaxed text-background">
                      <code>{st.code.body}</code>
                    </pre>
                  )}
                  {st.expected && (
                    <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-foreground/85">
                      <span className="font-semibold text-primary">Expected output:</span> {st.expected}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {deliverables && deliverables.length > 0 && (
          <div className="mt-7 rounded-xl border border-border bg-surface p-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">End-of-day deliverables</h4>
            <ul className="mt-3 space-y-1.5 text-[15px] text-foreground/90">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {reading && reading.length > 0 && (
          <div className="mt-7">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recommended reading</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {reading.map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary">
                  📖 {r.name}
                </a>
              ))}
            </div>
          </div>
        )}

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
