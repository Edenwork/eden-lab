(() => {
  const progress = document.getElementById('blogReadingProgress');
  if (!progress) return;

  let ticking = false;

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    progress.style.transform = `scaleX(${value})`;
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('load', requestUpdate);
  updateProgress();
})();
