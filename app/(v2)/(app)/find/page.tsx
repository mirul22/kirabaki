import { AppChrome } from "@/components/app/AppChrome";
import { NextMoveCard } from "@/components/app/NextMove";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { getOpenRecommendation } from "@/domains/recommendations/refresh";
import { requireWorkspace } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function FindPage() {
  const { workspace } = await requireWorkspace();
  const { picture } = await afterMoneyChange(workspace.id, workspace.currency);
  const arrived = picture.accounts.length === 0;
  const open = arrived ? null : await getOpenRecommendation(workspace.id);

  return (
    <AppChrome current="/find">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Find</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
        {arrived ? "Nothing to find yet." : open ? "One thing." : "Quiet today."}
      </h1>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-kb-muted">
        {arrived
          ? "Add a bank or wallet on Money. Then this will have something to say."
          : open
            ? "This is the one thing worth knowing right now."
            : "Nothing new. What you already did is on Journey."}
      </p>

      {open ? (
        <div className="mt-12">
          <NextMoveCard recommendation={open} />
        </div>
      ) : null}
    </AppChrome>
  );
}
