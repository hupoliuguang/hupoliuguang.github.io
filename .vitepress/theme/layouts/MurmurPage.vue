<script setup lang="ts">
import MurmurTimeline from '../components/MurmurTimeline.vue'
</script>

<template>
  <div class="hl-page">
    <header class="hl-page-head">
      <h1 class="hl-page-title">世界碎碎念</h1>
      <p class="hl-page-desc">一些小而短的吐槽。</p>
    </header>
    <MurmurTimeline />
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
