# 🎯 affiliate项目 (monorepo)

> 多个出海 affiliate + GEO 站点的 monorepo。每个 `sites/<site-name>/` 是一个独立的 Astro 项目。

## 当前站点

| 站点 | 域名 | 状态 | Niche |
|---|---|---|---|
| `sites/ai-smart-tools/` | `aismarttools.com` | 🟢 初建 | AI Productivity & Workflow Tools |

未来新增站点：`sites/<niche-slug>/`

## 目录结构

```
affiliate项目/
├── docs/
│   └── research/         # 教程分析、市场调研、选品笔记
└── sites/
    └── ai-smart-tools/   # Astro 5 + Cloudflare Pages
        ├── src/
        ├── public/
        ├── astro.config.mjs
        ├── package.json
        └── README.md
```

## 如何新增一个 niche 站点

```bash
cp -r sites/ai-smart-tools sites/<your-niche-slug>
cd sites/<your-niche-slug>
# 修改 astro.config.mjs 的 site, 包名, src/content/config.ts 的 taxonomy
# 部署时绑定不同 Cloudflare Pages project
```

## 仓库约定

- 每个 site 独立部署到不同 Cloudflare Pages project
- 每个 site 独立验证 robots.txt / llms.txt / Schema
- 跨站点不改 schema 的统一逻辑，参考 `sites/ai-smart-tools/src/components/schema/`
