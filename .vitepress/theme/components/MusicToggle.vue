<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

type Track = { title: string; file: string }

// 播放列表由构建时扫描 public/audio/ 生成（audio-manifest.json），拖入音频文件即自动加入；
// 清单不可用时回退到内置列表。播放到哪首才加载哪首（audio 复用，切 src 即触发加载）
const FALLBACK_TRACKS: Track[] = [
  { title: 'Sincerely', file: '/audio/sincerely.mp3' }
]
const tracks = ref<Track[]>([...FALLBACK_TRACKS])

const trackIndex = ref(0)
const muted = ref(true)
const volume = ref(1)
const audioEl = ref<HTMLAudioElement | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('/audio-manifest.json')
    if (res.ok) {
      const list: Track[] = await res.json()
      if (Array.isArray(list) && list.length > 0) tracks.value = list
    }
  } catch {
    /* 清单不可用：保留内置列表 */
  }
  // 每次进入默认收起态（♪ 轻音乐）；点击后才播放，audio preload="none" 保证流式加载
  const savedVol = parseFloat(localStorage.getItem('hl-music-volume') ?? '')
  if (!Number.isNaN(savedVol)) volume.value = savedVol
  const savedIdx = parseInt(localStorage.getItem('hl-music-track') ?? '', 10)
  if (!Number.isNaN(savedIdx) && savedIdx >= 0 && savedIdx < tracks.value.length) trackIndex.value = savedIdx
})

watch(volume, (v) => {
  if (audioEl.value) audioEl.value.volume = v
  localStorage.setItem('hl-music-volume', String(v))
})

watch(trackIndex, (i) => {
  localStorage.setItem('hl-music-track', String(i))
  if (!muted.value) audioEl.value?.play()
})

function toggle() {
  if (!tracks.value.length) return
  if (audioEl.value?.paused) {
    audioEl.value.volume = volume.value
    audioEl.value?.play()
    muted.value = false
  } else {
    audioEl.value?.pause()
    muted.value = true
  }
}

function next() {
  if (!tracks.value.length) return
  trackIndex.value = (trackIndex.value + 1) % tracks.value.length
}

function prev() {
  if (!tracks.value.length) return
  trackIndex.value = (trackIndex.value - 1 + tracks.value.length) % tracks.value.length
}

function onEnded() {
  next()
}
</script>

<template>
  <div class="hl-music-wrap hl-music-skin--glass">
    <audio ref="audioEl" :src="tracks[trackIndex]?.file" preload="none" @ended="onEnded" />
    <div class="hl-music-ctl" :class="{ 'hl-music-ctl--on': !muted }">
      <button
        class="hl-music"
        :class="{ 'hl-music--muted': muted }"
        :title="muted ? '播放背景音乐' : '暂停（' + tracks[trackIndex]?.title + '）'"
        aria-label="背景音乐开关"
        @click="toggle"
      >
        <span v-if="muted" class="hl-music-icon">♪</span>
        <svg v-else class="hl-music-icon hl-music-pause" viewBox="0 0 10 14" aria-hidden="true">
          <defs>
            <linearGradient id="hl-music-pause-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#FFAB82" />
              <stop offset="1" stop-color="#F0744E" />
            </linearGradient>
          </defs>
          <rect x="0.8" y="0.8" width="3.4" height="12.4" rx="1.7" fill="url(#hl-music-pause-g)" />
          <rect x="5.8" y="0.8" width="3.4" height="12.4" rx="1.7" fill="url(#hl-music-pause-g)" />
        </svg>
        <span class="hl-music-title">{{ muted ? '轻音乐' : tracks[trackIndex]?.title }}</span>
      </button>
      <template v-if="!muted">
        <button class="hl-music-nav" aria-label="上一首" title="上一首" @click="prev">
          <svg class="hl-music-nav-icon" viewBox="0 0 10 10" aria-hidden="true"><path d="M8 2 4.8 5 8 8Z" fill="currentColor" /></svg>
        </button>
        <button class="hl-music-nav" aria-label="下一首" title="下一首" @click="next">
          <svg class="hl-music-nav-icon" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2 5.2 5 2 8Z" fill="currentColor" /></svg>
        </button>
      </template>
      <input
        v-show="!muted"
        v-model.number="volume"
        class="hl-music-vol"
        type="range"
        min="0"
        max="1"
        step="0.05"
        aria-label="音量"
        :style="{ '--fill': volume * 100 + '%' }"
        @click.stop
      />
    </div>
  </div>
