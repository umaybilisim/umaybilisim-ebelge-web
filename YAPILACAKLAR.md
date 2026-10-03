# Yapılacaklar

## ▶ NEREDE KALDIK (son güncelleme: 03.10.2026)

**Son oturumda yapılanlar (02-03.10.2026):**
- GSC "Keşfedildi – dizine eklenmedi" 28 sayfanın 26'sı için dizine ekleme istendi; `/hakkimizda` dizine girdi.
- GSC Satıcı girişleri uyarısı: 11 ürün sayfasına `validFrom` + PNG `image` eklendi.
- Bing Site Scan: 0 hata; 6 uzun title kısaltıldı (madde 41 ✓). IndexNow doğrulandı (madde 38 ✓). GA4 `generate_lead` önemli etkinlik yapıldı (madde 50 ✓).
- Microsoft Clarity kuruldu (çerez onayına bağlı, proje `yrt2ho1mkm`).
- Şehir sayfaları: 30 LocalBusiness → Service şeması; yerinde destek yalnızca Sakarya, Kocaeli, Düzce, Bolu, Bilecik, İstanbul, Bursa; diğerleri uzaktan.
- Genel kullanım şablonu: `site-yayin-kontrol-sablonu.xlsx` (172 madde, yapay zekâ talimatlı).

**Sıradaki işler:**
1. [ ] **GSC:** `iller/sakarya` ve `iller/samsun` için dizine ekleme iste (kota iki gün dolu çıktı; GSC > URL denetimi).
2. [ ] **4 Ekim kontrol turu:** GSC dizine ekleme + Satıcı girişleri raporu (validFrom/image düzeldi mi), Bing, Yandex, GA4, IndexNow (ayrıntı aşağıda).
3. [ ] **Puan şeması riski:** Ürün sayfalarındaki `aggregateRating` (ör. e-Fatura 4.9 / 184 yorum) gerçek, doğrulanabilir yorumlara dayanıyor mu? Değilse kaldırılmalı (uydurma puan = manuel işlem riski). Müşteriye sorulacak.
4. [ ] **Clarity:** Panelde kayıt geliyor mu kontrol et (https://clarity.microsoft.com/projects/view/yrt2ho1mkm).
5. [ ] **WhatsApp önizlemesi (madde 56):** Siteyi kendi telefonunda WhatsApp'tan kendine gönder; görsel/başlık doğru mu.
6. [ ] **Şehir referansları:** Müşteriden Kocaeli, İstanbul, Bursa ve büyük sanayi şehirleri için gerçek referans iste (ayrıntı aşağıda).
7. [ ] **Müşteri tarafı:** Google İşletme Profili, Yandex Business, müşteri yorumları, avukat kontrolü, gerçek fotoğraflar; sonra NAP karşılaştırması.

---

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
- [x] Madde 38: IndexNow gönderimleri Bing'de görünüyor (03.10.2026)
- [x] Madde 50: generate_lead önemli etkinlik yapıldı (03.10.2026)
- [ ] Madde 56: OG sunucu tarafı doğrulandı; WhatsApp önizlemesini kullanıcı kendi telefonundan dener
- [x] Madde 41: Bing Site Scan 0 hata, 6 title uyarısı giderildi (03.10.2026)

### GSC "Keşfedildi - şu anda dizine eklenmiş değil" (28 sayfa) — 25.09.2026'da başlandı, 02.10.2026'da sürdürüldü
GSC Sayfa dizine ekleme raporunda gerçek/geçerli 28 sayfa Google tarafından keşfedilmiş ama hiç taranmamıştı (Son tarama: Yok). URL Inspection > "Dizine eklenmesini iste" ile öncelikli tarama sırasına eklendi. Günlük kota ~11-13 istekte doluyor ("Kota Aşıldı" hatası). 02.10.2026'da `/hakkimizda` dahil 25.09'da gönderilenlerin dizine eklendiği doğrulandı.
- [x] hakkimizda, gizlilik-politikasi, kvkk, sss (son 2'si zaten dizine eklenmişti), urunler, urunler/e-adisyon, urunler/e-arsiv-fatura, urunler/e-defter, urunler/e-dekont, urunler/e-doviz, urunler/e-fatura, urunler/e-gider-pusulasi, urunler/e-smm, urunler/gib-btrans, iller/adana, iller/ankara, iller/antalya, iller/bursa, iller/denizli, iller/gaziantep, iller/istanbul, iller/izmir, iller/kocaeli, iller/konya (son 2'si zaten dizine eklenmişti), iller/mersin
- [ ] **Devam (kota 02.10.2026'da doldu):** iller/sakarya, iller/samsun — GSC > URL denetimi kutusuna tam URL yaz, Enter, "Dizine eklenmesini iste" düğmesine bas

### Şehir sayfalarını güçlendirme (03.10.2026 analizi)
Şehir sayfaları doorway spam değil ama zayıf: ortalama ~450 kelime, sayfaya özgü içerik ~%44 (en zayıf: Samsun, Tekirdağ, Diyarbakır, Van, Malatya %36-39). Şema ve yerinde/uzaktan destek ifadeleri düzeltildi (commit b5b35ff).
- [ ] Müşteriden şehir bazlı gerçek referans/müşteri örnekleri iste (izinli firma adı, sektör, yapılan iş) ve ilgili şehir sayfalarına ekle; önce yerinde destek illeri (Kocaeli, İstanbul, Bursa) ve büyük sanayi şehirleri.
- [ ] Referans gelmeyen zayıf şehirler için karar: içerik genişletme mi, tek "Hizmet bölgeleri" sayfasında birleştirme mi.

Müşteri tarafı (benden bağımsız):
- [ ] 52 Google İşletme Profili (önce Maps'te mevcut kaydı ara/sahiplen), 53 Yandex Business, 55 müşteri yorumları, 58 yasal metinlerin avukat kontrolü, 59 stok görsellerin kendi fotoğraflarla değiştirilmesi
- [ ] Madde 54: NAP tutarlılığı; 52 ve 53 açılınca Google/Yandex/sosyal medya ile karşılaştır
