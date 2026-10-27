<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 背景音乐来源：后续提供（public/audio/ 本地文件或远程流式 URL）；留空 = 占位开关
const AUDIO_URL = ''
const muted = ref(true)
const audioEl = ref<HTMLAudioElement | null>(null)

onMounted(() => {
  muted.value = localStorage.getItem('hl-music-muted') !== '0'
})

function toggle() {
  if (!AUDIO_URL) return
  if (muted.value) {
    audioEl.value?.play()
  } else {
    audioEl.value?.pause()
  }
  muted.value = !muted.value
  localStorage.setItem('hl-music-muted', muted.value ? '1' : '0')
}
</script>

<template>
  <div class="hl-music-wrap">
    <audio v-if="AUDIO_URL" ref="audioEl" :src="AUDIO_URL" preload="none" loop />
    <button
      class="hl-music"
      :class="{ 'hl-music--muted': muted }"
      :title="AUDIO_URL ? (muted ? '播放背景音乐' : '关闭背景音乐') : '音乐待接入'"
      aria-label="背景音乐开关"
      @click="toggle"
    >
      <span class="hl-music-icon">♪</span>
      <span class="hl-music-text">轻音乐</span>
    </button>
  </div>
</template>

<style scoped>
.hl-music-wrap {
  margin-left: 10px;
}
.hl-music {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 14px;
  border: none;
  border-radius: 999px;
  background: #fff;
  color: var(--hl-text);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  box-shadow: var(--hl-shadow-sm);
  transition: transform 0.2s ease, opacity 0.2s ease;
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
html.dark .hl-music {
  background: var(--vp-c-bg-soft);
}
</style>
