import { fileURLToPath } from 'node:url'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const types = {
  log: { dir: 'dev-log', file: (date, slug) => `${date}-${slug}.md` },
  note: { dir: 'tech-notes', file: (date, slug) => `${slug}.md` },
  murmur: { dir: 'murmurs', file: (date, slug) => `${date}.md` }
}

const [type, ...rest] = process.argv.slice(2)
const spec = types[type]
if (!spec) {
  console.error('用法: pnpm new:log "标题" [--date YYYY-MM-DD] [--tags "a,b"] / pnpm new:note "标题" [--date YYYY-MM-DD] [--tags "a,b"] / pnpm new:murmur [标题] [--date YYYY-MM-DD]')
  process.exit(1)
}
const tagsIdx = rest.indexOf('--tags')
const tags = tagsIdx >= 0 ? rest.splice(tagsIdx, 2)[1] ?? '' : ''
const dateIdx = rest.indexOf('--date')
const dateArg = dateIdx >= 0 ? rest.splice(dateIdx, 2)[1] ?? '' : ''
const title = rest.join(' ').trim()
if (type !== 'murmur' && !title) {
  console.error(`错误: ${type} 类型必须提供标题，如 pnpm new:${type} "标题"`)
  process.exit(1)
}

const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
const date = dateArg || today
if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(+new Date(date))) {
  console.error('错误: --date 格式应为 YYYY-MM-DD，如 --date 2025-11-14')
  process.exit(1)
}
const slug = title
  .replace(/[\\/:*?"<>|\u0000-\u001f]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '')

const dir = join(root, spec.dir)
mkdirSync(dir, { recursive: true })
const base = spec.file(date, slug)
let name = base
for (let i = 2; existsSync(join(dir, name)); i++) name = base.replace(/\.md$/, `-${i}.md`)

const fm = [`date: ${date}`]
if (title) fm.unshift(`title: ${title}`)
if (tags) fm.push(`tags: [${tags.split(',').map((t) => t.trim()).filter(Boolean).join(', ')}]`)
const content = `---\n${fm.join('\n')}\n---\n\n`

const file = join(dir, name)
writeFileSync(file, content, 'utf-8')
console.log(`已创建: ${file}`)
