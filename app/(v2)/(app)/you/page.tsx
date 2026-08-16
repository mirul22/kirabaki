import { signOutAction } from "@/app/(v2)/actions";
import { AppChrome } from "@/components/app/AppChrome";
import { YouPath } from "@/components/app/YouPath";
import { DeleteForm, ExportButton } from "@/components/app/YouForms";
import { WorkspaceSettingsForm } from "@/components/workspace/WorkspaceSettingsForm";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { getProfile } from "@/domains/identity/profile";
import { isWorkspaceCurrency } from "@/domains/identity/currency";
import { requireWorkspace } from "@/lib/auth/session";
import { summaryClass } from "@/components/app/fields";

export const dynamic = "force-dynamic";

export default async function YouPage() {
  const { session, workspace } = await requireWorkspace();
  const [{ picture }, profile] = await Promise.all([
    afterMoneyChange(workspace.id, workspace.currency),
    getProfile(workspace.id),
  ]);
  const currency = isWorkspaceCurrency(workspace.currency) ? workspace.currency : "MYR";

  return (
    <AppChrome current="/you">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">You</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{session.user.name.trim().split(/\s+/)[0] ?? "You"}</h1>
      <p className="mt-3 text-base text-kb-muted">{session.user.email}</p>

      <YouPath
        currency={currency}
        focus={profile?.focus ?? ""}
        goalName={picture.goal?.name ?? ""}
        targetCents={picture.goal?.targetAmountCents ?? 0}
        targetDate={picture.goal?.targetDate ?? ""}
        contributionCents={picture.goal?.monthlyContributionCents ?? 0}
        progressFrom={picture.goal?.progressFrom ?? "cash"}
        currentCents={picture.projection?.currentCents ?? null}
        onTrack={picture.projection?.onTrack ?? null}
      />

      <details className="mt-14">
        <summary className={summaryClass}>Name, currency, and data</summary>
        <div className="mt-6 space-y-8">
          <WorkspaceSettingsForm defaultName={workspace.name} defaultCurrency={currency} />
          <ExportButton />
          <DeleteForm />
        </div>
      </details>

      <form action={signOutAction} className="mt-10">
        <button type="submit" className="h-11 w-full text-sm font-semibold text-kb-muted">
          Sign out
        </button>
      </form>
    </AppChrome>
  );
}
