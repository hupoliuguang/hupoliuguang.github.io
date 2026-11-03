import { defineConfig } from 'vitepress'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import MarkdownIt from 'markdown-it'

// 背景音乐自动扫描：public/audio/ 拖入音频即加入播放列表，无需改代码
const __dirname = dirname(fileURLToPath(import.meta.url))
const AUDIO_DIR = join(__dirname, '../public/audio')
const MANIFEST_PATH = join(__dirname, '../public/audio-manifest.json')
const AUDIO_EXT = /\.(mp3|m4a|ogg|wav|flac)$/i

function scanAudio() {
  if (!existsSync(AUDIO_DIR)) return
  const manifest = readdirSync(AUDIO_DIR)
    .filter((f) => AUDIO_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, 'zh-CN'))
    .map((f) => {
      // 曲名 = 文件名去扩展名，连字符/下划线转空格，首字母大写
      const name = f.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
      return {
        title: name.charAt(0).toUpperCase() + name.slice(1),
        file: `/audio/${f}`
      }
    })
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')
}

// dev 与 build 启动时立即生成清单；并 watch 音频目录，增删文件后自动重建
function scanAudioPlugin(): Plugin {
  return {
    name: 'hl-scan-audio-manifest',
    buildStart() {
      scanAudio()
      this.addWatchFile(AUDIO_DIR)
    }
  }
}

// 碎碎念全文预渲染：murmurs/*.md → public/murmurs/<文件名>.json（含 HTML）。
// 时间线「展开」时前端按需 fetch 这一份 JSON，列表页不一次加载全部全文。
// public/ 会被原样复制进 dist，dev 与 build 都能访问
const MURMUR_DIR = join(__dirname, '../murmurs')
const MURMUR_JSON_DIR = join(__dirname, '../public/murmurs')

function buildMurmurJson() {
  if (!existsSync(MURMUR_DIR)) return
  mkdirSync(MURMUR_JSON_DIR, { recursive: true })
  const md = new MarkdownIt({ html: false, linkify: true, breaks: true })
  for (const f of readdirSync(MURMUR_DIR)) {
    if (!f.endsWith('.md')) continue
    const raw = readFileSync(join(MURMUR_DIR, f), 'utf-8')
    const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
    const slug = f.replace(/\.md$/, '')
    writeFileSync(
      join(MURMUR_JSON_DIR, `${slug}.json`),
      JSON.stringify({ html: md.render(body) }),
      'utf-8'
    )
  }
}

function murmurJsonPlugin(): Plugin {
  return {
    name: 'hl-build-murmur-json',
    buildStart() {
      buildMurmurJson()
      this.addWatchFile(MURMUR_DIR)
    }
  }
}

scanAudio()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "琥珀流光的数字花园",
  description: "独立游戏开发 / 开发日志 / 技术沉淀",
  lang: 'zh-CN',
  // examples/ 里的示例 md 仅作写作参考（AI 模板）；templates/ 是 Obsidian 模板（含 Templater 语法，不进构建）；
  // murmurs/ 是时间线数据源，条目只在碎碎念页按时间线展示，不生成独立详情页；dev-log/ 与 tech-notes/ 会生成独立详情页
  srcExclude: ['examples/**', 'murmurs/**', 'templates/**', 'README.md'],
  lastUpdated: true,
  vite: {
    plugins: [scanAudioPlugin(), murmurJsonPlugin()]
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        // 开发日志正文没有 # 标题时，补一个虚拟 H1，否则整篇不会被搜索索引收录
        async _render(src: string, env: any, md: any) {
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          if (!/<h1[\s>]/.test(html) && env.frontmatter?.title) {
            return md.render(`# ${env.frontmatter.title}`) + html
          }
          return html
        },
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 6, text: 2, titles: 3 }
          }
        },
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '开发日志', link: '/dev-log' },
      { text: '技术思考', link: '/tech-notes' },
      { text: '世界碎碎念', link: '/world-murmur' }
    ],
    outline: { label: '本页目录', level: [2, 3] },
    lastUpdated: { text: '最后更新于' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: {
      message: '慢慢来，比较快。',
      copyright: '© 2026 琥珀流光 · GitHub · VitePress 驱动'
    }
  }
})
