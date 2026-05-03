import { createFileRoute } from "@tanstack/react-router";
import { CoursePage } from "@/components/CoursePage";
import { DaySchedule } from "@/components/DaySchedule";
import bacteriaHero from "@/assets/bacteria-hero.jpg";

export const Route = createFileRoute("/bacterial")({
  component: BacterialPage,
  head: () => ({
    meta: [
      { title: "Bacterial Genomics — Bioinformatics Training Course" },
      { name: "description", content: "5-day intensive course on bacterial genomics: WGS, AMR profiling, population genomics, phylogenomics, and outbreak investigation." },
      { property: "og:title", content: "Bacterial Genomics — Bioinformatics Training" },
      { property: "og:description", content: "Hands-on training in bacterial WGS, AMR profiling, and outbreak investigation." },
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
      subtitle="A 5-day intensive contextualized for clinical microbiology, AMR surveillance, food safety, environmental microbiology, and industrial biotechnology."
      heroImage={bacteriaHero}
      heroAlt="Bacterial cells under electron microscope"
      audience={["Microbiologists", "Biologists", "Bioinformaticians", "Public Health Scientists", "Clinical Laboratory Scientists", "Epidemiologists", "Graduate & undergraduate students", "Biomedical Research Scientists", "Antimicrobial Resistance (AMR) Researchers"]}
      format={["Morning conceptual lectures", "Guided hands-on practical sessions", "Group exercises", "Case discussions", "End-of-day synthesis session", "Applied to clinical, AMR, food safety & environmental contexts"]}
      prerequisites={["Basic genetics and microbiology", "Basic molecular biology (DNA extraction, PCR, sequencing principles)", "Basic computing skills", "Familiarity with Linux command line (pre-course materials provided)"]}
    >
      {days.map((d) => <DaySchedule key={d.day} {...d} variant="bacteria" />)}
    </CoursePage>
  );
}

const days = [
  {
    day: "Monday",
    title: "Foundations of Bacterial Genomics & Sequencing",
    sections: [
      { heading: "Bacterial Genome Architecture", items: ["Circular chromosomes and plasmids", "Operons and gene regulation", "Horizontal Gene Transfer (HGT)", "Mobile genetic elements (transposons, integrons, bacteriophages)"] },
      { heading: "Model & Clinically Important Organisms", items: ["Escherichia coli", "Staphylococcus aureus", "Mycobacterium tuberculosis", "Salmonella enterica"] },
      { heading: "Sequencing Strategies", items: ["Whole Genome Sequencing (WGS)", "16S rRNA amplicon sequencing", "Shotgun metagenomics", "Targeted sequencing for AMR genes", "Outbreak sequencing strategies"] },
      { heading: "Sequencing Platforms", items: ["Illumina (short-read)", "Oxford Nanopore Technologies (long-read)", "Pacific Biosciences (long-read)"] },
      { heading: "Afternoon Practical", items: ["Exploring bacterial genomes in public repositories", "Choosing sequencing strategies for different scenarios", "Case discussion: outbreak vs surveillance sequencing"] },
    ],
    tools: [
      { name: "NCBI", url: "https://www.ncbi.nlm.nih.gov" },
      { name: "BV-BRC", url: "https://www.bv-brc.org" },
      { name: "Ensembl Bacteria", url: "https://bacteria.ensembl.org" },
    ],
  },
  {
    day: "Tuesday",
    title: "Linux, NGS Data & Genome Assembly",
    sections: [
      { heading: "Unix & Reproducible Workflows", items: ["Linux command-line fundamentals", "Bash scripting for automation", "File formats: FASTQ, FASTA, SAM/BAM, VCF, GFF/GTF", "Workflow managers (Snakemake / Nextflow)", "Reproducibility best practices (Git, containers, documentation)"] },
      { heading: "From Raw Reads to Clean Data", items: ["Quality control and trimming", "Adapter removal", "Contamination detection", "Managing large bacterial datasets"] },
      { heading: "Genome Assembly", items: ["De novo assembly", "Reference-based mapping", "Hybrid assembly (short + long reads)", "Plasmid reconstruction", "Assembly polishing"] },
      { heading: "Quality Assessment", items: ["Coverage analysis", "Completeness & contamination", "Assembly metrics (N50, L50)"] },
    ],
    tools: [
      { name: "Snakemake", url: "https://snakemake.readthedocs.io" },
      { name: "Nextflow", url: "https://www.nextflow.io/docs/latest/" },
      { name: "FastQC", url: "https://www.bioinformatics.babraham.ac.uk/projects/fastqc/" },
      { name: "SPAdes", url: "https://cab.spbu.ru/software/spades/" },
      { name: "Unicycler", url: "https://github.com/rrwick/Unicycler" },
      { name: "QUAST", url: "http://quast.sourceforge.net" },
    ],
  },
  {
    day: "Wednesday",
    title: "Genome Annotation & AMR Profiling",
    sections: [
      { heading: "Structural & Functional Annotation", items: ["Gene prediction", "Identification of CDS, rRNA, tRNA", "GO terms, KEGG pathways", "COG functional categories"] },
      { heading: "AMR & Virulence Analysis", items: ["Identification of antimicrobial resistance genes", "CARD, ResFinder, PlasmidFinder", "Virulence factor analysis"] },
      { heading: "Public Databases", items: ["NCBI", "BV-BRC", "Ensembl Bacteria"] },
      { heading: "Afternoon Practical", items: ["Annotating a bacterial genome", "Generating an AMR and virulence profile", "Interpreting resistance mechanisms"] },
    ],
    tools: [
      { name: "Prokka", url: "https://github.com/tseemann/prokka" },
      { name: "CARD", url: "https://card.mcmaster.ca" },
      { name: "ResFinder", url: "https://cge.food.dtu.dk/services/ResFinder/" },
      { name: "PlasmidFinder", url: "https://cge.food.dtu.dk/services/PlasmidFinder/" },
      { name: "VFDB", url: "http://www.mgc.ac.cn/VFs/" },
      { name: "KEGG", url: "https://www.genome.jp/kegg/" },
    ],
  },
  {
    day: "Thursday",
    title: "Population Genomics, Phylogenomics & Outbreak Investigation",
    sections: [
      { heading: "Variant Calling & Population Structure", items: ["SNP and INDEL calling", "Core genome alignment", "Recombination detection", "Multi-locus sequence typing (MLST)", "Pan-genome analysis (core vs accessory)", "PCA and clustering", "Bacterial GWAS (bGWAS)"] },
      { heading: "Phylogenomics & Transmission Mapping", items: ["Core genome SNP phylogeny", "Model selection and tree building", "Tree visualization and interpretation", "Integrating epidemiological metadata", "Transmission mapping"] },
      { heading: "Case Examples", items: ["Hospital outbreak of MRSA", "Foodborne outbreak of Salmonella enterica", "Drug-resistant Mycobacterium tuberculosis surveillance"] },
      { heading: "Afternoon Practical", items: ["Build a core-genome SNP phylogeny", "Integrate metadata for outbreak interpretation", "Group discussion: genomic epidemiology in practice"] },
    ],
    tools: [
      { name: "Snippy", url: "https://github.com/tseemann/snippy" },
      { name: "Roary", url: "https://github.com/sanger-pathogens/Roary" },
      { name: "Gubbins", url: "https://github.com/nickjcroucher/gubbins" },
      { name: "IQ-TREE", url: "http://www.iqtree.org" },
      { name: "Microreact", url: "https://microreact.org" },
    ],
  },
  {
    day: "Friday",
    title: "Capstone Project & Advanced Topics",
    sections: [
      { heading: "Capstone Project (Group-Based)", items: ["WGS of multidrug-resistant Klebsiella pneumoniae", "Comparative genomics of pathogenic vs commensal E. coli", "Regional AMR surveillance dataset"] },
      { heading: "Required Deliverables", items: ["Assembly and annotation report", "AMR and virulence profile", "Phylogenetic tree with metadata", "Short biological & epidemiological interpretation"] },
      { heading: "Advanced & Optional Topics", items: ["Bacterial RNA-Seq workflows", "Differential gene expression under antibiotic stress", "16S microbiome analysis", "Shotgun metagenomics", "Functional microbiome profiling"] },
      { heading: "Genomic Epidemiology", items: ["Time-scaled phylogenies", "Transmission dynamics estimation", "Integrating genomic & epidemiological data", "Surveillance system implementation"] },
    ],
    tools: [
      { name: "BEAST", url: "https://beast.community" },
      { name: "Nextstrain", url: "https://nextstrain.org" },
      { name: "QIIME 2", url: "https://qiime2.org" },
    ],
  },
];
