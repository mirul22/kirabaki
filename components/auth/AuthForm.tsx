"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { signInSchema, signUpSchema } from "@/lib/auth/schemas";

type Mode = "sign-in" | "sign-up";

function publicAuthMessage(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("already") || lower.includes("exists")) {
    return "An account with that email already exists.";
  }
  if (lower.includes("invalid") || lower.includes("credential") || lower.includes("password")) {
    return "Email or password didn’t match.";
  }
  return "Something went wrong. Try again.";
}

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const raw = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    try {
      if (mode === "sign-up") {
        const parsed = signUpSchema.safeParse(raw);
        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? "Check what you entered.");
          return;
        }
        const result = await authClient.signUp.email(parsed.data);
        if (result.error) {
          setError(publicAuthMessage(result.error.message ?? ""));
          return;
        }
      } else {
        const parsed = signInSchema.safeParse(raw);
        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? "Check what you entered.");
          return;
        }
        const result = await authClient.signIn.email(parsed.data);
        if (result.error) {
          setError(publicAuthMessage(result.error.message ?? ""));
          return;
        }
      }
      router.push("/home");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5">
      {mode === "sign-up" ? (
        <label className="block">
          <span className="text-sm text-kb-muted">Name</span>
          <input
            name="name"
            autoComplete="name"
            required
            className="mt-2 h-12 w-full rounded-xl border border-kb-sand bg-white/60 px-4 text-base text-kb-ink outline-none focus:border-kb-seal"
          />
        </label>
      ) : null}

      <label className="block">
        <span className="text-sm text-kb-muted">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-12 w-full rounded-xl border border-kb-sand bg-white/60 px-4 text-base text-kb-ink outline-none focus:border-kb-seal"
        />
      </label>

      <label className="block">
        <span className="text-sm text-kb-muted">Password</span>
        <input
          name="password"
          type="password"
          autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
          required
          minLength={mode === "sign-up" ? 8 : undefined}
          className="mt-2 h-12 w-full rounded-xl border border-kb-sand bg-white/60 px-4 text-base text-kb-ink outline-none focus:border-kb-seal"
        />
      </label>

      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-xl bg-kb-seal text-sm font-semibold text-[#fff8f4] disabled:opacity-60"
      >
        {pending
          ? mode === "sign-up"
            ? "Creating account…"
            : "Signing in…"
          : mode === "sign-up"
            ? "Create account"
            : "Sign in"}
      </button>
    </form>
  );
}
