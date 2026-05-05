import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/linux")({
  component: LinuxPage,
  head: () => ({
    meta: [
      { title: "Linux & Command Line for Bioinformatics Beginners" },
      {
        name: "description",
        content:
          "A friendly, hands-on introduction to Linux, the terminal, Bash scripting, package management, and the bioinformatics toolchain — built for absolute beginners.",
      },
      { property: "og:title", content: "Linux & Command Line — Beginner Bioinformatics" },
      {
        property: "og:description",
        content:
          "Step-by-step beginner Linux course: terminal basics, files, pipes, scripting, conda, and your first FASTQ analysis.",
      },
    ],
  }),
});

function LinuxPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Beginner-friendly · No experience required
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
            Linux & the Command Line — your first steps into bioinformatics.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            Most bioinformatics tools run from a black screen with blinking text. Don't worry — we'll go from{" "}
            <em>"what is a terminal?"</em> to running your first real DNA analysis, one command at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a href="#chapter-1" className="rounded-md bg-white px-4 py-2 font-semibold text-foreground">Start Chapter 1 →</a>
            <a href="#cheatsheet" className="rounded-md border border-white/30 bg-white/5 px-4 py-2 font-semibold text-white backdrop-blur">Jump to cheat sheet</a>
          </div>
        </div>
      </section>

      {/* Why CLI */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why bother?</p>
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
          Why every bioinformatician uses the command line.
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {whyCli.map((w) => (
            <div key={w.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="text-2xl">{w.icon}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Table of contents */}
      <section className="mx-auto max-w-5xl px-6 pb-10">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Course outline</h3>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="flex items-baseline gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground">
                  <span className="font-mono text-xs text-primary">CH {String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium">{c.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-5xl space-y-12 px-6 pb-20">
        {chapters.map((c, i) => (
          <Chapter key={c.id} index={i + 1} {...c} />
        ))}
      </section>

      {/* Cheat sheet */}
      <section id="cheatsheet" className="bg-surface py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Reference</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Command-line cheat sheet</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Print this and stick it next to your laptop. These 30 commands cover ~90% of what you'll do daily.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {cheatsheet.map((group) => (
              <div key={group.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    {group.rows.map((r) => (
                      <tr key={r[0]} className="border-b border-border/50 last:border-0">
                        <td className="py-2 pr-4 font-mono text-xs text-primary">{r[0]}</td>
                        <td className="py-2 text-muted-foreground">{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">You're ready. What now?</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Pick a track and apply everything you just learned to real microbial genomes.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a href="/bacterial" className="rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Bacterial track</span>
            <h3 className="mt-2 font-display text-xl font-semibold">Cholera & MRSA outbreak analysis →</h3>
          </a>
          <a href="/fungal" className="rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Fungal track</span>
            <h3 className="mt-2 font-display text-xl font-semibold">Aspergillus & Candida auris genomics →</h3>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------------- Chapter component ---------------- */

interface CodeBlock { body: string; caption?: string }
interface ChapterT {
  id: string;
  title: string;
  intro: string;
  objectives: string[];
  blocks: { heading: string; body?: string; code?: CodeBlock; tip?: string }[];
  exercises?: string[];
}

function Chapter({ index, id, title, intro, objectives, blocks, exercises }: ChapterT & { index: number }) {
  return (
    <article id={id} className="scroll-mt-24 rounded-3xl border border-border bg-card p-8 shadow-card sm:p-10">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm font-semibold text-primary">Chapter {String(index).padStart(2, "0")}</span>
      </div>
      <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
      <p className="mt-4 text-foreground/80">{intro}</p>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">In this chapter</h4>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {objectives.map((o) => (
            <li key={o} className="flex gap-2 text-[15px]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{o}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 space-y-7">
        {blocks.map((b, i) => (
          <div key={i}>
            <h3 className="font-display text-xl font-semibold">{b.heading}</h3>
            {b.body && <p className="mt-2 text-foreground/85 leading-relaxed">{b.body}</p>}
            {b.code && (
              <>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-foreground/95 p-4 font-mono text-[13px] leading-relaxed text-background">
                  <code>{b.code.body}</code>
                </pre>
                {b.code.caption && <p className="mt-2 text-xs italic text-muted-foreground">{b.code.caption}</p>}
              </>
            )}
            {b.tip && (
              <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
                <span className="font-semibold text-primary">💡 Tip: </span>{b.tip}
              </div>
            )}
          </div>
        ))}
      </div>

      {exercises && (
        <div className="mt-8 rounded-xl border border-border bg-surface p-5">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Try it yourself</h4>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] text-foreground/90">
            {exercises.map((e) => <li key={e}>{e}</li>)}
          </ol>
        </div>
      )}
    </article>
  );
}

/* ---------------- Content ---------------- */

const whyCli = [
  { icon: "⚡", title: "Speed", body: "Process gigabytes in seconds. No GUI can keep up with a well-crafted pipe." },
  { icon: "🔁", title: "Reproducibility", body: "Every command can be saved, shared, and re-run by your collaborators." },
  { icon: "🧰", title: "Tool access", body: "99% of bioinformatics tools (BWA, SAMtools, BLAST, etc.) are CLI-only." },
  { icon: "☁️", title: "Servers & HPC", body: "Remote compute clusters have no desktop — only a terminal over SSH." },
];

const chapters: ChapterT[] = [
  {
    id: "chapter-1",
    title: "What is the terminal?",
    intro:
      "The terminal (also called shell, console, or command line) is a text window where you type instructions and the computer answers. It's the same on Linux servers, your Mac, or WSL on Windows.",
    objectives: [
      "Open a terminal on your computer",
      "Recognise the prompt and the cursor",
      "Run your first command",
      "Read error messages without panicking",
    ],
    blocks: [
      {
        heading: "Open a terminal",
        body:
          "On macOS: press ⌘+Space, type 'Terminal', hit Enter. On Windows: install WSL (Windows Subsystem for Linux) — open PowerShell as administrator and run `wsl --install`. On Linux: press Ctrl+Alt+T.",
      },
      {
        heading: "The prompt",
        body: "When you open a terminal you'll see something like this. The $ sign means 'I'm ready for your command'.",
        code: { body: `student@laptop:~$` },
      },
      {
        heading: "Your first command",
        body: "Type the following and press Enter. echo means 'print this back to me'.",
        code: { body: `echo "Hello, bioinformatics!"` },
        tip: "Spaces and capitalisation matter. ECHO and echo are different commands.",
      },
      {
        heading: "Who am I? Where am I?",
        code: {
          body: `whoami       # your username
hostname     # the machine's name
pwd          # print working directory (where you are)
date         # what time is it?`,
        },
      },
    ],
    exercises: [
      "Open a terminal and run `whoami`, `pwd`, and `date`. Write down the output.",
      "Use `echo` to print your favourite gene name.",
    ],
  },
  {
    id: "chapter-2",
    title: "Files and folders",
    intro:
      "Linux organises everything into a tree of directories starting at /. Your home directory (~) is your personal space. Learning to move around is the most important skill of week one.",
    objectives: [
      "List, create, copy, move and delete files",
      "Understand absolute vs relative paths",
      "Use tab-completion to avoid typos",
    ],
    blocks: [
      {
        heading: "Move around",
        code: {
          body: `pwd                # where am I?
ls                 # list files here
ls -lh             # list with sizes (human readable)
ls -la             # show hidden files (start with .)
cd Documents       # change into Documents
cd ..              # go up one level
cd ~               # go to home
cd /               # go to root of filesystem`,
        },
        tip: "Press TAB while typing a filename — Linux will auto-complete it. Press TAB twice to see all options.",
      },
      {
        heading: "Create and remove",
        code: {
          body: `mkdir bioinfo                 # make a folder
cd bioinfo
touch notes.txt               # create empty file
cp notes.txt notes_backup.txt # copy
mv notes.txt my_notes.txt     # rename / move
rm notes_backup.txt           # delete a file
rmdir empty_folder            # delete empty folder
rm -r old_project             # delete folder and contents`,
        },
        tip: "There is no Trash. `rm` deletes forever. Be careful, especially with `rm -rf`.",
      },
      {
        heading: "Read files without opening them",
        code: {
          body: `cat file.txt        # print whole file
less file.txt       # scroll through (q to quit)
head file.txt       # first 10 lines
head -n 4 file.txt  # first 4 lines
tail file.txt       # last 10 lines
wc -l file.txt      # count lines`,
        },
      },
    ],
    exercises: [
      "Make a folder `~/bioinfo-course/day1`, cd into it, create a file called `welcome.txt` with `echo` and a redirection (`>`), then `cat` it.",
      "Use `ls -lh` and identify the file size of `welcome.txt`.",
    ],
  },
  {
    id: "chapter-3",
    title: "Pipes, redirection and text wrangling",
    intro:
      "The real power of the shell is connecting small tools. A FASTQ file with 40 million reads can be filtered, counted, and summarised in one line — if you know the magic symbols | > and <.",
    objectives: [
      "Redirect output to files (> and >>)",
      "Chain commands with pipes (|)",
      "Search text with grep",
      "Cut, sort, and count columns",
    ],
    blocks: [
      {
        heading: "Redirection",
        code: {
          body: `echo "line one"  > log.txt    # overwrite
echo "line two" >> log.txt    # append
ls -lh > files.txt            # save listing to a file
wc -l < files.txt             # read input from file`,
        },
      },
      {
        heading: "Pipes — output of A becomes input of B",
        code: {
          body: `ls -lh | head -n 5            # first 5 files
cat reads.fastq | wc -l       # count lines
history | grep fastqc         # search your past commands`,
        },
      },
      {
        heading: "grep, cut, sort, uniq — the swiss army knife",
        code: {
          body: `grep ">" genome.fasta | wc -l      # count FASTA contigs
grep -c "^@SRR" reads.fastq        # count reads starting with @SRR
cut -f1,3 results.tsv              # keep columns 1 and 3
sort results.tsv | uniq -c         # count unique lines
sort -k2 -n results.tsv | head     # sort by column 2 numerically`,
        },
        tip: "Combine them. `cut -f2 hits.tsv | sort | uniq -c | sort -rn | head` gives you a top-10 frequency table in one line.",
      },
    ],
    exercises: [
      "Download a small FASTA: `wget https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=NC_002695.2&rettype=fasta -O ecoli.fasta`",
      "Count how many sequences it contains using `grep` and `wc -l`.",
      "Print only the header lines.",
    ],
  },
  {
    id: "chapter-4",
    title: "Permissions, processes and remote servers",
    intro:
      "Once you start running tools on shared servers, you need to know who can read your files, how to keep a job running after you log out, and how to connect securely.",
    objectives: [
      "Read and change file permissions",
      "Monitor running processes",
      "SSH into a remote server",
      "Transfer files with scp / rsync",
    ],
    blocks: [
      {
        heading: "Permissions",
        code: {
          body: `ls -l script.sh
# -rwxr-xr-- means: owner=rwx, group=r-x, others=r--

chmod +x script.sh   # make it executable
chmod 644 data.csv   # rw for owner, r for everyone else
chown me:lab data/   # change ownership (needs sudo)`,
        },
      },
      {
        heading: "Processes",
        code: {
          body: `top            # live view (q to quit) — try htop if installed
ps aux | grep blastn
kill 12345     # stop process with PID 12345
nohup long_job.sh &   # run in background, survives logout
tmux           # better: persistent terminal sessions`,
        },
        tip: "On HPC clusters, never run heavy jobs on the login node. Use SLURM (`sbatch`, `srun`, `squeue`).",
      },
      {
        heading: "Connect to a server",
        code: {
          body: `ssh user@server.university.edu
# transfer a file FROM your laptop TO the server:
scp data.fastq user@server:/home/user/raw/
# faster + resumable:
rsync -avhP data/ user@server:/home/user/data/`,
        },
      },
    ],
    exercises: [
      "Make a tiny shell script `hello.sh` containing `echo Hello`, then `chmod +x hello.sh` and run it with `./hello.sh`.",
      "Use `ps aux | grep $(whoami) | head` to see your own processes.",
    ],
  },
  {
    id: "chapter-5",
    title: "Bash scripting basics",
    intro:
      "A Bash script is just a text file full of commands. Variables and loops let you process 100 samples as easily as 1. Every reproducible bioinformatics pipeline starts here.",
    objectives: [
      "Write and run a shell script",
      "Use variables and quoting",
      "Loop over files",
      "Add simple if/then conditions",
    ],
    blocks: [
      {
        heading: "Your first script",
        code: {
          body: `cat > greet.sh <<'EOF'
#!/usr/bin/env bash
NAME="$1"           # first argument
echo "Hello, $NAME, welcome to bioinformatics!"
EOF

chmod +x greet.sh
./greet.sh Aisha`,
        },
        tip: "The first line `#!/usr/bin/env bash` is called a 'shebang' — it tells the OS which interpreter to use.",
      },
      {
        heading: "Loop over many samples",
        code: {
          body: `for f in raw/*.fastq.gz; do
    sample=$(basename "$f" .fastq.gz)
    echo "Processing $sample"
    fastqc -o qc/ "$f"
done`,
        },
      },
      {
        heading: "Conditions",
        code: {
          body: `if [ -f genome.fasta ]; then
    echo "Found the genome"
else
    echo "Missing — downloading"
    wget https://example.org/genome.fasta
fi`,
        },
      },
    ],
    exercises: [
      "Write a script `count_reads.sh` that takes a `.fastq.gz` file and prints the read count using `zcat <file> | wc -l` divided by 4.",
      "Run it on every file in a folder using a `for` loop.",
    ],
  },
  {
    id: "chapter-6",
    title: "Installing software the right way",
    intro:
      "Bioinformatics tools are built by hundreds of different labs and often clash with each other. Conda (mamba) gives every project its own isolated environment so nothing breaks.",
    objectives: [
      "Install Miniconda / Mambaforge",
      "Create and activate environments",
      "Install bioinformatics tools from Bioconda",
      "Export an environment for sharing",
    ],
    blocks: [
      {
        heading: "Install Mambaforge (recommended)",
        code: {
          body: `# Linux / WSL / Mac
curl -L -O "https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-$(uname)-$(uname -m).sh"
bash Mambaforge-$(uname)-$(uname -m).sh
# restart terminal, then:
mamba --version`,
        },
      },
      {
        heading: "Create a project environment",
        code: {
          body: `mamba create -n bioinfo101 -c bioconda -c conda-forge \\
    fastqc fastp seqkit samtools bwa minimap2 -y

mamba activate bioinfo101
fastqc --version`,
        },
        tip: "One environment per project. When you publish, run `mamba env export > environment.yml` so others can recreate it exactly.",
      },
      {
        heading: "Containers — the next step",
        body:
          "When you need maximum reproducibility (e.g. publishing a pipeline), wrap your tools in Docker or Apptainer containers. Workflow managers like Nextflow can pull these automatically.",
      },
    ],
    exercises: [
      "Create an environment called `qc` containing only `fastqc` and `multiqc`.",
      "Activate it, check the versions, then `mamba deactivate`.",
    ],
  },
  {
    id: "chapter-7",
    title: "Your first real bioinformatics workflow",
    intro:
      "Time to put it all together. We'll download a tiny bacterial dataset from ENA, check its quality, trim adapters, and count reads — using only the command line.",
    objectives: [
      "Download public sequencing data",
      "Run FastQC and read the report",
      "Trim adapters with fastp",
      "Inspect a FASTA reference",
    ],
    blocks: [
      {
        heading: "Set up the project",
        code: {
          body: `mkdir -p ~/first-pipeline/{raw,qc,trimmed,ref}
cd ~/first-pipeline
mamba activate bioinfo101`,
        },
      },
      {
        heading: "Download a small dataset",
        code: {
          body: `cd raw
# Tiny E. coli MiSeq paired-end sample
wget -c ftp://ftp.sra.ebi.ac.uk/vol1/fastq/ERR022/ERR022075/ERR022075_1.fastq.gz
wget -c ftp://ftp.sra.ebi.ac.uk/vol1/fastq/ERR022/ERR022075/ERR022075_2.fastq.gz
ls -lh`,
          caption: "If FTP is blocked on your network, replace ftp:// with https:// — same files.",
        },
      },
      {
        heading: "Quality control",
        code: {
          body: `cd ~/first-pipeline
fastqc raw/*.fastq.gz -o qc/
ls qc/
# open qc/ERR022075_1_fastqc.html in your browser`,
        },
      },
      {
        heading: "Trim adapters and low-quality bases",
        code: {
          body: `fastp \\
    -i raw/ERR022075_1.fastq.gz -I raw/ERR022075_2.fastq.gz \\
    -o trimmed/ERR022075_1.fq.gz -O trimmed/ERR022075_2.fq.gz \\
    -h qc/fastp.html -j qc/fastp.json
ls -lh trimmed/`,
        },
      },
      {
        heading: "Count reads before and after",
        code: {
          body: `for f in raw/*_1.fastq.gz trimmed/*_1.fq.gz; do
    n=$(zcat "$f" | wc -l)
    echo "$f : $((n/4)) reads"
done`,
        },
        tip: "Congratulations — you've just executed the same first three steps every microbial genomics study uses.",
      },
    ],
    exercises: [
      "Open the FastQC HTML report. Which sections are green / amber / red? Why?",
      "Re-run `fastp` with `-q 25` (stricter quality) and compare read counts.",
      "Move on to the Bacterial Genomics track to assemble this data into a genome.",
    ],
  },
];

const cheatsheet = [
  {
    title: "Navigation",
    rows: [
      ["pwd", "where am I"],
      ["ls / ls -lh", "list files / with sizes"],
      ["cd path", "change directory"],
      ["cd ~ / cd ..", "home / up one"],
      ["tree", "show folder tree (install if missing)"],
    ],
  },
  {
    title: "Files",
    rows: [
      ["cp / mv / rm", "copy / move / delete"],
      ["mkdir / rmdir", "create / remove folder"],
      ["touch file", "create empty file"],
      ["cat / less / head / tail", "read files"],
      ["wc -l", "count lines"],
    ],
  },
  {
    title: "Text wrangling",
    rows: [
      ["grep 'pattern' file", "search text"],
      ["cut -f1,3 file", "select columns"],
      ["sort | uniq -c", "count unique"],
      ["awk '{print $1}'", "column-aware filter"],
      ["sed 's/old/new/g'", "find & replace"],
    ],
  },
  {
    title: "Pipes & redirection",
    rows: [
      ["A | B", "pipe A's output into B"],
      ["> file", "save output (overwrite)"],
      [">> file", "append"],
      ["2> err.log", "send errors to file"],
      ["&> all.log", "both stdout + stderr"],
    ],
  },
  {
    title: "Processes & remote",
    rows: [
      ["top / htop", "live processes"],
      ["kill PID", "stop a process"],
      ["nohup cmd &", "run in background"],
      ["ssh user@host", "remote login"],
      ["scp / rsync", "copy across machines"],
    ],
  },
  {
    title: "Conda / mamba",
    rows: [
      ["mamba create -n env tool", "make environment"],
      ["mamba activate env", "switch to it"],
      ["mamba install tool", "add a tool"],
      ["mamba env export", "save environment"],
      ["mamba deactivate", "leave environment"],
    ],
  },
];
