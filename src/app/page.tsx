"use client";

import { useState, useEffect, useCallback } from "react";
import { KnowledgeAsset } from "@/types/asset";
import { getAssets, saveAssets } from "@/lib/storage";
import AssetList from "@/components/AssetList";
import AssetForm from "@/components/AssetForm";
import SearchPanel from "@/components/SearchPanel";

export default function Home() {
  const [assets, setAssets] = useState<KnowledgeAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAssets(getAssets());
    setLoading(false);
  }, []);

  const handleAddAsset = useCallback(
    (asset: KnowledgeAsset) => {
      const updated = [asset, ...assets];
      setAssets(updated);
      saveAssets(updated);
    },
    [assets]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          AI Knowledge Asset Workbench
        </h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          企业知识资产检索与 Agent 问答工作台
        </p>
      </header>

      {/* Main content: two-column layout */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left column: Asset Management */}
        <div className="space-y-6 lg:col-span-3">
          {/* Asset Form */}
          <AssetForm onAdd={handleAddAsset} />

          {/* Asset List */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  知识资产列表
                </h2>
                <p className="mt-0.5 text-xs text-gray-400">
                  当前共 {assets.length} 条知识资产
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-16">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  加载中...
                </div>
              </div>
            ) : (
              <AssetList assets={assets} />
            )}
          </section>
        </div>

        {/* Right column: Search */}
        <div className="lg:col-span-2">
          <SearchPanel assets={assets} />
        </div>
      </div>

      {/* Placeholder: Future features (PR3-4) */}
      <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">后续功能</h3>
            <p className="mt-0.5 text-xs text-gray-400">
              Agent 问答 · 引用来源 · Agent Trace · UI 打磨
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-600">
            PR 3-4
          </span>
        </div>
      </div>
    </main>
  );
}
