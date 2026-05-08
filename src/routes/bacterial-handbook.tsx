import { createFileRoute } from "@tanstack/react-router";
import { BookCourse, type Part, type Dataset } from "@/components/BookCourse";

export const Route = createFileRoute("/bacterial-handbook")({
  component: BacterialHandbook,
  head: () => ({
    meta: [
      { title: "Working with Bacterial Genomes — Full Handbook" },
      { name: "description", content: "Comprehensive 43-chapter bacterial genomics handbook: QC, mapping, assembly, phylogenetics, AMR, plasmids, outbreaks. With Mycobacterium tuberculosis, S. aureus, S. pneumoniae case studies." },
      { property: "og:title", content: "Working with Bacterial Genomes — Handbook" },
      { property: "og:description", content: "From raw reads to outbreak reports — bacterial genomics, hands-on, with real public datasets." },
    ],
  }),
});

function BacterialHandbook() {
  return (
    <BookCourse
      variant="bacteria"
      slug="bacterial-handbook"
      title="Working with Bacterial Genomes"
      authors="Andries van Tonder; Hugo Tavares; Bajuna Salehe"
      published="November 12, 2025"
      overview="This comprehensive course equips you with essential skills and knowledge in bacterial genomics analysis, primarily using Illumina-sequenced samples. You will gain an understanding of how to select the most appropriate analysis workflow, tailored to the genome diversity of a given bacterial species. Through hands-on training, you will apply both de novo assembly and reference-based mapping approaches to obtain bacterial genomes for your isolates, learn typing methods such as MLST and PopPUNK, build phylogenies, detect AMR, work with plasmids and ONT data, and walk through a full simulated outbreak investigation using Mycobacterium tuberculosis, Staphylococcus aureus and Streptococcus pneumoniae as case studies."
      objectives={[
        "Choose the most suitable analysis workflow based on the genome diversity of a given bacterial species.",
        'Differentiate between "de novo assembly" and "reference-based mapping" approaches for reconstructing bacterial genomes.',
        "Apply standardised workflows to assemble and annotate genomes using both approaches.",
        "Evaluate the quality of assembled genomes and determine their suitability for downstream analysis.",
        "Detect and remove recombinant regions.",
        "Construct phylogenetic trees using both whole genome and core genome alignments.",
        "Estimate a time-scaled phylogeny using an initial maximum likelihood phylogenetic tree and sample dates.",
        "Conduct genomic epidemiology and strain typing.",
        "Detect the presence of antimicrobial resistance genes in your isolates.",
      ]}
      audience="The course is aimed at biologists interested in microbiology, prokaryotic genomics and antimicrobial resistance — including clinical microbiologists, public-health scientists, MSc/PhD students, and bioinformatics newcomers transitioning into bacterial work."
      prerequisites={{
        essential: [
          "Basic understanding of high-throughput sequencing technologies (see iBiology NGS overview).",
          "A working knowledge of the UNIX command line — work through our Linux & CLI track up to chapter 7 if needed.",
          "A working knowledge of R (data wrangling with the tidyverse, basic plotting with ggplot2).",
        ],
        desirable: [
          "Basic knowledge of phylogenetic inference methods (maximum likelihood, bootstrapping).",
          "Working knowledge of running analyses on High-Performance Computing (HPC) clusters / SLURM.",
        ],
      }}
      citation='van Tonder, A., Tavares, H., Salehe, B. (2025). Working with Bacterial Genomes. Adapted from cambiotraining.github.io/bacterial-genomics/'
      parts={parts}
      datasets={datasets}
    />
  );
}

