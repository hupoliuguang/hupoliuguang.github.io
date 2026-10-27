<template>
  <footer class="hl-footer">
    <div class="hl-footer-inner">
      <div class="hl-footer-links">
        <span>© 2026 琥珀流光</span>
        <span class="hl-footer-dot">·</span>
        <a href="https://github.com/hupoliuguang" target="_blank" rel="noopener">GitHub</a>
        <span class="hl-footer-dot">·</span>
        <span>VitePress 驱动</span>
      </div>
      <p class="hl-footer-slogan">慢慢来，比较快。</p>
    </div>
  </footer>
</template>

<style scoped>
.hl-footer {
  margin-top: 56px;
  border-top: 1px solid var(--hl-line);
}
.hl-footer-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 24px 32px;
  text-align: center;
}
.hl-footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  color: var(--hl-weak);
}
.hl-footer-links a {
  color: var(--hl-weak);
  text-decoration: none;
}
.hl-footer-links a:hover {
  color: var(--hl-coral);
}
.hl-footer-dot {
  opacity: 0.6;
}
.hl-footer-slogan {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--hl-weak);
  letter-spacing: 2px;
}
</style>
