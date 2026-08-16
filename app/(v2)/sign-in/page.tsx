import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const session = await getCurrentSession();
  if (session) {
    redirect("/home");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Kirabaki</p>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight">Welcome back.</h1>
      <p className="mt-3 text-base text-kb-muted">Sign in to continue.</p>
      <AuthForm mode="sign-in" />
      <p className="mt-8 text-sm text-kb-muted">
        New here?{" "}
        <Link href="/sign-up" className="text-kb-ink underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </main>
  );
}
