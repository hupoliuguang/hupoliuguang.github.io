<script setup lang="ts">
import TimelineItem from './TimelineItem.vue'
import { murmurs } from '../data/murmurs'

const tones = ['coral', 'mint', 'yellow']
</script>

<template>
  <div class="hl-murmur">
    <ul class="hl-murmur-list">
      <TimelineItem
        v-for="(m, i) in murmurs"
        :key="m.date"
        :date="m.date"
        :text="m.text"
        :tone="tones[i % tones.length]"
      />
    </ul>
  </div>
</template>

<style scoped>
.hl-murmur {
  position: relative;
}
.hl-murmur::before {
  content: '';
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 6px;
  width: 4px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--hl-coral), var(--hl-mint), var(--hl-yellow));
  opacity: 0.5;
}
.hl-murmur-list {
  list-style: none;
  margin: 0;
  padding: 0 0 0 36px;
}
</style>
