export type ParsedFm = Record<string, string | string[]>

export function parseMd(raw: string): { fm: ParsedFm; body: string } {
  const fm: ParsedFm = {}
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const kv = /^(\w+):\s*(.*)$/.exec(line.trim())
      if (!kv) continue
      const key = kv[1]
      let value = kv[2].trim()
      if (value.startsWith('[') && value.endsWith(']')) {
        fm[key] = value
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      } else {
        fm[key] = value.replace(/^['"]|['"]$/g, '')
      }
    }
  }
  const body = raw.replace(/^---[\s\S]*?\n---\r?\n?/, '')
  return { fm, body }
}

export function firstPara(body: string): string {
  const p = body
    .split(/\r?\n\r?\n|\n\n/)
    .find((x) => x.trim() && !x.startsWith('#') && !x.startsWith('>') && !x.startsWith('```'))
  return p ? p.replace(/[*`>#]/g, '').trim() : ''
}
