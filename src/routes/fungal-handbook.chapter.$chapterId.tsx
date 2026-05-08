import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Block } from "@/components/BookCourse";
import { parts } from "./fungal-handbook";
import { ChapterPage, type FlatChapter } from "@/components/ChapterPage";

const flat: FlatChapter[] = parts.flatMap((p) =>
  p.chapters.map((c) => ({ partTitle: p.title, ...c })),
);

export const Route = createFileRoute("/fungal-handbook/chapter/$chapterId")({
  component: FungalChapter,
  loader: ({ params }) => {
    const idx = flat.findIndex((c) => c.id === params.chapterId);
    if (idx === -1) throw notFound();
    return { idx };
  },
  head: ({ loaderData }) => {
    const ch = loaderData ? flat[loaderData.idx] : null;
    return {
      meta: [
        { title: ch ? `${ch.number}. ${ch.title} — Fungal Handbook` : "Chapter — Fungal Handbook" },
        { name: "description", content: ch?.summary || ch?.title || "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Chapter not found</h1>
        <Link to="/fungal-handbook" className="mt-4 inline-block text-primary underline">Back to handbook</Link>
      </div>
      <Footer />
    </div>
  ),
});

function FungalChapter() {
  const { idx } = Route.useLoaderData();
  return (
    <ChapterPage
      variant="fungi"
      handbookHref="/fungal-handbook"
      handbookTitle="Fungal Handbook"
      slug="fungal-handbook"
      chapters={flat}
      idx={idx}
      Block={Block}
    />
  );
}
