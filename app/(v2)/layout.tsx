export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-kb-bone text-kb-ink antialiased">
      {children}
    </div>
  );
}
