# Yapılacaklar

## Mobil LCP İyileştirmesi (PageSpeed Insights - Mobil 85/100)
- LCP şu an: 3,3 sn (hedef: <2,5 sn)
- Muhtemel nedenler:
  - Hero görseli geç yükleniyor → `<link rel="preload">` ekle
  - Oluşturma engelleme CSS/JS → kritik CSS inline al, diğerlerini defer et
  - Verimli önbellek süresi eksik → Cache-Control header ayarla (12 KiB tasarruf)
- Analiz önerileri: "Zorunlu yeniden düzenleme", "Ağ bağımlılık ağacı", "Oluşturma engelleme istekleri"

## GSC Doğrulama Kontrolü (4 Ekim 2026 sonrası)
- 20.09.2026'da 6 kategori için doğrulama başlatıldı: Yönlendirmeli sayfa (40), Yeniden yönlendirme hatası (4), 404 (4), Alternatif canonical (2), Soft 404 (1), Tarandı-dizine eklenmedi (3)
- Kontrol: GSC → `sc-domain:e-devlethizmetleri.com` → Sayfa dizine ekleme; hesap `aycan.firtin@gmail.com` (Playwright'ta açık olmalı)
- Başarısız kategorilerde örnek URL'lere bakıp canlıda `curl -I` ile doğrula; yalnızca eski `http://` `/cozumler/*` ve `.html` yönlendirmeleri kaldıysa normaldir
- DNS'teki `google-site-verification` TXT kaydını silme

## GA4 generate_lead Önemli Etkinlik
- İletişim formu (/iletisim) generate_lead gönderiyor (method=whatsapp|email, form_id=contact-form); yalnızca çerez kabulünde (js/analytics.js `umay-lead` olayı)
- GA4 Etkinlikler → Son etkinlikler listesinde generate_lead görününce (birkaç saat) yıldızına basıp önemli etkinlik yap (mülk 555135547)
