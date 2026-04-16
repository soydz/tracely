export function parseEnvNumber(
  value: string | undefined,
  fallback: number,
): number {
  const parsed = Number.parseInt(value || "");
  return Number.isNaN(parsed) ? fallback : parsed;
}
