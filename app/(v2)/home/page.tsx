import { signOutAction } from "@/app/(v2)/actions";
import { requireWorkspace } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { session, workspace } = await requireWorkspace();
  const firstName = session.user.name.trim().split(/\s+/)[0] ?? "there";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">
        Kirabaki
        <span className="ml-2 font-normal normal-case tracking-normal text-kb-muted">
          financial intelligence
        </span>
      </p>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight">Hey, {firstName}.</h1>
      <p className="mt-4 text-base leading-relaxed text-kb-muted">
        Your workspace is ready. Next, we’ll add your accounts and goals.
      </p>
      <p className="mt-8 text-sm text-kb-muted">
        Workspace
        <span className="mt-1 block text-base text-kb-ink">{workspace.name}</span>
      </p>
      <p className="mt-2 text-sm text-kb-muted">
        Currency
        <span className="mt-1 block text-base text-kb-ink">
          {workspace.currency} · {workspace.jurisdiction}
        </span>
      </p>
      <form action={signOutAction} className="mt-12">
        <button
          type="submit"
          className="h-12 w-full rounded-xl border border-kb-sand text-sm font-semibold"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
