// Pointer parallax for hero backgrounds: writes --px/--py (−1…1) on each [data-parallax] element,
// relative to its parent; CSS turns them into a small translate. Mouse/trackpad only (fine pointers),
// never with prefers-reduced-motion, at most once per frame.
export function initPointerParallax(): void {
  const fine = window.matchMedia('(pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const host = el.parentElement;
    if (!host || el.dataset.parallaxReady) return;
    el.dataset.parallaxReady = 'true';
    let frame = 0;
    host.addEventListener('pointermove', (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        frame = 0;
      });
    });
    host.addEventListener('pointerleave', () => {
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    });
  });
}
