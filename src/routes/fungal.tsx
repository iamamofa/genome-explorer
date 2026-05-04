import { createFileRoute } from "@tanstack/react-router";
import { CoursePage } from "@/components/CoursePage";
import { DaySchedule, type DayModule } from "@/components/DaySchedule";
import fungiHero from "@/assets/fungi-hero.jpg";

export const Route = createFileRoute("/fungal")({
  component: FungalPage,
  head: () => ({
    meta: [
      { title: "Fungal Genomics — Bioinformatics Training Course" },
      { name: "description", content: "5-day intensive course on fungal genomics with hands-on practicals using real Zenodo, FungiDB and ENA datasets — assembly, annotation, comparative genomics, phylogenomics." },
      { property: "og:title", content: "Fungal Genomics — Bioinformatics Training" },
      { property: "og:description", content: "Hands-on training in fungal genome assembly, annotation and phylogenomics with real public datasets." },
      { property: "og:image", content: fungiHero },
    ],
  }),
});

function FungalPage() {
  return (
    <CoursePage
      variant="fungi"
      eyebrow="Fungal Track"
      title="Fungal Genomics: from sequencing to interpretation"
      subtitle="A 5-day intensive course with hands-on practicals using real public datasets from Zenodo, FungiDB and ENA. Integrating medical mycology, plant pathology, industrial biotech, and environmental genomics."
      heroImage={fungiHero}
      heroAlt="Fungal hyphae and spores under microscope"
      audience={["Mycologists", "Bioinformaticians", "Public Health & Clinical Mycologists", "Agricultural Scientists", "Graduate students", "Biomedical Researchers"]}
      format={["Morning lectures (conceptual foundations)", "Guided hands-on practical sessions (3h)", "Case discussions on real outbreaks", "End-of-day synthesis & Q&A", "Integrated medical, plant, industrial & environmental examples"]}
      prerequisites={["Basic genetics and microbiology", "Basic molecular biology (DNA extraction, PCR, sequencing principles)", "Basic computing skills", "Familiarity with Linux command line (pre-course materials provided)", "Laptop with ≥16 GB RAM, or Galaxy account"]}
    >
      {days.map((d) => <DaySchedule key={d.day} {...d} variant="fungi" />)}
    </CoursePage>
  );
}

