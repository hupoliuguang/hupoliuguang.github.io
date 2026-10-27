export type DevlogItem = { date: string; tag?: string; text: string }

export const devlog: DevlogItem[] = [
  { date: '2026-10-27', tag: 'CI', text: '站点重构：VitePress 数字花园上线，接入 GitHub Actions 自动部署' },
  { date: '2026-10-24', tag: '打包', text: 'APK 打包与隐私合规，准备 TapTap 上架与 GitHub Release 分发' },
  { date: '2026-09-18', tag: '开发', text: 'Demo 内容填充：新增技能卡组与水墨战斗特效' },
  { date: '2026-08-02', tag: '技术栈', text: '技术栈定型：Unity 2022.3.55 + VContainer + R3' },
  { date: '2025-11-14', tag: '立项', text: '立项《古代卡牌生存》：水墨国风卡牌原型' }
]
