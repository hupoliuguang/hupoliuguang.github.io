<script setup lang="ts">
import DevLogTimeline from '../components/DevLogTimeline.vue'
import FooterBar from '../components/FooterBar.vue'
</script>

<template>
  <div class="hl-page">
    <header class="hl-page-head">
      <h1 class="hl-page-title">开发日志</h1>
      <p class="hl-page-desc">做了什么开发、在做什么，都一笔带过。</p>
    </header>
    <DevLogTimeline />
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
</style>
