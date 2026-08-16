export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Kirabaki</p>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight">You’re offline.</h1>
      <p className="mt-4 text-base leading-relaxed text-kb-muted">
        We’ll pick this up when you’re back.
      </p>
    </main>
  );
}
