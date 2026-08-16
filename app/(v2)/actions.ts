"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ensurePersonalWorkspace, updatePersonalWorkspace } from "@/domains/identity/workspace";
import { workspaceSettingsSchema } from "@/domains/identity/settings";
import { auth } from "@/lib/auth";
import { getCurrentSession } from "@/lib/auth/session";

export async function signOutAction() {
  await auth.api.signOut({
    headers: headers(),
  });
  redirect("/");
}

export async function updateWorkspaceAction(formData: FormData) {
  const parsed = workspaceSettingsSchema.safeParse({
    name: formData.get("name"),
    currency: formData.get("currency"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check what you entered." };
  }

  const session = await getCurrentSession();
  if (!session) {
    return { error: "Sign in to update your workspace." };
  }

  await ensurePersonalWorkspace(session.user.id, session.user.name);
  await updatePersonalWorkspace(session.user.id, parsed.data);
  revalidatePath("/home");
  return { ok: true as const };
}
