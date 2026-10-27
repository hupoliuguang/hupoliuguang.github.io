<script setup lang="ts">
defineProps<{
  project: { title: string; desc: string; date: string; image?: string; link?: string }
  plain?: boolean
  index?: number
}>()
</script>

<template>
  <a
    v-if="project.link"
    class="hl-proj"
    :class="[
      (plain || !project.image) ? 'hl-proj--plain' : '',
      (plain || !project.image) ? 'hl-tint-' + ((index ?? 0) % 3) : ''
    ]"
    :href="project.link"
  >
    <template v-if="!plain && project.image">
      <div class="hl-proj-media">
        <img :src="project.image" :alt="project.title" loading="lazy" />
      </div>
      <div class="hl-proj-body">
        <span class="hl-proj-date">{{ project.date }}</span>
        <h3 class="hl-proj-title">{{ project.title }}</h3>
        <p class="hl-proj-desc">{{ project.desc }}</p>
        <span class="hl-proj-more">查看 →</span>
      </div>
    </template>
    <template v-else>
      <div class="hl-proj-plain">
        <div>
          <h3 class="hl-proj-plain-title">{{ project.title }}</h3>
          <p class="hl-proj-desc">{{ project.desc }}</p>
        </div>
        <div class="hl-proj-plain-foot">
          <span class="hl-proj-date">{{ project.date }}</span>
          <span class="hl-proj-more">查看 →</span>
        </div>
      </div>
    </template>
  </a>

  <div
    v-else
    class="hl-proj"
    :class="['hl-proj--plain', 'hl-tint-' + ((index ?? 0) % 3)]"
  >
    <div class="hl-proj-plain">
      <div>
        <h3 class="hl-proj-plain-title">{{ project.title }}</h3>
        <p class="hl-proj-desc">{{ project.desc }}</p>
      </div>
      <div class="hl-proj-plain-foot">
        <span class="hl-proj-date">{{ project.date }}</span>
        <span class="hl-proj-more">敬请期待</span>
      </div>
    </div>
  </div>
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

/* 无图文字卡：马卡龙浅色渐变底 + 大标题 */
.hl-proj--plain {
  display: flex;
  min-height: 230px;
  padding: 26px;
  box-sizing: border-box;
}
.hl-proj-plain {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.hl-proj-plain-title {
  margin: 0 0 10px;
  color: var(--hl-ink);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1.5px;
  line-height: 1.4;
}
.hl-proj-plain .hl-proj-desc {
  margin: 0;
}
.hl-proj-plain-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 22px;
}
.hl-tint-0 {
  background: linear-gradient(135deg, #fff3ec, #ffe9dc);
}
.hl-tint-1 {
  background: linear-gradient(135deg, #eff8f6, #ddf1ec);
}
.hl-tint-2 {
  background: linear-gradient(135deg, #fff9e6, #fff0c4);
}
html.dark .hl-tint-0 {
  background: linear-gradient(135deg, #3a2718, #4a2f1b);
}
html.dark .hl-tint-1 {
  background: linear-gradient(135deg, #1e3631, #27443d);
}
html.dark .hl-tint-2 {
  background: linear-gradient(135deg, #3a3118, #4a3f1c);
}
</style>
