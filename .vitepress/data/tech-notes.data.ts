import { createContentLoader } from 'vitepress'
import {
  firstPara,
  normalizeDate,
  sortByDateDesc,
  stripFrontmatter,
  type TechNoteItem
} from './content'

declare const data: TechNoteItem[]
export { data }

/** 从渲染后的 HTML 里取二级标题，锚点直接用 VitePress 生成的真实 id */
function parseHeadings(html: string) {
  return [...html.matchAll(/<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)]
    .slice(0, 6)
    .map((m) => ({
      anchor: m[1],
      text: m[2].replace(/<[^>]+>/g, '').trim()
    }))
}

export default createContentLoader('tech-notes/*.md', {
  includeSrc: true,
  render: true,
  transform(raw): TechNoteItem[] {
    return sortByDateDesc(
      raw.map(({ url, frontmatter, src, html }) => ({
        url,
        title: String(frontmatter.title ?? ''),
        date: normalizeDate(frontmatter.date),
        tags: Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [],
        excerpt: firstPara(stripFrontmatter(src ?? ''), 120),
        headings: parseHeadings(html ?? '')
      }))
    )
  }
})
