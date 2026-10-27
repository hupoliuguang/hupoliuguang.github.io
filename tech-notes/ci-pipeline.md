---
title: GitHub Pages + VitePress 自动部署流水线
date: 2026-10-26
tags: [工程化, CI]
readingTime: 12
---

# GitHub Pages + VitePress 自动部署流水线

这个站点的所有内容都放在 `hupoliuguang.github.io` 仓库里，推送到 `main` 分支就自动构建并上线，全程不需要手动执行任何部署命令。这篇文章把这条流水线的构成和踩过的坑完整记一遍，方便以后自己排查，也方便想搭同款的人照着做。

## 为什么用 GitHub Actions

VitePress 是纯静态站点，构建产物就是一堆 HTML / CSS / JS，天然适合扔到 Pages 上。GitHub Pages 的 user site 直接绑定仓库根目录，配合 Actions 的 `pages` 环境，push 即部署，链路最短，也省掉一台服务器。

选用方案就一个原则：**越少手动操作越好**。手动构建再传文件这种流程，早晚会忘一次，然后线上就是旧版本。

## pnpm 版本对齐与 allowBuilds

这是整条流水线里最容易挂的地方。

CI 里用的 pnpm 是 **11.6.0**，而 pnpm 11 开始有两个变化：

1. **`onlyBuiltDependencies` 改名为 `allowBuilds`**。网上大量旧教程写的是旧字段名，照抄会得到"被忽略的构建脚本"警告，然后 `pnpm install` 直接 exit 1。
2. **esbuild 的 postinstall 必须运行**。VitePress 构建依赖 esbuild 的原生二进制，postinstall 不跑，构建时必然报错。

所以仓库根目录的 `pnpm-workspace.yaml` 里必须写：

```yaml
packages: []
allowBuilds:
  esbuild: true
```

注意 `packages` 字段不能省。pnpm 11 在单包仓库里如果这个字段缺失或为空列表，install 会直接报 `packages field missing or empty`，本地和 CI 一起挂。

## 推送即构建的 CI 流程

`.github/workflows/deploy.yml` 的完整流程：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 11.6.0
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install
      - run: pnpm docs:build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

要点：

- `pages: write` 和 `id-token: write` 是 deploy 阶段必须的权限，少一个就 403。
- `upload-pages-artifact` 的 `path` 指向 `.vitepress/dist`，这是 VitePress 的默认输出目录，别指错成 `dist`。
- Actions 环境本身和 Node 无关，但 `setup-node` 的版本要满足 VitePress 1.6 的要求（22+）。这里用 24，稳。

## 常见坑与排查

按出现频率排：

1. **`packages field missing or empty`**：`pnpm-workspace.yaml` 没有 `packages: []`。单包仓库也要显式声明。
2. **esbuild 二进制缺失**：`allowBuilds` 没配或字段名写错（写成 `onlyBuiltDependencies`）。特征是构建日志里出现 esbuild 相关报错。
3. **部署后 404**：artifact 路径传错，或者 Pages 环境没选对仓库。user site 部署后访问 `https://hupoliuguang.github.io`，不需要配 `base`。
4. **构建过了但页面是旧的**：`concurrency` 组没写，两次 push 并发时旧构建覆盖新构建。上面配了 `cancel-in-progress: false` 保证排队执行。
5. **Node 版本过旧**：VitePress 1.6 需要 Node 22+，CI 里用 24 没有这个问题，本地开发注意别用太老的 LTS。

排查顺序建议：先看 Actions 日志里是哪一步红——`pnpm install` 红多半是 allowBuilds / packages；`docs:build` 红多半是 Node 版本或依赖本身；deploy 红多半是权限或 artifact 路径。按这个顺序基本五分钟内能定位。
