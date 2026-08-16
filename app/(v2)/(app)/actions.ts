"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { decideRecommendation, recordOutcome } from "@/domains/commitments/record";
import { createAccount, getAccount, setPrimaryAccount, softDeleteAccount } from "@/domains/finance/accounts";
import { createAsset, createLiability, softDeleteAsset, softDeleteLiability } from "@/domains/finance/positions";
import { afterMoneyChange } from "@/domains/finance/refresh";
import {
  accountSchema,
  positionSchema,
  profileFocusSchema,
  transactionSchema,
  updateTransactionSchema,
} from "@/domains/finance/schemas";
import { createTransaction, getTransaction, softDeleteTransaction, updateTransaction } from "@/domains/finance/transactions";
import { upsertPrimaryGoal } from "@/domains/goals/goals";
import { goalSchema } from "@/domains/goals/schemas";
import { deleteWorkspaceAndUser, exportWorkspace } from "@/domains/identity/export-delete";
import { upsertProfile } from "@/domains/identity/profile";
import { requireWorkspace } from "@/lib/auth/session";

function revalidateApp() {
  revalidatePath("/home");
  revalidatePath("/money");
  revalidatePath("/find");
  revalidatePath("/learn");
  revalidatePath("/you");
}

async function refresh(workspaceId: string, currency: string) {
  await afterMoneyChange(workspaceId, currency);
  revalidateApp();
}

