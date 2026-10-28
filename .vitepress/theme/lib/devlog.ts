import { parseMd, firstPara } from './md'

export type DevlogItem = { date: string; tag?: string; text: string }

const rawModules = import.meta.glob('../../../devlog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

export const devlog: DevlogItem[] = Object.entries(rawModules)
  .map(([key, raw]) => {
    const { fm, body } = parseMd(raw)
    const tags = Array.isArray(fm.tags) ? (fm.tags as string[]) : fm.tag ? [fm.tag as string] : []
    return {
      date: (fm.date as string) ?? (key.match(/(\d{4}-\d{2}-\d{2})/) ?? [''])[1],
      tag: tags[0] ?? undefined,
      text: firstPara(body) || body.trim()
    }
  })
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
