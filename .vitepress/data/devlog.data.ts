import { createContentLoader } from 'vitepress'
import {
  dateFromUrl,
  firstPara,
  normalizeDate,
  sortByDateDesc,
  stripFrontmatter,
  type DevlogItem
} from './content'

declare const data: DevlogItem[]
export { data }

export default createContentLoader('dev-log/*.md', {
  includeSrc: true,
  transform(raw): DevlogItem[] {
    return sortByDateDesc(
      raw.map(({ url, frontmatter, src }) => {
        const tags = Array.isArray(frontmatter.tags)
          ? (frontmatter.tags as string[])
          : frontmatter.tag
            ? [frontmatter.tag as string]
            : []
        return {
          date: normalizeDate(frontmatter.date) || dateFromUrl(url),
          tag: tags[0],
          text: firstPara(stripFrontmatter(src ?? '')),
          url
        }
      })
    )
  }
})
