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

  document.addEventListener('DOMContentLoaded', function () {
    const mount = document.querySelector('.eden-related-blog');
    if (!mount || !window.EdenBlog || !Array.isArray(window.EdenBlog.articles)) return;

    const currentArticle = mount.dataset.currentArticle || '';
    const otherArticles = window.EdenBlog.articles.filter(function (article) {
      return article.id !== currentArticle;
    });

    const cards = otherArticles.map(function (article) {
      return '<div class="eden-related__slide swiper-slide">' +
        '<a class="eden-related-card" href="' + escapeHtml(window.EdenBlog.articleHref(article)) + '" aria-label="閱讀：' + escapeHtml(article.title) + '">' +
          '<div class="eden-related-card__image-wrap">' +
            '<img class="eden-related-card__image" src="' + escapeHtml(window.EdenBlog.articleImage(article)) + '" alt="' + escapeHtml(article.imageAlt || article.title) + '">' +
          '</div>' +
          '<div class="eden-related-card__content">' +
            '<p class="eden-related-card__category">' + escapeHtml(article.category) + '</p>' +
            '<h3>' + escapeHtml(article.title) + '</h3>' +
            '<p class="eden-related-card__description">' + escapeHtml(article.description) + '</p>' +
            '<p class="eden-related-card__date">' + escapeHtml(article.date) + '</p>' +
          '</div>' +
        '</a>' +
      '</div>';
    }).join('');

    mount.innerHTML =
      '<section class="eden-related" aria-labelledby="edenRelatedTitle">' +
        '<div class="eden-related__inner">' +
          '<div class="eden-related__header">' +
            '<div><p class="eden-related__eyebrow">More Articles</p><h2 id="edenRelatedTitle">看更多文章</h2></div>' +
          '</div>' +
          '<div class="eden-related__carousel">' +
            '<button class="eden-related__button eden-related__button--prev" type="button" aria-label="查看上一篇文章">←</button>' +
            '<div class="eden-related__swiper swiper"><div class="swiper-wrapper">' + cards + '</div></div>' +
            '<button class="eden-related__button eden-related__button--next" type="button" aria-label="查看下一篇文章">→</button>' +
          '</div>' +
        '</div>' +
      '</section>';

    if (typeof Swiper === 'undefined') return;

    const slider = mount.querySelector('.eden-related__swiper');
    const prevButton = mount.querySelector('.eden-related__button--prev');
    const nextButton = mount.querySelector('.eden-related__button--next');

    new Swiper(slider, {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 20,
      grabCursor: true,
      watchOverflow: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      navigation: {
        prevEl: prevButton,
        nextEl: nextButton
      },
      breakpoints: {
        300: { slidesPerView: 1.2, spaceBetween: 14 },
        640: { slidesPerView: 2, spaceBetween: 18 },
        1024: { slidesPerView: 3, spaceBetween: 20 }
      }
    });
  });
})();
