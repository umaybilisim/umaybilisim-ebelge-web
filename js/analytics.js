// Google Analytics 4 - yalnızca çerez onayı verildiyse yüklenir (KVKK)
(function () {
  'use strict';
  const ID = 'G-VSWYNYFZG5';
  const KEY = 'umay-cookie';
  let loaded = false;      // ölçüm etkin mi (rıza var)
  let scriptAdded = false; // gtag.js sayfaya eklendi mi

  function load() {
    loaded = true;
    window['ga-disable-' + ID] = false;
    if (scriptAdded) return;
    scriptAdded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ID);
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
  }

  // Rıza geri alındı: ölçümü durdur ve GA çerezlerini sil
  function stop() {
    window['ga-disable-' + ID] = true;
    loaded = false;
    const host = location.hostname;
    const domains = [host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    document.cookie.split(';').forEach(function (c) {
      const name = c.split('=')[0].trim();
      if (!/^_ga(_|$)/.test(name) && name !== '_gid' && name !== '_gat') return;
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

  // Iletisim formu gonderimi: generate_lead
  document.addEventListener('umay-lead', function (e) {
    if (!loaded) return;
    window.gtag('event', 'generate_lead', {
      method: (e.detail && e.detail.method) || 'form',
      form_id: 'contact-form',
      transport_type: 'beacon'
    });
  });

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
