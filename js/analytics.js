// Google Analytics 4 - yalnızca çerez onayı verildiyse yüklenir (KVKK)
(function () {
  'use strict';
  const ID = 'G-VSWYNYFZG5';
  const KEY = 'umay-cookie';
  let loaded = false;

  function load() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ID);
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
  }

  try {
    if (localStorage.getItem(KEY) === 'accepted') load();
  } catch (e) { /* localStorage erişilemez: izleme yok */ }

  document.addEventListener('umay-cookie-accepted', load);
})();
