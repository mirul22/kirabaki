import { loadMoneyPicture } from "@/domains/finance/picture";
import { refreshRecommendations } from "@/domains/recommendations/refresh";
import { rememberMonth } from "@/domains/snapshots/remember";
import { assertWorkspaceId } from "@/domains/finance/tenant";

export async function afterMoneyChange(workspaceId: string, currency: string) {
  const id = assertWorkspaceId(workspaceId);
  const picture = await loadMoneyPicture(id);
  await rememberMonth(id, picture);
  const nextMove = await refreshRecommendations(id, picture, currency);
  return { picture, nextMove };
}
