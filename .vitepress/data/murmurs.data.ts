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
      raw.map(({ url, frontmatter, src }) => {
        const body = stripFrontmatter(src ?? '')
        // 全文纯文本长度 > 150 字视为「值得展开」，覆盖第一段很短但后面还有多段的情况
        const plain = body
          .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
          .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
          .replace(/[*`>#-]/g, '')
          .replace(/\s+/g, ' ')
          .trim()
        // srcExclude 的 murmur 条目 url 带 .html 后缀(按潜在页面路径),需去掉才能对上 JSON 文件名
        const slug = (url.split('/').filter(Boolean).pop() ?? '').replace(/\.html$/, '')
        return {
          date: normalizeDate(frontmatter.date) || dateFromUrl(url),
          text: firstPara(body),
          file: `/murmurs/${slug}.json`,
          long: plain.length > 150
        }
      })
    )
  }
})
