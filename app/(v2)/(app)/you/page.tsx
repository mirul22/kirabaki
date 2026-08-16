import { signOutAction } from "@/app/(v2)/actions";
import { AppChrome } from "@/components/app/AppChrome";
import { GoalForm } from "@/components/app/GoalForm";
import { DeleteForm, ExportButton, FocusForm } from "@/components/app/YouForms";
import { moneyClass } from "@/components/app/fields";
import { WorkspaceSettingsForm } from "@/components/workspace/WorkspaceSettingsForm";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { getProfile } from "@/domains/identity/profile";
import { isWorkspaceCurrency } from "@/domains/identity/currency";
import { requireWorkspace } from "@/lib/auth/session";
import { formatMoney } from "@/lib/money";

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
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">You</h1>

      <section className="mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Account</p>
        <p className="mt-3 text-sm text-kb-muted">Signed in as</p>
        <p className="mt-1 font-semibold">{session.user.email}</p>
        <p className="mt-1 text-sm text-kb-muted">{session.user.name}</p>
      </section>

      <section className="mt-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">The path</p>
        <p className="mt-3 text-base text-kb-muted">
          {picture.projection ? (
            <>
              <span className={moneyClass}>{formatMoney(picture.projection.currentCents, currency)}</span>
              {" toward "}
              <span className={moneyClass}>{formatMoney(picture.projection.targetCents, currency)}</span>
              .
            </>
          ) : (
            "Name one thing. A date. How much you’d put aside each month."
          )}
        </p>
        <div className="mt-6 space-y-8">
          <FocusForm defaultFocus={profile?.focus ?? ""} />
          <GoalForm
            defaultName={picture.goal?.name}
            defaultTargetCents={picture.goal?.targetAmountCents}
            defaultDate={picture.goal?.targetDate}
            defaultContributionCents={picture.goal?.monthlyContributionCents}
            defaultProgressFrom={picture.goal?.progressFrom}
          />
        </div>
      </section>

      <details className="mt-10 rounded-2xl border border-kb-sand px-4 py-4">
        <summary className="cursor-pointer text-sm font-semibold text-kb-muted [&::-webkit-details-marker]:hidden">
          Workspace and data
        </summary>
        <div className="mt-6 space-y-8">
          <WorkspaceSettingsForm defaultName={workspace.name} defaultCurrency={currency} />
          <ExportButton />
          <DeleteForm />
        </div>
      </details>

      <form action={signOutAction} className="mt-8">
        <button type="submit" className="h-11 w-full text-sm font-semibold text-kb-muted">
          Sign out
        </button>
      </form>
    </AppChrome>
  );
}
