<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{ date: string; text: string; tag?: string; tone?: 'coral' | 'mint' | 'yellow' }>(),
  { tone: 'coral' }
)
const toneClass = computed(() => `hl-tl--${props.tone}`)

const textEl = ref<HTMLParagraphElement | null>(null)
const isLong = ref(false)
const expanded = ref(false)
let ro: ResizeObserver | null = null

function checkOverflow() {
  const el = textEl.value
  if (!el) return
  // 测量期间断开 RO，避免「改样式 → RO 触发 → 再改」死循环
  ro?.disconnect()
  // 临时解除 line-clamp，用 Range 数文本真实行数；超过 3 行视为超长
  const prev = el.style.cssText
  el.style.transition = 'none'
  el.style.display = 'block'
  el.style.webkitLineClamp = 'none'
  el.style.maxHeight = 'none'
  void el.offsetHeight
  const first = el.firstChild
  let lines = 0
  if (first && first.nodeType === Node.TEXT_NODE) {
    const range = document.createRange()
    range.setStart(first, 0)
    range.setEnd(first, first.length)
    lines = new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size
  }
  el.style.cssText = prev
  isLong.value = lines > 3
  ro?.observe(el)
}

onMounted(async () => {
  await nextTick()
  checkOverflow()
  ro = new ResizeObserver(checkOverflow)
  ro.observe(textEl.value as HTMLParagraphElement)
  // 字体加载完成前后行高度量会变，补一次重测
  document.fonts?.ready?.then(checkOverflow)
})

onBeforeUnmount(() => {
  ro?.disconnect()
})
</script>

<template>
  <li class="hl-tl-item" :class="toneClass">
    <span class="hl-tl-dot" />
    <div class="hl-tl-card">
      <div class="hl-tl-head">
        <span class="hl-tl-date">{{ date }}</span>
        <span v-if="tag" class="hl-tl-tag">{{ tag }}</span>
      </div>
      <p ref="textEl" class="hl-tl-text" :class="{ 'hl-tl-text--open': expanded }">{{ text }}</p>
      <button v-if="isLong" type="button" class="hl-tl-more" @click="expanded = !expanded">
        {{ expanded ? '收起 ▴' : '展开 ▾' }}
      </button>
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 78px;
  transition: max-height 0.35s ease;
}
.hl-tl-text--open {
  -webkit-line-clamp: unset;
  max-height: 800px;
}
.hl-tl-more {
  display: inline-block;
  margin-top: 8px;
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: 13px;
  color: var(--hl-weak);
  cursor: pointer;
}
.hl-tl-more:hover {
  color: var(--hl-coral);
}
</style>
