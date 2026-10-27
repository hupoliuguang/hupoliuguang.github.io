<script setup lang="ts">
defineProps<{
  project: { title: string; desc: string; date: string; image: string; link: string }
}>()
</script>

<template>
  <a class="hl-proj" :href="project.link">
    <div class="hl-proj-media">
      <img :src="project.image" :alt="project.title" loading="lazy" />
    </div>
    <div class="hl-proj-body">
      <span class="hl-proj-date">{{ project.date }}</span>
      <h3 class="hl-proj-title">{{ project.title }}</h3>
      <p class="hl-proj-desc">{{ project.desc }}</p>
      <span class="hl-proj-more">查看 →</span>
    </div>
  </a>
</template>

<style scoped>
.hl-proj {
  display: block;
  border-radius: var(--hl-radius);
  background: #fff;
  box-shadow: var(--hl-shadow);
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hl-proj:hover {
  transform: translateY(-4px) rotate(-0.3deg);
  box-shadow: var(--hl-shadow-sm), var(--hl-shadow);
}
html.dark .hl-proj {
  background: var(--vp-c-bg-soft);
}
.hl-proj-media {
  overflow: hidden;
  border-radius: var(--hl-radius) var(--hl-radius) 0 0;
}
.hl-proj-media img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
.hl-proj-body {
  padding: 18px 22px 20px;
}
.hl-proj-date {
  font-size: 13px;
  color: var(--hl-weak);
}
.hl-proj-title {
  margin: 6px 0 6px;
  color: var(--hl-ink);
  font-size: 20px;
  letter-spacing: 0.5px;
}
.hl-proj-desc {
  margin: 0 0 12px;
  color: var(--hl-text);
  font-size: 14px;
  line-height: 1.7;
}
.hl-proj-more {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  background: var(--hl-coral);
  color: #fff;
  font-size: 13px;
}
</style>
