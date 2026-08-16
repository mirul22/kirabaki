import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ensurePersonalWorkspace } from "@/domains/identity/workspace";
import { auth } from "@/lib/auth";

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
}

export async function requireWorkspace() {
  const session = await requireSession();
  const workspace = await ensurePersonalWorkspace(session.user.id, session.user.name);
  return { session, workspace };
}
