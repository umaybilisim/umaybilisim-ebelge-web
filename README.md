# Umay e-Belge — Statik Web Sitesi

Türkiye'nin uzman e-belge çözüm ortağı **Umay Tüm Bilişim Ltd. Şti.** için, 11 GİB onaylı e-belge ürününün tanıtım ve satışını yapan modern, SEO uyumlu, **statik web sitesi**.

> Yalnızca HTML, CSS, JavaScript. Hiçbir sunucu yazılımı (Python, Node, PHP) kullanılmaz.

## Özellikler

- 🎨 **Modern SaaS tasarım** — mavi/mor gradient, glassmorphism, smooth animasyonlar
- 🌙 **Dark mode** — localStorage'a kaydedilir, sistem tercihi okunur
- 📱 **Tam responsive** — mobil hamburger menü, tablet, masaüstü
- ✨ **AOS scroll animasyonlar** — fade-up, zoom-in, fade-in
- 💬 **WhatsApp float butonu** — pulse animasyonlu
- 🍪 **KVKK cookie banner** — kabul/red, localStorage'da saklanır
- 🔍 **SEO optimized** — meta tags, OG, Twitter Card, JSON-LD schema (Organization, Product, Article, FAQPage, BreadcrumbList)
- 🗺️ **sitemap.xml + robots.txt**
- ♿ **Accessibility** — semantik HTML, ARIA, `prefers-reduced-motion`

## Sayfa Yapısı

```
edevlethizmetleri/
├── index.html                 # Ana sayfa
├── urunler.html               # Ürün listesi (11 ürün)
├── hakkimizda.html
├── iletisim.html              # Telefon, WhatsApp, harita, banka bilgileri
├── sss.html                   # Kategorize SSS + FAQPage schema
├── kvkk.html                  # KVKK aydınlatma metni
├── gizlilik-politikasi.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── favicon.svg
├── css/
│   └── style.css              # Tüm stil sistemleri
├── js/
│   ├── main.js                # Nav, mobil menü, AOS, sayaçlar, filtre
│   ├── theme.js               # Dark mode
│   ├── cookie.js              # KVKK banner
│   └── faq.js                 # SSS akordeon
├── urunler/
│   ├── e-fatura.html
│   ├── e-arsiv-fatura.html
│   ├── e-irsaliye.html
│   ├── e-defter.html
│   ├── e-smm.html
│   ├── e-mm.html
│   ├── e-doviz.html
│   ├── e-adisyon.html
│   ├── e-dekont.html
│   ├── e-gider-pusulasi.html
│   └── gib-btrans.html
└── blog/
    ├── index.html
    ├── e-fatura-nedir-2026-rehberi.html
    ├── e-arsiv-fatura-ile-e-fatura-farki.html
    ├── e-defter-gecis-sureci-ve-zorunluluk.html
    ├── e-irsaliye-kimler-icin-zorunlu.html
    ├── e-smm-kullanim-rehberi.html
    └── kobi-icin-e-belge-faydalari.html
```

## Teknoloji

- **HTML5** + semantik markup
- **CSS3** — özel tasarım sistemi (CSS custom properties, grid, flex)
- **Vanilla JavaScript** — bağımlılıksız
- **CDN'ler:** Tailwind tarzı yardımcı sınıflar (özel CSS), Lucide Icons, AOS, Google Fonts (Inter)

## Yerel Geliştirme

Build adımı yok. İki yöntem:

```powershell
# Yöntem 1: index.html'e çift tıkla (basit)

# Yöntem 2: VS Code Live Server eklentisi (önerilen)

# Yöntem 3: Python ile yerel sunucu
python -m http.server 8000
# → http://localhost:8000
```

## Hosting / Deploy

Platform-agnostik. Tüm path'ler relative.

- **GitHub Pages** → Settings → Pages → main branch / root
- **Netlify / Vercel** → Sürükle-bırak ya da git bağlantısı
- **cPanel** → Tüm dosyaları `public_html`'e yükle

## Marka Bilgileri

| Alan | Değer |
|---|---|
| Ünvan | Umay Tüm Bilişim ve Eğitim Danışmanlık Yazılım İth. İhr. San. Tic. Ltd. Şti. |
| Telefon | 0 850 777 11 45 |
| E-posta | bilgi@umaybilisim.com.tr |
| Adres | Erenler Mah. 1193 Nolu Sk. No:4/1-213, Meydan54 AVM B1 Blok K:2 D:84, 54200 Erenler / SAKARYA |
| MERSİS | 0892062544300001 |

## Lisans

Tüm hakları Umay Bilişim Ltd. Şti.'ne aittir. © 2026
