export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-semibold">GenomicsTraining</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Hands-on bioinformatics training in fungal and bacterial genomics for researchers, clinicians, and public health scientists.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Courses</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/fungal" className="hover:text-primary">Fungal Genomics</a></li>
              <li><a href="/bacterial" className="hover:text-primary">Bacterial Genomics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Community</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="https://galaxyproject.org" className="hover:text-primary">Galaxy Project</a></li>
              <li><a href="https://software-carpentry.org" className="hover:text-primary">Software Carpentry</a></li>
              <li><a href="https://www.ncbi.nlm.nih.gov" className="hover:text-primary">NCBI</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Genomics Training Working Group. Materials licensed under{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline hover:text-primary">CC BY-SA 4.0</a>.
        </div>
      </div>
    </footer>
  );
}
