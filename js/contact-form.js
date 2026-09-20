// Iletisim formu: veri sunucuya gitmez; mesaj WhatsApp veya e-posta ile hazirlanir
(function () {
  'use strict';
  const form = document.getElementById('contact-form');
  if (!form) return;
  const WA = '908507771145';
  const MAIL = 'bilgi@umaybilisim.com.tr';
  const errBox = form.querySelector('[data-form-error]');
  const noteBox = form.querySelector('[data-form-note]');

  function value(name) { return (form.elements[name].value || '').trim(); }

  function fail(field, msg) {
    field.setAttribute('aria-invalid', 'true');
    errBox.textContent = msg;
    field.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); });
    errBox.textContent = '';
    noteBox.textContent = '';

    const name = value('name');
    const email = value('email');
    const company = value('company');
    const message = value('message');

    if (!name) return fail(form.elements.name, 'Lütfen adınızı ve soyadınızı yazın.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(form.elements.email, 'Lütfen geçerli bir e-posta adresi yazın.');
    if (!message) return fail(form.elements.message, 'Lütfen mesajınızı yazın.');
    if (!form.elements.kvkk.checked) return fail(form.elements.kvkk, 'Devam etmek için KVKK metnini onaylamanız gerekir.');

    const channel = (e.submitter && e.submitter.value) === 'email' ? 'email' : 'whatsapp';
    const lines = [
      'Merhaba, web sitenizden yazıyorum.',
      'Ad Soyad: ' + name,
      'E-posta: ' + email
    ];
    if (company) lines.push('Firma: ' + company);
    lines.push('', 'Mesaj: ' + message);
    const text = lines.join('\n');

    // GA4 generate_lead (yalnizca cerez onayi varsa analytics.js gonderir)
    document.dispatchEvent(new CustomEvent('umay-lead', { detail: { method: channel } }));

    if (channel === 'whatsapp') {
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      noteBox.textContent = 'WhatsApp açıldı. Mesajınızı orada göndermeniz yeterli.';
    } else {
      window.location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Web sitesi iletişim formu - ' + name) + '&body=' + encodeURIComponent(text);
      noteBox.textContent = 'E-posta uygulamanız açıldı. Mesajı orada göndermeniz yeterli.';
    }
  });
})();
