<script setup lang="ts">
import { computed, ref } from 'vue'
import TagPill from '../components/TagPill.vue'
import PostPreviewCard from '../components/PostPreviewCard.vue'
import FooterBar from '../components/FooterBar.vue'

type Post = {
  url: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  headings: { text: string; anchor: string }[]
}

const rawModules = import.meta.glob('../../../tech-notes/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

function parseFrontmatter(raw: string) {
  const fm: Record<string, string | string[]> = {}
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const kv = /^(\w+):\s*(.*)$/.exec(line.trim())
      if (!kv) continue
      const key = kv[1]
      let value = kv[2].trim()
      if (value.startsWith('[') && value.endsWith(']')) {
        fm[key] = value
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      } else {
        fm[key] = value.replace(/^['"]|['"]$/g, '')
      }
    }
  }
  const body = raw.replace(/^---[\s\S]*?\n---\r?\n?/, '')
  return { fm, body }
}

function extractHeadings(body: string) {
  const out: { text: string; anchor: string }[] = []
  const re = /^##\s+(.+)$/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(body)) && out.length < 6) {
    const text = m[1].replace(/[*`]/g, '').trim()
    out.push({ text, anchor: text.replace(/\s+/g, '-').toLowerCase() })
  }
  return out
}

const posts: Post[] = Object.entries(rawModules).map(([key, raw]) => {
  const { fm, body } = parseFrontmatter(raw)
  const url = '/' + key.replace(/^\.\.\/\.\.\/\.\.\//, '').replace(/\.md$/, '.html')
  const firstPara = body
    .split(/\r?\n\r?\n|\n\n/)
    .find((p) => p.trim() && !p.startsWith('#') && !p.startsWith('>') && !p.startsWith('```'))
  return {
    url,
    title: (fm.title as string) ?? '',
    date: (fm.date as string) ?? '',
    tags: (fm.tags as string[]) ?? [],
    excerpt: firstPara ? firstPara.replace(/[*`>#]/g, '').trim().slice(0, 120) : '',
    headings: extractHeadings(body)
  }
})

const sorted = posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
const active = ref(sorted[0])
</script>

<template>
  <div class="hl-page">
    <header class="hl-page-head">
      <h1 class="hl-page-title">技术思考</h1>
      <p class="hl-page-desc">仔细写的文章，点击左侧卡片切换预览。</p>
    </header>

    <div class="hl-tech-layout">
      <aside class="hl-tech-list">
        <button
          v-for="(p, i) in sorted"
          :key="p.url"
          class="hl-tech-card"
          :class="{ 'hl-tech-card--active': p === active }"
          @click="active = p"
        >
          <TagPill v-for="(t, ti) in p.tags" :key="t" :text="t" :index="i + ti" />
          <h3 class="hl-tech-card-title">{{ p.title }}</h3>
          <div class="hl-tech-card-foot">
            <span class="hl-tech-card-date">{{ p.date }}</span>
            <span class="hl-tech-card-arrow">→</span>
          </div>
        </button>
      </aside>

      <div class="hl-tech-preview">
        <PostPreviewCard :post="active" />
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<style scoped>
.hl-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 24px 0;
}
.hl-page-head {
  text-align: center;
  margin-bottom: 36px;
}
.hl-page-title {
  margin: 0;
  color: var(--hl-ink);
  font-size: 38px;
  letter-spacing: 3px;
}
.hl-page-desc {
  margin: 10px 0 0;
  color: var(--hl-weak);
  font-size: 15px;
  letter-spacing: 1px;
}
.hl-tech-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 28px;
  align-items: start;
}
@media (max-width: 860px) {
  .hl-tech-layout {
    grid-template-columns: 1fr;
  }
}
.hl-tech-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.hl-tech-card {
  display: block;
  width: 100%;
  text-align: left;
  padding: 20px 22px;
  border: none;
  border-radius: var(--hl-radius);
  background: #fff;
  box-shadow: var(--hl-shadow-sm);
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hl-tech-card:hover {
  transform: translateY(-2px) rotate(-0.4deg);
  box-shadow: var(--hl-shadow-sm), var(--hl-shadow);
}
.hl-tech-card--active {
  transform: rotate(-0.8deg);
  box-shadow: var(--hl-shadow);
  outline: 2px solid var(--hl-coral);
}
html.dark .hl-tech-card {
  background: var(--vp-c-bg-soft);
}
.hl-tech-card-title {
  margin: 10px 0 12px;
  color: var(--hl-ink);
  font-size: 18px;
  letter-spacing: 0.5px;
}
.hl-tech-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hl-tech-card-date {
  font-size: 13px;
  color: var(--hl-weak);
}
.hl-tech-card-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--hl-coral);
  color: #fff;
  font-size: 15px;
}
.hl-tech-preview {
  position: sticky;
  top: 96px;
}
</style>
