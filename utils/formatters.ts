export function fmtRange(start?: string, end?: string): string {
  if (!start && !end) return "";
  return `${start || ""} – ${end || "Atual"}`;
}

export function hrefNormalize(link?: string): string {
  if (!link) return "#";
  return link.startsWith("http") ? link : `https://${link}`;
}

export function demoTruthy(x: unknown): boolean {
  if (Array.isArray(x)) return x.length > 0;
  return Boolean(x);
}