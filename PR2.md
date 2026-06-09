# PR 2：知识资产管理与检索能力

## 时间范围

```txt
第 1 - 2 小时
```

## PR 标题建议

```txt
feat: add asset creation and keyword search
```

## 分支名建议

```txt
feature/asset-form-and-search
```

## 目标

实现知识资产新增和基础检索能力。

这一阶段完成后，系统应该具备：

```txt
展示资产
新增资产
保存资产
检索资产
返回 top 3 结果
```

------

## 需要完成的内容

### 1. 实现 localStorage 持久化

新增：

```txt
src/lib/storage.ts
```

实现：

```txt
读取知识资产
保存知识资产
初始化默认数据
```

设计逻辑：

```txt
1. 页面加载时读取 localStorage；
2. 如果 localStorage 没有数据，则使用 initialAssets；
3. 新增资产后写入 localStorage；
4. 页面刷新后数据不丢失。
```

------

### 2. 实现新增知识资产表单

新增组件：

```txt
src/components/AssetForm.tsx
```

字段：

```txt
Title
Content
Tags
```

基本要求：

```txt
Title 不能为空
Content 不能为空
Tags 支持逗号分隔
提交后清空表单
提交后列表立即更新
新增资产包含 id 和 createdAt
```

------

### 3. 实现检索逻辑

新增：

```txt
src/lib/search.ts
```

实现函数：

```ts
searchAssets(query: string, assets: KnowledgeAsset[]): SearchResult[]
```

检索策略建议：

```txt
title 命中权重：3
tags 命中权重：2
content 命中权重：1
按 score 降序排序
返回 top 3
```

------

### 4. 实现检索结果展示

新增组件：

```txt
src/components/SearchPanel.tsx
```

展示内容：

```txt
搜索输入框
搜索按钮
top 3 检索结果
每条结果的 title
每条结果的 snippet
每条结果的 score
空结果提示
```

------

### 5. 增加基础状态

至少覆盖：

```txt
输入为空时提示
没有搜索结果时提示
表单校验错误提示
```

------

## 本 PR 应包含的文件

```txt
src/lib/storage.ts
src/lib/search.ts
src/components/AssetForm.tsx
src/components/SearchPanel.tsx
src/components/AssetList.tsx
src/components/AssetCard.tsx
src/app/page.tsx
```

------

## 本 PR 不需要做的内容

```txt
不需要实现 Agent 回答
不需要实现引用来源
不需要实现 Agent Trace
不需要接真实 LLM
不需要接向量数据库
```

