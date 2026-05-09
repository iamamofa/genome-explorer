import { useState } from "react";

export interface Day0Config {
  variant: "fungi" | "bacteria";
  trackName: string;
  envName: string; // conda env name e.g. "bact" / "fungi"
  condaPackages: string[]; // bioconda packages
  dockerImages?: string[];
  diskGb: number;
  ramGb: number;
  cpus: number;
  datasetCommands?: string[];
}

function buildMarkdown(c: Day0Config): string {
  return `# Day 0 — ${c.trackName} Setup Checklist

> Complete every item **before** Day 1. Total time: ~45 min download + ~20 min hands-on.

## 1. Hardware / VM

- [ ] Linux (Ubuntu 22.04+), macOS (Intel/ARM) or WSL2 on Windows
- [ ] **${c.cpus}+ CPU cores**, **${c.ramGb} GB RAM** minimum
- [ ] **${c.diskGb} GB free disk** under \`$HOME\` or a scratch volume
- [ ] Stable internet (first day downloads ~5–10 GB)
- [ ] Sudo / admin rights (only needed for Docker — optional)

### Cloud VM quick-pick

| Provider | Instance | $/hour |
|----------|----------|--------|
| AWS      | \`m6i.2xlarge\` (8 vCPU / 32 GB) | ~$0.38 |
| GCP      | \`n2-standard-8\`                | ~$0.39 |
| Azure    | \`Standard_D8s_v5\`              | ~$0.38 |

Spin one up, attach a ${c.diskGb} GB SSD, then \`ssh\` in and run the script below.

## 2. Install Conda + Mamba (Miniforge)

\`\`\`bash
curl -L -O https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
bash Miniforge3-Linux-x86_64.sh -b -p $HOME/miniforge3
source $HOME/miniforge3/etc/profile.d/conda.sh
conda init bash    # restart shell after this
\`\`\`

## 3. Configure Bioconda channels (order matters!)

\`\`\`bash
conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict
\`\`\`

## 4. Create the course environment

\`\`\`bash
mamba create -n ${c.envName} -y \\
  ${c.condaPackages.join(" \\\n  ")}

conda activate ${c.envName}
\`\`\`

## 5. (Optional) Docker / Singularity

Some nf-core pipelines run faster with containers. Skip if your workshop laptop is tight on disk.

\`\`\`bash
# Docker on Ubuntu
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER     # log out + back in

# OR Singularity / Apptainer (HPC-friendly, no root needed at runtime)
sudo apt install -y apptainer
\`\`\`

${c.dockerImages?.length ? `### Pre-pull images
\`\`\`bash
${c.dockerImages.map((i) => `docker pull ${i}`).join("\n")}
\`\`\`` : ""}

## 6. Download course data

\`\`\`bash
mkdir -p ~/${c.envName}-course && cd ~/${c.envName}-course
${(c.datasetCommands || []).join("\n")}
\`\`\`

## 7. Smoke test

\`\`\`bash
conda activate ${c.envName}
nextflow run hello -profile docker     # or -profile conda
fastqc --version
mamba list | head
\`\`\`

If all three commands print without error, you are ready for Day 1. 🎉

---
**Troubleshooting:** post your full error message in the course Slack #help channel with \`mamba info\` output attached.
`;
}

function buildBash(c: Day0Config): string {
  return `#!/usr/bin/env bash
# Day 0 setup — ${c.trackName}
# Run with:  bash day0_setup.sh
set -euo pipefail

echo "==> Step 1/4  Installing Miniforge (conda + mamba)"
if ! command -v conda &>/dev/null; then
  curl -L -O https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
  bash Miniforge3-Linux-x86_64.sh -b -p "$HOME/miniforge3"
  source "$HOME/miniforge3/etc/profile.d/conda.sh"
else
  echo "    conda already installed — skipping"
fi

echo "==> Step 2/4  Configuring bioconda channels"
conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict

echo "==> Step 3/4  Creating environment '${c.envName}'"
mamba create -n ${c.envName} -y \\
  ${c.condaPackages.join(" \\\n  ")}

echo "==> Step 4/4  Downloading course data into ~/${c.envName}-course"
mkdir -p "$HOME/${c.envName}-course"
cd "$HOME/${c.envName}-course"
${(c.datasetCommands || []).join("\n")}

echo
echo "✓ Day 0 complete.  Activate the environment with:"
echo "    conda activate ${c.envName}"
`;
}

export function Day0Setup({ config }: { config: Day0Config }) {
  const [copied, setCopied] = useState<string | null>(null);
  const accent = config.variant === "fungi" ? "bg-gradient-fungi" : "bg-gradient-bacteria";

  const download = (filename: string, content: string, mime: string) => {
    if (typeof window === "undefined") return;
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyTo = (key: string, text: string) => {
    if (typeof window === "undefined") return;
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const md = buildMarkdown(config);
  const sh = buildBash(config);

  return (
    <section id="day0" className="scroll-mt-20 mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-baseline gap-3">
        <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 font-mono text-sm font-semibold text-white ${accent}`}>D0</span>
        <h2 className="font-display text-3xl font-semibold">Day 0 — Setup checklist</h2>
      </div>
      <p className="mt-2 text-muted-foreground">
        Get your laptop, VM, or HPC account ready <em>before</em> Day 1. Download the checklist as Markdown,
        or grab the one-shot bash installer.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => download(`day0_${config.envName}_checklist.md`, md, "text/markdown")}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-white ${accent} hover:opacity-90`}
        >
          ⬇ Download checklist (.md)
        </button>
        <button
          type="button"
          onClick={() => download(`day0_${config.envName}_setup.sh`, sh, "text/x-shellscript")}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-white ${accent} hover:opacity-90`}
        >
          ⬇ Download installer (.sh)
        </button>
        <button
          type="button"
          onClick={() => copyTo("md", md)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-accent"
        >
          {copied === "md" ? "✓ Copied" : "📋 Copy checklist"}
        </button>
        <button
          type="button"
          onClick={() => copyTo("sh", sh)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-accent"
        >
          {copied === "sh" ? "✓ Copied" : "📋 Copy installer"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card title="🖥️  Hardware" body={`${config.cpus}+ CPUs · ${config.ramGb} GB RAM · ${config.diskGb} GB disk · Linux/macOS/WSL2`} />
        <Card title="📦  Conda env" body={`mamba create -n ${config.envName} ${config.condaPackages.length} packages from bioconda + conda-forge`} />
        <Card title="🐳  Docker (optional)" body={`Pre-pull ${config.dockerImages?.length || 0} images for offline workshops; Singularity/Apptainer also supported on HPC.`} />
      </div>

      <details className="mt-6 rounded-xl border border-border bg-background p-4">
        <summary className="cursor-pointer text-sm font-semibold">Preview installer script</summary>
        <pre className="mt-3 overflow-x-auto rounded-md bg-foreground/95 p-4 font-mono text-[12px] leading-snug text-background">
          <code>{sh}</code>
        </pre>
      </details>
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
