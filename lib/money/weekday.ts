import type { IsoDate } from "./period";

export function weekdayName(isoDate: IsoDate): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  });
}
