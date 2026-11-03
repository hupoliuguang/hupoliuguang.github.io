---
title: <%* 
  const title = await tp.system.prompt("标题");
  tR += title
%>
date: <% tp.date.now("YYYY-MM-DD") %>
tags: [<%* 
  const tags = await tp.system.prompt("标签，用逗号分隔");
  tR += tags
%>]
---

（第一段写摘要，技术思考页的预览卡会自动取用）

## 背景

## 踩过的坑

## 结论

<%*
  const slug = title.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  const date = tp.date.now("YYYY-MM-DD")
  let name = `${date}-${slug}`
  let i = 2
  while (tp.file.find_tfile(`${name}.md`)) { name = `${date}-${slug}-${i}`; i++ }
  await tp.file.rename(name)
%>