export async function addAccountAction(formData: FormData) {
  const parsed = accountSchema.safeParse({
    name: formData.get("name"),
    kind: formData.get("kind"),
    statedBalance: formData.get("statedBalance"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check what you entered." };
  }
  const { session, workspace } = await requireWorkspace();
  await createAccount(workspace.id, session.user.id, {
    name: parsed.data.name,
    kind: parsed.data.kind,
    statedBalanceCents: parsed.data.statedBalance,
  });
  await refresh(workspace.id, workspace.currency);
  return { ok: true as const };
}

export async function addTransactionAction(formData: FormData) {
  const parsed = transactionSchema.safeParse({
    accountId: formData.get("accountId"),
    type: formData.get("type"),
    name: formData.get("name"),
    amount: formData.get("amount"),
    occurredOn: formData.get("occurredOn"),
    category: formData.get("category") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check what you entered." };
  }
  const { session, workspace } = await requireWorkspace();
  const place = await getAccount(workspace.id, parsed.data.accountId);
  if (!place) {
    return { error: "Pick a place that is still there." };
  }
  await createTransaction(workspace.id, session.user.id, {
    accountId: place.id,
    type: parsed.data.type,
    name: parsed.data.name,
    amountCents: parsed.data.amount,
    occurredOn: parsed.data.occurredOn,
    category: parsed.data.category,
  });
  await refresh(workspace.id, workspace.currency);
  return { ok: true as const };
}

export async function updateTransactionAction(formData: FormData) {
  const parsed = updateTransactionSchema.safeParse({
    id: formData.get("id"),
    accountId: formData.get("accountId"),
    type: formData.get("type"),
    name: formData.get("name"),
    amount: formData.get("amount"),
    occurredOn: formData.get("occurredOn"),
    category: formData.get("category") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check what you entered." };
  }
  const { session, workspace } = await requireWorkspace();
  const existing = await getTransaction(workspace.id, parsed.data.id);
  if (!existing) {
    return { error: "That line is gone." };
  }
  const place = await getAccount(workspace.id, parsed.data.accountId);
  if (!place) {
    return { error: "Pick a place that is still there." };
  }
  const result = await updateTransaction(workspace.id, session.user.id, parsed.data.id, {
    accountId: place.id,
    type: parsed.data.type,
    name: parsed.data.name,
    amountCents: parsed.data.amount,
    occurredOn: parsed.data.occurredOn,
    category: parsed.data.category,
  });
  if ("error" in result) {
    return result;
  }
  await refresh(workspace.id, workspace.currency);
  return { ok: true as const };
}

export async function setPrimaryAccountAction(formData: FormData) {
  const accountId = String(formData.get("id") ?? "");
  const { session, workspace } = await requireWorkspace();
  const result = await setPrimaryAccount(workspace.id, session.user.id, accountId);
  if (result && "error" in result && result.error) {
    return;
  }
  await refresh(workspace.id, workspace.currency);
}

export async function addAssetAction(formData: FormData) {
  const parsed = positionSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check what you entered." };
  }
  const { session, workspace } = await requireWorkspace();
  await createAsset(workspace.id, session.user.id, {
    name: parsed.data.name,
    amountCents: parsed.data.amount,
  });
  await refresh(workspace.id, workspace.currency);
  return { ok: true as const };
}

export async function addLiabilityAction(formData: FormData) {
  const parsed = positionSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check what you entered." };
  }
  const { session, workspace } = await requireWorkspace();
  await createLiability(workspace.id, session.user.id, {
    name: parsed.data.name,
    amountCents: parsed.data.amount,
  });
  await refresh(workspace.id, workspace.currency);
  return { ok: true as const };
}

export async function removeAccountAction(formData: FormData) {
  const accountId = String(formData.get("id") ?? "");
  const { session, workspace } = await requireWorkspace();
  await softDeleteAccount(workspace.id, session.user.id, accountId);
  await refresh(workspace.id, workspace.currency);
}

export async function removeTransactionAction(formData: FormData) {
  const transactionId = String(formData.get("id") ?? "");
  const { session, workspace } = await requireWorkspace();
  await softDeleteTransaction(workspace.id, session.user.id, transactionId);
  await refresh(workspace.id, workspace.currency);
}

export async function removeAssetAction(formData: FormData) {
  const assetId = String(formData.get("id") ?? "");
  const { session, workspace } = await requireWorkspace();
  await softDeleteAsset(workspace.id, session.user.id, assetId);
  await refresh(workspace.id, workspace.currency);
}

export async function removeLiabilityAction(formData: FormData) {
  const liabilityId = String(formData.get("id") ?? "");
  const { session, workspace } = await requireWorkspace();
  await softDeleteLiability(workspace.id, session.user.id, liabilityId);
  await refresh(workspace.id, workspace.currency);
}

export async function saveGoalAction(formData: FormData) {
  const parsed = goalSchema.safeParse({
    name: formData.get("name"),
    targetAmount: formData.get("targetAmount"),
    targetDate: formData.get("targetDate"),
    monthlyContribution: formData.get("monthlyContribution"),
    progressFrom: formData.get("progressFrom"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check what you entered." };
  }
  const { session, workspace } = await requireWorkspace();
  await upsertPrimaryGoal(workspace.id, session.user.id, {
    name: parsed.data.name,
    targetAmountCents: parsed.data.targetAmount,
    targetDate: parsed.data.targetDate,
    monthlyContributionCents: parsed.data.monthlyContribution,
    progressFrom: parsed.data.progressFrom,
  });
  await refresh(workspace.id, workspace.currency);
  return { ok: true as const };
}

export async function saveFocusAction(formData: FormData) {
  const parsed = profileFocusSchema.safeParse({
    focus: formData.get("focus") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check what you entered." };
  }
  const { session, workspace } = await requireWorkspace();
  await upsertProfile(workspace.id, session.user.id, parsed.data.focus ?? "");
  revalidateApp();
  return { ok: true as const };
}

export async function decideAction(formData: FormData) {
  const recommendationId = String(formData.get("recommendationId") ?? "");
  const decision = String(formData.get("decision") ?? "");
  if (decision !== "accepted" && decision !== "later" && decision !== "not_relevant") {
    return { error: "Choose what to do." };
  }
  const { session, workspace } = await requireWorkspace();
  const result = await decideRecommendation(workspace.id, session.user.id, recommendationId, decision);
  if ("error" in result) {
    return result;
  }
  await refresh(workspace.id, workspace.currency);
  return result;
}

export async function saveOutcomeAction(formData: FormData) {
  const actionId = String(formData.get("actionId") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  if (note.length < 2) {
    return { error: "Say what happened, briefly." };
  }
  const { session, workspace } = await requireWorkspace();
  const result = await recordOutcome(workspace.id, session.user.id, actionId, note);
  if ("error" in result) {
    return result;
  }
  revalidateApp();
  return result;
}

export async function exportWorkspaceAction() {
  const { workspace } = await requireWorkspace();
  return exportWorkspace(workspace.id);
}

export async function deleteAccountAction(formData: FormData) {
  const confirm = String(formData.get("confirm") ?? "").trim().toLowerCase();
  if (confirm !== "delete") {
    return { error: "Type delete to leave." };
  }
  const { session, workspace } = await requireWorkspace();
  await deleteWorkspaceAndUser(workspace.id, session.user.id);
  redirect("/");
}
