import { KnowledgeAsset, SearchResult } from "@/types/asset";
import { tokenize, countMatches, extractSnippet } from "./utils";

/**
 * Search knowledge assets by query string.
 *
 * Scoring weights:
 *   - Title match: ×3
 *   - Tag match:   ×2
 *   - Content match: ×1
 *
 * Returns top 3 results sorted by score descending.
 */
export function searchAssets(
  query: string,
  assets: KnowledgeAsset[]
): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const queryTokens = tokenize(trimmed);
  if (queryTokens.length === 0) return [];

  const scored: SearchResult[] = assets.map((asset) => {
    const titleHits = countMatches(queryTokens, asset.title);
    const tagHits = asset.tags.reduce(
      (sum, tag) => sum + countMatches(queryTokens, tag),
      0
    );
    const contentHits = countMatches(queryTokens, asset.content);

    const score = titleHits * 3 + tagHits * 2 + contentHits * 1;
    const snippet = extractSnippet(queryTokens, asset.content);

    return {
      assetId: asset.id,
      title: asset.title,
      snippet,
      score,
    };
  });

  // Filter zero-score results, sort descending, take top 3
  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
