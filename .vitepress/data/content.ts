export type DevlogItem = { date: string; tag?: string; text: string; url: string }
export type MurmurItem = { date: string; text: string }
export type TechNoteItem = {
  url: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  headings: { text: string; anchor: string }[]
}

export function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string' && value.trim()) return value.trim()
  return ''
}

/** 文件名兜底取日期，如 2026-10-27-站点重构.html */
export function dateFromUrl(url: string): string {
  return url.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? ''
}

export function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

/** 取正文第一段纯文本，顺带去掉标题、围栏代码和常见 markdown 标记 */
export function firstPara(body: string, max = 0): string {
  const p = body
    .split(/\r?\n\r?\n|\n\n/)
    .find(
      (x) =>
        x.trim() &&
        !x.trimStart().startsWith('#') &&
        !x.trimStart().startsWith('>') &&
        !x.trimStart().startsWith('```')
    )
  if (!p) return ''
  const text = p
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*`>#]/g, '')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
  return max > 0 ? text.slice(0, max) : text
}

export function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return items.sort((a, b) => +new Date(b.date) - +new Date(a.date))
}
