# Obsidian 知识库操作指南

这套流程里,Obsidian 是你**唯一的内容入口**——新增、修改、删除、发布全部在里面完成,不用碰命令行和 VS Code。

## 日常三件事

### 1. 新建笔记
`Ctrl+P` → 输入 `template` → 选 **Templater: Create new note from template** → 选类型:

| 模板 | 存到 | 只输标题,自动生成 |
|---|---|---|
| tech-note | `tech-notes/` | `2026-11-03-标题.md` + frontmatter |
| dev-log | `dev-log/` | `2026-11-03-标题.md` + frontmatter |
| murmur | `murmurs/` | `2026-11-03.md` + frontmatter |

- 标题弹窗输入,日期自动填今天(补历史日期请用 `pnpm new:* --date`)
- 同日同名自动加 `-2` 后缀
- 写完正文第一段会被自动当作网站上的摘要

### 2. 修改 / 删除
- 修改:直接打开笔记编辑,`Ctrl+S` 保存
- 删除:文件列表右键 → 删除

### 3. 同步发布(关键一步)
改完任何内容后:`Ctrl+P` → 输入 `commit` → 选 **Obsidian Git: Commit-and-sync**

一条命令完成:本地提交 → 推送到 GitHub → 网站自动重新构建发布。
想省掉这一步,可以在 Obsidian Git 插件设置里开启"定时自动备份"。

## 图片

直接粘贴截图/拖入图片 → 自动存到 `public/img/`,链接自动用绝对路径(`/img/xxx.png`),网站渲染兼容,无需手动处理。

## 首次使用(新设备)

1. 安装 Obsidian,打开仓库文件夹作为 vault
2. 设置 → 第三方插件:允许社区插件;一键安装缺失的 **Obsidian Git** 和 **Templater**
3. Templater 设置 → 模板文件夹设为 `templates`
4. 外观设置:从主题市场安装 `AnuPpuccin` 或 `Minimal`(appearance.json 已指定)
5. 系统安装 Git 并加入 PATH

## 内容规范速查

- frontmatter 字段统一:`title` / `date` / `tags`;date 全部必填,title 碎碎念可留空,tags 可选
- 文件名统一带日期:`YYYY-MM-DD-主题.md`
- 详细规范见 `examples/content-template.md`
