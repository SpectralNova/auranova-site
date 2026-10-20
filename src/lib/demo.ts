// Shared controller for animated demos ([data-demo]): they play only while on screen, every one has a
// pause button (WCAG 2.2.2), and nothing plays with prefers-reduced-motion (the CSS shows the final frame).
// The button's label says what it will do ("Pausar…" / "Reproducir…"), so it carries no aria-pressed.
export function initDemos(): void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll<HTMLElement>('[data-demo]').forEach((root) => {
    if (root.dataset.demoReady) return;
    root.dataset.demoReady = 'true';
    const toggle = root.querySelector<HTMLButtonElement>('.demo-toggle');
    let userPaused = reduce;
    let visible = false;
    const sync = () => {
      root.dataset.playing = String(visible && !userPaused);
      if (toggle) {
        toggle.dataset.paused = String(userPaused);
        toggle.setAttribute('aria-label', (userPaused ? toggle.dataset.play : toggle.dataset.pause) ?? '');
      }
    };
    if (reduce) toggle?.setAttribute('hidden', '');
    toggle?.addEventListener('click', () => {
      userPaused = !userPaused;
      sync();
    });
    // Any visible pixel counts: tall demos (the roadmap) never reach a larger threshold on short screens.
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }).observe(root);
    sync();
  });
}
