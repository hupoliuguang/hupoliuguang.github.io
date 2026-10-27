<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ text: string; index?: number }>(), { index: 0 })
const tones = ['coral', 'mint', 'yellow']
const toneClass = computed(() => `hl-tag--${tones[props.index % tones.length]}`)
</script>

<template>
  <span class="hl-tag" :class="toneClass">{{ text }}</span>
</template>

<style scoped>
.hl-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
  line-height: 1.4;
  color: #fff;
  white-space: nowrap;
}
.hl-tag--coral {
  background: var(--hl-coral);
}
.hl-tag--mint {
  background: var(--hl-mint);
}
.hl-tag--yellow {
  background: var(--hl-yellow);
}
</style>
