import { AppChrome } from "@/components/app/AppChrome";
import { NextMoveCard } from "@/components/app/NextMove";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { listFindings } from "@/domains/recommendations/refresh";
import { requireWorkspace } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const KIND: Record<string, string> = {
  missing_picture: "Incomplete",
  empty_month: "Incomplete",
  thin_buffer: "Needs a look",
  nothing_stayed: "Needs a look",
  goal_slipping: "On the path",
  quiet_good: "Quiet good",
};

export default async function FindPage() {
  const { workspace } = await requireWorkspace();
  const { picture } = await afterMoneyChange(workspace.id, workspace.currency);
  const arrived = picture.accounts.length === 0;
  const findings = await listFindings(workspace.id, 8);
  const open = findings.find((row) => row.status === "open") ?? null;
  const earlier = findings.filter((row) => {
    if (open && row.id === open.id) {
      return false;
    }
    if (open && row.type === open.type) {
      return false;
    }
    return row.status !== "open";
  });

  return (
    <AppChrome current="/find">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Find</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
        {arrived ? "Nothing to find yet." : "What changed."}
      </h1>
      <p className="mt-3 text-base text-kb-muted">
        {arrived
          ? "Start on Journey. One thing at a time."
          : "Not an alarm. This is the one thing worth knowing right now."}
      </p>

      <div className="mt-8 space-y-6">
        {open ? <NextMoveCard recommendation={open} /> : null}

        {!arrived && earlier.length > 0 ? (
          <ul className="space-y-3">
            {earlier.map((row) => (
              <li key={row.id} className="rounded-2xl bg-white/50 px-4 py-4">
                <p className="text-sm font-semibold text-kb-seal">{KIND[row.type] ?? "Earlier"}</p>
                <p className="mt-1 text-lg font-semibold tracking-tight">{row.title}</p>
                <p className="mt-1 text-sm text-kb-muted">{row.happening}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </AppChrome>
  );
}
