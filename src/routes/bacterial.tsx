import { createFileRoute } from "@tanstack/react-router";
import { CoursePage } from "@/components/CoursePage";
import { DaySchedule, type DayModule } from "@/components/DaySchedule";
import bacteriaHero from "@/assets/bacteria-hero.jpg";

export const Route = createFileRoute("/bacterial")({
  component: BacterialPage,
  head: () => ({
    meta: [
      { title: "Bacterial Genomics — Bioinformatics Training Course" },
      { name: "description", content: "5-day intensive course on bacterial genomics with hands-on exercises using real Zenodo, ENA and SRA datasets — WGS, AMR profiling, phylogenomics, outbreak investigation." },
      { property: "og:title", content: "Bacterial Genomics — Bioinformatics Training" },
      { property: "og:description", content: "Hands-on training in bacterial WGS, AMR profiling, and outbreak investigation with real public datasets." },
      { property: "og:image", content: bacteriaHero },
    ],
  }),
});

function BacterialPage() {
  return (
    <CoursePage
      variant="bacteria"
      eyebrow="Bacterial Track"
      title="Bacterial Genomics: from WGS to outbreak investigation"
      subtitle="A 5-day intensive course with hands-on exercises using real public datasets from Zenodo, ENA and SRA. Contextualized for clinical microbiology, AMR surveillance, food safety, and outbreak response."
      heroImage={bacteriaHero}
      heroAlt="Bacterial cells under electron microscope"
      audience={["Microbiologists", "Bioinformaticians", "Public Health Scientists", "Clinical Laboratory Scientists", "Epidemiologists", "Graduate students", "AMR Researchers"]}
      format={["Morning conceptual lectures (1.5h)", "Guided hands-on practical sessions (3h)", "Group exercises with real outbreak data", "Case discussions", "End-of-day synthesis & Q&A", "Applied to clinical, AMR, food safety contexts"]}
      prerequisites={["Basic genetics and microbiology", "Basic molecular biology (DNA extraction, PCR, sequencing principles)", "Basic computing skills", "Familiarity with Linux command line (pre-course materials provided)", "Laptop with ≥16GB RAM or access to a Linux server / Galaxy account"]}
    >
      {days.map((d) => <DaySchedule key={d.day} {...d} variant="bacteria" />)}
    </CoursePage>
  );
}

