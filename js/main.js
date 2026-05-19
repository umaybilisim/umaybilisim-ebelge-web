// Umay e-Belge — Ana JS
(function () {
  'use strict';

  // Sosyal medya ve diğer marka ikonları — Lucide bazı marka ikonlarını kaldırdı, inline SVG kullan
  const BRAND_ICONS = {
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82v-9.294H9.692V11.05h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.655h-3.12V24h6.116c.73 0 1.323-.592 1.323-1.324V1.325C24 .593 23.408 0 22.675 0z"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    twitter: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
  };

  // Lucide ikonlar — sosyal medya marka ikonlarını önce inline SVG ile değiştir, sonra lucide kalanı renderlar
  function initLucide() {
    document.querySelectorAll('[data-lucide]').forEach(function (el) {
      const name = el.getAttribute('data-lucide');
      if (BRAND_ICONS[name]) {
        const wrapper = document.createElement('span');
        wrapper.innerHTML = BRAND_ICONS[name];
        const svg = wrapper.firstChild;
        svg.classList.add('brand-icon');
        el.replaceWith(svg);
      }
    });
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // AOS init
  function initAOS() {
    if (window.AOS && typeof window.AOS.init === 'function') {
      window.AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: function () {
          return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
      });
    }
  }

  // Mobil menü
  function initMobileMenu() {
    const toggle = document.querySelector('[data-mobile-toggle]');
    const close = document.querySelector('[data-mobile-close]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;

    const open = function () {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const shut = function () {
      menu.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', open);
    if (close) close.addEventListener('click', shut);
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', shut);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') shut();
    });
  }

  // Scroll to top
  function initScrollTop() {
    const btn = document.querySelector('[data-scroll-top]');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // İstatistik sayaçları
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const dur = 1600;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (target % 1 ? val.toFixed(1) : Math.floor(val)).toString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { obs.observe(c); });
  }

  // Ürün filtre çipleri
  function initProductFilter() {
    const chips = document.querySelectorAll('[data-filter-chip]');
    const items = document.querySelectorAll('[data-filter-item]');
    if (!chips.length || !items.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        const cat = chip.dataset.filterChip;
        items.forEach(function (item) {
          const tags = (item.dataset.filterItem || '').split(' ');
          if (cat === 'all' || tags.indexOf(cat) > -1) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Blog arama
  function initBlogSearch() {
    const input = document.querySelector('[data-blog-search]');
    if (!input) return;
    const items = document.querySelectorAll('[data-blog-item]');
    input.addEventListener('input', function () {
      const q = input.value.toLowerCase().trim();
      items.forEach(function (it) {
        const text = (it.dataset.blogItem || '').toLowerCase();
        it.style.display = (!q || text.indexOf(q) > -1) ? '' : 'none';
      });
    });
  }

  // Mevcut sayfayı navigasyonda işaretle
  function highlightActiveNav() {
    const path = location.pathname.replace(/\\/g, '/');
    const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    const dir = path.indexOf('/urunler/') > -1 ? 'urunler' :
                path.indexOf('/blog/') > -1 ? 'blog' : '';
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      const key = a.dataset.nav;
      if (key === dir || key === file.replace('.html', '') || (!dir && key === 'home' && file === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLucide();
    initAOS();
    initMobileMenu();
    initScrollTop();
    initCounters();
    initProductFilter();
    initBlogSearch();
    highlightActiveNav();
  });
})();
