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

  // Iletisim tiklamalari: WhatsApp (whatsapp_click), telefon/e-posta (contact_click)
  document.addEventListener('click', function (e) {
    if (!loaded || !e.target.closest) return;
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const params = { link_url: href, transport_type: 'beacon' };
    let name;
    if (href.indexOf('https://wa.me/') === 0) {
      name = 'whatsapp_click';
      params.link_location = a.closest('.fab-whatsapp, .fab-whatsapp-bubble') ? 'fab' : 'page';
    } else if (href.indexOf('tel:') === 0) {
      name = 'contact_click';
      params.method = 'phone';
    } else if (href.indexOf('mailto:') === 0) {
      name = 'contact_click';
      params.method = 'email';
    } else {
      return;
    }
    window.gtag('event', name, params);
  });
})();
