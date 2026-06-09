"use client";

import { useState, useCallback } from "react";
import { KnowledgeAsset, SearchResult } from "@/types/asset";
import { searchAssets } from "@/lib/search";

type SearchPanelProps = {
  assets: KnowledgeAsset[];
};

/**
 * Format score to 1 decimal place for display.
 */
function formatScore(score: number): string {
  return score.toFixed(1);
}

/**
 * Choose a color class for the score badge based on score magnitude.
 */
function scoreColorClass(score: number): string {
  if (score >= 8) return "bg-emerald-50 text-emerald-700";
  if (score >= 4) return "bg-amber-50 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

export default function SearchPanel({ assets }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;

      const found = searchAssets(trimmed, assets);
      setResults(found);
      setSearched(true);
    },
    [query, assets]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setResults(null);
    setSearched(false);
  }, []);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">知识检索</h3>

      {/* Search form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入关键词检索知识资产..."
          className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-300 outline-none transition focus:ring-2 focus:ring-primary-400"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          检索
        </button>
        {searched && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-50"
          >
            清除
          </button>
        )}
      </form>

      {/* Results area */}
      {searched && (
        <div className="mt-4">
          {results === null || results.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 py-8 text-gray-400">
              <svg
                className="mb-2 h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-sm">未找到相关知识资产</p>
              <p className="mt-0.5 text-xs text-gray-300">
                尝试使用不同的关键词搜索
              </p>
            </div>
          ) : (
            <div>
              <p className="mb-3 text-xs text-gray-400">
                共找到 {results.length} 条结果
              </p>
              <ul className="space-y-2.5">
                {results.map((result, index) => (
                  <li
                    key={result.assetId}
                    className="rounded-md border border-gray-100 bg-gray-50/50 p-3 transition hover:bg-gray-50"
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="shrink-0 text-xs font-medium text-gray-400">
                          #{index + 1}
                        </span>
                        <h4 className="truncate text-sm font-medium text-gray-800">
                          {result.title}
                        </h4>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${scoreColorClass(result.score)}`}
                      >
                        {formatScore(result.score)} 分
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {result.snippet}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
