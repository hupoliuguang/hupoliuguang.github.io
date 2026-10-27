import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // M2：注册全局组件 GitHubAvatar / MusicToggle / TagPill 等
  }
} satisfies Theme
