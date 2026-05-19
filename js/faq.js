// SSS akordeon — sadece bir öğe açık olur
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-faq-group]').forEach(function (group) {
      const items = group.querySelectorAll('.faq');
      items.forEach(function (faq) {
        const btn = faq.querySelector('.faq-q');
        if (!btn) return;
        btn.addEventListener('click', function () {
          const isOpen = faq.classList.contains('open');
          items.forEach(function (f) { f.classList.remove('open'); });
          if (!isOpen) faq.classList.add('open');
        });
      });
    });
  });
})();
