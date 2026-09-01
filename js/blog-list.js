(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderHomeCard(article) {
    const href = window.EdenBlog.homeHref(article);
    const image = window.EdenBlog.homeImage(article);

    return '<div class="news-section-swiper__slide news-section-slide swiper-slide">' +
      '<a class="news-section-slide__card card eden-blog-card" href="' + escapeHtml(href) + '" aria-label="閱讀：' + escapeHtml(article.title) + '">' +
        '<div class="card__inner">' +
          '<div class="card-box__poster">' +
            '<img alt="' + escapeHtml(article.imageAlt || article.title) + '" class="card-box__poster-img" src="' + escapeHtml(image) + '">' +
          '</div>' +
          '<p class="card__suptext card__suptext--' + escapeHtml(article.categoryClass || 'purple') + '">' + escapeHtml(article.category) + '</p>' +
          '<h3 class="card__title">' + escapeHtml(article.title) + '</h3>' +
          '<p class="card__description">' + escapeHtml(article.description) + '</p>' +
          '<ul class="card__list card-list">' +
            '<li class="card-list__item"><p class="card-list__text">' + escapeHtml(article.date) + '</p></li>' +
            '<li class="card-list__item"><p class="card-list__text">' + escapeHtml(article.type) + '</p></li>' +
          '</ul>' +
        '</div>' +
      '</a>' +
    '</div>';
  }

  function renderGenericCard(article) {
    const href = window.EdenBlog.homeHref(article);
    const image = window.EdenBlog.homeImage(article);

    return '<article class="eden-blog-list__item">' +
      '<a class="eden-related-card eden-blog-grid-card" href="' + escapeHtml(href) + '" aria-label="閱讀：' + escapeHtml(article.title) + '">' +
        '<div class="eden-related-card__image-wrap"><img class="eden-related-card__image" src="' + escapeHtml(image) + '" alt="' + escapeHtml(article.imageAlt || article.title) + '"></div>' +
        '<div class="eden-related-card__content">' +
          '<p class="eden-related-card__category">' + escapeHtml(article.category) + '</p>' +
          '<h3>' + escapeHtml(article.title) + '</h3>' +
          '<p class="eden-related-card__description">' + escapeHtml(article.description) + '</p>' +
          '<div class="eden-blog-grid-card__meta">' +
            '<p class="eden-related-card__date">' + escapeHtml(article.date) + ' · ' + escapeHtml(article.type) + '</p>' +
            '<span aria-hidden="true">↗</span>' +
          '</div>' +
        '</div>' +
      '</a>' +
    '</article>';
  }

  function setupAllArticles(mount, articles) {
    const filterButtons = Array.from(document.querySelectorAll('[data-blog-filter]'));
    const resultCount = document.querySelector('[data-blog-result-count]');
    const loadMoreButton = document.querySelector('[data-blog-load-more]');
    const pageSize = Math.max(1, Number(mount.dataset.pageSize) || 6);
    let activeFilter = 'all';
    let visibleCount = pageSize;

    function matchesFilter(article) {
      return activeFilter === 'all' ||
        (Array.isArray(article.topics) && article.topics.includes(activeFilter));
    }

    function render() {
      const filteredArticles = articles.filter(matchesFilter);
      const visibleArticles = filteredArticles.slice(0, visibleCount);

      mount.innerHTML = visibleArticles.map(renderGenericCard).join('');

      if (resultCount) {
        resultCount.textContent = '共 ' + filteredArticles.length + ' 篇文章';
      }

      if (loadMoreButton) {
        const hasMore = visibleArticles.length < filteredArticles.length;
        loadMoreButton.hidden = !hasMore;
        loadMoreButton.setAttribute('aria-hidden', String(!hasMore));
      }
    }

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeFilter = button.dataset.blogFilter || 'all';
        visibleCount = pageSize;

        filterButtons.forEach(function (item) {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });

        render();
      });
    });

    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', function () {
        visibleCount += pageSize;
        render();
      });
    }

    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.EdenBlog || !Array.isArray(window.EdenBlog.articles)) return;

    document.querySelectorAll('[data-blog-list]').forEach(function (mount) {
      if (mount.dataset.blogList === 'home') {
        mount.innerHTML = window.EdenBlog.articles.map(renderHomeCard).join('');
        return;
      }

      if (mount.dataset.blogList === 'all') {
        setupAllArticles(mount, window.EdenBlog.articles);
        return;
      }

      mount.innerHTML = window.EdenBlog.articles.map(renderGenericCard).join('');
    });
  });
})();
