# 4 小时开发时间线与 PR 提交规划

## 总体原则

本项目建议按 4 个 PR 推进，每个 PR 对应 1 小时左右的开发成果。

目标不是一次性堆完所有功能，而是让评审能清楚看到：

1. 项目从基础骨架到完整闭环的演进过程；
2. 每个阶段都有可运行、可解释的提交；
3. 功能优先级合理；
4. 工程结构清晰；
5. 最终版本完成知识资产问答工作台的核心链路。

推荐 PR 顺序：

```txt
PR 1：项目初始化与基础结构
PR 2：知识资产管理与检索能力
PR 3：Agent 问答、引用来源与 Trace
PR 4：UI 打磨、README 与最终提交
```

------

# PR 1：项目初始化与基础结构

## 时间范围

```txt
第 0 - 1 小时
```

## PR 标题建议

```txt
feat: initialize knowledge asset workbench project
```

## 分支名建议

```txt
feature/init-project-structure
```

## 目标

完成项目基础搭建，让项目可以正常启动，并展示初始知识资产数据。

这一阶段的重点不是功能完整，而是搭好工程骨架。

------

## 需要完成的内容

### 1. 初始化项目

完成：

```txt
Next.js 项目初始化
TypeScript 配置
Tailwind CSS 配置
基础页面结构
全局样式
```

如果使用 shadcn/ui，可以在这个 PR 中完成基础配置；如果时间紧，可以先不用。

------

### 2. 定义核心数据类型

新增类型文件，例如：

```txt
src/types/asset.ts
```

包含：

```ts
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
```

------

### 3. 添加初始知识资产数据

新增：

```txt
src/lib/initialAssets.ts
```

内置至少 3 条数据：

```txt
1. AIOS 平台介绍
AIOS 是一个面向企业的智能体操作平台，支持知识库、工具调用、工作流编排和多智能体协作。

2. 数字资产知识库
数字资产知识库用于沉淀企业文档、业务流程、销售资料、客户案例和产品说明，并支持智能检索和问答。

3. Agent 工作流
Agent 可以通过任务拆解、工具调用、上下文记忆和结果校验完成复杂任务，但需要可观测性和权限控制来保证可靠性。
```

------

### 4. 完成基础页面布局

页面至少包含：

```txt
顶部标题
项目简介
知识资产列表区域
后续功能占位区域
```

建议页面文案：

```txt
AI Knowledge Asset Workbench
企业知识资产检索与 Agent 问答工作台
```

------

### 5. 初步拆分组件

建议至少拆出：

```txt
src/components/AssetList.tsx
src/components/AssetCard.tsx
```

暂时可以只展示静态初始数据。

------

## 本 PR 应包含的文件

```txt
package.json
README.md 初版，可先简单写
src/app/page.tsx
src/app/globals.css
src/types/asset.ts
src/lib/initialAssets.ts
src/components/AssetList.tsx
src/components/AssetCard.tsx
```

------

## 本 PR 不需要做的内容

```txt
不需要实现新增表单
不需要实现检索
不需要实现 Agent 问答
不需要实现 Trace
不需要写完整 README
不需要接入真实 LLM
```

## 