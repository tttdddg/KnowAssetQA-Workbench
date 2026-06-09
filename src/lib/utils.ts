/**
 * Generate a unique ID for new knowledge assets.
 */
export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Normalize text for search: trim, lowercase, and split into tokens.
 * Handles both English spaces and Chinese punctuation as delimiters.
 */
export function tokenize(text: string): string[] {
  return text
    .trim()
    .toLowerCase()
    .split(/[\s,，。.!！?？;；:：、]+/)
    .filter((t) => t.length > 0);
}

/**
 * Count how many tokens from the query appear in the target text.
 */
export function countMatches(queryTokens: string[], target: string): number {
  const normalized = target.toLowerCase();
  let count = 0;
  for (const token of queryTokens) {
    if (normalized.includes(token)) {
      count++;
    }
  }
  return count;
}

/**
 * Extract a snippet around the first matching token in the content.
 * Returns the first ~120 characters of content if no match found.
 */
export function extractSnippet(queryTokens: string[], content: string, maxLength = 120): string {
  const normalized = content.toLowerCase();
  let bestIndex = -1;

  for (const token of queryTokens) {
    const idx = normalized.indexOf(token);
    if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
      bestIndex = idx;
    }
  }

  if (bestIndex === -1) {
    // No match — return beginning of content
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  }

  // Return a window around the match
  const start = Math.max(0, bestIndex - 20);
  const end = Math.min(content.length, bestIndex + maxLength - 20);
  let snippet = content.slice(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < content.length) snippet = snippet + "...";
  return snippet;
}
