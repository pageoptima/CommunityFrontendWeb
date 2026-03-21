export function HomePageShell() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="max-w-3xl space-y-4 text-center">
        <span className="border-border bg-surface text-muted-foreground inline-flex rounded-full border px-4 py-1 text-sm font-medium">
          Project scaffold ready
        </span>
        <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          Frontend foundation initialized.
        </h1>
        <p className="text-muted-foreground text-base leading-7 sm:text-lg">
          Start building shared UI in <code>src/components</code> and domain
          modules in <code>src/features</code>.
        </p>
      </div>
    </main>
  );
}
