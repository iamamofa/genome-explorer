import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-bacteria text-white shadow-soft">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
          <span>GenomicsTraining</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { to: "/", label: "Home" },
            { to: "/linux", label: "Linux & CLI" },
            { to: "/fungal", label: "Fungal Genomics" },
            { to: "/bacterial", label: "Bacterial Genomics" },
            { to: "/about", label: "About" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-foreground bg-accent" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
