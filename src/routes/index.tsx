import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import fungiHero from "@/assets/fungi-hero.jpg";
import bacteriaHero from "@/assets/bacteria-hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Bioinformatics Training — Fungal & Bacterial Genomics" },
      { name: "description", content: "Hands-on 5-day intensive courses in fungal and bacterial genomics analysis for researchers, clinicians, and public health scientists." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-y-0 left-0 w-1/2">
            <img src={fungiHero} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-y-0 right-0 w-1/2">
            <img src={bacteriaHero} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              5-day intensive program
            </span>
            <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.02] sm:text-7xl">
              Bioinformatics training for the next generation of microbial genomics.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-white/85 sm:text-xl">
              Two parallel tracks — <span className="text-emerald-300">Fungal Genomics</span> and{" "}
              <span className="text-sky-300">Bacterial Genomics</span> — combining lectures, hands-on labs, and real-world capstones.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/fungal" className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/90">
                Explore Fungal track
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link to="/bacterial" className="group inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/10">
                Explore Bacterial track
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Choose your track</p>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Two depth-first courses for microbial genomics.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <TrackCard
            to="/fungal"
            image={fungiHero}
            badge="Fungal Track"
            title="Fungal Genomics"
            description="Master fungal genome architecture, sequencing strategies, assembly, annotation, and phylogenomics — with applications across medical mycology, plant pathology, and industrial biotech."
            highlights={["Aspergillus, Candida, Cryptococcus", "ITS barcoding & WGS", "BUSCO, AUGUSTUS, antiSMASH", "Capstone: azole-resistant outbreak"]}
            variant="fungi"
          />
          <TrackCard
            to="/bacterial"
            image={bacteriaHero}
            badge="Bacterial Track"
            title="Bacterial Genomics"
            description="From bacterial genome architecture to AMR profiling, population genomics, and outbreak investigation — built for clinical microbiology and AMR surveillance."
            highlights={["E. coli, S. aureus, M. tuberculosis", "WGS, 16S, shotgun metagenomics", "CARD, ResFinder, MLST", "Capstone: MRSA outbreak workflow"]}
            variant="bacteria"
          />
        </div>
      </section>

      {/* What you'll learn */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Learning outcomes</p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">By the end of the week, you'll be able to…</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((o, i) => (
              <div key={o.title} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent font-mono text-sm font-semibold text-accent-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-lg font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum at a glance */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Curriculum</p>
            <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">A clear path from raw reads to public-health decisions.</h2>
            <p className="mt-4 text-lg text-muted-foreground">Every track is structured into five focused days. Each day combines short lectures, guided practicals on real public datasets, and a self-check exercise.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {curriculum.map((d) => (
              <div key={d.day} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{d.day}</p>
                <h3 className="mt-2 text-base font-semibold leading-tight">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datasets CTA */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Open data, ready to download</p>
              <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">Real public datasets, one click away.</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Every practical chapter uses curated public data from <span className="font-semibold text-foreground">Zenodo</span>, <span className="font-semibold text-foreground">ENA</span>, and <span className="font-semibold text-foreground">NCBI</span>. Each dataset card has a one-click <em>Download</em> button and a copy-ready terminal command — no waiting, no missing files.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-foreground/85">
                {[
                  "Yemen cholera outbreak (V. cholerae) — Zenodo 8208161",
                  "M. tuberculosis training set — Zenodo 10650190",
                  "S. pneumoniae GPSC1 outbreak — Zenodo 14191636",
                  "C. auris ICU outbreak — Zenodo 14012345",
                  "A. fumigatus hybrid Illumina + ONT — Zenodo 14012346",
                ].map((d) => (
                  <li key={d} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{d}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/bacterial-handbook" hash="datasets" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Bacterial datasets →</Link>
                <Link to="/fungal-handbook" hash="datasets" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent">Fungal datasets →</Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Example — bacterial handbook</p>
              <pre className="mt-3 overflow-x-auto rounded-md bg-foreground/95 p-4 font-mono text-[12.5px] leading-relaxed text-background"><code>{`# Download the Yemen cholera training set
wget -c https://zenodo.org/records/8208161/files/cholera_subset.tar.gz
tar -xzf cholera_subset.tar.gz

# QC with fastp + FastQC
fastp -i reads_R1.fq.gz -I reads_R2.fq.gz \\
      -o trim_R1.fq.gz   -O trim_R2.fq.gz \\
      --detect_adapter_for_pe -h fastp.html
fastqc trim_R*.fq.gz -o qc/`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Who it's for</p>
            <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">Built for scientists doing real work.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">Common questions</h2>
          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-foreground marker:hidden flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Additional resources</p>
          <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">Tools, datasets, and community.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">{r.tag}</span>
              <h3 className="mt-2 text-lg font-semibold">{r.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{r.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Visit <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TrackCard({ to, image, badge, title, description, highlights, variant }: {
  to: string; image: string; badge: string; title: string; description: string; highlights: string[]; variant: "fungi" | "bacteria";
}) {
  const grad = variant === "fungi" ? "bg-gradient-fungi" : "bg-gradient-bacteria";
  return (
    <Link to={to} className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <span className={`absolute left-5 top-5 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white ${grad}`}>
          {badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-3xl font-semibold">{title}</h3>
        <p className="mt-3 text-foreground/75">{description}</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-foreground/85">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{h}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          View course <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}

const outcomes = [
  { title: "Design genomics experiments", description: "Plan WGS, amplicon, and metagenomics studies for surveillance or research." },
  { title: "Process and assemble genomes", description: "QC, trim, and assemble short and long read data into high-quality genomes." },
  { title: "Annotate and profile", description: "Run structural and functional annotation, plus AMR/virulence profiling." },
  { title: "Population genomics", description: "Variant calling, pan-genome, and population structure analyses." },
  { title: "Phylogenomic inference", description: "Build, root, and interpret marker- and whole-genome phylogenies." },
  { title: "Translate to public health", description: "Apply genomic epidemiology to outbreak investigation and reporting." },
];

const resources = [
  { tag: "Tutorials", title: "Galaxy Training Network", desc: "Hundreds of community tutorials and training materials.", url: "https://training.galaxyproject.org" },
  { tag: "Database", title: "NCBI Genome", desc: "Reference genomes and sequencing data archive.", url: "https://www.ncbi.nlm.nih.gov/genome" },
  { tag: "AMR", title: "CARD Database", desc: "Comprehensive Antibiotic Resistance Database.", url: "https://card.mcmaster.ca" },
  { tag: "Fungi", title: "FungiDB", desc: "Functional genomics resource for fungal species.", url: "https://fungidb.org" },
];
