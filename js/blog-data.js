(function (window) {
  'use strict';

  const articles = [
    {
      id: 'ai-design-skill-testing',
      file: 'ai-design-skill-testing-2026-07.html',
      category: 'AI Product Design',
      categoryClass: 'purple',
      title: '我做了 10 次 AI 設計 Skill 測試，才發現真正難的不是寫提示詞',
      description: '從公司設計技能（Company Design Skill）的 10 次實測，整理如何讓 AI 不只做出完整介面，而是真正理解品牌、產品情境與產業工作流程。',
      date: '2026.07',
      type: 'Design Notes',
      image: 'images/blog-img-01.jpg',
      imageAlt: 'AI 設計 Skill 測試與設計筆記',
      topics: ['AI & Product Design', 'Design Systems', 'Design to Development']
    },
    ,
    {
      id: 'sustainable-design',
      file: 'ai-platform-2026-07.html',
      category: 'Sustainable Design',
      categoryClass: 'green',
      title: '如何在設計中思考永續發展？',
      description: '從銀行空間、開源科技、服裝消費與玻璃回收，整理四個創造永續價值的設計案例。',
      date: '2024.03',
      type: 'Design Thinking',
      image: 'https://i0.wp.com/blog.comma-design.com/wp-content/uploads/2024/03/SDG-20240305.jpg?fit=1163%2C625&ssl=1',
      imageAlt: '永續設計與 SDGs 案例分析',
      topics: ['Design Reading Notes']
    },
    {
      id: 'seo-generative-ai',
      file: 'seo-generative-ai-2024-01.html',
      category: 'SEO & Generative AI',
      categoryClass: 'pink',
      title: '2023 年 SEO 回顧：生成式 AI 之年',
      description: '從 Google SGE、Bard、AI 內容農場到 Bing Copilot，回顧生成式 AI 如何改變搜尋與 SEO。',
      date: '2024.01',
      type: 'SEO & AI',
      image: 'https://i0.wp.com/blog.comma-design.com/wp-content/uploads/2024/01/SEO-20240121-3.jpg?fit=1163%2C626&ssl=1',
      imageAlt: '2023 年 SEO 回顧：生成式 AI 之年',
      topics: ['Design to Development', 'Design Reading Notes']
    },
    {
      id: 'ai-design-trends',
      file: 'ai-design-trends-2024-01.html',
      category: 'AI & Design',
      categoryClass: 'green',
      title: '2024 年設計師需要了解的 AI 設計趨勢',
      description: '從提示設計、AI 工具到角色轉變，整理設計師面對生成式 AI 時值得建立的工作方法。',
      date: '2024.01',
      type: 'AI & Design',
      image: 'https://i0.wp.com/blog.comma-design.com/wp-content/uploads/2024/01/AI-20240107.jpg?fit=1163%2C627&ssl=1',
      imageAlt: '2024 年設計師需要了解的 AI 設計趨勢',
      topics: ['AI & Product Design', 'Design Reading Notes']
    },
    {
      id: 'enterprise-ai-platform',
      file: 'enterprise-ai-platform-2026-07.html',
      category: 'AI Product Design',
      categoryClass: 'purple',
      title: '如何從企業需求定義 AI Platform 的產品架構',
      description: '從商業目標、使用情境到資訊架構，整理企業 AI 產品早期規劃的思考方式。',
      date: '2026.07',
      type: 'Design Notes',
      image: 'images/group-img-5.jpg',
      imageAlt: '企業 AI Platform 產品架構設計筆記',
      topics: ['AI & Product Design']
    },
    {
      id: 'ai-platform-design-system',
      file: 'ai-platform-2026-08.html',
      category: 'Design System',
      categoryClass: 'purple',
      title: 'Design System for AI Platform：從單一功能走向可擴充系統',
      description: '整理元件、AI 互動模式與開發協作，讓平台在新增功能時仍維持一致與可維護性。',
      date: '2026.08',
      type: 'Design Notes',
      image: 'images/group-img-18.jpg',
      imageAlt: 'AI Platform Design System 設計筆記',
      topics: ['Design Systems', 'Design to Development']
    }
  ];

  function isExternal(path) {
    return /^(?:https?:)?\/\//.test(path);
  }

  window.EdenBlog = {
    articles: articles,
    homeHref: function (article) {
      return 'blog/' + article.file;
    },
    articleHref: function (article) {
      return article.file;
    },
    homeImage: function (article) {
      return article.image;
    },
    articleImage: function (article) {
      return isExternal(article.image) ? article.image : '../' + article.image;
    }
  };
})(window);
