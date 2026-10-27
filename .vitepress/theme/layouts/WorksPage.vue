<script setup lang="ts">
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'
</script>

<template>
  <div class="hl-page">
    <header class="hl-page-head">
      <h1 class="hl-page-title">全部作品</h1>
      <p class="hl-page-desc">做过的工具、小项目与实验，慢慢会多起来。</p>
    </header>

    <div class="hl-works-grid">
      <ProjectCard
        v-for="(p, i) in projects"
        :key="p.title"
        :project="p"
        :plain="true"
        :index="i"
      />
    </div>
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
.hl-works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
}
</style>
