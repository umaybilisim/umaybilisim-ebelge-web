# Yapılacaklar

## Mobil LCP İyileştirmesi (PageSpeed Insights - Mobil 85/100)
- LCP şu an: 3,3 sn (hedef: <2,5 sn)
- Muhtemel nedenler:
  - Hero görseli geç yükleniyor → `<link rel="preload">` ekle
  - Oluşturma engelleme CSS/JS → kritik CSS inline al, diğerlerini defer et
  - Verimli önbellek süresi eksik → Cache-Control header ayarla (12 KiB tasarruf)
- Analiz önerileri: "Zorunlu yeniden düzenleme", "Ağ bağımlılık ağacı", "Oluşturma engelleme istekleri"
