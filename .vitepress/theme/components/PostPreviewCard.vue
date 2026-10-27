<script setup lang="ts">
defineProps<{
  post: {
    title: string
    date: string
    tags?: string[]
    excerpt?: string
    headings: { text: string; anchor: string }[]
    url: string
  }
}>()
</script>

<template>
  <div class="hl-preview">
    <h3 class="hl-preview-title">{{ post.title }}</h3>
    <div class="hl-preview-meta">
      <span class="hl-preview-date">{{ post.date }}</span>
      <span v-for="t in post.tags" :key="t" class="hl-preview-tag">{{ t }}</span>
    </div>
    <div v-if="post.headings.length" class="hl-preview-toc">
      <p class="hl-preview-toc-label">本页目录</p>
      <a
        v-for="h in post.headings"
        :key="h.anchor"
        class="hl-preview-toc-item"
        :href="`${post.url}#${h.anchor}`"
      >{{ h.text }}</a>
    </div>
    <p v-if="post.excerpt" class="hl-preview-excerpt">{{ post.excerpt }}</p>
    <a class="hl-preview-cta" :href="post.url">阅读全文 →</a>
  </div>
</template>

<style scoped>
.hl-preview {
  border-radius: var(--hl-radius);
  background: var(--vp-c-bg-soft);
  padding: 24px 26px;
}
.hl-preview-title {
  margin: 0 0 8px;
  color: var(--hl-ink);
  font-size: 22px;
  letter-spacing: 0.5px;
}
.hl-preview-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.hl-preview-date {
  font-size: 13px;
  color: var(--hl-weak);
}
.hl-preview-tag {
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--hl-mint);
  color: #fff;
  font-size: 12px;
}
.hl-preview-toc {
  border-radius: var(--hl-radius-sm);
  background: var(--vp-c-bg);
  padding: 14px 16px;
  margin-bottom: 16px;
}
.hl-preview-toc-label {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--hl-weak);
  letter-spacing: 1px;
}
.hl-preview-toc-item {
  display: block;
  padding: 4px 0;
  color: var(--hl-text);
  font-size: 14px;
  text-decoration: none;
}
.hl-preview-toc-item:hover {
  color: var(--hl-coral);
}
.hl-preview-excerpt {
  margin: 0 0 18px;
  color: var(--hl-text);
  font-size: 14px;
  line-height: 1.8;
}
.hl-preview-cta {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 999px;
  background: var(--hl-coral);
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s ease;
}
.hl-preview-cta:hover {
  transform: translateY(-1px);
}
</style>
