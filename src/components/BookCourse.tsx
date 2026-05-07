import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  number: string; // "1", "A"
  title: string;
  summary?: string;
  blocks: ChapterBlock[];
}

export interface Part {
  title: string;
  chapters: Chapter[];
}

interface Props {
  variant: "fungi" | "bacteria";
  title: string;
  authors: string;
  published: string;
  overview: string;
  objectives: string[];
  audience: string;
  prerequisites: { essential: string[]; desirable: string[] };
  citation: string;
  parts: Part[];
}

export function BookCourse({ variant, title, authors, published, overview, objectives, audience, prerequisites, citation, parts }: Props) {
  const accent = variant === "fungi" ? "bg-gradient-fungi" : "bg-gradient-bacteria";
  const allChapters = useMemo(() => {
    const list: { partTitle: string; chapter: Chapter }[] = [
      { partTitle: "Welcome", chapter: { id: "welcome", number: "", title: "Welcome", blocks: [] } },
    ];
    parts.forEach((p) => p.chapters.forEach((c) => list.push({ partTitle: p.title, chapter: c })));
    return list;
  }, [parts]);

  const [activeId, setActiveId] = useState<string>("welcome");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const opts = { rootMargin: "-30% 0px -60% 0px", threshold: 0 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
    }, opts);
    allChapters.forEach((c) => {
      const el = document.getElementById(c.chapter.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [allChapters]);

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
          <aside className={`${sidebarOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-20 h-fit lg:max-h-[calc(100vh-6rem)] overflow-y-auto w-full lg:w-72 shrink-0 rounded-2xl border border-border bg-card p-4 text-sm`}>
            <div className="mb-3 px-2">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white ${accent}`}>Slides</span>
              <h2 className="mt-2 font-display text-base font-semibold leading-tight">{title}</h2>
            </div>
            <nav className="space-y-3">
              <a href="#welcome" onClick={() => setSidebarOpen(false)} className={`block rounded px-2 py-1.5 ${activeId === "welcome" ? "bg-accent font-semibold text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}>
                Welcome
              </a>
              {parts.map((part) => (
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

            <hr className="my-12 border-border" />

            {parts.map((part) => (
              <div key={part.title}>
                <p className="mt-12 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{part.title}</p>
                {part.chapters.map((ch) => (
                  <ChapterView key={ch.id} chapter={ch} accent={accent} />
                ))}
              </div>
            ))}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ChapterView({ chapter, accent }: { chapter: Chapter; accent: string }) {
  return (
    <section id={chapter.id} className="scroll-mt-20 border-t border-border py-10">
      <div className="flex items-baseline gap-3">
        <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 font-mono text-sm font-semibold text-white ${accent}`}>
          {chapter.number}
        </span>
        <h2 className="font-display text-3xl font-semibold leading-tight sm:text-[34px]">{chapter.title}</h2>
      </div>
      {chapter.summary && <p className="mt-3 text-lg italic text-muted-foreground">{chapter.summary}</p>}
      <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-foreground/90">
        {chapter.blocks.map((b, i) => <Block key={i} block={b} />)}
      </div>
    </section>
  );
}

function Block({ block }: { block: ChapterBlock }) {
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

export type { ChapterBlock as Block };
