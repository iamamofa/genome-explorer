import { createFileRoute } from "@tanstack/react-router";
import { CoursePage } from "@/components/CoursePage";
import { DaySchedule } from "@/components/DaySchedule";
import fungiHero from "@/assets/fungi-hero.jpg";

export const Route = createFileRoute("/fungal")({
  component: FungalPage,
  head: () => ({
    meta: [
      { title: "Fungal Genomics — Bioinformatics Training Course" },
      { name: "description", content: "5-day intensive course on fungal genomics: from sequencing strategies through assembly, annotation, comparative genomics and phylogenomics." },
      { property: "og:title", content: "Fungal Genomics — Bioinformatics Training" },
      { property: "og:description", content: "Hands-on training in fungal genome assembly, annotation and phylogenomics." },
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
      subtitle="A 5-day intensive integrating medical mycology, plant pathology, industrial biotechnology, and environmental genomics."
      heroImage={fungiHero}
      heroAlt="Fungal hyphae and spores under microscope"
      audience={["Mycologists", "Biologists", "Bioinformaticians", "Public Health Scientists", "Agricultural Scientists", "Graduate & undergraduate students", "Clinicians (medical mycology focus)", "Biomedical Research Scientists"]}
      format={["Morning lectures (conceptual foundations)", "Guided hands-on practical sessions", "Case discussions", "End-of-day synthesis & Q&A", "Integrated medical, plant, industrial & environmental examples"]}
      prerequisites={["Basic genetics and microbiology", "Basic molecular biology (DNA extraction, PCR, sequencing principles)", "Basic computing skills", "Familiarity with Linux command line (pre-course materials provided)"]}
    >
      {days.map((d) => <DaySchedule key={d.day} {...d} variant="fungi" />)}
    </CoursePage>
  );
}

const days = [
  {
    day: "Monday",
    title: "Foundations of Fungal Genomics & Sequencing",
    sections: [
      { heading: "Fungal Biology from a Genomic Perspective", items: ["Genome organization (haploid/diploid phases, heterokaryosis, accessory chromosomes)", "Mating types and reproductive strategies", "Genome size variability & repeat content"] },
      { heading: "Major Fungal Taxa & Model Organisms", items: ["Ascomycota", "Basidiomycota", "Candida albicans", "Aspergillus fumigatus", "Cryptococcus neoformans"] },
      { heading: "Sequencing Strategies in Fungi", items: ["Whole Genome Sequencing (WGS)", "ITS barcoding", "Metagenomics", "Comparative genomics", "Short-read vs long-read technologies"] },
    ],
    tools: [
      { name: "NCBI Genome", url: "https://www.ncbi.nlm.nih.gov/genome" },
      { name: "UNITE (ITS)", url: "https://unite.ut.ee" },
      { name: "Illumina", url: "https://www.illumina.com" },
      { name: "Oxford Nanopore", url: "https://nanoporetech.com" },
      { name: "Fungal genome size DB", url: "http://www.zbi.ee/fungal-genomesize" },
    ],
  },
  {
    day: "Tuesday",
    title: "Unix, NGS & Reproducible Workflows",
    sections: [
      { heading: "Unix/Linux for Genomics (Hands-On)", items: ["File systems", "Shell commands", "HPC environments"] },
      { heading: "Bash & Workflow Automation", items: ["Writing simple scripts", "Looping over fungal genome datasets", "Reproducibility principles"] },
      { heading: "Genomic File Formats", items: ["FASTQ", "FASTA", "SAM/BAM", "VCF", "GFF/GTF"] },
      { heading: "Workflow Managers", items: ["Snakemake", "Nextflow"] },
    ],
    tools: [
      { name: "Software Carpentry", url: "https://software-carpentry.org/lessons/" },
      { name: "Snakemake", url: "https://snakemake.readthedocs.io" },
      { name: "Nextflow", url: "https://www.nextflow.io/docs/latest/" },
      { name: "SAMtools", url: "http://www.htslib.org" },
    ],
  },
  {
    day: "Wednesday",
    title: "From Raw Reads to Fungal Genomes",
    sections: [
      { heading: "Quality Control & Trimming", items: ["Adapter removal", "Quality filtering", "Contamination screening"] },
      { heading: "Genome Assembly", items: ["De novo assembly", "Reference-based assembly", "Hybrid assembly"] },
      { heading: "Assembly Evaluation", items: ["BUSCO (fungal lineage datasets)", "QUAST"] },
      { heading: "Repeat Masking & Optional Steps", items: ["RepeatMasker", "Optional: host read removal (Bowtie2)"] },
    ],
    tools: [
      { name: "FastQC", url: "https://www.bioinformatics.babraham.ac.uk/projects/fastqc/" },
      { name: "Trimmomatic", url: "http://www.usadellab.org/cms/?page=trimmomatic" },
      { name: "MultiQC", url: "https://multiqc.info" },
      { name: "SPAdes", url: "https://cab.spbu.ru/software/spades/" },
      { name: "Flye", url: "https://github.com/fenderglass/Flye" },
      { name: "BUSCO", url: "https://busco.ezlab.org" },
      { name: "QUAST", url: "http://quast.sourceforge.net" },
      { name: "RepeatMasker", url: "http://www.repeatmasker.org" },
      { name: "Bowtie2", url: "http://bowtie-bio.sourceforge.net/bowtie2" },
    ],
  },
  {
    day: "Thursday",
    title: "Genome Annotation & Comparative Genomics",
    sections: [
      { heading: "Structural Annotation", items: ["Gene prediction (ab initio & evidence-based)", "CDS, introns, UTRs"] },
      { heading: "Functional Annotation", items: ["GO terms", "KEGG pathways", "Pfam domains", "Secondary metabolite clusters"] },
      { heading: "Fungal Genomic Databases", items: ["FungiDB", "Ensembl Fungi"] },
      { heading: "Comparative & Population Genomics", items: ["SNP/INDEL calling (FreeBayes, GATK)", "Structural variants", "Pan-genome (core vs accessory)", "PCA & phylogenomic clustering", "Detecting selection", "Antifungal resistance evolution"] },
    ],
    tools: [
      { name: "AUGUSTUS", url: "https://bioinf.uni-greifswald.de/augustus/" },
      { name: "BRAKER", url: "https://github.com/Gaius-Augustus/BRAKER" },
      { name: "InterProScan", url: "https://www.ebi.ac.uk/interpro/" },
      { name: "KEGG", url: "https://www.genome.jp/kegg/" },
      { name: "Pfam", url: "https://pfam.xfam.org" },
      { name: "antiSMASH", url: "https://antismash.secondarymetabolites.org" },
      { name: "FungiDB", url: "https://fungidb.org" },
      { name: "Ensembl Fungi", url: "https://fungi.ensembl.org" },
    ],
  },
  {
    day: "Friday",
    title: "Phylogenomics & Capstone Project",
    sections: [
      { heading: "Phylogenomics", items: ["Marker-based phylogeny (ITS, LSU, SSU)", "Whole-genome phylogeny", "MSA and cleaning", "Model selection", "Tree construction & visualization"] },
      { heading: "Capstone Case Study", items: ["Azole-resistant Aspergillus fumigatus outbreak", "Population genomics of Candida auris", "Comparative genomics of plant-pathogenic fungi"] },
      { heading: "Deliverables", items: ["Assembly & annotation report", "Variant analysis summary", "Phylogenetic tree", "Biological interpretation presentation"] },
    ],
    tools: [
      { name: "MAFFT", url: "https://mafft.cbrc.jp/alignment/software/" },
      { name: "IQ-TREE", url: "http://www.iqtree.org" },
      { name: "RAxML-NG", url: "https://github.com/amkozlov/raxml-ng" },
      { name: "FigTree", url: "http://tree.bio.ed.ac.uk/software/figtree/" },
    ],
  },
];
