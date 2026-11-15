// Zernio clone — dédoublonnage des copies SSR/hydratation
document.addEventListener('DOMContentLoaded', () => {
  // 1. sidebar: garder la copie qui contient les items labellisés
  const contents = document.querySelectorAll('[data-sidebar="content"]');
  if (contents.length > 1) {
    const keep = Array.from(contents).find(c => c.querySelector('li a[href*="/dashboard/"] span'));
    contents.forEach(c => {
      if (c === keep) return;
      const fixed = c.closest('div.fixed');
      (fixed || c).remove();
    });
  }
  // 2. dupliqués génériques: éléments avec même data-slot + même texte (cards, sections)
  const seen = new Set();
  document.querySelectorAll('[data-slot="section"]').forEach(s => {
    const key = s.textContent.replace(/\s+/g, ' ').slice(0, 80);
    if (seen.has(key)) s.remove(); else seen.add(key);
  });
});
