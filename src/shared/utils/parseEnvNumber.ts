export function parseEnvNumber(
  value: string | undefined,
  fallback: number,
): number {
  const parsed = parseInt(value || "");
  return isNaN(parsed) ? fallback : parsed;
}
