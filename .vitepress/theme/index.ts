import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import './style.css'
import GitHubAvatar from './components/GitHubAvatar.vue'
import MusicToggle from './components/MusicToggle.vue'
import TagPill from './components/TagPill.vue'
import TimelineItem from './components/TimelineItem.vue'

const Theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () =>
        h('div', { class: 'hl-nav-right' }, [
          h(GitHubAvatar),
          h(MusicToggle)
        ])
    })
  },
  enhanceApp({ app }) {
    app.component('TagPill', TagPill)
    app.component('TimelineItem', TimelineItem)
  }
}

export default Theme