</template>

<style scoped>
.hl-music-wrap {
  margin-left: 10px;
}
/* 控制条容器：收起态无材质（仅主按钮胶囊），播放态成为一体化长条 */
.hl-music-ctl {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  border-radius: 999px;
  transition: background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, padding 0.25s ease;
}
/* 主按钮：收起态为独立玻璃胶囊，播放态融入长条变透明 */
.hl-music {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  box-sizing: border-box;
  padding: 0 10px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--hl-text);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.25s ease;
}
.hl-music:hover {
  transform: translateY(-1px);
}
.hl-music--muted {
  opacity: 0.7;
}
.hl-music-icon {
  color: var(--hl-coral);
  font-size: 15px;
  line-height: 1;
}
.hl-music-pause {
  display: block;
  width: 10px;
  height: 14px;
  flex: none;
}
.hl-music-title {
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hl-music-nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--hl-text);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.hl-music-nav:hover {
  transform: translateY(-1px);
}
.hl-music-nav-icon {
  display: block;
  width: 10px;
  height: 10px;
}
.hl-music-vol {
  -webkit-appearance: none;
  appearance: none;
  margin: 0 2px 0 4px;
  width: 96px;
  height: 18px;
  cursor: pointer;
  background: transparent;
}
.hl-music-vol::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: var(--hl-line);
}
.hl-music-vol::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -5px;
  border-radius: 50%;
  border: none;
  background: #fff;
  box-shadow: 0 2px 6px rgba(180, 150, 110, 0.4);
}
.hl-music-vol::-moz-range-track {
  height: 4px;
  border-radius: 999px;
  background: var(--hl-line);
}
.hl-music-vol::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background: #fff;
  box-shadow: 0 2px 6px rgba(180, 150, 110, 0.4);
}
/* 皮肤：奶油玻璃（材质 recipe 全部收敛到 style.css 的 --hl-glass-* token） */
.hl-music-skin--glass .hl-music {
  background: var(--hl-glass-bg);
  backdrop-filter: var(--hl-glass-blur);
  -webkit-backdrop-filter: var(--hl-glass-blur);
  border: 1px solid var(--hl-glass-border);
  box-shadow: var(--hl-glass-highlight), var(--hl-glass-shadow);
}
.hl-music-skin--glass .hl-music:hover {
  background: var(--hl-glass-bg-hover);
  box-shadow: var(--hl-glass-highlight), var(--hl-glass-shadow-lift);
}
.hl-music-skin--glass .hl-music-icon {
  text-shadow: 0 0 8px rgba(255, 138, 92, 0.3); /* 珊瑚微光 */
}
/* 暂停图标：珊瑚渐变竖条 + 低压弥散晕染（模糊大、透明度低） */
.hl-music-skin--glass .hl-music-pause {
  filter: drop-shadow(0 0 5px rgba(240, 110, 70, 0.38)) drop-shadow(0 0 12px rgba(240, 120, 80, 0.2)) drop-shadow(0 1px 2px rgba(160, 84, 44, 0.22));
}
/* 播放态：玻璃胶囊 + 珊瑚光晕 + 暂停音符呼吸 */
.hl-music-skin--glass .hl-music-ctl--on {
  background: var(--hl-glass-bg);
  backdrop-filter: var(--hl-glass-blur);
  -webkit-backdrop-filter: var(--hl-glass-blur);
  border: 1px solid var(--hl-glass-border);
  box-shadow: var(--hl-glass-highlight), var(--hl-glass-glow), var(--hl-glass-shadow);
  padding: 0 12px 0 4px;
}
.hl-music-skin--glass .hl-music-ctl--on .hl-music {
  background: transparent;
  border-color: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: none;
}
.hl-music-skin--glass .hl-music-ctl--on .hl-music-title {
  color: var(--hl-ink);
  font-weight: 600;
}
.hl-music-skin--glass .hl-music-ctl--on .hl-music-icon {
  animation: hl-music-breathe 2.4s ease-in-out infinite;
}
@keyframes hl-music-breathe {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
/* 玻璃圆钮（上一首/下一首）：透明磨砂 + 一圈白边 + 顶高光，悬浮提亮箭头变珊瑚 */
.hl-music-skin--glass .hl-music-ctl--on .hl-music-nav {
  background: var(--hl-glass-btn-grad);
  border: 1px solid var(--hl-glass-border);
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);
  box-shadow: var(--hl-glass-highlight), var(--hl-glass-btn-shadow);
  color: var(--hl-weak);
}
.hl-music-skin--glass .hl-music-ctl--on .hl-music-nav:hover {
  background: var(--hl-glass-btn-grad-hover);
  color: var(--hl-coral);
  box-shadow: var(--hl-glass-highlight), var(--hl-glass-btn-shadow-hover);
}
.hl-music-skin--glass .hl-music-ctl--on .hl-music-nav:active {
  transform: translateY(0) scale(0.88);
}
/* 箭头浮雕：上白下棕的压印感 */
.hl-music-skin--glass .hl-music-ctl--on .hl-music-nav-icon {
  filter: drop-shadow(0 1px 1px rgba(255, 255, 255, 0.9)) drop-shadow(0 -1px 1px rgba(160, 124, 86, 0.35));
}
/* 音量滑条：珊瑚填充 + 磨砂奶油米轨道，立体圆帽滑块 */
.hl-music-skin--glass .hl-music-vol::-webkit-slider-runnable-track {
  background: linear-gradient(90deg, var(--hl-coral) 0%, var(--hl-coral) var(--fill, 60%), var(--hl-glass-track) var(--fill, 60%));
  box-shadow: inset 0 1px 2px rgba(173, 133, 84, 0.22);
}
.hl-music-skin--glass .hl-music-vol::-moz-range-track {
  background: var(--hl-glass-track);
  box-shadow: inset 0 1px 2px rgba(173, 133, 84, 0.22);
}
.hl-music-skin--glass .hl-music-vol::-moz-range-progress {
  height: 4px;
  border-radius: 999px;
  background: var(--hl-coral);
}
.hl-music-skin--glass .hl-music-vol::-webkit-slider-thumb {
  box-sizing: border-box;
  background: var(--hl-glass-thumb-bg);
  border: 2px solid var(--hl-coral);
  box-shadow: var(--hl-glass-thumb-glow);
}
.hl-music-skin--glass .hl-music-vol::-moz-range-thumb {
  box-sizing: border-box;
  background: var(--hl-glass-thumb-bg);
  border: 2px solid var(--hl-coral);
  box-shadow: var(--hl-glass-thumb-glow);
}
.hl-music-skin--glass .hl-music-vol:hover::-webkit-slider-thumb {
  transform: scale(1.1);
}
/* 键盘可达性：珊瑚聚焦环 */
.hl-music-skin--glass .hl-music:focus-visible,
.hl-music-skin--glass .hl-music-nav:focus-visible {
  outline: 2px solid var(--hl-coral);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .hl-music-skin--glass .hl-music-ctl--on .hl-music-icon {
    animation: none;
  }
}
@media (max-width: 860px) {
  .hl-music-nav {
    display: none;
  }
  .hl-music-title {
    max-width: 72px;
  }
  .hl-music-vol {
    width: 72px;
  }
}
@media (max-width: 640px) {
  .hl-music-vol {
    display: none !important;
  }
}
</style>
