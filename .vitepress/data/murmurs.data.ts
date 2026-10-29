import { createContentLoader } from 'vitepress'
import {
  dateFromUrl,
  firstPara,
  normalizeDate,
  sortByDateDesc,
  stripFrontmatter,
  type MurmurItem
} from './content'

declare const data: MurmurItem[]
export { data }

export default createContentLoader('murmurs/*.md', {
  includeSrc: true,
  transform(raw): MurmurItem[] {
    return sortByDateDesc(
      raw.map(({ url, frontmatter, src }) => ({
        date: normalizeDate(frontmatter.date) || dateFromUrl(url),
        text: firstPara(stripFrontmatter(src ?? ''))
      }))
    )
  }
})
