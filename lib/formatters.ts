export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatNumber(n: number): string {
  return n.toLocaleString("th-TH");
}
