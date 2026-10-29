<script setup lang="ts">
import { computed } from 'vue'
import TimelineItem from './TimelineItem.vue'
import { devlog, type DevlogItem } from '../lib/devlog'

const groups = computed(() => {
  const map: { year: string; items: DevlogItem[] }[] = []
  for (const item of devlog) {
    const year = item.date.slice(0, 4)
    const last = map[map.length - 1]
    if (last && last.year === year) last.items.push(item)
    else map.push({ year, items: [item] })
  }
  return map
})

const tones = ['coral', 'yellow', 'mint'] as const
</script>

<template>
  <div class="hl-devtl">
    <section v-for="(g, gi) in groups" :key="g.year" class="hl-devtl-group">
      <span class="hl-devtl-year" :class="`hl-devtl-year--${tones[gi % tones.length]}`">{{ g.year }}</span>
      <ul class="hl-devtl-list">
        <TimelineItem
          v-for="(item, i) in g.items"
          :key="item.date"
          :date="item.date"
          :text="item.text"
          :tag="item.tag"
          :url="item.url"
          :tone="tones[(gi + i) % tones.length]"
        />
      </ul>
    </section>
  </div>
</template>

<style scoped>
.hl-devtl {
  position: relative;
}
.hl-devtl::before {
  content: '';
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 6px;
  width: 4px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--hl-yellow), var(--hl-coral), var(--hl-mint));
  opacity: 0.5;
}
.hl-devtl-group {
  padding-left: 36px;
}
.hl-devtl-year {
  display: inline-block;
  margin: 14px 0 16px;
  padding: 6px 18px;
  border-radius: 999px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 2px;
  transform: rotate(-1.5deg);
}
.hl-devtl-year--coral {
  background: var(--hl-coral);
}
.hl-devtl-year--yellow {
  background: var(--hl-yellow);
}
.hl-devtl-year--mint {
  background: var(--hl-mint);
}
.hl-devtl-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
