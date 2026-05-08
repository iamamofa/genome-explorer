import { createFileRoute } from "@tanstack/react-router";
import { BookCourse, type Part, type Dataset } from "@/components/BookCourse";

export const Route = createFileRoute("/fungal-handbook")({
  component: FungalHandbook,
  head: () => ({
    meta: [
      { title: "Working with Fungal Genomes — Full Handbook" },
      { name: "description", content: "Comprehensive fungal genomics handbook: ITS barcoding, hybrid assembly, BUSCO, antiSMASH, comparative genomics, antifungal resistance — Aspergillus, Candida auris, Cryptococcus." },
      { property: "og:title", content: "Working with Fungal Genomes — Handbook" },
      { property: "og:description", content: "From ITS amplicons to chromosome-level fungal assemblies, with antifungal resistance, BGCs and outbreak workflows." },
    ],
  }),
});

function FungalHandbook() {
  return (
    <BookCourse
      variant="fungi"
      slug="fungal-handbook"
      title="Working with Fungal Genomes"
      authors="GenomicsTraining team — adapted from cambiotraining materials"
      published="November 12, 2025"
      overview="This course teaches the practical analysis of fungal genomes from raw reads to publication figures. Fungi present challenges that bacteria do not — large genomes (10–100 Mb), introns, repetitive elements, polyploidy, and dikaryotic mycelia — so the workflows differ substantially. We cover ITS-based barcoding, hybrid Illumina + ONT assembly with Flye and Polypolish, ab-initio + evidence-driven gene prediction with AUGUSTUS / funannotate, completeness assessment with BUSCO, biosynthetic gene cluster mining with antiSMASH 7, comparative genomics with OrthoFinder, and antifungal-resistance profiling. Case studies use Aspergillus fumigatus, Candida auris and Cryptococcus neoformans."
      objectives={[
        "Choose between ITS / shotgun / hybrid sequencing depending on the biological question.",
        "Quality-control fungal Illumina and ONT reads and decontaminate host or bacterial DNA.",
        "Assemble fungal genomes with SPAdes, Flye and hybrid pipelines, and evaluate them with QUAST and BUSCO.",
        "Predict and annotate fungal genes with AUGUSTUS / funannotate including UTRs and isoforms.",
        "Identify biosynthetic gene clusters (antiSMASH) and antifungal-resistance markers (MARDy, ResFinder-FG).",
        "Build orthogroups with OrthoFinder and species trees with IQ-TREE on concatenated single-copy orthologues.",
        "Investigate a Candida auris outbreak end-to-end, from FASTQ to a written report.",
      ]}
      audience="Mycologists, plant-pathologists, clinical microbiologists working with invasive fungal infections, biotechnologists screening secondary metabolites, and bioinformaticians coming from a bacterial background who need to handle the extra complexity of eukaryotic genomes."
      prerequisites={{
        essential: [
          "Comfortable on the UNIX command line — pipes, loops, ssh, conda environments.",
          "Basic molecular biology including transcription, splicing and ploidy.",
          "Familiarity with FASTQ / FASTA / GFF formats.",
        ],
        desirable: [
          "Some R or Python for downstream visualisation.",
          "Prior exposure to a Nextflow or Snakemake pipeline.",
        ],
      }}
      citation="GenomicsTraining (2025). Working with Fungal Genomes — Handbook edition."
      parts={parts}
    />
  );
}

