<script setup lang="ts">
import { ref } from 'vue'
import TagPill from '../components/TagPill.vue'
import PostPreviewCard from '../components/PostPreviewCard.vue'
import { data as posts } from '../../data/tech-notes.data'
import type { TechNoteItem } from '../../data/content'

const active = ref<TechNoteItem>(posts[0])
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
          v-for="(p, i) in posts"
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
  </div>
</template>

<style scoped>
.hl-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 24px 96px;
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
