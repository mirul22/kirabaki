import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const session = await getCurrentSession();
  if (session) {
    redirect("/home");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Kirabaki</p>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight">Create your account</h1>
      <p className="mt-3 text-base text-kb-muted">
        Add a workspace name and currency. You can change these later.
      </p>
      <AuthForm mode="sign-up" />
      <p className="mt-8 text-sm text-kb-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-kb-ink underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </main>
  );
}
