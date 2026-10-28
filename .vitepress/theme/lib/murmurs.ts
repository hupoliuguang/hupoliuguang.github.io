import { parseMd, firstPara } from './md'

export type MurmurItem = { date: string; text: string }

const rawModules = import.meta.glob('../../../murmurs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

export const murmurs: MurmurItem[] = Object.entries(rawModules)
  .map(([key, raw]) => {
    const { fm, body } = parseMd(raw)
    return {
      date: (fm.date as string) ?? (key.match(/(\d{4}-\d{2}-\d{2})/) ?? [''])[1],
      text: firstPara(body) || body.trim()
    }
  })
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
