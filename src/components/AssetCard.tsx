import { KnowledgeAsset } from "@/types/asset";

type AssetCardProps = {
  asset: KnowledgeAsset;
};

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function AssetCard({ asset }: AssetCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Header: title + date */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {asset.title}
        </h3>
        <span className="shrink-0 text-xs text-gray-400">
          {formatDate(asset.createdAt)}
        </span>
      </div>

      {/* Content excerpt */}
      <p className="mb-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
        {asset.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {asset.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