const days: DayModule[] = [
  {
    day: "Monday",
    title: "Foundations of Fungal Genomics & Sequencing",
    objectives: [
      "Describe key features of fungal genomes (ploidy, repeats, accessory chromosomes)",
      "Compare ITS barcoding, WGS and metagenomics approaches",
      "Navigate FungiDB, MycoCosm and Ensembl Fungi to retrieve genomes",
      "Choose an appropriate sequencing strategy for a given mycology question",
    ],
    sections: [
      { heading: "Morning Lecture", items: [
        "Fungal genome architecture: haploid/diploid phases, heterokaryosis",
        "Genome size variability (10 Mb–> 1 Gb), repeat content, accessory chromosomes",
        "Mating types and reproductive strategies",
        "Major taxa: Ascomycota, Basidiomycota; key models — Candida, Aspergillus, Cryptococcus",
      ]},
      { heading: "Afternoon Practical", items: [
        "Browse FungiDB and MycoCosm to find Aspergillus fumigatus reference",
        "Compare genome size & gene counts across fungal taxa",
        "Identify ITS region in a reference assembly",
      ]},
    ],
    datasets: [
      {
        name: "Aspergillus fumigatus Af293 reference genome",
        source: "FungiDB",
        accession: "Af293",
        url: "https://fungidb.org/fungidb/app/record/dataset/DS_a525e51e83",
        description: "Gold-standard A. fumigatus reference (~29 Mb, 8 chromosomes, ~9,800 genes). Used throughout the week.",
      },
      {
        name: "Candida auris complete genomes (4 clades)",
        source: "NCBI",
        accession: "PRJNA470683",
        url: "https://www.ncbi.nlm.nih.gov/bioproject/PRJNA470683",
        description: "Reference assemblies for the four major C. auris clades — perfect for comparative & phylogenomic exercises.",
      },
      {
        name: "UNITE — fungal ITS reference database",
        source: "UNITE",
        url: "https://unite.ut.ee",
        description: "Curated ITS sequences with species hypotheses (SH) — used for barcoding and metabarcoding.",
      },
    ],
    steps: [
      {
        title: "Set up the project workspace",
        code: { body: `mkdir -p ~/fungi-course/{data,raw,qc,assembly,annotation,phylo,results}
cd ~/fungi-course
echo "Workspace ready at $(pwd)"` },
      },
      {
        title: "Download the A. fumigatus Af293 reference",
        code: { body: `cd ~/fungi-course/data
# From FungiDB / NCBI
datasets download genome accession GCF_000002655.1 --include genome,gff3
unzip -o ncbi_dataset.zip
mv ncbi_dataset/data/GCF_000002655.1/* .
ls *.fna *.gff` },
        expected: "A. fumigatus Af293 FASTA (~29 Mb) and GFF annotation file.",
      },
      {
        title: "Locate the ITS region in the reference",
        goal: "Practice grep / awk on a GFF file.",
        code: { body: `grep -i "internal transcribed spacer\\|ITS" *.gff | head
# Or extract rRNA features:
awk '$3=="rRNA"' *.gff | head` },
        expected: "GFF lines for 18S–ITS1–5.8S–ITS2–28S rDNA cluster on chromosome 1.",
      },
    ],
    deliverables: [
      "Project workspace tree",
      "A. fumigatus reference (FASTA + GFF)",
      "Notes on genome size / gene count comparison across 3 fungal species",
    ],
    reading: [
      { name: "Stajich 2017 — Fungal genomes and insights into the evolution of the kingdom", url: "https://www.annualreviews.org/doi/10.1146/annurev-genet-120116-024748" },
      { name: "Lockhart et al. 2017 — Candida auris simultaneous emergence", url: "https://academic.oup.com/cid/article/64/2/134/2706620" },
    ],
    tools: [
      { name: "FungiDB", url: "https://fungidb.org" },
      { name: "Ensembl Fungi", url: "https://fungi.ensembl.org" },
      { name: "MycoCosm (JGI)", url: "https://mycocosm.jgi.doe.gov" },
      { name: "UNITE (ITS)", url: "https://unite.ut.ee" },
      { name: "NCBI Datasets", url: "https://www.ncbi.nlm.nih.gov/datasets/" },
    ],
  },
  {
    day: "Tuesday",
    title: "Unix, NGS & Reproducible Workflows",
    objectives: [
      "Use Linux fluently for genomics file handling",
      "Recognise and convert FASTQ, FASTA, SAM/BAM, VCF, GFF formats",
      "Write a small Snakemake or Nextflow workflow",
      "Apply reproducibility best practices (conda, containers, Git)",
    ],
    sections: [
      { heading: "Morning — Linux for Genomics", items: [
        "Filesystem, pipes, redirection, grep/awk/sed",
        "Bash scripting: variables, loops, functions",
        "HPC environments and SLURM basics",
      ]},
      { heading: "Afternoon — Reproducible workflows", items: [
        "Conda / mamba for environment management",
        "Containers: Docker / Singularity (Apptainer)",
        "Workflow managers: Snakemake vs Nextflow",
        "Version control with Git",
      ]},
    ],
    datasets: [
      {
        name: "Galaxy Training: Quality Control tutorial dataset",
        source: "Zenodo",
        accession: "10.5281/zenodo.61771",
        url: "https://zenodo.org/record/61771",
        description: "Small paired-end FASTQ files perfect for first Linux & QC exercises.",
      },
      {
        name: "Saccharomyces cerevisiae S288C reference",
        source: "Ensembl Fungi",
        url: "https://fungi.ensembl.org/Saccharomyces_cerevisiae/Info/Index",
        description: "Compact 12 Mb yeast genome — used for fast end-to-end pipeline tests.",
      },
    ],
    steps: [
      {
        title: "Inspect a FASTQ file with pure shell tools",
        code: { body: `cd ~/fungi-course/raw
wget -c https://zenodo.org/record/61771/files/GSM461177_untreat_paired_subset_1.fastq

# How many reads?
echo $(( $(wc -l < GSM461177_untreat_paired_subset_1.fastq) / 4 ))

# Average read length
awk 'NR%4==2 {sum+=length($0); n++} END {print sum/n}' \\
  GSM461177_untreat_paired_subset_1.fastq` },
        expected: "Read count and average length printed to terminal.",
      },
      {
        title: "Write a tiny Snakemake workflow",
        code: { body: `cat > Snakefile <<'EOF'
SAMPLES = ["sampleA", "sampleB"]

rule all:
    input: expand("qc/{s}_fastqc.html", s=SAMPLES)

rule fastqc:
    input:  "raw/{s}.fastq"
    output: "qc/{s}_fastqc.html"
    shell:  "fastqc {input} -o qc/"
EOF

snakemake -n   # dry run` },
        expected: "Snakemake prints the DAG of jobs it would run.",
      },
      {
        title: "Capture your environment with conda",
        code: { body: `mamba create -n fungi-course -c bioconda -c conda-forge \\
  fastqc fastp spades busco quast prokka snakemake -y
conda activate fungi-course
conda env export > environment.yml` },
        expected: "An environment.yml file you can share for full reproducibility.",
      },
    ],
    deliverables: [
      "Working conda environment + environment.yml",
      "Tiny Snakemake workflow that runs FastQC",
      "Personal Git repo with your week's scripts",
    ],
    reading: [
      { name: "Mölder et al. 2021 — Snakemake updates", url: "https://f1000research.com/articles/10-33" },
      { name: "Software Carpentry — Shell lessons", url: "https://software-carpentry.org/lessons/" },
    ],
    tools: [
      { name: "Snakemake", url: "https://snakemake.readthedocs.io" },
      { name: "Nextflow", url: "https://www.nextflow.io/docs/latest/" },
      { name: "Mamba", url: "https://mamba.readthedocs.io" },
      { name: "Apptainer", url: "https://apptainer.org" },
      { name: "Git", url: "https://git-scm.com" },
    ],
  },
  {
    day: "Wednesday",
    title: "From Raw Reads to Fungal Genomes",
    objectives: [
      "QC and trim Illumina + ONT reads",
      "Assemble fungal genomes with SPAdes (short) and Flye (long)",
      "Polish assemblies and assess them with BUSCO and QUAST",
      "Mask repeats with RepeatMasker",
    ],
    sections: [
      { heading: "Morning — QC & assembly", items: [
        "Adapter trimming, quality filtering, contamination screening",
        "De novo vs reference-guided vs hybrid assembly",
        "Long-read polishing with Medaka / Pilon",
      ]},
      { heading: "Afternoon — Evaluation", items: [
        "Completeness with BUSCO (fungi_odb10, ascomycota_odb10)",
        "Contiguity with QUAST",
        "Repeat content with RepeatMasker / RepeatModeler",
      ]},
    ],
    datasets: [
      {
        name: "Saccharomyces cerevisiae Illumina + Nanopore (Galaxy GTN)",
        source: "Zenodo",
        accession: "10.5281/zenodo.3270785",
        url: "https://zenodo.org/record/3270785",
        description: "Paired short reads + ONT long reads for hybrid yeast assembly. Small enough to assemble on a laptop in <30 min.",
      },
      {
        name: "Candida albicans SC5314 reference",
        source: "NCBI",
        accession: "GCA_000182965.3",
        url: "https://www.ncbi.nlm.nih.gov/datasets/genome/GCA_000182965.3/",
        description: "Reference for diploid yeast assembly comparison (~14 Mb).",
      },
    ],
    steps: [
      {
        title: "QC the yeast reads",
        code: { body: `cd ~/fungi-course/raw
wget -c https://zenodo.org/record/3270785/files/yeast_R1.fq.gz
wget -c https://zenodo.org/record/3270785/files/yeast_R2.fq.gz

fastqc -o ../qc yeast_R1.fq.gz yeast_R2.fq.gz
multiqc ../qc -o ../qc` },
      },
      {
        title: "Hybrid assembly with SPAdes (short + long)",
        code: { body: `cd ~/fungi-course/assembly
spades.py -t 4 \\
  -1 ../raw/yeast_R1.fq.gz -2 ../raw/yeast_R2.fq.gz \\
  --nanopore ../raw/yeast_ONT.fq.gz \\
  -o yeast_hybrid` },
        expected: "An assembly ~12 Mb, < 30 contigs, near-complete chromosomes.",
      },
      {
        title: "Assess completeness with BUSCO",
        code: { body: `busco -i yeast_hybrid/scaffolds.fasta \\
      -l saccharomycetes_odb10 -m genome \\
      -o yeast_busco -c 4` },
        expected: "BUSCO summary with C: ≥98% complete single-copy orthologs.",
      },
      {
        title: "Mask repeats",
        code: { body: `RepeatMasker -species fungi -pa 4 yeast_hybrid/scaffolds.fasta
ls yeast_hybrid/scaffolds.fasta.*` },
        expected: ".masked, .out and .tbl files. Repeat fraction in yeast is low (~5–10%).",
      },
    ],
    deliverables: [
      "Hybrid assembly FASTA",
      "BUSCO completeness summary",
      "QUAST and RepeatMasker reports",
    ],
    reading: [
      { name: "Manni et al. 2021 — BUSCO update", url: "https://academic.oup.com/mbe/article/38/10/4647/6329644" },
      { name: "Wick & Holt 2022 — Trycycler / hybrid assembly best practices", url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1010905" },
    ],
    tools: [
      { name: "FastQC", url: "https://www.bioinformatics.babraham.ac.uk/projects/fastqc/" },
      { name: "fastp", url: "https://github.com/OpenGene/fastp" },
      { name: "SPAdes", url: "https://cab.spbu.ru/software/spades/" },
      { name: "Flye", url: "https://github.com/fenderglass/Flye" },
      { name: "BUSCO", url: "https://busco.ezlab.org" },
      { name: "QUAST", url: "http://quast.sourceforge.net" },
      { name: "RepeatMasker", url: "http://www.repeatmasker.org" },
      { name: "Medaka", url: "https://github.com/nanoporetech/medaka" },
    ],
  },
  {
    day: "Thursday",
    title: "Genome Annotation & Comparative Genomics",
    objectives: [
      "Predict genes with AUGUSTUS / BRAKER trained on fungal models",
      "Functionally annotate proteins with InterProScan and KEGG",
      "Detect secondary metabolite gene clusters with antiSMASH",
      "Run a small pan-genome / orthology analysis with OrthoFinder",
    ],
    sections: [
      { heading: "Morning — Annotation", items: [
        "Ab initio gene prediction (AUGUSTUS, GeneMark-ES) vs evidence-based (BRAKER)",
        "Functional annotation: InterProScan, eggNOG-mapper",
        "Specialised: antiSMASH (secondary metabolites), CAZy (carbohydrate enzymes)",
      ]},
      { heading: "Afternoon — Comparative genomics", items: [
        "Orthology inference with OrthoFinder",
        "Pan-genome (core / accessory)",
        "Detecting selection (dN/dS)",
        "Antifungal resistance evolution (cyp51A, ERG11)",
      ]},
    ],
    datasets: [
      {
        name: "Aspergillus fumigatus assembly from Wednesday",
        source: "Zenodo",
        url: "https://zenodo.org/record/3270785",
        description: "Carry forward the assembly to annotate it.",
      },
      {
        name: "10 Aspergillus genomes for comparative genomics",
        source: "MycoCosm",
        url: "https://mycocosm.jgi.doe.gov/Aspergillus/Aspergillus.info.html",
        description: "Curated Aspergillus genomes for orthology and pan-genome exercises.",
      },
      {
        name: "antiSMASH-DB fungal entries",
        source: "antiSMASH",
        url: "https://fungismash.secondarymetabolites.org",
        description: "Pre-computed BGCs across hundreds of fungi — useful for browsing before running antiSMASH locally.",
      },
    ],
    steps: [
      {
        title: "Gene prediction with AUGUSTUS",
        code: { body: `cd ~/fungi-course/annotation
augustus --species=aspergillus_fumigatus \\
  --gff3=on \\
  ../assembly/yeast_hybrid/scaffolds.fasta > aspergillus.gff3

grep -c "	gene	" aspergillus.gff3` },
        expected: "A GFF3 file. Gene count for A. fumigatus should be ~9,000–10,000.",
      },
      {
        title: "Functional annotation with InterProScan",
        code: { body: `# Extract proteins
gffread aspergillus.gff3 -g ../assembly/yeast_hybrid/scaffolds.fasta -y proteins.faa

interproscan.sh -i proteins.faa -f tsv,gff3 \\
  -goterms -pa -dp -cpu 4` },
        expected: "TSV with InterPro/Pfam/GO/KEGG annotations for each protein.",
      },
      {
        title: "Detect secondary metabolite clusters",
        code: { body: `antismash --taxon fungi --cpus 4 \\
  --output-dir antismash_out \\
  ../assembly/yeast_hybrid/scaffolds.fasta

ls antismash_out/index.html` },
        expected: "An interactive HTML report listing NRPS, PKS, terpene clusters with genes coloured by function.",
      },
      {
        title: "Orthology with OrthoFinder",
        code: { body: `mkdir -p ortho_in
cp proteins.faa ortho_in/aspergillus.faa
# Add other species' .faa files into ortho_in/
orthofinder -t 4 -f ortho_in/` },
        expected: "OrthoFinder/Results_*/ with orthogroups, single-copy orthologs and species tree.",
      },
    ],
    deliverables: [
      "Gene prediction GFF3 + protein FASTA",
      "InterProScan + antiSMASH reports",
      "OrthoFinder summary table",
    ],
    reading: [
      { name: "Brůna et al. 2021 — BRAKER2", url: "https://academic.oup.com/nargab/article/3/1/lqaa108/6066535" },
      { name: "Blin et al. 2023 — antiSMASH 7.0", url: "https://academic.oup.com/nar/article/51/W1/W46/7151336" },
      { name: "Emms & Kelly 2019 — OrthoFinder", url: "https://genomebiology.biomedcentral.com/articles/10.1186/s13059-019-1832-y" },
    ],
    tools: [
      { name: "AUGUSTUS", url: "https://bioinf.uni-greifswald.de/augustus/" },
      { name: "BRAKER", url: "https://github.com/Gaius-Augustus/BRAKER" },
      { name: "InterProScan", url: "https://www.ebi.ac.uk/interpro/" },
      { name: "eggNOG-mapper", url: "http://eggnog-mapper.embl.de" },
      { name: "antiSMASH", url: "https://antismash.secondarymetabolites.org" },
      { name: "OrthoFinder", url: "https://github.com/davidemms/OrthoFinder" },
      { name: "FungiDB", url: "https://fungidb.org" },
    ],
  },
  {
    day: "Friday",
    title: "Phylogenomics & Capstone Project",
    objectives: [
      "Build ITS-based and whole-genome phylogenies",
      "Pick an evolutionary model with ModelTest / IQ-TREE -m TEST",
      "Complete a capstone case (Candida auris OR azole-resistant Aspergillus)",
      "Communicate findings to a clinical / research audience",
    ],
    sections: [
      { heading: "Morning — Phylogenomics", items: [
        "Marker-based: ITS, LSU, SSU, TEF1α",
        "Whole-genome: concatenated single-copy orthologs",
        "MSA with MAFFT, trimming with TrimAl",
        "Model selection + tree inference (IQ-TREE, RAxML-NG)",
      ]},
      { heading: "Afternoon — Capstone hackathon", items: [
        "Groups pick one of two cases (see datasets)",
        "Run their full pipeline and produce a phylogeny + interpretation",
        "5-minute presentation per group",
      ]},
    ],
    datasets: [
      {
        name: "Capstone A — Azole-resistant Aspergillus fumigatus",
        source: "Zenodo",
        accession: "10.5281/zenodo.7058120",
        url: "https://zenodo.org/record/7058120",
        description: "A. fumigatus isolates with annotated cyp51A mutations (TR34/L98H, TR46/Y121F/T289A). Reconstruct emergence of resistance.",
      },
      {
        name: "Capstone B — Candida auris global dataset",
        source: "NCBI",
        accession: "PRJNA470683",
        url: "https://www.ncbi.nlm.nih.gov/bioproject/PRJNA470683",
        description: "Multi-clade C. auris genomes — place new isolates and discuss clade origin & antifungal resistance.",
      },
      {
        name: "Galaxy GTN — Fungal phylogenomics tutorial data",
        source: "Zenodo",
        accession: "10.5281/zenodo.3987313",
        url: "https://zenodo.org/record/3987313",
        description: "Curated fungal protein sets for a quick whole-genome phylogeny exercise.",
      },
    ],
    steps: [
      {
        title: "Build an ITS-based phylogeny",
        code: { body: `cd ~/fungi-course/phylo
# Collect ITS sequences (FASTA) from your isolates + UNITE references
mafft --auto its_all.fasta > its_aln.fasta
trimal -in its_aln.fasta -out its_trim.fasta -automated1
iqtree2 -s its_trim.fasta -m TEST -bb 1000 -nt 4 -pre its_tree` },
        expected: "its_tree.treefile (Newick) with bootstrap values. Open in FigTree.",
      },
      {
        title: "Whole-genome phylogeny from single-copy orthologs",
        code: { body: `# OrthoFinder Results_*/Single_Copy_Orthologue_Sequences/
cat ortho_in/OrthoFinder/Results_*/Single_Copy_Orthologue_Sequences/*.fa \\
  > sco_concat.faa
mafft --auto sco_concat.faa > sco_aln.faa
trimal -in sco_aln.faa -out sco_trim.faa -automated1
iqtree2 -s sco_trim.faa -m TEST -bb 1000 -nt 4 -pre sco_tree` },
        expected: "A robust species tree with high bootstrap support across nodes.",
      },
      {
        title: "Capstone — choose A or B and run end-to-end",
        instructions: [
          "Download your chosen dataset and assemble each isolate (Wednesday's pipeline).",
          "Annotate (Thursday) and identify resistance markers (cyp51A or ERG11/FKS1).",
          "Build an ortholog-based tree and overlay metadata (year, country, MIC).",
          "Prepare a 5-slide presentation: background → methods → tree → resistance → clinical implications.",
        ],
      },
    ],
    deliverables: [
      "ITS + whole-genome phylogenies (Newick + figure)",
      "Capstone Markdown notebook with all commands",
      "5-slide group presentation",
      "Reflection on which step was hardest and why",
    ],
    reading: [
      { name: "Rhodes et al. 2018 — Genomic epidemiology of azole-resistant A. fumigatus", url: "https://www.nature.com/articles/s41564-018-0244-1" },
      { name: "Chow et al. 2020 — Tracing the early dissemination of C. auris", url: "https://www.nature.com/articles/s41591-020-0902-8" },
      { name: "Minh et al. 2020 — IQ-TREE 2", url: "https://academic.oup.com/mbe/article/37/5/1530/5721363" },
    ],
    tools: [
      { name: "MAFFT", url: "https://mafft.cbrc.jp/alignment/software/" },
      { name: "TrimAl", url: "http://trimal.cgenomics.org" },
      { name: "IQ-TREE 2", url: "http://www.iqtree.org" },
      { name: "RAxML-NG", url: "https://github.com/amkozlov/raxml-ng" },
      { name: "FigTree", url: "http://tree.bio.ed.ac.uk/software/figtree/" },
      { name: "Microreact", url: "https://microreact.org" },
    ],
  },
];
