import { KnowledgeAsset } from "@/types/asset";
import { INITIAL_ASSETS } from "./initialAssets";

const STORAGE_KEY = "knowledge_assets";

/**
 * Read knowledge assets from localStorage.
 * Falls back to initial data if localStorage is empty or corrupted.
 */
export function getAssets(): KnowledgeAsset[] {
  if (typeof window === "undefined") {
    return INITIAL_ASSETS;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return INITIAL_ASSETS;
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return INITIAL_ASSETS;
    }
    return parsed as KnowledgeAsset[];
  } catch {
    return INITIAL_ASSETS;
  }
}

/**
 * Write knowledge assets to localStorage.
 */
export function saveAssets(assets: KnowledgeAsset[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  } catch (e) {
    console.error("Failed to save assets to localStorage:", e);
  }
}

/**
 * Reset assets to initial data.
 */
export function resetAssets(): KnowledgeAsset[] {
  saveAssets(INITIAL_ASSETS);
  return INITIAL_ASSETS;
}
