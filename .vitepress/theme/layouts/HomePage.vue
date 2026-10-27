<script setup lang="ts">
import { devlog } from '../data/devlog'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'

const recent = devlog.slice(0, 3)
const featured = projects.slice(0, 6)
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
      <div class="hl-module-title">最近</div>
      <ul class="hl-recent">
        <li v-for="r in recent" :key="r.date" class="hl-recent-item">
          <span class="hl-recent-date">{{ r.date }}</span>
          <span class="hl-recent-text">{{ r.text }}</span>
          <span v-if="r.tag" class="hl-recent-tag">{{ r.tag }}</span>
        </li>
      </ul>
    </section>

    <section class="hl-section">
      <div class="hl-module-head">
        <div class="hl-module-title">一些作品</div>
        <a class="hl-module-link" href="/works.html" rel="noopener">全部作品 →</a>
      </div>
      <div class="hl-proj-grid">
        <ProjectCard
          v-for="(p, i) in featured"
          :key="p.title"
          :project="p"
          :index="i"
          :class="i % 2 ? 'hl-proj--tilt-r' : 'hl-proj--tilt-l'"
        />
      </div>
    </section>

    <section class="hl-section hl-about">
      <div class="hl-about-title">关于我</div>
      <div class="hl-about-card">
        <div class="hl-about-avatar">琉</div>
        <div class="hl-about-body">
          <p class="hl-about-text">住在山间小城，白天写代码，晚上画画。这个站点记录我做过的东西、踩过的坑，和偶尔冒出来的想法——希望它像一个安静的房间，你进来坐一会儿。</p>
          <p class="hl-about-sign">写于 2026 秋</p>
        </div>
      </div>
    </section>
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
  padding: 64px 0 58px;
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
  margin: 0 0 58px;
}
.hl-module-title {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--hl-coral);
}
.hl-module-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
}
.hl-module-head .hl-module-title {
  margin: 0;
}
.hl-module-link {
  font-size: 13px;
  color: var(--hl-weak);
  text-decoration: none;
}
.hl-module-link:hover {
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
.hl-about {
  margin-bottom: 58px;
}
.hl-about-title {
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--hl-coral);
}
.hl-about-card {
  display: flex;
  align-items: center;
  gap: 28px;
  max-width: 980px;
  padding: 28px 32px;
  border-radius: var(--hl-radius);
  background: #fff;
  box-shadow: var(--hl-shadow-sm);
  transform: rotate(0.3deg);
}
html.dark .hl-about-card {
  background: var(--vp-c-bg-soft);
}
.hl-about-avatar {
  flex: none;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hl-coral), var(--hl-yellow));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 8px 18px rgba(255, 138, 92, 0.35);
}
.hl-about-body {
  flex: 1;
}
.hl-about-text {
  margin: 0;
  font-size: 15px;
  line-height: 2.1;
  color: var(--hl-text);
}
.hl-about-sign {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--hl-coral);
}
@media (max-width: 640px) {
  .hl-about-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
