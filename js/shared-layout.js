(function () {
  const script = document.currentScript;
  if (!script) return;

  const siteRoot = new URL('../', script.src);
  const currentPath = window.location.pathname;
  const isHome = /(?:\/|^)index\.html$/.test(currentPath) ||
    (!currentPath.endsWith('.html') && !currentPath.includes('/blog/') &&
      !currentPath.includes('/case-studies/'));
  const isBlog = /\/blog(?:\/|\.html$)/.test(currentPath);
  const isCaseStudy = currentPath.includes('/case-studies/');

  function siteUrl(path) {
    return new URL(path, siteRoot).href;
  }

  function homeSection(id) {
    return isHome ? `#${id}` : siteUrl(`index.html#${id}`);
  }

  const navItems = [
    { label: 'About', href: homeSection('about'), section: 'about' },
    { label: 'Portfolio', href: homeSection('portfolio'), section: 'portfolio' },
    { label: 'Case Studies', href: homeSection('case-studies'), section: 'case-studies' },
    { label: 'Lab', href: homeSection('lab'), section: 'lab' },
    { label: 'Blog', href: isHome ? '#blog' : siteUrl('blog.html'), section: 'blog' },
    { label: 'Contact', href: homeSection('contact'), section: 'contact', cta: true }
  ];

  function isActive(item) {
    if (isHome) return item.section === 'about';
    if (isBlog) return item.section === 'blog';
    if (isCaseStudy) return item.section === 'case-studies';
    return false;
  }

  function navLink(item, includeActive) {
    const classes = [
      item.cta ? 'eden-site-nav__cta' : '',
      includeActive && isActive(item) ? 'is-active' : ''
    ].filter(Boolean).join(' ');
    const className = classes ? ` class="${classes}"` : '';
    const current = includeActive && isActive(item) ? ' aria-current="page"' : '';
    return `<a${className}${current} href="${item.href}">${item.label}</a>`;
  }

  const primaryNav = document.querySelector('.eden-site-nav');
  if (primaryNav) {
    primaryNav.innerHTML = navItems.map(function (item) {
      return navLink(item, true);
    }).join('');
  }

  const brand = document.querySelector('.eden-site-header__brand');
  if (brand) {
    brand.href = homeSection('about');
  }

  const footer = document.querySelector('.eden-site-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="eden-footer__main">
          <div class="eden-footer__brand">
            <a href="${homeSection('about')}">Eden Design Lab</a>
            <p>Product Designer</p>
          </div>
          <nav aria-label="頁尾導覽" class="eden-footer__nav">
            ${navItems.map(function (item) { return navLink(item, false); }).join('')}
          </nav>
          <div class="eden-footer__links">
            <a href="mailto:s1u3n4@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/eden-c-875745136/"
              rel="noopener noreferrer" target="_blank">LinkedIn</a>
            <a class="eden-footer__resume" download
              href="${siteUrl('eden-product-designer-resume-2026.pdf')}">
              索取履歷 <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div class="eden-footer__bottom">
          <p>Designed and developed by Eden.</p>
          <p>© 2026 All rights reserved.</p>
        </div>
      </div>`;
  }
})();
