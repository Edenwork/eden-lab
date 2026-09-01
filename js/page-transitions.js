(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const overlay = document.getElementById('edenIntro');
  if (!overlay) return;

  let navigating = false;

  function revealPage(delay) {
    if (reduceMotion) {
      overlay.classList.add('is-complete');
      return;
    }
    window.setTimeout(function () {
      overlay.classList.add('is-complete');
    }, delay);
  }

  function isPageLink(link, event) {
    if (!link || event.defaultPrevented || event.button !== 0) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download') || link.dataset.fancybox !== undefined) return false;

    const rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.charAt(0) === '#') return false;
    if (/^(mailto:|tel:|javascript:)/i.test(rawHref)) return false;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return false;
    if (destination.pathname === window.location.pathname && destination.search === window.location.search) return false;
    return true;
  }

  function coverPage(destination) {
    if (navigating) return;
    navigating = true;
    document.body.classList.add('eden-page-leaving');
    overlay.classList.add('is-preparing');
    overlay.classList.remove('is-complete', 'is-covering', 'is-returning');
    void overlay.offsetHeight;
    overlay.classList.remove('is-preparing');
    overlay.classList.add('is-covering');

    window.setTimeout(function () {
      window.location.href = destination;
    }, reduceMotion ? 0 : 760);
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!isPageLink(link, event)) return;
    event.preventDefault();
    coverPage(link.href);
  });

  window.addEventListener('pageshow', function (event) {
    navigating = false;
    document.body.classList.remove('eden-page-leaving');

    if (event.persisted && !reduceMotion) {
      overlay.classList.remove('is-complete', 'is-covering', 'is-preparing');
      overlay.classList.add('is-returning');
      void overlay.offsetHeight;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          overlay.classList.remove('is-returning');
          overlay.classList.add('is-complete');
        });
      });
    }
  });

  revealPage(1150);
})();
