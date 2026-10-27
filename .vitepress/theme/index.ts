import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import './style.css'
import GitHubAvatar from './components/GitHubAvatar.vue'
import MusicToggle from './components/MusicToggle.vue'
import TagPill from './components/TagPill.vue'
import TimelineItem from './components/TimelineItem.vue'
import HomePage from './layouts/HomePage.vue'
import DevLogPage from './layouts/DevLogPage.vue'
import MurmurPage from './layouts/MurmurPage.vue'
import TechNotesPage from './layouts/TechNotesPage.vue'

const Theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => [
        h(MusicToggle),
        h(GitHubAvatar)
      ]
    })
  },
  enhanceApp({ app }) {
    app.component('TagPill', TagPill)
    app.component('TimelineItem', TimelineItem)
    app.component('HomePage', HomePage)
    app.component('DevLogPage', DevLogPage)
    app.component('MurmurPage', MurmurPage)
    app.component('TechNotesPage', TechNotesPage)
  }
}

export default Theme
