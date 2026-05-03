import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Bioinformatics Training" },
      { name: "description", content: "About the Bioinformatics Training program in fungal and bacterial genomics." },
    ],
  }),
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">About the program</p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">A community-built training in microbial genomics.</h1>
        <div className="mt-8 space-y-5 text-foreground/85">
          <p className="text-lg leading-relaxed">
            Our 5-day intensive courses are designed for working scientists, clinicians, and students who need
            practical bioinformatics skills for fungal and bacterial genomics. Each track combines morning
            lectures with full afternoon practicals, capstone case studies, and group discussions.
          </p>
          <p className="leading-relaxed">
            Materials integrate examples from clinical microbiology, AMR surveillance, plant pathology, food
            safety, environmental microbiology, and industrial biotechnology — so participants leave with both
            the technical skills and the contextual judgement to apply them.
          </p>
          <p className="leading-relaxed">
            All training materials are openly licensed under CC BY-SA 4.0 and developed in collaboration with the
            broader bioinformatics community. We welcome contributions, corrections, and translations.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/fungal" className="inline-flex items-center rounded-md bg-fungi px-5 py-2.5 text-sm font-semibold text-fungi-foreground hover:opacity-90">
            Fungal track →
          </Link>
          <Link to="/bacterial" className="inline-flex items-center rounded-md bg-bacteria px-5 py-2.5 text-sm font-semibold text-bacteria-foreground hover:opacity-90">
            Bacterial track →
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
