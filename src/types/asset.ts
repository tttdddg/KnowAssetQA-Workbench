export type KnowledgeAsset = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
};

export type SearchResult = {
  assetId: string;
  title: string;
  snippet: string;
  score: number;
};

export type AgentTrace = {
  query: string;
  retrievedAssets: SearchResult[];
  finalAnswer: string;
  createdAt: string;
};