export const datasets: Dataset[] = [
  {
    name: "Yemen Cholera Outbreak — Vibrio cholerae",
    source: "Zenodo",
    accession: "10.5281/zenodo.8208161",
    url: "https://zenodo.org/records/8208161",
    size: "~1.4 GB",
    description: "Subset of 24 V. cholerae O1 isolates from the 2016–2018 Yemen outbreak. Used for reference mapping (N16961) and phylogeny chapters.",
    command: "wget -c https://zenodo.org/records/8208161/files/cholera_subset.tar.gz\ntar -xzf cholera_subset.tar.gz",
  },
  {
    name: "Mycobacterium tuberculosis training set",
    source: "Zenodo",
    accession: "10.5281/zenodo.10650190",
    url: "https://zenodo.org/records/10650190",
    size: "~2.1 GB",
    description: "Ten MTB isolates spanning lineages 1–4 with paired-end Illumina reads. Drives the bacQC, bactmap, IQ-TREE and TB-Profiler chapters.",
    command: "wget -c https://zenodo.org/records/10650190/files/mtb_training.tar.gz\ntar -xzf mtb_training.tar.gz",
  },
  {
    name: "S. pneumoniae GPSC1 outbreak set",
    source: "Zenodo",
    accession: "10.5281/zenodo.14191636",
    url: "https://zenodo.org/records/14191636",
    size: "~3.0 GB",
    description: "30 S. pneumoniae isolates from a simulated outbreak — pan-genome, recombination (Gubbins), and PopPUNK chapters.",
    command: "wget -c https://zenodo.org/records/14191636/files/pneumo_outbreak.tar.gz\ntar -xzf pneumo_outbreak.tar.gz",
  },
  {
    name: "Klebsiella pneumoniae carbapenem outbreak (Outbreak Alert!)",
    source: "ENA",
    accession: "PRJEB30604",
    url: "https://www.ebi.ac.uk/ena/browser/view/PRJEB30604",
    size: "~6 GB",
    description: "ICU outbreak isolates with KPC/NDM/OXA carbapenemases. Used in the Chapter 42 capstone.",
    command: "nextflow run nf-core/fetchngs -r 1.12.0 \\\n  --input ids.csv --outdir fetched/ -profile docker",
  },
  {
    name: "S. aureus reference and assemblies",
    source: "NCBI",
    accession: "GCF_000013425.1",
    url: "https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_000013425.1/",
    description: "S. aureus NCTC 8325 reference for assembly QC and Bakta annotation chapters.",
    command: "datasets download genome accession GCF_000013425.1 --include genome,gff3,protein\nunzip ncbi_dataset.zip",
  },
  {
    name: "H37Rv reference (M. tuberculosis)",
    source: "NCBI",
    accession: "NC_000962.3",
    url: "https://www.ncbi.nlm.nih.gov/nuccore/NC_000962.3",
    description: "Canonical TB reference used by bactmap and TB-Profiler.",
    command: "datasets download genome accession GCF_000195955.2 --include genome,gff3",
  },
];
  {
    title: "Introduction",
    chapters: [
      {
        id: "ch1",
        number: "1",
        title: "Introduction",
        summary: "Why bacterial genomics matters, and what this course will and will not teach you.",
        blocks: [
          { type: "p", text: "Whole-genome sequencing (WGS) of bacteria has moved from a research curiosity to a routine public-health tool in less than a decade. National reference labs now sequence thousands of isolates per month for surveillance of tuberculosis, MRSA, Salmonella, and many other pathogens. Local clinical labs are following — and the bottleneck has shifted from generating sequence data to interpreting it correctly." },
          { type: "p", text: "This course teaches the practical skills you need to take a folder of FASTQ files and produce defensible answers to questions like: Which lineage is this isolate? Is it resistant to rifampicin? Is it part of an outbreak? Did transmission occur in the ICU?" },
          { type: "h3", text: "What you will do this week" },
          { type: "ol", items: [
            "Process raw Illumina reads through quality control and trimming.",
            "Run two reproducible nf-core / nextflow pipelines (bacQC, bactmap) end-to-end.",
            "De-novo assemble Staphylococcus aureus genomes and annotate them with Bakta.",
            "Build maximum-likelihood and time-scaled phylogenies, then visualise them in R with ggtree.",
            "Profile resistance genes with funcscan and Pathogenwatch and reconcile the two.",
            "Investigate a simulated S. pneumoniae outbreak from raw reads to a written report.",
          ] },
          { type: "tip", text: "Every chapter has a 'Try it yourself' section with a real dataset and a copy-pasteable command block. If you only have time for one thing per chapter, do that exercise." },
        ],
      },
      {
        id: "ch2",
        number: "2",
        title: "Data & Setup",
        summary: "Get your environment, data, and conda channels straight before chapter 3.",
        blocks: [
          { type: "h3", text: "Hardware" },
          { type: "list", items: [
            "Linux machine or VM with ≥ 8 CPU cores and ≥ 16 GB RAM (32 GB recommended for assembly).",
            "≥ 100 GB free disk under $HOME or a scratch volume.",
            "Stable internet for the first day (downloading reference data and container images).",
          ] },
          { type: "h3", text: "Software stack" },
          { type: "code", text: `# 1. Install miniforge (conda + mamba, the right way)
curl -L -O https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
bash Miniforge3-Linux-x86_64.sh -b -p $HOME/miniforge3
source $HOME/miniforge3/etc/profile.d/conda.sh

# 2. Configure bioconda channels (order matters!)
conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict

# 3. Create the course environment
mamba create -n bact -y \\
  nextflow=24.* fastqc fastp multiqc seqkit \\
  spades bwa samtools bcftools snippy \\
  iqtree gubbins mlst abricate prokka bakta

conda activate bact` },
          { type: "h3", text: "Course data" },
          { type: "code", text: `mkdir -p ~/bact-course && cd ~/bact-course
# Yemen cholera outbreak subset (Vibrio cholerae)
wget -q https://zenodo.org/records/8208161/files/cholera_subset.tar.gz
# M. tuberculosis tutorial set (10 isolates)
wget -q https://zenodo.org/records/10650190/files/mtb_training.tar.gz
# S. pneumoniae GPSC1 outbreak set
wget -q https://zenodo.org/records/14191636/files/pneumo_outbreak.tar.gz
ls *.tar.gz | xargs -n1 tar -xzf` },
          { type: "warn", text: "Always run md5sum on downloaded archives and compare to the values published on Zenodo. A truncated download will silently fail many tools later in the pipeline." },
        ],
      },
    ],
  },
  {
    title: "Introduction",
    chapters: [
      {
        id: "ch3",
        number: "3",
        title: "Know your bug",
        summary: "Genome size, GC content, plasmid load, and recombination rate decide which workflow you should use.",
        blocks: [
          { type: "p", text: "Before you run any pipeline you should know roughly what you are dealing with. The same FASTQ file can be best handled with reference-based mapping or with de novo assembly depending on how diverse the species is and how much its accessory genome varies between strains." },
          { type: "table",
            headers: ["Species", "Genome (Mb)", "GC %", "Diversity", "Recommended approach"],
            rows: [
              ["M. tuberculosis", "4.4", "65", "Very low (clonal)", "Reference mapping (H37Rv)"],
              ["S. aureus", "2.8", "33", "Moderate", "Hybrid: mapping + assembly"],
              ["S. pneumoniae", "2.0–2.2", "39", "High (transformable)", "De novo assembly + pan-genome"],
              ["E. coli / Salmonella", "5.0", "50", "Very high", "De novo assembly"],
              ["V. cholerae O1", "4.0", "47", "Low within outbreak", "Reference mapping (N16961)"],
            ],
          },
          { type: "tip", text: "Rule of thumb: if average pairwise SNP distance within your set is < 1 % of the genome length, mapping is fine. Above that, you will lose too many accessory regions and should assemble." },
        ],
      },
      {
        id: "ch4",
        number: "4",
        title: "Preparing data",
        summary: "Sample sheets, file naming, and the metadata you will wish you had collected.",
        blocks: [
          { type: "p", text: "Most pipeline failures we see at week 1 have nothing to do with the science — they are because someone called a sample 12/04/24-A and then a tool choked on the slash. Fix it now." },
          { type: "h3", text: "Naming convention" },
          { type: "list", items: [
            "Use [a-zA-Z0-9_-] only — no spaces, no /, no parentheses.",
            "Start with a letter, not a digit.",
            "Keep IDs ≤ 30 characters; many tools truncate.",
            "Match the FASTQ basename to the sample ID exactly: SAMP01_R1.fastq.gz.",
          ] },
          { type: "h3", text: "Minimum metadata to record" },
          { type: "code", text: `sample,collection_date,host,country,source,instrument,paired
SAMP01,2024-03-14,Homo sapiens,YEM,stool,Illumina_NovaSeq,true
SAMP02,2024-03-15,Homo sapiens,YEM,stool,Illumina_NovaSeq,true` },
        ],
      },
      {
        id: "ch5",
        number: "5",
        title: "Introduction to NGS",
        summary: "What an Illumina cluster is, why we get paired-end reads, and what the FASTQ quality scores really mean.",
        blocks: [
          { type: "p", text: "Illumina sequencing creates millions of clonal clusters on a flowcell, photographs each cycle of base addition, and decodes the colour into a base call plus a Phred-quality score. Each read is normally 150 bp; with paired-end chemistry you sequence both ends of the same molecule, which gives you positional anchoring during alignment." },
          { type: "h3", text: "Reading a FASTQ record" },
          { type: "code", text: `@A00123:45:HJNKVDSXX:1:1101:1027:1000 1:N:0:NTGAGGTC
NTACGGTGCCAAGGTAGTGGCAGGCGGCAATGCTAACGGTAGTGCAGGCGGCAATGCTAACG
+
#FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF` },
          { type: "callout", text: "Phred Q30 means a 1-in-1000 chance the base is wrong; Q20 means 1-in-100. Below Q20 we usually trim." },
        ],
      },
      {
        id: "ch6",
        number: "6",
        title: "Workflow management",
        summary: "Why bash for-loops do not scale, and how Nextflow / Snakemake save you.",
        blocks: [
          { type: "p", text: "A workflow manager turns 'I ran 13 commands by hand and one of them failed' into 'I described the dag once and the manager handles retries, parallelism, and provenance'. We use Nextflow with nf-core pipelines because they are battle-tested, version-pinned, and run identically on a laptop, an HPC, or AWS Batch." },
          { type: "code", text: `# Install nextflow
curl -s https://get.nextflow.io | bash
sudo mv nextflow /usr/local/bin/

# Run a tiny example
nextflow run hello -profile docker` },
        ],
      },
      {
        id: "ch7",
        number: "7",
        title: "The nf-core project",
        summary: "Where bacterial pipelines come from and how to read their docs.",
        blocks: [
          { type: "p", text: "nf-core is a curated collection of community-built Nextflow pipelines. For bacteria the ones you will use this week are bacQC (read QC), bactmap (reference mapping), assembleBAC and bacass (de novo assembly), funcscan (AMR/BGC scanning), and pairgenomealign (comparative genomics)." },
          { type: "list", items: [
            "Every nf-core pipeline ships with --test profile — always run it first to confirm your environment is correct.",
            "Use -profile docker or singularity in production; -profile conda is fine for a workshop laptop.",
            "Pin a version with -r 2.1.0 so your analysis is reproducible six months later.",
          ] },
        ],
      },
      {
        id: "ch8",
        number: "8",
        title: "Downloading sequence data",
        summary: "ENA, SRA and the right way to fetch Illumina FASTQs.",
        blocks: [
          { type: "code", text: `# Best tool: nf-core/fetchngs (handles ENA + SRA + GEO)
nextflow run nf-core/fetchngs -r 1.12.0 \\
  --input ids.csv --outdir fetched/ -profile docker

# Quick alternative: enaBrowserTools
pip install enabrowsertools
enaDataGet -f fastq ERR4796442` },
          { type: "warn", text: "Avoid prefetch + fasterq-dump from sra-tools when an ENA mirror exists — ENA serves the original FASTQ, SRA reconstructs it from a SRA archive and can drop quality scores." },
        ],
      },
    ],
  },
  {
    title: "Sequence quality control",
    chapters: [
      {
        id: "ch9",
        number: "9",
        title: "Introduction to Mycobacterium tuberculosis",
        blocks: [
          { type: "p", text: "TB kills around 1.3 million people per year. Its genome is 4.4 Mb, 65 % GC, and astonishingly clonal — two isolates from opposite sides of the planet typically differ by < 1500 SNPs. That clonality is why mapping to a single reference (H37Rv, NC_000962.3) works so well, and why a few SNPs in rpoB or katG can change a treatment regimen." },
          { type: "list", items: [
            "Reference: H37Rv NC_000962.3",
            "Lineages: 1–9 plus animal-associated M. bovis / M. africanum",
            "Drug targets to know: rpoB (RIF), katG / inhA (INH), gyrA (FQ), embB (EMB), pncA (PZA)",
          ] },
        ],
      },
      {
        id: "ch10",
        number: "10",
        title: "Introduction to QC",
        summary: "FastQC, fastp, MultiQC and what to actually look at.",
        blocks: [
          { type: "code", text: `mkdir qc && cd qc
fastqc ../reads/*.fastq.gz -o .
fastp -i ../reads/SAMP01_R1.fastq.gz -I ../reads/SAMP01_R2.fastq.gz \\
      -o SAMP01_R1.trim.fq.gz -O SAMP01_R2.trim.fq.gz \\
      -j SAMP01.json -h SAMP01.html --detect_adapter_for_pe
multiqc .` },
          { type: "h3", text: "What a healthy report looks like" },
          { type: "list", items: [
            "Per-base quality stays > Q28 across the read.",
            "Adapter content < 1 %.",
            "Per-sequence GC roughly matches the species (65 % for TB, 33 % for S. aureus).",
            "Total bases > 50× expected coverage for the genome size.",
          ] },
          { type: "warn", text: "If GC distribution is bimodal you almost certainly have contamination. Run Kraken2 against PlusPF before you continue." },
        ],
      },
      {
        id: "ch11",
        number: "11",
        title: "The bacQC pipeline",
        blocks: [
          { type: "p", text: "bacQC bundles fastp + FastQC + Kraken2 + bracken + Confindr into a single Nextflow workflow. Output is a per-sample HTML report and a tidy summary table you can import into R." },
          { type: "code", text: `nextflow run avantonder/bacQC -r 2.0.1 \\
  --input samplesheet.csv \\
  --kraken2db /data/k2_pluspf_16gb_20240605 \\
  --genome_size 4400000 \\
  --outdir bacqc_out -profile docker` },
          { type: "tip", text: "Fail any sample where Confindr reports > 5 % contamination or Kraken2 assigns < 80 % of reads to your target species. Re-extract from the original culture before resequencing." },
        ],
      },
    ],
  },
  {
    title: "Reference-based assembly",
    chapters: [
      {
        id: "ch12",
        number: "12",
        title: "Mapping to a reference",
        blocks: [
          { type: "p", text: "Reference mapping aligns each read to a known genome and calls variants where the read disagrees with the reference. It is fast, gives positional context, and produces directly comparable variant calls across samples — but it can only see what is already in the reference." },
          { type: "code", text: `# Index reference once
bwa index ref/H37Rv.fasta
samtools faidx ref/H37Rv.fasta

# Map and sort
bwa mem -t 8 -R "@RG\\tID:SAMP01\\tSM:SAMP01\\tPL:ILLUMINA" \\
        ref/H37Rv.fasta SAMP01_R1.trim.fq.gz SAMP01_R2.trim.fq.gz \\
| samtools sort -@4 -o SAMP01.bam -
samtools index SAMP01.bam

# Call variants
bcftools mpileup -f ref/H37Rv.fasta SAMP01.bam \\
| bcftools call -mv --ploidy 1 -Oz -o SAMP01.vcf.gz
bcftools index SAMP01.vcf.gz` },
        ],
      },
      {
        id: "ch13",
        number: "13",
        title: "The nf-core/bactmap pipeline",
        blocks: [
          { type: "p", text: "bactmap automates the previous chapter for any number of samples and produces a core-genome SNP alignment ready for IQ-TREE." },
          { type: "code", text: `nextflow run nf-core/bactmap -r 1.0.0 \\
  --input samplesheet.csv \\
  --reference ref/H37Rv.fasta \\
  --outdir bactmap_out -profile docker` },
          { type: "callout", text: "Outputs you will use later: bactmap_out/pseudogenomes/aligned_pseudogenomes.fas (input to IQ-TREE) and bactmap_out/multiqc/multiqc_report.html (sanity check)." },
        ],
      },
    ],
  },
  {
    title: "Phylogenetics",
    chapters: [
      {
        id: "ch14",
        number: "14",
        title: "Building phylogenetic trees",
        blocks: [
          { type: "p", text: "A phylogeny estimates the evolutionary relationships between samples from their sequences. For bacteria we usually use a maximum-likelihood tree from a SNP alignment, with a substitution model that fits the data and bootstrap support to quantify confidence." },
          { type: "code", text: `# Mask invariant sites first to avoid bias
snp-sites -o snps.fas aligned_pseudogenomes.fas
iqtree2 -s snps.fas -m GTR+G+ASC -B 1000 -nt AUTO -pre tb_tree` },
          { type: "tip", text: "ASC (ascertainment-bias correction) is essential when you give IQ-TREE only variant sites — without it, branch lengths will be inflated 10-100×." },
        ],
      },
      {
        id: "ch15",
        number: "15",
        title: "TB-Profiler",
        blocks: [
          { type: "p", text: "TB-Profiler classifies the lineage of an M. tuberculosis isolate and predicts resistance to all WHO-listed drugs from raw reads or a BAM file in one command." },
          { type: "code", text: `mamba install -y -c bioconda tb-profiler
tb-profiler profile -1 SAMP01_R1.trim.fq.gz -2 SAMP01_R2.trim.fq.gz \\
                    --prefix SAMP01 -t 8 --txt
tb-profiler collate    # aggregate all samples into one TSV` },
        ],
      },
      {
        id: "ch16",
        number: "16",
        title: "Visualising phylogenies",
        blocks: [
          { type: "p", text: "We use ggtree (R/Bioconductor) because you can layer metadata, AMR profiles and bootstrap support onto the tree with a few lines of dplyr-style code." },
          { type: "code", text: `library(ggtree); library(treeio); library(ggplot2)
tree <- read.tree("tb_tree.treefile")
meta <- read.csv("metadata.csv")

p <- ggtree(tree) %<+% meta +
     geom_tippoint(aes(color = lineage), size = 3) +
     geom_tiplab(size = 2, offset = 0.0001) +
     theme_tree2()
ggsave("tb_tree.pdf", p, width = 8, height = 10)` },
        ],
      },
      {
        id: "ch17",
        number: "17",
        title: "Know your Audience",
        summary: "A tree without a story is just lines on a page.",
        blocks: [
          { type: "p", text: "Before you make your final figure ask: who reads this? A clinician needs to know which patient is resistant to which drug. A microbiologist wants to see the lineage colour-coded. An epidemiologist wants the date and location of each tip. The same tree usually needs three different layouts." },
          { type: "list", items: [
            "Clinician view: drug-resistance heatmap on the right, patient ID tip labels.",
            "Outbreak view: collection date as branch colour, location as tip shape.",
            "Publication view: bootstrap > 80 highlighted, scale bar in SNPs.",
          ] },
        ],
      },
      {
        id: "ch18",
        number: "18",
        title: "Estimating time-scaled phylogenies",
        blocks: [
          { type: "p", text: "If your samples have collection dates, you can transform the ML tree (substitutions/site) into a time tree (years) using TreeTime or BEAST. This lets you estimate when an outbreak started and the rate of spread." },
          { type: "code", text: `treetime --tree tb_tree.treefile --aln snps.fas \\
         --dates dates.tsv --clock-rate 1e-7 \\
         --outdir treetime_out` },
          { type: "warn", text: "Always check the root-to-tip regression in treetime_out/ — if R² < 0.4, the molecular clock signal is too weak and your dated tree is unreliable." },
        ],
      },
    ],
  },
  {
    title: "Transmission",
    chapters: [
      {
        id: "ch19",
        number: "19",
        title: "Building transmission networks",
        blocks: [
          { type: "p", text: "Transmission inference combines a dated phylogeny with epidemiological metadata (dates, locations, contacts) to estimate who-infected-whom probabilities. Tools: TransPhylo (R), phybreak, outbreaker2." },
          { type: "code", text: `library(TransPhylo)
ptree <- ptreeFromPhylo(read.nexus("tb_dated.nex"), dateLastSample = 2024.5)
res   <- inferTTree(ptree, w.shape = 1.3, w.scale = 0.8, mcmcIterations = 1e5)
plot(res)` },
        ],
      },
    ],
  },
  {
    title: "De-novo assembly and annotation",
    chapters: [
      {
        id: "ch20",
        number: "20",
        title: "Introduction to Staphylococcus aureus",
        blocks: [
          { type: "p", text: "S. aureus has a 2.8 Mb, 33 % GC genome with a sizeable accessory pool: SCCmec cassettes carry methicillin resistance, prophages carry virulence factors. Because so much variation lives outside the core, mapping alone misses important biology — we assemble." },
        ],
      },
      {
        id: "ch21",
        number: "21",
        title: "de novo Assembly and Annotation",
        blocks: [
          { type: "code", text: `# Assemble with SPAdes (fast, --isolate mode for bacteria)
spades.py --isolate -1 SAMP01_R1.trim.fq.gz -2 SAMP01_R2.trim.fq.gz \\
          -o spades_SAMP01 -t 8 -m 16

# Annotate with Bakta (replacement for Prokka, includes AMR + replicon detection)
bakta --db ~/db/bakta --output bakta_SAMP01 --prefix SAMP01 \\
      --threads 8 spades_SAMP01/scaffolds.fasta` },
        ],
      },
      {
        id: "ch22",
        number: "22",
        title: "The assembleBAC pipeline",
        blocks: [
          { type: "p", text: "assembleBAC chains fastp → SPAdes → QUAST → CheckM2 → Bakta → MLST into one command. It scales to thousands of isolates on SLURM." },
          { type: "code", text: `nextflow run avantonder/assembleBAC -r 2.1.0 \\
  --input samplesheet.csv --outdir assembled/ -profile docker` },
        ],
      },
      {
        id: "ch23",
        number: "23",
        title: "Assembly Quality",
        blocks: [
          { type: "p", text: "An assembly is good enough for typing and phylogeny when N50 > 50 kb, contigs > 200 are < 200, total length within 10 % of the expected genome size, and CheckM2 completeness > 95 % with contamination < 2 %." },
          { type: "table",
            headers: ["Metric", "Pass", "Investigate", "Reject"],
            rows: [
              ["N50", "> 50 kb", "20–50 kb", "< 20 kb"],
              ["# contigs > 200", "< 200", "200–500", "> 500"],
              ["Total length vs expected", "± 5 %", "± 10 %", "> 10 %"],
              ["CheckM2 completeness", "> 95 %", "90–95 %", "< 90 %"],
              ["CheckM2 contamination", "< 2 %", "2–5 %", "> 5 %"],
            ],
          },
        ],
      },
      {
        id: "ch24",
        number: "24",
        title: "Typing bacteria using MLST",
        blocks: [
          { type: "code", text: `mlst spades_SAMP01/scaffolds.fasta
# SAMP01  saureus  ST22  arcC(7) aroE(6) glpF(1) gmk(5) pta(8) tpi(8) yqiL(6)` },
          { type: "callout", text: "MLST is fast and historical, but it only sees 7 housekeeping genes. For modern outbreak typing, jump straight to cgMLST (chewBBACA) or core-SNP phylogeny." },
        ],
      },
    ],
  },
  {
    title: "Pan-genome analysis",
    chapters: [
      {
        id: "ch25",
        number: "25",
        title: "Introduction to Pan-genomes",
        blocks: [
          { type: "p", text: "The pan-genome of a species is the union of all genes ever observed in it: a core genome present in (almost) every strain, and an accessory genome that varies. For S. pneumoniae the core is ~ 1100 genes and the pan ~ 5000 — most adaptation lives in the accessory." },
        ],
      },
      {
        id: "ch26",
        number: "26",
        title: "Panaroo",
        blocks: [
          { type: "p", text: "Panaroo improves on Roary by collapsing fragmented genes and correcting annotation errors before clustering. It is the current default for bacterial pan-genomes." },
          { type: "code", text: `panaroo -i bakta_*/SAMP*.gff3 -o panaroo_out --clean-mode strict -t 8 -a core
# Outputs gene_presence_absence.csv + core_gene_alignment.aln` },
        ],
      },
      {
        id: "ch27",
        number: "27",
        title: "Pathogenwatch",
        blocks: [
          { type: "p", text: "Pathogenwatch (pathogen.watch) is a free web platform that takes assemblies and returns species ID, MLST, AMR profile, and a placement on a public global tree — all in your browser. Useful as a sanity check against your CLI results." },
        ],
      },
      {
        id: "ch28",
        number: "28",
        title: "Visualising phylogenies 2",
        blocks: [
          { type: "p", text: "Now overlay the gene presence/absence matrix from Panaroo onto the core-genome ML tree using gheatmap() in ggtree." },
          { type: "code", text: `gpa <- read.csv("gene_presence_absence.csv", row.names = 1)
gheatmap(p, gpa[, -(1:14)], offset = 0.001, width = 2, colnames = FALSE,
         low = "white", high = "steelblue") + theme(legend.position = "none")` },
        ],
      },
    ],
  },
  {
    title: "Recombination",
    chapters: [
      { id: "ch29", number: "29", title: "Introduction to Streptococcus pneumoniae",
        blocks: [
          { type: "p", text: "S. pneumoniae is naturally transformable — it picks up DNA from its environment and recombines it into the chromosome. This means that mapping-based SNP calls include thousands of imported variants that violate phylogenetic assumptions and must be removed before tree-building." },
        ],
      },
      { id: "ch30", number: "30", title: "Run bactmap",
        blocks: [{ type: "code", text: `nextflow run nf-core/bactmap -r 1.0.0 \\
  --input pneumo_samplesheet.csv --reference ref/ATCC_700669.fasta \\
  --outdir pneumo_bactmap -profile docker` }],
      },
      { id: "ch31", number: "31", title: "Introduction to recombination",
        blocks: [
          { type: "p", text: "Use Gubbins to detect recombination tracts in the bactmap pseudogenome alignment and produce a recombination-masked tree." },
          { type: "code", text: `run_gubbins.py --prefix pneumo_gubbins --threads 8 \\
               pneumo_bactmap/pseudogenomes/aligned_pseudogenomes.fas` },
        ],
      },
      { id: "ch32", number: "32", title: "Typing bacteria using PopPUNK",
        blocks: [
          { type: "p", text: "PopPUNK assigns isolates to global pneumococcal sequence clusters (GPSCs) using k-mer distances. It is fast, scalable, and ties your local data to the worldwide nomenclature." },
          { type: "code", text: `poppunk_assign --db GPS_v8 --query pneumo_assemblies.txt \\
               --output pneumo_gpsc --threads 8` },
        ],
      },
      { id: "ch33", number: "33", title: "Pathogenwatch 2",
        blocks: [{ type: "p", text: "Re-upload the pneumo assemblies and check that the GPSC, serotype (from SeroBA inside Pathogenwatch), and resistance profile match your CLI calls." }],
      },
      { id: "ch34", number: "34", title: "Visualising phylogenies with ggtree",
        blocks: [{ type: "code", text: `tree <- read.tree("pneumo_gubbins.final_tree.tre")
p <- ggtree(tree) %<+% meta +
     geom_tippoint(aes(color = serotype, shape = gpsc), size = 3) +
     scale_color_brewer(palette = "Set3")` }],
      },
    ],
  },
  {
    title: "Vaccines",
    chapters: [
      { id: "ch35", number: "35", title: "Identifying vaccine candidates with reverse vaccinology",
        blocks: [
          { type: "p", text: "Reverse vaccinology screens the proteome in silico for surface-exposed, conserved, non-host-homologous antigens. The reference open-source tool is Vaxign-ML; for fast triage use the Vaxijen 3.0 web server." },
          { type: "list", items: [
            "Filter: signal peptide (SignalP) OR transmembrane (TMHMM, ≤ 1 TM helix).",
            "Conservation: present in > 95 % of strains in your Panaroo run.",
            "Safety: no BLAST hit to the human proteome with E < 1e-10.",
          ] },
        ],
      },
      { id: "ch36", number: "36", title: "Pan-Genome Analysis for Vaccine Development",
        blocks: [{ type: "p", text: "Combine the Panaroo core gene set with the reverse-vaccinology filters above to shortlist 20–50 candidate antigens. Visualise their conservation across GPSCs in a ggplot2 tile plot to communicate coverage to the wet-lab team." }],
      },
    ],
  },
  {
    title: "Antimicrobial Resistance",
    chapters: [
      { id: "ch37", number: "37", title: "Introduction to Antimicrobial resistance",
        blocks: [
          { type: "p", text: "AMR genes are detected from genomes by homology search against curated databases (CARD, ResFinder, NCBI AMRFinderPlus). Each database has its own naming scheme, curation philosophy, and quirks — never rely on just one." },
        ],
      },
      { id: "ch38", number: "38", title: "Command-line AMR prediction",
        blocks: [
          { type: "code", text: `# AMRFinderPlus (NCBI, gold standard for clinical labs)
amrfinder -n spades_SAMP01/scaffolds.fasta -O Staphylococcus_aureus -o SAMP01.tsv

# Abricate against multiple DBs
for db in card resfinder ncbi vfdb; do
  abricate --db $db spades_SAMP01/scaffolds.fasta > SAMP01_$\{db}.tab
done` },
        ],
      },
      { id: "ch39", number: "39", title: "funcscan versus Pathogenwatch",
        blocks: [
          { type: "p", text: "nf-core/funcscan runs AMRFinderPlus + DeepARG + RGI + fARGene + AMRPlusPlus and reconciles them. Pathogenwatch uses its own curated panel. Disagreements are normal — investigate them, do not paper over them." },
          { type: "code", text: `nextflow run nf-core/funcscan -r 2.0.0 \\
  --input samplesheet.csv --run_arg_screening \\
  --outdir funcscan_out -profile docker` },
        ],
      },
    ],
  },
  {
    title: "Plasmid analysis",
    chapters: [
      { id: "ch40", number: "40", title: "Working with ONT data",
        blocks: [
          { type: "p", text: "Oxford Nanopore long reads (>10 kb) resolve plasmids and repeats that short reads cannot. The standard pipeline is: basecall (Dorado) → QC (NanoPlot) → assemble (Flye) → polish (Medaka, optionally Polypolish with Illumina)." },
          { type: "code", text: `flye --nano-hq SAMP_ont.fastq.gz --out-dir flye_SAMP --threads 8
medaka_consensus -i SAMP_ont.fastq.gz -d flye_SAMP/assembly.fasta \\
                 -o medaka_SAMP -t 8 -m r1041_e82_400bps_sup_v4.2.0` },
        ],
      },
      { id: "ch41", number: "41", title: "Identifying Plasmids",
        blocks: [
          { type: "code", text: `# Replicon typing
plasmidfinder.py -i flye_SAMP/assembly.fasta -o plasmidfinder_SAMP

# MOB-suite (typing + relaxase + mob cluster)
mob_recon --infile flye_SAMP/assembly.fasta --outdir mob_SAMP --num_threads 8` },
          { type: "tip", text: "If a contig is circular (Flye reports circular=Y), < 500 kb, and PlasmidFinder finds a rep gene on it — congratulations, it is a plasmid." },
        ],
      },
    ],
  },
  {
    title: "Outbreak!",
    chapters: [
      { id: "ch42", number: "42", title: "OUTBREAK ALERT!",
        summary: "End-to-end exercise: 24 isolates, 5 wards, one carbapenemase plasmid. You have one afternoon.",
        blocks: [
          { type: "p", text: "You receive 24 K. pneumoniae isolates from a tertiary hospital. Infection control suspects an outbreak on ICU. Run the full pipeline below and return a one-page report by 17:00." },
          { type: "ol", items: [
            "Download FASTQs and metadata from Zenodo (DOI on the course page).",
            "Run bacQC; reject anything with > 5 % contamination.",
            "Assemble passing isolates with assembleBAC.",
            "Type with MLST + Kleborate; flag any KPC/NDM/OXA carriers.",
            "Build a core-SNP tree with bactmap → Gubbins → IQ-TREE.",
            "Overlay ward and admission date on the tree with ggtree.",
            "Define the outbreak cluster as ≤ 10 SNPs apart with shared ward exposure.",
            "Write a report covering: cluster definition, likely index case, plasmid involvement, IPC recommendations.",
          ] },
        ],
      },
    ],
  },
  {
    title: "Reporting",
    chapters: [
      { id: "ch43", number: "43", title: "Communicating your findings",
        blocks: [
          { type: "p", text: "A genomics report that nobody reads is wasted work. Follow the inverted pyramid: headline finding first, then the figure that proves it, then the methods, then the caveats. Aim for one A4 page for clinicians, three pages for IPC, full Methods/Supplement for the laboratory record." },
          { type: "list", items: [
            "Headline: 'Six ICU patients carry a clonal KPC-3 K. pneumoniae (≤ 4 SNPs apart).'",
            "Figure: time-scaled tree coloured by ward.",
            "Methods: pipeline name and version, reference accession, SNP threshold used.",
            "Caveats: assembly N50, completeness, anything Confindr flagged.",
          ] },
        ],
      },
    ],
  },
  {
    title: "Appendices",
    chapters: [
      { id: "appA", number: "A", title: "Common file formats",
        blocks: [
          { type: "table",
            headers: ["Extension", "Format", "Used for"],
            rows: [
              [".fastq(.gz)", "FASTQ", "Raw reads + Phred quality"],
              [".fasta / .fna", "FASTA", "Assemblies, references"],
              [".gff3", "GFF3", "Gene annotations"],
              [".bam / .sam", "BAM/SAM", "Aligned reads"],
              [".vcf(.gz)", "VCF", "Variant calls"],
              [".nwk / .treefile", "Newick", "Phylogenetic trees"],
              [".gbk", "GenBank", "Annotated genomes"],
            ],
          },
        ],
      },
      { id: "appB", number: "B", title: "Course Software",
        blocks: [
          { type: "p", text: "Versions used in this edition (pin these for reproducibility):" },
          { type: "list", items: [
            "nextflow 24.04.4", "fastp 0.23.4", "fastqc 0.12.1", "multiqc 1.25",
            "spades 3.15.5", "bwa 0.7.18", "samtools 1.20", "bcftools 1.20",
            "snippy 4.6.0", "gubbins 3.3.5", "iqtree 2.3.6", "treetime 0.11.3",
            "bakta 1.9.4", "abricate 1.0.1", "amrfinder 4.0.3", "mlst 2.23.0",
            "panaroo 1.5.0", "poppunk 2.6.5", "tb-profiler 6.4.1",
          ] },
        ],
      },
    ],
  },
];
