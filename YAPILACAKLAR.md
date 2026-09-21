# Yapılacaklar

## Mobil LCP İyileştirmesi (PageSpeed Insights - Mobil 85/100)
- LCP şu an: 3,3 sn (hedef: <2,5 sn)
- Muhtemel nedenler:
  - Hero görseli geç yükleniyor → `<link rel="preload">` ekle
  - Oluşturma engelleme CSS/JS → kritik CSS inline al, diğerlerini defer et
  - Verimli önbellek süresi eksik → Cache-Control header ayarla (12 KiB tasarruf)
- Analiz önerileri: "Zorunlu yeniden düzenleme", "Ağ bağımlılık ağacı", "Oluşturma engelleme istekleri"

## 4 Ekim 2026 Kontrol Turu (GSC + Bing + Yandex + GA4 + IndexNow)
- 20.09.2026'da 6 kategori için doğrulama başlatıldı: Yönlendirmeli sayfa (40), Yeniden yönlendirme hatası (4), 404 (4), Alternatif canonical (2), Soft 404 (1), Tarandı-dizine eklenmedi (3)
- Kontrol: GSC → `sc-domain:e-devlethizmetleri.com` → Sayfa dizine ekleme; hesap `aycan.firtin@gmail.com` (Playwright'ta açık olmalı)
- Başarısız kategorilerde örnek URL'lere bakıp canlıda `curl -I` ile doğrula; yalnızca eski `http://` `/cozumler/*` ve `.html` yönlendirmeleri kaldıysa normaldir
- Bing Webmaster: e-devlethizmetleri.com → Sitemaps (durum, keşfedilen URL, hata/uyarı) ve Search Performance
- Yandex Webmaster (www.e-devlethizmetleri.com): sitemap işlendi mi (İndeksleme → Sitemap dosyaları), indeks/sayfa sayıları, Tanılama uyarıları; `index.html`'deki yandex-verification meta etiketi yerinde olmalı
- GA4 (555135547): Search Console raporları (Sorgular, Google organik arama trafiği) veri gösteriyor mu; önemli etkinlik sayıları (contact_click, whatsapp_click, generate_lead)
- IndexNow: gerçek HTML push'unun Actions logunda "IndexNow: N URL gonderildi, HTTP 202" doğrula (`gh run view <id> --log | grep IndexNow`)
- DNS'teki `google-site-verification` TXT kaydını silme

## GA4 generate_lead Önemli Etkinlik
- İletişim formu (/iletisim) generate_lead gönderiyor (method=whatsapp|email, form_id=contact-form); yalnızca çerez kabulünde (js/analytics.js `umay-lead` olayı)
- GA4 Etkinlikler → Son etkinlikler listesinde generate_lead görününce (birkaç saat) yıldızına basıp önemli etkinlik yap (mülk 555135547)

## Excel Kalan Maddeler (yeni-site-kontrol-listesi.xlsx, 21.09.2026 itibarıyla)
Sıradaki oturumda birlikte yapılacak:
- [ ] Madde 37: GSC URL Inspection > Request indexing ile öncelikli sayfaları gönder (ana sayfa, /urunler, 11 ürün, /sss, hakkimizda, iletisim, blog; günlük kota 100)
- [ ] Madde 38: Bing Webmaster > IndexNow sekmesinde gönderimlerin göründüğünü doğrula
- [ ] Madde 50: generate_lead GA4 Etkinlikler listesinde mi bak; varsa önemli etkinlik (yıldız) yap
- [ ] Madde 56: OG etiketleri/görseli sunucu tarafında doğrula; WhatsApp önizlemesini kullanıcı kendi telefonundan dener
- [ ] Madde 41: Bing Site Diagnostics tarama sonrası yeniden bak (tarama verisi gelince)

Müşteri tarafı (benden bağımsız):
- [ ] 52 Google İşletme Profili (önce Maps'te mevcut kaydı ara/sahiplen), 53 Yandex Business, 55 müşteri yorumları, 58 yasal metinlerin avukat kontrolü, 59 stok görsellerin kendi fotoğraflarla değiştirilmesi
- [ ] Madde 54: NAP tutarlılığı; 52 ve 53 açılınca Google/Yandex/sosyal medya ile karşılaştır
