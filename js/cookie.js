// KVKK Cookie banner + "Çerez Tercihleri" bağlantısı (rıza geri alınabilir)
(function () {
  'use strict';
  const KEY = 'umay-cookie';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* localStorage erişilemez */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const banner = document.querySelector('[data-cookie]');
    if (!banner) return;

    // Daha önce seçim yapılmadıysa banner'ı göster
    if (!stored()) setTimeout(function () { banner.classList.add('show'); }, 800);

    banner.querySelectorAll('[data-cookie-accept]').forEach(function (b) {
      b.addEventListener('click', function () {
        store('accepted');
        document.dispatchEvent(new Event('umay-cookie-accepted'));
        banner.classList.remove('show');
      });
    });
    banner.querySelectorAll('[data-cookie-reject]').forEach(function (b) {
      b.addEventListener('click', function () {
        store('rejected');
        document.dispatchEvent(new Event('umay-cookie-rejected'));
        banner.classList.remove('show');
      });
    });

    // Alt bilgideki "Çerez Tercihleri" bağlantısı: seçimi yeniden yapmak için banner'ı açar
    document.querySelectorAll('[data-cookie-settings]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        banner.classList.add('show');
      });
    });
  });
})();
