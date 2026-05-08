import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export interface ChapterBlock {
  type: "p" | "h3" | "tip" | "warn" | "list" | "ol" | "code" | "table" | "callout" | "figure";
  text?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  lang?: string;
  caption?: string;
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  summary?: string;
  blocks: ChapterBlock[];
}

export interface Part {
  title: string;
  chapters: Chapter[];
}

export interface Dataset {
  name: string;
  source: string;          // Zenodo / ENA / NCBI / FungiDB
  accession: string;
  url: string;
  size?: string;
  description: string;
  command?: string;        // wget / curl example
}

interface Props {
  variant: "fungi" | "bacteria";
  slug: "fungal-handbook" | "bacterial-handbook";
  title: string;
  authors: string;
  published: string;
  overview: string;
  objectives: string[];
  audience: string;
  prerequisites: { essential: string[]; desirable: string[] };
  citation: string;
  parts: Part[];
  datasets?: Dataset[];
}

export function BookCourse({ variant, slug, title, authors, published, overview, objectives, audience, prerequisites, citation, parts, datasets = [] }: Props) {
  const accent = variant === "fungi" ? "bg-gradient-fungi" : "bg-gradient-bacteria";
  const [activeId, setActiveId] = useState<string>("welcome");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredParts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return parts;
    return parts
      .map((p) => ({
        ...p,
        chapters: p.chapters.filter((c) =>
          c.title.toLowerCase().includes(q) ||
          c.number.toLowerCase().includes(q) ||
          (c.summary || "").toLowerCase().includes(q) ||
          c.blocks.some((b) => (b.text || "").toLowerCase().includes(q)),
        ),
      }))
      .filter((p) => p.chapters.length > 0);
  }, [parts, query]);

  useEffect(() => {
    const ids = ["welcome", "datasets", ...parts.flatMap((p) => p.chapters.map((c) => c.id))];
    const opts = { rootMargin: "-30% 0px -60% 0px", threshold: 0 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
    }, opts);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [parts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6">
        <button
          className="my-4 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium lg:hidden"
          onClick={() => setSidebarOpen((s) => !s)}
        >
          ☰ Table of contents
        </button>

        <div className="flex gap-8 pb-24">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-20 h-fit lg:max-h-[calc(100vh-6rem)] overflow-y-auto w-full lg:w-80 shrink-0 rounded-2xl border border-border bg-card p-4 text-sm`}>
            <div className="mb-3 px-2">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white ${accent}`}>Handbook</span>
              <h2 className="mt-2 font-display text-base font-semibold leading-tight">{title}</h2>
            </div>

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chapters & content…"
              className="mb-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {query && (
              <p className="mb-2 px-2 text-xs text-muted-foreground">
                {filteredParts.reduce((n, p) => n + p.chapters.length, 0)} matches
              </p>
            )}

            <nav className="space-y-3">
              <a href="#welcome" onClick={() => setSidebarOpen(false)} className={`block rounded px-2 py-1.5 ${activeId === "welcome" ? "bg-accent font-semibold text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}>
                Welcome
              </a>
              {datasets.length > 0 && (
                <a href="#datasets" onClick={() => setSidebarOpen(false)} className={`block rounded px-2 py-1.5 ${activeId === "datasets" ? "bg-accent font-semibold text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}>
                  📦 Datasets ({datasets.length})
                </a>
              )}
              {filteredParts.map((part) => (
                <div key={part.title}>
                  <p className="px-2 pt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80">{part.title}</p>
                  <ul className="mt-1 space-y-0.5">
                    {part.chapters.map((c) => (
                      <li key={c.id}>
                        <a
                          href={`#${c.id}`}
                          onClick={() => setSidebarOpen(false)}
                          className={`block rounded px-2 py-1.5 leading-snug transition-colors ${activeId === c.id ? "bg-accent font-semibold text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
                        >
                          <span className="mr-1.5 font-mono text-xs text-muted-foreground/80">{c.number}</span>
                          {c.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="min-w-0 flex-1">
            <section id="welcome" className="scroll-mt-20 pt-6">
              <div className={`mb-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white ${accent}`}>
                Course Handbook
              </div>
              <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Authors:</span> {authors} &nbsp;·&nbsp;
                <span className="font-semibold text-foreground">Published:</span> {published}
              </p>

              <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-foreground/90">
                <div>
                  <h2 className="font-display text-2xl font-semibold">Overview</h2>
                  <p className="mt-3">{overview}</p>
                </div>

                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">💡 Tip — Learning objectives</p>
                  <p className="mt-2 font-medium">By the end of this course, you will be able to:</p>
                  <ul className="mt-3 space-y-1.5">
                    {objectives.map((o) => (
                      <li key={o} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-semibold">Target Audience</h2>
                  <p className="mt-3">{audience}</p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-semibold">Prerequisites</h2>
                  <h3 className="mt-3 font-display text-lg font-semibold">Essential</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-6">
                    {prerequisites.essential.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <h3 className="mt-4 font-display text-lg font-semibold">Desirable</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-6">
                    {prerequisites.desirable.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-semibold">Citation</h2>
                  <p className="mt-3">{citation}</p>
                </div>
              </div>
            </section>

            {datasets.length > 0 && <DatasetsSection datasets={datasets} accent={accent} />}

            <hr className="my-12 border-border" />

            {filteredParts.map((part) => (
              <div key={part.title}>
                <p className="mt-12 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{part.title}</p>
                {part.chapters.map((ch) => (
                  <ChapterView key={ch.id} chapter={ch} accent={accent} slug={slug} />
                ))}
              </div>
            ))}

            {query && filteredParts.length === 0 && (
              <p className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-muted-foreground">
                No chapters match “{query}”.
              </p>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function DatasetsSection({ datasets, accent }: { datasets: Dataset[]; accent: string }) {
  return (
    <section id="datasets" className="scroll-mt-20 mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-baseline gap-3">
        <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 font-mono text-sm font-semibold text-white ${accent}`}>📦</span>
        <h2 className="font-display text-3xl font-semibold">Course Datasets</h2>
      </div>
      <p className="mt-2 text-muted-foreground">All datasets used by the practical chapters. Click <em>Open</em> to visit the source page, or copy the download command.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {datasets.map((d) => (
          <div key={d.accession} className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-semibold leading-tight">{d.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {d.source} · <span className="font-mono normal-case">{d.accession}</span>{d.size && <> · {d.size}</>}
                </p>
              </div>
              <a href={d.url} target="_blank" rel="noreferrer" className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold text-white ${accent}`}>Open ↗</a>
            </div>
            <p className="mt-3 text-sm text-foreground/90">{d.description}</p>
            {d.command && (
              <pre className="mt-3 overflow-x-auto rounded-md bg-foreground/95 p-3 font-mono text-[12px] leading-snug text-background">
                <code>{d.command}</code>
              </pre>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ChapterView({ chapter, accent, slug }: { chapter: Chapter; accent: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${chapter.id}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id={chapter.id} className="scroll-mt-20 border-t border-border py-10">
      <div className="flex items-baseline gap-3">
        <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 font-mono text-sm font-semibold text-white ${accent}`}>
          {chapter.number}
        </span>
        <h2 className="font-display text-3xl font-semibold leading-tight sm:text-[34px]">{chapter.title}</h2>
        <button
          onClick={onCopy}
          title="Copy chapter link"
          className="ml-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          {copied ? "✓ copied" : "🔗"}
        </button>
        <a
          href={`/${slug}/chapter/${chapter.id}`}
          className="ml-auto rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          Open page →
        </a>
      </div>
      {chapter.summary && <p className="mt-3 text-lg italic text-muted-foreground">{chapter.summary}</p>}
      <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-foreground/90">
        {chapter.blocks.map((b, i) => <Block key={i} block={b} />)}
      </div>
    </section>
  );
}

export function Block({ block }: { block: ChapterBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return <h3 className="mt-4 font-display text-xl font-semibold">{block.text}</h3>;
    case "tip":
      return (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">💡 Tip</p>
          <p className="mt-1.5 text-foreground/90">{block.text}</p>
        </div>
      );
    case "warn":
      return (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-destructive">⚠ Warning</p>
          <p className="mt-1.5 text-foreground/90">{block.text}</p>
        </div>
      );
    case "callout":
      return (
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">📌 Note</p>
          <p className="mt-1.5 text-foreground/90">{block.text}</p>
        </div>
      );
    case "list":
      return (
        <ul className="list-disc space-y-1.5 pl-6">
          {block.items?.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-1.5 pl-6">
          {block.items?.map((it, i) => <li key={i}>{it}</li>)}
        </ol>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-lg bg-foreground/95 p-4 font-mono text-[13px] leading-relaxed text-background">
          <code>{block.text}</code>
        </pre>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-surface">
                {block.headers?.map((h) => <th key={h} className="border border-border px-3 py-2 text-left font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} className="border border-border px-3 py-2">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
          {block.caption && <p className="mt-2 text-xs italic text-muted-foreground">{block.caption}</p>}
        </div>
      );
    case "figure":
      return <p className="rounded-lg border border-dashed border-border bg-surface p-6 text-center text-sm italic text-muted-foreground">[ Figure: {block.caption} ]</p>;
    default:
      return null;
  }
}
