# AI Knowledge Asset Workbench

企业知识资产检索与 Agent 问答工作台 — 一个面向企业知识资产的轻量级检索增强问答工作台。

## 功能说明

- **知识资产列表**：展示所有知识资产，支持卡片式浏览
- **知识资产管理**：新增知识资产并持久化到 localStorage
- **智能检索**：基于关键词分词的相似度检索，返回 top 3 结果
- **Agent 问答**：基于检索结果生成回答（mock 模式下使用模板化生成）
- **引用来源**：展示答案所引用的知识资产
- **Agent Trace**：展示检索过程、命中结果、评分和最终答案

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS |
| 存储 | localStorage |

## 启动方式

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

## 项目结构

```
src/
  app/
    page.tsx          # 主页面
    layout.tsx         # 根布局
    globals.css        # 全局样式
  components/
    AssetList.tsx      # 知识资产列表组件
    AssetCard.tsx      # 知识资产卡片组件
  lib/
    initialAssets.ts   # 内置初始知识资产数据
  types/
    asset.ts           # 核心类型定义
```

## 核心设计说明

### 知识资产数据结构

使用 `KnowledgeAsset` 作为核心数据结构：

- `id`：唯一标识，用于检索结果和引用来源关联
- `title`：资产标题
- `content`：知识正文，检索和问答的主要依据
- `tags`：标签数组，辅助分类和关键词匹配
- `createdAt`：创建时间

### 数据持久化

当前版本使用 `localStorage` 存储，初始化逻辑为：

1. 页面加载时读取 localStorage
2. 若 localStorage 无数据，使用内置初始数据（3 条）
3. 新增资产后写入 localStorage

选择 localStorage 的原因：实现成本低、无需后端、页面刷新数据保留、后续可平滑替换为 API + 数据库。

## 技术取舍

由于笔试时间限制（4 小时），做了以下取舍：

1. **不使用真实 LLM**：使用基于检索结果的模板化回答生成，避免 API Key 配置和网络依赖
2. **不使用向量数据库**：使用关键词分词 + 权重评分，逻辑简单可解释
3. **使用 localStorage**：避免引入数据库，降低项目跑不起来的风险
4. **不做登录/权限**：专注核心知识资产问答链路

## 未完成事项

1. 未接入真实 LLM（如 OpenAI、Claude、DeepSeek）
2. 未接入真实向量数据库（如 pgvector、Qdrant、Milvus）
3. 未实现登录和权限控制
4. 未实现多租户
5. 未实现复杂文档切分和 embedding
6. 未实现知识资产的编辑和删除

## 后续迭代计划

1. **接入真实 LLM**：使用模型 API 根据检索结果生成更自然的回答
2. **接入向量数据库**：将知识资产切分为 chunk，生成 embedding，进行语义检索
3. **增加权限系统**：支持用户、角色、部门权限管理
4. **增加多租户能力**：在数据、检索、日志中增加 tenantId 隔离
5. **增强 Agent Trace**：展示 query rewrite、检索结果、rerank、prompt、模型输出等
6. **增加知识管理能力**：编辑、删除、标签筛选、批量导入、文档上传
7. **增加评估与反馈**：用户对回答点赞/点踩，用于持续优化
8. **增强安全与审计**：访问日志、敏感词检测、数据脱敏、权限审计

---

## 笔试题必答题

### 1. 你如何设计知识资产的数据结构？

知识资产使用 `KnowledgeAsset` 作为核心数据结构：

```ts
type KnowledgeAsset = {
  id: string;        // 唯一标识
  title: string;     // 资产标题
  content: string;   // 知识正文
  tags: string[];    // 标签，辅助分类和关键词匹配
  createdAt: string; // 创建时间
};
```

- `id` 用于检索结果和引用来源的关联
- `title` 方便用户识别知识来源，同时在检索中给予更高权重
- `content` 是检索和问答的主要依据
- `tags` 用于补充分类、主题和关键词匹配
- `createdAt` 用于排序和展示

当前版本使用 localStorage 做持久化，每个资产的 `id` 通过 `crypto.randomUUID()` 生成。

### 2. 你如何实现检索？

当前版本实现了一个轻量级关键词相似度检索函数 `searchAssets`：

1. 对 query 做标准化处理（trim、小写、分词）
2. 对每个 asset 计算综合得分：
   - title 命中：权重 ×3
   - tags 命中：权重 ×2
   - content 命中：权重 ×1
3. 生成 snippet（截取命中位置附近的文本片段）
4. 按 score 降序返回 top 3

这种方式不依赖外部服务，计算过程可解释，同时保留了未来替换为 embedding 检索的接口边界。

### 3. 如果要接入真实向量数据库，你会怎么改？

保留 `KnowledgeAsset` 和 `SearchResult` 的上层结构，替换检索层实现：

1. 新增文档切分逻辑，将 content 拆分为多个 chunk
2. 对每个 chunk 生成 embedding
3. 将 chunk 及 metadata（assetId、title、tags、tenantId 等）写入向量数据库
4. 用户提问时对 query 生成 embedding
5. 在向量数据库中执行 topK 相似度检索（带 tenantId filter）
6. 将检索结果转换为统一的 `SearchResult` 结构
7. 前端展示结构不变

可选技术：pgvector、Milvus、Qdrant、Pinecone、Weaviate。

### 4. 如果要支持多租户，你会怎么改？

在数据、权限和检索链路中增加 `tenantId` 隔离：

1. `KnowledgeAsset` 增加 `tenantId`、`createdBy`、`visibility` 字段
2. 所有操作（新增、查询、检索、回答）必须携带 `tenantId`
3. 后端接口基于登录态校验用户所属租户
4. 数据库查询强制加 `tenantId` WHERE 条件
5. 向量数据库 chunk metadata 写入 `tenantId`，检索时加 filter
6. 增加用户、角色、部门权限模型
7. 日志记录用户、租户、query、命中资产和回答结果

多租户场景中最重要的不是 UI，而是数据隔离、权限控制和审计能力。

### 5. 如果这个系统上线到真实 ToB 场景，你最担心的问题是什么？

1. **数据权限隔离**：不同租户/部门/角色之间不能检索到不该看的资料
2. **回答可靠性**：Agent 不能编造答案，需要基于检索结果回答并展示引用和置信度
3. **知识更新**：企业文档经常变化，需处理版本更新、过期内容、删除同步和索引重建
4. **可观测性**：需记录 query、命中片段、score、final answer 和用户反馈
5. **安全合规**：企业知识资产可能含敏感信息，需要访问控制、日志审计和数据脱敏
6. **成本与性能**：embedding + LLM 调用的成本和延迟控制
7. **评估体系**：需评估检索命中率、回答准确率、引用正确率和用户满意度
