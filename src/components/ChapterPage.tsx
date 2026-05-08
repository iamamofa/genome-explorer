import { Header } from "./Header";
import { Footer } from "./Footer";
import type { Chapter, ChapterBlock } from "./BookCourse";

export type FlatChapter = Chapter & { partTitle: string };

interface Props {
  variant: "fungi" | "bacteria";
  handbookHref: string;
  handbookTitle: string;
  slug: string;
  chapters: FlatChapter[];
  idx: number;
  Block: (p: { block: ChapterBlock }) => JSX.Element | null;
}

export function ChapterPage({ variant, handbookHref, handbookTitle, slug, chapters, idx, Block }: Props) {
  const accent = variant === "fungi" ? "bg-gradient-fungi" : "bg-gradient-bacteria";
  const ch = chapters[idx];
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex gap-8 pb-24">
          {/* Sidebar with all chapters */}
          <aside className="hidden lg:block lg:sticky lg:top-20 h-fit lg:max-h-[calc(100vh-6rem)] overflow-y-auto w-72 shrink-0 rounded-2xl border border-border bg-card p-4 text-sm">
            <a href={handbookHref} className="mb-3 block px-2 text-xs font-semibold uppercase tracking-widest text-primary hover:underline">← {handbookTitle}</a>
            <nav className="space-y-0.5">
              {chapters.map((c, i) => (
                <a
                  key={c.id}
                  href={`/${slug}/chapter/${c.id}`}
                  className={`block rounded px-2 py-1.5 leading-snug ${i === idx ? "bg-accent font-semibold text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
                >
                  <span className="mr-1.5 font-mono text-xs text-muted-foreground/80">{c.number}</span>
                  {c.title}
                </a>
              ))}
            </nav>
          </aside>

          <main className="min-w-0 flex-1 pt-6">
            {/* Breadcrumbs */}
            <nav className="mb-6 text-xs text-muted-foreground">
              <a href={handbookHref} className="hover:text-foreground">{handbookTitle}</a>
              <span className="mx-2">/</span>
              <span>{ch.partTitle}</span>
              <span className="mx-2">/</span>
              <span className="text-foreground">Chapter {ch.number}</span>
            </nav>

            <div className="flex items-baseline gap-3">
              <span className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 font-mono text-sm font-semibold text-white ${accent}`}>
                {ch.number}
              </span>
              <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{ch.title}</h1>
            </div>
            {ch.summary && <p className="mt-4 text-lg italic text-muted-foreground">{ch.summary}</p>}

            <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-foreground/90">
              {ch.blocks.map((b, i) => <Block key={i} block={b} />)}
            </div>

            {/* Prev / Next */}
            <div className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
              {prev ? (
                <a href={`/${slug}/chapter/${prev.id}`} className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">← Previous</p>
                  <p className="mt-1 font-display font-semibold">{prev.number}. {prev.title}</p>
                </a>
              ) : <span />}
              {next ? (
                <a href={`/${slug}/chapter/${next.id}`} className="rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-primary">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Next →</p>
                  <p className="mt-1 font-display font-semibold">{next.number}. {next.title}</p>
                </a>
              ) : <span />}
            </div>

            <div className="mt-8 text-center">
              <a href={`${handbookHref}#${ch.id}`} className="text-sm text-muted-foreground hover:text-primary">View in full handbook ↗</a>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