const days: DayModule[] = [
  {
    day: "Monday",
    title: "Foundations of Bacterial Genomics & Sequencing",
    objectives: [
      "Describe the architecture of bacterial chromosomes, plasmids and mobile genetic elements",
      "Compare WGS, 16S amplicon, shotgun metagenomics and targeted sequencing",
      "Choose the right sequencing strategy for surveillance vs outbreak vs research",
      "Navigate NCBI, ENA and BV-BRC to retrieve bacterial genomes",
    ],
    sections: [
      { heading: "Morning Lecture (09:00–10:30)", items: [
        "Bacterial genome architecture: circular chromosomes, plasmids, operons",
        "Horizontal Gene Transfer (HGT): conjugation, transduction, transformation",
        "Mobile genetic elements: transposons, integrons, ICEs, prophages",
        "Clinically important organisms: E. coli, S. aureus, M. tuberculosis, Salmonella, Klebsiella, Vibrio cholerae",
      ]},
      { heading: "Mid-morning Lecture (11:00–12:30)", items: [
        "Sequencing strategies: WGS vs 16S vs shotgun metagenomics",
        "Platforms: Illumina (short, accurate) vs ONT/PacBio (long-read, structural)",
        "Choosing depth: 30× for outbreak SNP calling, 100× for hybrid assembly",
        "FAIR data principles and public repository navigation",
      ]},
    ],
    datasets: [
      {
        name: "Vibrio cholerae Yemen outbreak (2016–2017)",
        source: "ENA",
        accession: "PRJEB30604",
        url: "https://www.ebi.ac.uk/ena/browser/view/PRJEB30604",
        description: "1,425 V. cholerae isolates from the Yemen cholera epidemic — the dataset behind Weill et al., Nature 2019. Ideal for population genomics and transmission inference.",
      },
      {
        name: "E. coli K-12 MG1655 reference",
        source: "NCBI",
        accession: "NC_000913.3",
        url: "https://www.ncbi.nlm.nih.gov/nuccore/NC_000913.3",
        description: "Gold-standard E. coli reference genome (4.6 Mb, 4,288 genes) used throughout the week as a reference and for annotation comparisons.",
      },
    ],
    steps: [
      {
        title: "Set up your working environment",
        goal: "Create a tidy project layout that you'll reuse all week.",
        instructions: [
          "Open a terminal (or your Galaxy account). Create a project directory tree.",
          "All command-line steps assume Bash on Linux/macOS or WSL on Windows.",
        ],
        code: { body: `mkdir -p ~/bact-course/{data,raw,qc,assembly,annotation,amr,phylo,results}
cd ~/bact-course
echo "Project initialised at $(pwd)"` },
        expected: "A directory tree under ~/bact-course/ with subfolders for each pipeline stage.",
      },
      {
        title: "Download the E. coli K-12 reference genome",
        goal: "Practice retrieving genomes from NCBI using Entrez Direct.",
        code: { body: `# Install entrez-direct via conda if needed:
# conda install -c bioconda entrez-direct

cd ~/bact-course/data
efetch -db nuccore -id NC_000913.3 -format fasta > ecoli_K12.fasta
efetch -db nuccore -id NC_000913.3 -format gb    > ecoli_K12.gb

grep -c ">" ecoli_K12.fasta   # → 1
wc -c ecoli_K12.fasta         # ~4.7 MB` },
        expected: "A FASTA file with 1 sequence (~4.6 Mb) and a GenBank file with full annotation.",
      },
      {
        title: "Browse the Yemen cholera outbreak project on ENA",
        goal: "Get familiar with how surveillance data is structured.",
        instructions: [
          "Open the ENA project link in the dataset card above.",
          "In the 'Read Files' tab, sort by collection_date and pick 5 isolates from 2016 and 5 from 2017.",
          "Copy their FTP paths for download in tomorrow's QC session.",
        ],
        code: { body: `# Optional: bulk-fetch the run table with enaBrowserTools
# pip install enaBrowserTools
enaGroupGet -f fastq PRJEB30604 -d ~/bact-course/raw --quiet | head` },
      },
    ],
    deliverables: [
      "Working project directory tree",
      "E. coli K-12 reference genome (FASTA + GenBank)",
      "Shortlist of 10 V. cholerae outbreak isolates with metadata",
    ],
    reading: [
      { name: "Weill et al. 2019 — Yemen cholera epidemic (Nature)", url: "https://www.nature.com/articles/s41586-018-0818-3" },
      { name: "Land et al. 2015 — Insights from 20 years of bacterial genome sequencing", url: "https://link.springer.com/article/10.1007/s10142-015-0433-4" },
    ],
    tools: [
      { name: "NCBI", url: "https://www.ncbi.nlm.nih.gov" },
      { name: "ENA Browser", url: "https://www.ebi.ac.uk/ena/browser/home" },
      { name: "BV-BRC", url: "https://www.bv-brc.org" },
      { name: "Entrez Direct", url: "https://www.ncbi.nlm.nih.gov/books/NBK179288/" },
      { name: "Galaxy EU", url: "https://usegalaxy.eu" },
    ],
  },
  {
    day: "Tuesday",
    title: "Linux, NGS Data & Genome Assembly",
    objectives: [
      "Use core Linux commands to inspect and manipulate sequencing files",
      "Recognise FASTQ, FASTA, SAM/BAM, VCF and GFF formats",
      "Run quality control with FastQC and trim reads with fastp/Trimmomatic",
      "Assemble a bacterial genome de novo with SPAdes/Unicycler and assess it with QUAST",
    ],
    sections: [
      { heading: "Morning — Linux Refresher (09:00–10:30)", items: [
        "Filesystem navigation: cd, ls, pwd, tree",
        "Inspecting files: head, tail, less, wc, grep, cut, awk",
        "Pipes & redirection: |, >, >>, tee, xargs",
        "Bash loops, variables and simple scripts",
      ]},
      { heading: "Afternoon — Reads to Contigs (13:30–17:00)", items: [
        "QC: FastQC + MultiQC reports",
        "Trimming: adapter and quality trimming with fastp",
        "Assembly: SPAdes (Illumina) and Unicycler (hybrid)",
        "Evaluation: QUAST for N50/L50, CheckM for completeness",
      ]},
    ],
    datasets: [
      {
        name: "Galaxy Training: 'Quality Control' tutorial dataset",
        source: "Zenodo",
        accession: "10.5281/zenodo.61771",
        url: "https://zenodo.org/record/61771",
        description: "Small paired-end FASTQ files from an E. coli sequencing run — perfect to learn FastQC and trimming.",
      },
      {
        name: "Staphylococcus aureus MRSA test reads (Galaxy assembly tutorial)",
        source: "Zenodo",
        accession: "10.5281/zenodo.582600",
        url: "https://zenodo.org/record/582600",
        description: "Subsampled Illumina paired-end reads (≈2.8 Mb genome). Used in the GTN 'Unicycler assembly' tutorial.",
      },
      {
        name: "Listeria monocytogenes hybrid (short + Nanopore)",
        source: "Zenodo",
        accession: "10.5281/zenodo.940733",
        url: "https://zenodo.org/record/940733",
        description: "Paired Illumina + ONT reads for hybrid assembly practice — produces a near-complete circular chromosome.",
      },
    ],
    steps: [
      {
        title: "Download practice reads and run FastQC",
        goal: "Generate a QC report and identify adapter contamination and low-quality tails.",
        code: { body: `cd ~/bact-course/raw
wget -c https://zenodo.org/record/582600/files/mutant_R1.fastq
wget -c https://zenodo.org/record/582600/files/mutant_R2.fastq

# QC
mkdir -p ../qc
fastqc -o ../qc mutant_R1.fastq mutant_R2.fastq

# Aggregate into a single dashboard
multiqc ../qc -o ../qc` },
        expected: "Two FastQC HTML reports + a MultiQC dashboard. You should see ~250 bp reads, average Q≈30, no major adapter signal.",
      },
      {
        title: "Trim adapters & low-quality bases with fastp",
        code: { body: `cd ~/bact-course/raw
fastp \\
  -i mutant_R1.fastq -I mutant_R2.fastq \\
  -o mutant_R1.trim.fq.gz -O mutant_R2.trim.fq.gz \\
  --detect_adapter_for_pe --qualified_quality_phred 20 \\
  --length_required 50 --json ../qc/fastp.json --html ../qc/fastp.html` },
        expected: "Two cleaned FASTQ files plus a fastp HTML report. Look at 'Filtering result' — typically >95% reads kept.",
      },
      {
        title: "Assemble the genome with SPAdes",
        code: { body: `cd ~/bact-course/assembly
spades.py --only-assembler -t 4 \\
  -1 ../raw/mutant_R1.trim.fq.gz \\
  -2 ../raw/mutant_R2.trim.fq.gz \\
  -o spades_out

ls spades_out/
# scaffolds.fasta  contigs.fasta  assembly_graph.fastg  ...` },
        expected: "An assembly in spades_out/ with scaffolds.fasta. Expect ~2.8 Mb total length and a few dozen contigs.",
      },
      {
        title: "Evaluate the assembly with QUAST",
        code: { body: `quast.py -o ../qc/quast \\
  -r ../data/ecoli_K12.fasta \\
  spades_out/scaffolds.fasta` },
        expected: "QUAST HTML report listing N50, L50, total length, # contigs, GC%. Aim for N50 > 50 kb on this dataset.",
      },
    ],
    deliverables: [
      "MultiQC report comparing raw vs trimmed reads",
      "SPAdes assembly (scaffolds.fasta)",
      "QUAST report screenshot pasted into your lab notebook",
    ],
    reading: [
      { name: "Galaxy GTN — Quality Control tutorial", url: "https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/quality-control/tutorial.html" },
      { name: "Galaxy GTN — Unicycler assembly", url: "https://training.galaxyproject.org/training-material/topics/assembly/tutorials/unicycler-assembly/tutorial.html" },
    ],
    tools: [
      { name: "FastQC", url: "https://www.bioinformatics.babraham.ac.uk/projects/fastqc/" },
      { name: "fastp", url: "https://github.com/OpenGene/fastp" },
      { name: "MultiQC", url: "https://multiqc.info" },
      { name: "SPAdes", url: "https://cab.spbu.ru/software/spades/" },
      { name: "Unicycler", url: "https://github.com/rrwick/Unicycler" },
      { name: "QUAST", url: "http://quast.sourceforge.net" },
      { name: "Snakemake", url: "https://snakemake.readthedocs.io" },
      { name: "Nextflow", url: "https://www.nextflow.io/docs/latest/" },
    ],
  },
  {
    day: "Wednesday",
    title: "Genome Annotation & AMR Profiling",
    objectives: [
      "Annotate a bacterial assembly with Prokka / Bakta",
      "Identify acquired AMR genes with Abricate against CARD and ResFinder",
      "Detect plasmids and virulence factors",
      "Interpret resistance mechanisms in a clinical context",
    ],
    sections: [
      { heading: "Morning — Annotation Concepts", items: [
        "Structural annotation: gene prediction (Prodigal), tRNA/rRNA",
        "Functional annotation: GO, KEGG, COG, Pfam",
        "Tools: Prokka (fast, classic) vs Bakta (modern, JSON output)",
      ]},
      { heading: "Afternoon — AMR & Virulence", items: [
        "AMR gene catalogues: CARD, ResFinder, NCBI AMRFinderPlus",
        "Plasmid replicon typing: PlasmidFinder",
        "Virulence factors: VFDB",
        "Interpreting reports for a microbiology lab",
      ]},
    ],
    datasets: [
      {
        name: "MRSA assembly from Tuesday",
        source: "Zenodo",
        accession: "10.5281/zenodo.582600",
        url: "https://zenodo.org/record/582600",
        description: "Carry forward yesterday's S. aureus assembly to annotate and AMR-profile.",
      },
      {
        name: "Klebsiella pneumoniae multi-drug resistant assembly",
        source: "Zenodo",
        accession: "10.5281/zenodo.10650983",
        url: "https://zenodo.org/record/10650983",
        description: "Assembled K. pneumoniae carrying KPC and NDM carbapenemases — used to demonstrate carbapenem resistance detection.",
      },
    ],
    steps: [
      {
        title: "Annotate the assembly with Prokka",
        code: { body: `cd ~/bact-course/annotation
prokka --outdir mrsa_prokka --prefix mrsa --cpus 4 \\
  --genus Staphylococcus --species aureus \\
  ../assembly/spades_out/scaffolds.fasta

ls mrsa_prokka/
# mrsa.gff  mrsa.gbk  mrsa.faa  mrsa.ffn  mrsa.tsv  mrsa.txt` },
        expected: "A folder with GFF, GBK, FAA, FFN files. The .txt summary lists ~2,700 CDS, plus tRNA/rRNA counts.",
      },
      {
        title: "Screen for AMR genes against CARD with Abricate",
        code: { body: `cd ~/bact-course/amr
abricate --db card ../annotation/mrsa_prokka/mrsa.fna > mrsa_card.tsv
abricate --db resfinder ../annotation/mrsa_prokka/mrsa.fna > mrsa_resfinder.tsv

# Summarise across multiple isolates later:
abricate --summary mrsa_card.tsv > mrsa_card_summary.tsv
column -t mrsa_card.tsv | head` },
        expected: "TSV with hits like mecA, blaZ, tet(M) — gene name, %coverage, %identity, accession, resistance class.",
      },
      {
        title: "Detect plasmids with PlasmidFinder",
        instructions: [
          "Open the PlasmidFinder web service in the tools list.",
          "Paste your assembly (mrsa_prokka/mrsa.fna) and run with default thresholds.",
          "Record the replicon types found (e.g. rep7a, repUS5).",
        ],
      },
      {
        title: "Build an AMR profile table",
        goal: "Produce a clinician-friendly summary.",
        code: { body: `awk 'NR>1 {print $6"\\t"$11"\\t"$10"\\t"$15}' mrsa_card.tsv \\
  | sort -u \\
  | column -t -s $'\\t' \\
  | tee mrsa_AMR_profile.txt` },
        expected: "A clean table: gene | %identity | %coverage | resistance phenotype.",
      },
    ],
    deliverables: [
      "Prokka annotation (GFF + GBK)",
      "AMR gene table for the MRSA isolate",
      "Short paragraph interpreting which antibiotic classes are likely ineffective",
    ],
    reading: [
      { name: "Seemann 2014 — Prokka paper", url: "https://academic.oup.com/bioinformatics/article/30/14/2068/2390517" },
      { name: "Alcock et al. 2023 — CARD 2023 update", url: "https://academic.oup.com/nar/article/51/D1/D690/6764414" },
    ],
    tools: [
      { name: "Prokka", url: "https://github.com/tseemann/prokka" },
      { name: "Bakta", url: "https://github.com/oschwengers/bakta" },
      { name: "Abricate", url: "https://github.com/tseemann/abricate" },
      { name: "CARD", url: "https://card.mcmaster.ca" },
      { name: "ResFinder", url: "https://cge.food.dtu.dk/services/ResFinder/" },
      { name: "PlasmidFinder", url: "https://cge.food.dtu.dk/services/PlasmidFinder/" },
      { name: "AMRFinderPlus", url: "https://github.com/ncbi/amr" },
      { name: "VFDB", url: "http://www.mgc.ac.cn/VFs/" },
    ],
  },
  {
    day: "Thursday",
    title: "Population Genomics, Phylogenomics & Outbreak Investigation",
    objectives: [
      "Call SNPs against a reference using Snippy",
      "Build a core-genome alignment and remove recombinant regions with Gubbins",
      "Infer a maximum-likelihood phylogeny with IQ-TREE",
      "Visualise the tree with metadata in Microreact for outbreak interpretation",
    ],
    sections: [
      { heading: "Morning — Variant Calling", items: [
        "Read mapping with BWA / minimap2",
        "Variant calling with Snippy (bcftools+freebayes wrapper)",
        "Core vs accessory genome (Roary / Panaroo)",
        "MLST and cgMLST schemes",
      ]},
      { heading: "Afternoon — Phylogenomics", items: [
        "Recombination removal: Gubbins, ClonalFrameML",
        "Model selection and tree inference: IQ-TREE, RAxML-NG",
        "Tree visualisation with FigTree and Microreact",
        "Integrating epi metadata: dates, location, hospital ward",
      ]},
    ],
    datasets: [
      {
        name: "Vibrio cholerae outbreak — 20 isolates subset",
        source: "Zenodo",
        accession: "10.5281/zenodo.5073076",
        url: "https://zenodo.org/record/5073076",
        description: "Curated V. cholerae assemblies + reads from the Galaxy 'Cholera epidemiology' tutorial. Pre-trimmed for fast classroom use.",
      },
      {
        name: "M. tuberculosis Lineage 4 phylogenomics dataset",
        source: "Zenodo",
        accession: "10.5281/zenodo.3496437",
        url: "https://zenodo.org/record/3496437",
        description: "TB isolates with rich metadata — used to illustrate timed phylogenies and drug-resistance evolution.",
      },
      {
        name: "Vibrio cholerae N16961 reference genome",
        source: "NCBI",
        accession: "GCF_000006745.1",
        url: "https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_000006745.1/",
        description: "Reference for SNP calling against the cholera dataset (two chromosomes, ~4 Mb).",
      },
    ],
    steps: [
      {
        title: "Map reads & call SNPs with Snippy",
        code: { body: `cd ~/bact-course/phylo
mkdir snippy && cd snippy

# Reference
datasets download genome accession GCF_000006745.1 --include genome
unzip -o ncbi_dataset.zip
REF=$(ls ncbi_dataset/data/GCF_000006745.1/*.fna)

# Run Snippy on one isolate
snippy --cpus 4 --outdir iso01 \\
  --ref $REF \\
  --R1 ../../raw/iso01_R1.fq.gz --R2 ../../raw/iso01_R2.fq.gz` },
        expected: "An iso01/ folder with snps.vcf, snps.aligned.fa and snps.tab listing each variant with annotation.",
      },
      {
        title: "Build a core-SNP alignment for many isolates",
        code: { body: `# Run snippy on each isolate, then:
snippy-core --ref $REF --prefix core iso*/

# Outputs: core.aln (SNP alignment), core.full.aln (full reference)
seqkit stats core.aln` },
        expected: "A multi-FASTA core SNP alignment (one row per isolate) — typically a few thousand SNPs across cholera isolates.",
      },
      {
        title: "Remove recombination with Gubbins",
        code: { body: `run_gubbins.py --threads 4 --prefix gubbins core.full.aln
ls gubbins.*
# gubbins.recombination_predictions.gff
# gubbins.filtered_polymorphic_sites.fasta` },
        expected: "Filtered alignment with recombinant blocks masked — essential before tree building for highly recombinogenic species.",
      },
      {
        title: "Build the phylogeny with IQ-TREE",
        code: { body: `iqtree2 -s gubbins.filtered_polymorphic_sites.fasta \\
  -m GTR+G -bb 1000 -nt 4 -pre cholera_tree

# Output: cholera_tree.treefile (Newick)` },
        expected: "A Newick tree file with bootstrap support values. Open it in FigTree or Microreact.",
      },
      {
        title: "Visualise with metadata in Microreact",
        instructions: [
          "Go to microreact.org and click 'Upload'.",
          "Drop in cholera_tree.treefile and a CSV with columns: id, country, year, lineage.",
          "Colour tips by year, then by country — observe transmission waves through the outbreak.",
        ],
      },
    ],
    deliverables: [
      "Core-SNP alignment of ≥10 isolates",
      "Recombination-filtered phylogenetic tree",
      "Microreact project URL with metadata overlay",
    ],
    reading: [
      { name: "Croucher et al. 2015 — Gubbins paper", url: "https://academic.oup.com/nar/article/43/3/e15/2410982" },
      { name: "Argimón et al. 2016 — Microreact", url: "https://www.microbiologyresearch.org/content/journal/mgen/10.1099/mgen.0.000093" },
    ],
    tools: [
      { name: "Snippy", url: "https://github.com/tseemann/snippy" },
      { name: "Roary", url: "https://github.com/sanger-pathogens/Roary" },
      { name: "Panaroo", url: "https://github.com/gtonkinhill/panaroo" },
      { name: "Gubbins", url: "https://github.com/nickjcroucher/gubbins" },
      { name: "IQ-TREE", url: "http://www.iqtree.org" },
      { name: "Microreact", url: "https://microreact.org" },
      { name: "FigTree", url: "http://tree.bio.ed.ac.uk/software/figtree/" },
    ],
  },
  {
    day: "Friday",
    title: "Capstone Project & Advanced Topics",
    objectives: [
      "Complete an end-to-end outbreak investigation in groups",
      "Present results in a public-health-style brief (max 5 slides)",
      "Discuss real-time genomic surveillance with Nextstrain",
      "Outline next steps: BEAST timed trees, metagenomics, RNA-seq",
    ],
    sections: [
      { heading: "Morning (09:00–13:00) — Capstone hackathon", items: [
        "Groups of 3–4 pick one of the three capstone tracks (see below)",
        "Run the full pipeline on the provided dataset",
        "Document each step in a shared Markdown notebook",
      ]},
      { heading: "Afternoon (14:00–16:00) — Advanced topics", items: [
        "Nextstrain pipelines for live surveillance dashboards",
        "BEAST/BEAST2 for time-scaled phylogenetics",
        "Bacterial RNA-Seq under antibiotic stress (DESeq2)",
        "Shotgun metagenomics with Kraken2 + Bracken",
      ]},
      { heading: "Closing (16:00–17:00)", items: [
        "Group presentations (5 min each)",
        "Course wrap-up, certificates and feedback survey",
      ]},
    ],
    datasets: [
      {
        name: "Capstone A — MDR Klebsiella pneumoniae outbreak",
        source: "Zenodo",
        accession: "10.5281/zenodo.10650983",
        url: "https://zenodo.org/record/10650983",
        description: "20 isolates from a hospital ICU outbreak. Reconstruct transmission, identify carbapenemases and propose infection-control actions.",
      },
      {
        name: "Capstone B — Vibrio cholerae regional surveillance",
        source: "Zenodo",
        accession: "10.5281/zenodo.5073076",
        url: "https://zenodo.org/record/5073076",
        description: "30 V. cholerae isolates spanning 5 countries. Place them in a global phylogeny and assess introductions vs local transmission.",
      },
      {
        name: "Capstone C — Foodborne Salmonella enterica cluster",
        source: "EnteroBase",
        accession: "Salmonella enterica",
        url: "https://enterobase.warwick.ac.uk/species/index/senterica",
        description: "Public Salmonella isolates with cgMLST profiles. Identify the outbreak cluster and likely food vehicle.",
      },
      {
        name: "Nextstrain — Tuberculosis live build",
        source: "Nextstrain",
        url: "https://nextstrain.org/community/tb-phylogenomics/global",
        description: "Browse a real-time global TB phylogeny to inspire your capstone presentation.",
      },
    ],
    steps: [
      {
        title: "Run the end-to-end pipeline (single Bash script)",
        goal: "Tie everything together — QC → Assembly → Annotation → AMR → Phylo.",
        code: { body: `#!/usr/bin/env bash
set -euo pipefail
SAMPLES=$(ls raw/*_R1.fq.gz | sed 's|raw/||;s|_R1.fq.gz||')

for S in $SAMPLES; do
  fastp -i raw/\${S}_R1.fq.gz -I raw/\${S}_R2.fq.gz \\
        -o trim/\${S}_R1.fq.gz -O trim/\${S}_R2.fq.gz --json qc/\${S}.json
  spades.py --only-assembler -1 trim/\${S}_R1.fq.gz -2 trim/\${S}_R2.fq.gz \\
            -o asm/\${S} -t 4
  prokka --outdir ann/\${S} --prefix \${S} --cpus 4 asm/\${S}/scaffolds.fasta
  abricate --db card ann/\${S}/\${S}.fna > amr/\${S}.tsv
  snippy --cpus 4 --outdir snp/\${S} --ref ref.fasta \\
         --R1 trim/\${S}_R1.fq.gz --R2 trim/\${S}_R2.fq.gz
done

snippy-core --ref ref.fasta --prefix phylo/core snp/*
run_gubbins.py --prefix phylo/gubbins phylo/core.full.aln
iqtree2 -s phylo/gubbins.filtered_polymorphic_sites.fasta \\
        -m GTR+G -bb 1000 -nt 4 -pre phylo/tree
echo "Pipeline complete."` },
      },
      {
        title: "Prepare your 5-slide presentation",
        instructions: [
          "Slide 1 — Outbreak background & question",
          "Slide 2 — Sequencing & assembly QC summary",
          "Slide 3 — AMR / virulence findings table",
          "Slide 4 — Phylogenetic tree with metadata",
          "Slide 5 — Public health recommendation",
        ],
      },
    ],
    deliverables: [
      "Shared Markdown lab notebook for the capstone",
      "Final phylogeny with metadata (Microreact link or PDF)",
      "5-slide group presentation",
      "Short reflection on which step was hardest and why",
    ],
    reading: [
      { name: "Hadfield et al. 2018 — Nextstrain", url: "https://academic.oup.com/bioinformatics/article/34/23/4121/5001388" },
      { name: "Bouckaert et al. 2019 — BEAST 2.5", url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1006650" },
    ],
    tools: [
      { name: "Nextstrain", url: "https://nextstrain.org" },
      { name: "BEAST 2", url: "https://www.beast2.org" },
      { name: "Kraken2", url: "https://github.com/DerrickWood/kraken2" },
      { name: "DESeq2", url: "https://bioconductor.org/packages/DESeq2/" },
      { name: "EnteroBase", url: "https://enterobase.warwick.ac.uk" },
    ],
  },
];
