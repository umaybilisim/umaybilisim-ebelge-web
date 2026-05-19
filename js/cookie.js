// KVKK Cookie banner
(function () {
  'use strict';
  const KEY = 'umay-cookie';
  document.addEventListener('DOMContentLoaded', function () {
    const banner = document.querySelector('[data-cookie]');
    if (!banner) return;
    if (localStorage.getItem(KEY)) return;
    setTimeout(function () { banner.classList.add('show'); }, 800);

    banner.querySelectorAll('[data-cookie-accept]').forEach(function (b) {
      b.addEventListener('click', function () {
        localStorage.setItem(KEY, 'accepted');
        banner.classList.remove('show');
      });
    });
    banner.querySelectorAll('[data-cookie-reject]').forEach(function (b) {
      b.addEventListener('click', function () {
        localStorage.setItem(KEY, 'rejected');
        banner.classList.remove('show');
      });
    });
  });
})();
