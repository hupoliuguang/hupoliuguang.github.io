---
title: <%* 
  const title = await tp.system.prompt("标题（可留空）", "");
  tR += title
%>
date: <% tp.date.now("YYYY-MM-DD") %>
tags: []
---

（一句吐槽 / 感叹 / 生活碎片，不用正经）

<%*
  const date = tp.date.now("YYYY-MM-DD")
  let name = date
  let i = 2
  while (tp.file.find_tfile(`${name}.md`)) { name = `${date}-${i}`; i++ }
  await tp.file.rename(name)
%>
