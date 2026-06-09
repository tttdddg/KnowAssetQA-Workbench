import { KnowledgeAsset } from "@/types/asset";

export const INITIAL_ASSETS: KnowledgeAsset[] = [
  {
    id: "1",
    title: "AIOS 平台介绍",
    content:
      "AIOS 是一个面向企业的智能体操作平台，支持知识库、工具调用、工作流编排和多智能体协作。",
    tags: ["AIOS", "平台", "智能体"],
    createdAt: "2025-01-15T08:00:00.000Z",
  },
  {
    id: "2",
    title: "数字资产知识库",
    content:
      "数字资产知识库用于沉淀企业文档、业务流程、销售资料、客户案例和产品说明，并支持智能检索和问答。",
    tags: ["知识库", "数字资产", "检索"],
    createdAt: "2025-02-20T10:30:00.000Z",
  },
  {
    id: "3",
    title: "Agent 工作流",
    content:
      "Agent 可以通过任务拆解、工具调用、上下文记忆和结果校验完成复杂任务，但需要可观测性和权限控制来保证可靠性。",
    tags: ["Agent", "工作流", "可观测性"],
    createdAt: "2025-03-10T14:00:00.000Z",
  },
];
