// Dark mode — sayfa render olmadan tema uygula (FOUC önler)
(function () {
  'use strict';
  const STORAGE_KEY = 'umay-theme';
  function apply(theme) {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
  function preferred() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  apply(preferred());

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelectorAll('[data-theme-toggle]');
    toggle.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        apply(next);
        localStorage.setItem(STORAGE_KEY, next);
        if (window.lucide) window.lucide.createIcons();
      });
    });
  });
})();
