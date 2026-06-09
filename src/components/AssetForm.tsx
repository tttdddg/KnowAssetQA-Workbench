"use client";

import { useState } from "react";
import { KnowledgeAsset } from "@/types/asset";
import { generateId } from "@/lib/utils";

type AssetFormProps = {
  onAdd: (asset: KnowledgeAsset) => void;
};

type FormErrors = {
  title?: string;
  content?: string;
};

export default function AssetForm({ onAdd }: AssetFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!title.trim()) {
      errs.title = "标题不能为空";
    }
    if (!content.trim()) {
      errs.content = "内容不能为空";
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    // Parse tags — support both Chinese and English commas
    const tags = tagsText
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const asset: KnowledgeAsset = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      tags,
      createdAt: new Date().toISOString(),
    };

    onAdd(asset);

    // Reset form
    setTitle("");
    setContent("");
    setTagsText("");
    setErrors({});
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        新增知识资产
      </h3>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="asset-title"
            className="mb-1 block text-xs font-medium text-gray-500"
          >
            标题 <span className="text-red-400">*</span>
          </label>
          <input
            id="asset-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="例如：产品使用手册"
            className={`w-full rounded-md border px-3 py-2 text-sm text-gray-800 placeholder-gray-300 outline-none transition focus:ring-2 focus:ring-primary-400 ${
              errors.title ? "border-red-300 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="asset-content"
            className="mb-1 block text-xs font-medium text-gray-500"
          >
            内容 <span className="text-red-400">*</span>
          </label>
          <textarea
            id="asset-content"
            rows={3}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
            }}
            placeholder="输入知识资产的正文内容..."
            className={`w-full rounded-md border px-3 py-2 text-sm text-gray-800 placeholder-gray-300 outline-none transition focus:ring-2 focus:ring-primary-400 resize-none ${
              errors.content ? "border-red-300 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.content && (
            <p className="mt-1 text-xs text-red-500">{errors.content}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="asset-tags"
            className="mb-1 block text-xs font-medium text-gray-500"
          >
            标签
          </label>
          <input
            id="asset-tags"
            type="text"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="多个标签用逗号分隔，如：AI, 平台, 智能体"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-300 outline-none transition focus:ring-2 focus:ring-primary-400"
          />
          <p className="mt-1 text-xs text-gray-400">
            可选，用于辅助检索和分类
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <svg
                className="h-3.5 w-3.5 animate-spin"
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
              添加中...
            </>
          ) : (
            <>
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              添加资产
            </>
          )}
        </button>
      </div>
    </form>
  );
}
