export type ProjectItem = {
  title: string
  desc: string
  date: string
  image?: string
  link?: string
}

export const projects: ProjectItem[] = [
  {
    title: '古代卡牌生存',
    desc: '水墨国风卡牌 RPG，独立开发中',
    date: '2025-11',
    image: '/img/card-survival.webp',
    link: '/tech-notes/ink-visual-language.html'
  },
  {
    title: '更多作品 · 敬请期待',
    desc: '后续会陆续补充其他工具与小项目',
    date: '—'
  }
]
