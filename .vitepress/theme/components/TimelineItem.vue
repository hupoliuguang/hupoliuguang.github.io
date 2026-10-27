<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ date: string; text: string; tag?: string; tone?: 'coral' | 'mint' | 'yellow' }>(),
  { tone: 'coral' }
)
const toneClass = computed(() => `hl-tl--${props.tone}`)
</script>

<template>
  <li class="hl-tl-item" :class="toneClass">
    <span class="hl-tl-dot" />
    <div class="hl-tl-card">
      <div class="hl-tl-head">
        <span class="hl-tl-date">{{ date }}</span>
        <span v-if="tag" class="hl-tl-tag">{{ tag }}</span>
      </div>
      <p class="hl-tl-text">{{ text }}</p>
    </div>
  </li>
</template>

<style scoped>
.hl-tl-item {
  position: relative;
  display: flex;
  gap: 18px;
  margin-bottom: 24px;
}
.hl-tl-dot {
  flex: none;
  width: 14px;
  height: 14px;
  margin-top: 22px;
  border-radius: 50%;
  background: var(--hl-coral);
  box-shadow: 0 0 0 4px rgba(255, 138, 92, 0.18);
}
.hl-tl--mint .hl-tl-dot {
  background: var(--hl-mint);
  box-shadow: 0 0 0 4px rgba(98, 195, 181, 0.18);
}
.hl-tl--yellow .hl-tl-dot {
  background: var(--hl-yellow);
  box-shadow: 0 0 0 4px rgba(247, 201, 72, 0.18);
}
.hl-tl-card {
  flex: 1;
  padding: 18px 22px;
  border-radius: var(--hl-radius);
  background: #fff;
  box-shadow: var(--hl-shadow);
  transform: rotate(-0.4deg);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hl-tl-card:hover {
  transform: rotate(0deg) translateY(-2px);
  box-shadow: var(--hl-shadow-sm), var(--hl-shadow);
}
html.dark .hl-tl-card {
  background: var(--vp-c-bg-soft);
}
.hl-tl-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.hl-tl-date {
  padding: 3px 10px;
  border-radius: 8px;
  background: var(--hl-coral);
  color: #fff;
  font-size: 13px;
}
.hl-tl--mint .hl-tl-date {
  background: var(--hl-mint);
}
.hl-tl--yellow .hl-tl-date {
  background: var(--hl-yellow);
}
.hl-tl-tag {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  color: var(--hl-weak);
  font-size: 12px;
}
.hl-tl-text {
  margin: 0;
  color: var(--hl-text);
  font-size: 15px;
  line-height: 1.7;
}
</style>
