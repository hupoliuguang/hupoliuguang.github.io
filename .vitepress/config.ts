import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "琥珀流光的数字花园",
  description: "独立游戏开发 / 开发日志 / 技术沉淀",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '开发日志', link: '/dev-log' },
      { text: '技术沉淀', link: '/tech-notes' }
    ],

    sidebar: [
      { text: '开发日志', link: '/dev-log' },
      { text: '技术沉淀', link: '/tech-notes' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hupoliuguang' }
    ]
  }
})
