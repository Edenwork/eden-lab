(() => {
  const progress = document.getElementById('readingProgress');
  const backToTop = document.getElementById('backToTop');
  const tocLinks = Array.from(document.querySelectorAll('.case-toc a[href^="#"]'));
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const updatePageState = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${value}%`;

    const readingLine = window.scrollY + window.innerHeight * 0.42;
    let activeId = sections[0]?.id;

    sections.forEach((section) => {
      if (section.offsetTop <= readingLine) activeId = section.id;
    });

    tocLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    backToTop?.classList.toggle('is-visible', window.scrollY > 480);
  };

  document.querySelectorAll('#caseNavbar a').forEach((link) => {
    link.addEventListener('click', () => {
      const collapseElement = document.getElementById('caseNavbar');
      if (!collapseElement || !collapseElement.classList.contains('show')) return;
      const collapse = bootstrap.Collapse.getOrCreateInstance(collapseElement);
      collapse.hide();
    });
  });

  backToTop?.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', updatePageState, { passive: true });
  window.addEventListener('resize', updatePageState);
  updatePageState();
})();
