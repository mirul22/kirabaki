export type IsoDate = string;

export function toIsoDate(value: Date): IsoDate {
  return value.toISOString().slice(0, 10);
}

export function todayIso(now = new Date()): IsoDate {
  return toIsoDate(now);
}

export function monthRange(isoDate: IsoDate): { start: IsoDate; end: IsoDate } {
  const [year, month] = isoDate.split("-").map(Number);
  const start = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const end = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { start, end };
}

export function isInRange(isoDate: IsoDate, start: IsoDate, end: IsoDate): boolean {
  return isoDate >= start && isoDate <= end;
}

export function addMonths(isoDate: IsoDate, months: number): IsoDate {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1 + months, day));
  return toIsoDate(date);
}

export function monthsBetween(from: IsoDate, to: IsoDate): number {
  const [y1, m1] = from.split("-").map(Number);
  const [y2, m2] = to.split("-").map(Number);
  return (y2 - y1) * 12 + (m2 - m1);
}
