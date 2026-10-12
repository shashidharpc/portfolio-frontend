export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[#7C3AED]" />
        <span className="text-xs font-mono text-[var(--foreground-muted)]">
          Hydrating components...
        </span>
      </div>
    </div>
  );
}
