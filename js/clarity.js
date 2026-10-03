// Microsoft Clarity - yalnızca çerez onayı verildiyse yüklenir (KVKK)
(function () {
  'use strict';
  const ID = 'yrt2ho1mkm';
  const KEY = 'umay-cookie';
  let scriptAdded = false;

  function load() {
    if (scriptAdded) return;
    scriptAdded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', ID);
  }

  // Rıza geri alındı: ölçümü durdur ve Clarity çerezlerini sil
  function stop() {
    if (window.clarity) window.clarity('stop');
    const host = location.hostname;
    const domains = [host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    document.cookie.split(';').forEach(function (c) {
      const name = c.split('=')[0].trim();
      if (!/^_clck|^_clsk/.test(name)) return;
      const expired = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = expired;
      domains.forEach(function (d) { document.cookie = expired + '; domain=' + d; });
    });
  }

  try {
    const choice = localStorage.getItem(KEY);
    if (choice === 'accepted') load();
    else if (choice === 'rejected') stop();
  } catch (e) { /* localStorage erişilemez: izleme yok */ }

  document.addEventListener('umay-cookie-accepted', load);
  document.addEventListener('umay-cookie-rejected', stop);
})();
