import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "琥珀流光的数字花园",
  description: "独立游戏开发 / 开发日志 / 技术沉淀",
  lang: 'zh-CN',
  // examples/ 里的示例 md 仅作写作参考（AI 模板），不渲染为站点页面
  srcExclude: ['examples/**'],
  lastUpdated: true,
  themeConfig: {
    search: { provider: 'local' },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '开发日志', link: '/dev-log' },
      { text: '技术思考', link: '/tech-notes' },
      { text: '世界碎碎念', link: '/world-murmur' }
    ],
    outline: { label: '本页目录', level: [2, 3] },
    lastUpdated: { text: '最后更新于' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: {
      message: '慢慢来，比较快。',
      copyright: '© 2026 琥珀流光 · GitHub · VitePress 驱动'
    }
  }
})