const parts: Part[] = [
  {
    title: "Introduction",
    chapters: [
      { id: "ch1", number: "1", title: "Introduction",
        summary: "Why fungal genomics is harder than bacterial genomics, and where this course sits.",
        blocks: [
          { type: "p", text: "Fungi have eukaryotic genomes — introns, repeats, sometimes multiple nuclei, sometimes haploid then diploid in the same life cycle. That means tools borrowed from bacteria (Prokka, Roary, Snippy) generally do not work, and the assembly contiguity / completeness bar is much harder to clear." },
          { type: "p", text: "Across the week you will assemble a Candida auris genome, mine an Aspergillus fumigatus genome for biosynthetic gene clusters, build orthogroups across five Aspergillus species, and finish with a simulated C. auris outbreak in a hospital ICU." },
        ],
      },
      { id: "ch2", number: "2", title: "Data & Setup",
        blocks: [
          { type: "code", text: `mamba create -n fungi -y \\
  nextflow=24.* fastp fastqc multiqc seqkit \\
  spades flye medaka polypolish bwa samtools \\
  busco augustus funannotate antismash=7.* \\
  orthofinder iqtree mafft trimal kraken2

conda activate fungi

# Course data (Zenodo)
mkdir -p ~/fungi-course && cd ~/fungi-course
wget -q https://zenodo.org/records/14012345/files/cauris_outbreak.tar.gz
wget -q https://zenodo.org/records/14012346/files/afumigatus_hybrid.tar.gz
wget -q https://zenodo.org/records/14012347/files/aspergillus_5sp.tar.gz
ls *.tar.gz | xargs -n1 tar -xzf` },
        ],
      },
    ],
  },
  {
    title: "Foundations",
    chapters: [
      { id: "ch3", number: "3", title: "Know your fungus",
        blocks: [
          { type: "table",
            headers: ["Species", "Genome (Mb)", "GC %", "Ploidy", "Notes"],
            rows: [
              ["Saccharomyces cerevisiae", "12", "38", "1n / 2n", "Model, fully solved"],
              ["Candida auris", "12", "44", "1n", "MDR, nosocomial"],
              ["Aspergillus fumigatus", "29", "50", "1n", "BGCs, azole resistance"],
              ["Cryptococcus neoformans", "19", "48", "1n / 2n", "Capsule, CNS infection"],
              ["Fusarium graminearum", "36", "48", "1n", "Plant pathogen, mycotoxins"],
            ],
          },
        ],
      },
      { id: "ch4", number: "4", title: "Sequencing strategies",
        blocks: [
          { type: "list", items: [
            "ITS amplicon (Sanger or MinION) — fast species ID, can't see resistance.",
            "Illumina shotgun (150 bp PE, 50–80×) — variant calling, MLST, low-cost surveillance.",
            "ONT long reads (R10.4, sup basecall) — chromosome-level assembly.",
            "Hybrid (Illumina + ONT) — gold standard for reference-quality assemblies.",
          ] },
        ],
      },
      { id: "ch5", number: "5", title: "ITS barcoding",
        blocks: [
          { type: "p", text: "The internal transcribed spacer (ITS) region is the official fungal DNA barcode. Use ITSx to extract the ITS1/ITS2 from raw amplicons, then BLAST against UNITE or query the EuPathDB FungiDB." },
          { type: "code", text: `ITSx -i its_reads.fasta -o sample --cpu 4 --preserve T
blastn -query sample.ITS1.fasta -db UNITE_v9 -outfmt 6 -max_target_seqs 1 -out sample.tsv` },
        ],
      },
      { id: "ch6", number: "6", title: "Workflow management with Snakemake",
        blocks: [
          { type: "p", text: "We use Nextflow for shared community pipelines (nf-core/funcscan, nf-core/fetchngs) and Snakemake for project-specific scripting. A minimal Snakefile that runs fastp → SPAdes → BUSCO over a sample sheet:" },
          { type: "code", text: `samples = [l.strip() for l in open("samples.txt")]

rule all:
    input: expand("busco/{s}/short_summary.json", s=samples)

rule trim:
    input:  r1="reads/{s}_R1.fq.gz", r2="reads/{s}_R2.fq.gz"
    output: r1="trim/{s}_R1.fq.gz", r2="trim/{s}_R2.fq.gz"
    shell:  "fastp -i {input.r1} -I {input.r2} -o {output.r1} -O {output.r2}"

rule asm:
    input:  rules.trim.output
    output: "asm/{s}/scaffolds.fasta"
    shell:  "spades.py --only-assembler -1 {input[0]} -2 {input[1]} -o asm/{wildcards.s} -t 8"

rule busco:
    input:  rules.asm.output
    output: "busco/{s}/short_summary.json"
    shell:  "busco -i {input} -o busco/{wildcards.s} -l fungi_odb10 -m genome -c 8"` },
        ],
      },
    ],
  },
  {
    title: "Quality control",
    chapters: [
      { id: "ch7", number: "7", title: "Read QC and decontamination",
        blocks: [
          { type: "p", text: "Fungal cultures are routinely contaminated with bacteria and host DNA. Always run Kraken2 against PlusPF before assembly and remove non-fungal reads with seqkit." },
          { type: "code", text: `kraken2 --db k2_pluspf --paired SAMP_R1.fq.gz SAMP_R2.fq.gz \\
        --report SAMP.k2.report --output SAMP.k2.out

# Keep reads classified as fungi (taxid 4751) or unclassified
extract_kraken_reads.py -k SAMP.k2.out -s1 SAMP_R1.fq.gz -s2 SAMP_R2.fq.gz \\
                       -t 4751 --include-children -r SAMP.k2.report \\
                       -o SAMP.fungi_R1.fq -o2 SAMP.fungi_R2.fq` },
        ],
      },
      { id: "ch8", number: "8", title: "ONT QC with NanoPlot and Filtlong",
        blocks: [
          { type: "code", text: `NanoPlot --fastq SAMP_ont.fq.gz -o nanoplot_SAMP --threads 4
filtlong --min_length 1000 --keep_percent 95 SAMP_ont.fq.gz | gzip > SAMP_ont.filt.fq.gz` },
        ],
      },
    ],
  },
  {
    title: "Assembly",
    chapters: [
      { id: "ch9", number: "9", title: "Short-read assembly with SPAdes",
        blocks: [
          { type: "code", text: `spades.py --isolate -1 SAMP_R1.fq.gz -2 SAMP_R2.fq.gz \\
          -o spades_SAMP -t 8 -m 32 -k 21,33,55,77` },
          { type: "callout", text: "SPAdes copes with eukaryotic data but produces fragmented assemblies for repetitive regions (centromeres, rDNA arrays). Acceptable for SNP-level analysis, not for synteny." },
        ],
      },
      { id: "ch10", number: "10", title: "Long-read assembly with Flye",
        blocks: [
          { type: "code", text: `flye --nano-hq SAMP_ont.filt.fq.gz --out-dir flye_SAMP \\
     --threads 8 --genome-size 30m --asm-coverage 50` },
        ],
      },
      { id: "ch11", number: "11", title: "Hybrid polishing",
        blocks: [
          { type: "code", text: `# 1. Polish ONT assembly with Medaka
medaka_consensus -i SAMP_ont.filt.fq.gz -d flye_SAMP/assembly.fasta \\
                 -o medaka_SAMP -t 8 -m r1041_e82_400bps_sup_v4.2.0

# 2. Polish further with Illumina reads (Polypolish)
bwa index medaka_SAMP/consensus.fasta
bwa mem -t 8 -a medaka_SAMP/consensus.fasta SAMP_R1.fq.gz > aln_R1.sam
bwa mem -t 8 -a medaka_SAMP/consensus.fasta SAMP_R2.fq.gz > aln_R2.sam
polypolish polish medaka_SAMP/consensus.fasta aln_R1.sam aln_R2.sam > SAMP.polished.fasta` },
          { type: "tip", text: "Skip Polypolish if your Illumina coverage is < 30× — short-read polishing on low coverage introduces more errors than it fixes." },
        ],
      },
      { id: "ch12", number: "12", title: "Assembly evaluation: QUAST + BUSCO",
        blocks: [
          { type: "code", text: `quast.py -o quast_SAMP -t 4 SAMP.polished.fasta
busco -i SAMP.polished.fasta -o busco_SAMP -l fungi_odb10 -m genome -c 8` },
          { type: "table",
            headers: ["Metric", "Pass", "Investigate"],
            rows: [
              ["BUSCO complete (single)", "> 95 %", "90–95 %"],
              ["BUSCO duplicated", "< 2 %", "2–10 % suggests assembly haplotype bleeding"],
              ["N50", "> 500 kb (hybrid) / > 50 kb (Illumina-only)", "anything lower"],
              ["# contigs", "≤ chromosome count + 50", "hundreds = fragmented"],
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Annotation",
    chapters: [
      { id: "ch13", number: "13", title: "Repeat masking",
        blocks: [
          { type: "code", text: `BuildDatabase -name SAMP_db SAMP.polished.fasta
RepeatModeler -database SAMP_db -threads 8 -LTRStruct
RepeatMasker -pa 8 -lib SAMP_db-families.fa -xsmall SAMP.polished.fasta` },
        ],
      },
      { id: "ch14", number: "14", title: "Gene prediction with funannotate",
        blocks: [
          { type: "p", text: "funannotate wraps AUGUSTUS, GeneMark-ES, SNAP, GlimmerHMM and EVidenceModeler into a single pipeline that handles UTRs, alternative splicing, and tRNAs. RNA-seq evidence is strongly recommended but optional." },
          { type: "code", text: `funannotate clean -i SAMP.polished.fasta -o SAMP.cleaned.fa
funannotate sort  -i SAMP.cleaned.fa -o SAMP.sorted.fa
funannotate mask  -i SAMP.sorted.fa -o SAMP.masked.fa --cpus 8

funannotate predict -i SAMP.masked.fa -o annot_SAMP --species "Candida auris" \\
                    --busco_db saccharomycetes --cpus 8 --augustus_species candida_albicans

funannotate annotate -i annot_SAMP --cpus 8 --busco_db saccharomycetes` },
        ],
      },
      { id: "ch15", number: "15", title: "Functional annotation",
        blocks: [
          { type: "list", items: [
            "InterProScan: protein domains and GO terms.",
            "EggNOG-mapper: orthologue-based functional categories (KEGG, COG, BRITE).",
            "SignalP 6 + DeepTMHMM: secretome prediction.",
            "SecretomeP / EffectorP for plant pathogens.",
          ] },
          { type: "code", text: `interproscan.sh -i annot_SAMP/predict_results/SAMP.proteins.fa \\
                -f tsv,gff3 -goterms -pa -cpu 8` },
        ],
      },
    ],
  },
  {
    title: "Specialised analyses",
    chapters: [
      { id: "ch16", number: "16", title: "Biosynthetic gene clusters with antiSMASH 7",
        blocks: [
          { type: "p", text: "Fungi produce industrially important secondary metabolites (penicillin, cyclosporin, statins) from biosynthetic gene clusters. antiSMASH 7 detects them from genome + GFF input." },
          { type: "code", text: `antismash --taxon fungi --output-dir as7_SAMP --cb-general --cb-knownclusters \\
          --cb-subclusters --asf --pfam2go --smcog-trees --cpus 8 \\
          --genefinding-gff3 annot_SAMP/predict_results/SAMP.gff3 \\
          annot_SAMP/predict_results/SAMP.scaffolds.fa` },
        ],
      },
      { id: "ch17", number: "17", title: "Antifungal resistance",
        blocks: [
          { type: "p", text: "Resistance to azoles, echinocandins and polyenes is detected by SNPs/indels in well-characterised target genes (cyp51A in Aspergillus; ERG11, FKS1/2 in Candida). MARDy and the FungAMR database curate these markers." },
          { type: "code", text: `# Map reads to a known cyp51A reference and look at variants
bwa mem -t 8 ref/cyp51A.fa SAMP_R1.fq.gz SAMP_R2.fq.gz | samtools sort -o cyp51A.bam -
bcftools mpileup -f ref/cyp51A.fa cyp51A.bam | bcftools call -mv --ploidy 1 -Oz -o cyp51A.vcf.gz
bcftools view cyp51A.vcf.gz | grep -E 'TR34|L98H|TR46|Y121F|T289A'` },
          { type: "warn", text: "TR34/L98H is the most common environmental azole-resistance allele in A. fumigatus. Always report it explicitly to the clinician." },
        ],
      },
    ],
  },
  {
    title: "Comparative genomics",
    chapters: [
      { id: "ch18", number: "18", title: "Orthogroups with OrthoFinder",
        blocks: [
          { type: "code", text: `mkdir prot && cp annot_*/predict_results/*.proteins.fa prot/
orthofinder -f prot/ -t 16 -a 16` },
          { type: "p", text: "OrthoFinder produces single-copy orthologue alignments (SCOs) you can concatenate for a species tree, plus orthogroup tables for every pair of species." },
        ],
      },
      { id: "ch19", number: "19", title: "Species tree from concatenated SCOs",
        blocks: [
          { type: "code", text: `# Align each SCO with MAFFT, trim with trimAl, concatenate
for f in OrthoFinder/Results_*/Single_Copy_Orthologue_Sequences/*.fa; do
  mafft --auto $f > $\{f%.fa}.aln
  trimal -in $\{f%.fa}.aln -out $\{f%.fa}.trim -gappyout
done

AMAS.py concat -i *.trim -f fasta -d aa -t concat.aa.fasta -p partitions.txt
iqtree2 -s concat.aa.fasta -p partitions.txt -m TESTMERGE -B 1000 -nt AUTO` },
        ],
      },
      { id: "ch20", number: "20", title: "Synteny with MCscanX / pyMCscan",
        blocks: [
          { type: "p", text: "Once you have orthogroups, plot syntenic blocks across species to spot rearrangements, lineage-specific regions and horizontal transfer." },
        ],
      },
    ],
  },
  {
    title: "Outbreak!",
    chapters: [
      { id: "ch21", number: "21", title: "Candida auris ICU outbreak — full exercise",
        summary: "20 isolates, 4 wards, 6 weeks. Find the cluster.",
        blocks: [
          { type: "ol", items: [
            "Download the Zenodo dataset and read the provided line list.",
            "QC reads (fastp + Kraken2); flag any sample with > 5 % bacterial contamination.",
            "Assemble with SPAdes; evaluate with BUSCO (saccharomycetes_odb10).",
            "Type with the Candida auris cgMLST scheme (chewBBACA).",
            "Map all isolates to B11221 reference; build a SNP tree with bactmap-style workflow.",
            "Detect ERG11 (Y132F, K143R) and FKS1 (S639F) resistance variants.",
            "Overlay clade, ward and date on the tree with ggtree.",
            "Define the outbreak cluster (≤ 5 SNPs) and write a one-page IPC report.",
          ] },
          { type: "tip", text: "Candida auris falls into 5 geographic clades (I–V). Always confirm clade assignment before interpreting SNP distances — between-clade comparisons are meaningless for outbreak analysis." },
        ],
      },
    ],
  },
  {
    title: "Reporting & Appendices",
    chapters: [
      { id: "ch22", number: "22", title: "Communicating fungal genomics to clinicians",
        blocks: [
          { type: "list", items: [
            "Lead with the actionable finding: species, clade, resistance.",
            "One figure: dated tree coloured by ward.",
            "State the assembly quality (BUSCO complete %).",
            "Give a turnaround time and the limits of detection.",
          ] },
        ],
      },
      { id: "appA", number: "A", title: "Common file formats", blocks: [
        { type: "table",
          headers: ["Extension", "Format", "Used for"],
          rows: [
            [".fastq(.gz)", "FASTQ", "Reads + Phred"],
            [".fasta / .fna", "FASTA", "Assemblies, references"],
            [".gff3", "GFF3", "Gene models from funannotate / AUGUSTUS"],
            [".tbl + .sqn", "NCBI tbl", "GenBank submission"],
            [".gbk", "GenBank", "Annotated chromosomes"],
            [".json (antiSMASH)", "antiSMASH JSON", "BGC predictions"],
          ],
        },
      ] },
      { id: "appB", number: "B", title: "Course Software", blocks: [
        { type: "list", items: [
          "nextflow 24.04.4", "snakemake 8.20.1", "fastp 0.23.4", "kraken2 2.1.3",
          "spades 3.15.5", "flye 2.9.4", "medaka 1.11.3", "polypolish 0.6.0",
          "busco 5.7.1", "funannotate 1.8.17", "augustus 3.5.0", "interproscan 5.69",
          "antismash 7.1.0", "orthofinder 2.5.5", "iqtree 2.3.6", "mafft 7.526",
        ] },
      ] },
    ],
  },
];
