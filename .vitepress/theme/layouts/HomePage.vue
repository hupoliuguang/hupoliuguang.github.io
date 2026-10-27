<script setup lang="ts">
import { devlog } from '../data/devlog'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'
import FooterBar from '../components/FooterBar.vue'

const recent = devlog.slice(0, 3)
</script>

<template>
  <div class="hl-home">
    <section class="hl-hero">
      <div class="hl-hero-cards">
        <div class="hl-hero-card hl-hero-card--back1" />
        <div class="hl-hero-card hl-hero-card--back2" />
        <div class="hl-hero-card hl-hero-card--front">
          <img src="/img/hero-bg.jpg" alt="水墨龙城：孤舟远山" />
        </div>
      </div>
      <h1 class="hl-hero-title">琥珀流光</h1>
      <p class="hl-hero-sub">独立游戏开发 · 开发日志 · 技术沉淀</p>
      <p class="hl-hero-tag">慢慢来，比较快。</p>
    </section>

    <section class="hl-section">
      <h2 class="hl-section-title">最近</h2>
      <ul class="hl-recent">
        <li v-for="r in recent" :key="r.date" class="hl-recent-item">
          <span class="hl-recent-date">{{ r.date }}</span>
          <span class="hl-recent-text">{{ r.text }}</span>
          <span v-if="r.tag" class="hl-recent-tag">{{ r.tag }}</span>
        </li>
      </ul>
    </section>

    <section class="hl-section">
      <h2 class="hl-section-title">作品</h2>
      <div class="hl-proj-grid">
        <ProjectCard
          v-for="(p, i) in projects"
          :key="p.title"
          :project="p"
          :class="i % 2 ? 'hl-proj--tilt-r' : 'hl-proj--tilt-l'"
        />
      </div>
    </section>

    <FooterBar />
  </div>
</template>

<style scoped>
.hl-home {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}
.hl-hero {
  text-align: center;
  padding: 64px 0 36px;
}
.hl-hero-cards {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 760px;
  margin-bottom: 30px;
}
.hl-hero-card {
  border-radius: 24px;
}
.hl-hero-card--back1 {
  position: absolute;
  inset: 0;
  background: var(--hl-yellow);
  box-shadow: var(--hl-shadow);
  transform: rotate(-4.5deg) translate(-12px, 8px);
}
.hl-hero-card--back2 {
  position: absolute;
  inset: 0;
  background: var(--hl-mint);
  box-shadow: var(--hl-shadow);
  transform: rotate(3.5deg) translate(12px, 6px);
}
.hl-hero-card--front {
  position: relative;
  border-radius: 22px;
  box-shadow: var(--hl-shadow), 0 0 0 8px #fff;
  transform: rotate(-1.2deg);
}
.hl-hero-card--front img {
  display: block;
  width: 100%;
  border-radius: 16px;
}
html.dark .hl-hero-card--front {
  box-shadow: var(--hl-shadow), 0 0 0 8px var(--vp-c-bg-soft);
}
.hl-hero-title {
  margin: 0;
  color: var(--hl-ink);
  font-size: 44px;
  letter-spacing: 2px;
}
.hl-hero-sub {
  margin: 12px 0 0;
  color: var(--hl-text);
  font-size: 17px;
  letter-spacing: 1px;
}
.hl-hero-tag {
  margin: 16px 0 0;
  color: var(--hl-weak);
  font-size: 14px;
  letter-spacing: 3px;
}
.hl-section {
  margin-top: 48px;
}
.hl-section-title {
  margin: 0 0 20px;
  color: var(--hl-ink);
  font-size: 26px;
  letter-spacing: 2px;
}
.hl-section-title::before {
  content: '✦ ';
  color: var(--hl-coral);
}
.hl-recent {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.hl-recent-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 22px;
  border-radius: var(--hl-radius);
  background: #fff;
  box-shadow: var(--hl-shadow-sm);
  transform: rotate(-0.3deg);
}
html.dark .hl-recent-item {
  background: var(--vp-c-bg-soft);
}
.hl-recent-date {
  padding: 3px 10px;
  border-radius: 8px;
  background: var(--hl-coral);
  color: #fff;
  font-size: 13px;
  white-space: nowrap;
}
.hl-recent-text {
  flex: 1;
  min-width: 200px;
  color: var(--hl-text);
  font-size: 15px;
}
.hl-recent-tag {
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  color: var(--hl-weak);
  font-size: 12px;
}
.hl-proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
}
.hl-proj--tilt-l {
  transform: rotate(-0.6deg);
}
.hl-proj--tilt-r {
  transform: rotate(0.6deg) translateY(14px);
}
</style>
