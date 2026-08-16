import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function WelcomePage() {
  const session = await getCurrentSession();
  if (session) {
    redirect("/home");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">
        Kirabaki
        <span className="ml-2 font-normal normal-case tracking-normal text-kb-muted">
          financial intelligence
        </span>
      </p>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
        Don’t worry. We’ll figure this out together.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-kb-muted">
        See what changed with your money, and what is worth doing next.
      </p>
      <div className="mt-10 flex flex-col gap-3">
        <Link
          href="/sign-up"
          className="flex h-12 items-center justify-center rounded-xl bg-kb-seal text-sm font-semibold text-[#fff8f4]"
        >
          Create an account
        </Link>
        <Link
          href="/sign-in"
          className="flex h-12 items-center justify-center rounded-xl border border-kb-sand text-sm font-semibold"
        >
          Sign in
        </Link>
      </div>
      <p className="mt-12 text-sm text-kb-muted">
        Need the earlier budget app?{" "}
        <Link href="/budget" className="text-kb-ink underline underline-offset-4">
          Open it here
        </Link>
        .
      </p>
    </main>
  );
}
