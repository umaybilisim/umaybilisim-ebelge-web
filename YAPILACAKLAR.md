# Yapılacaklar

## ▶ NEREDE KALDIK (son güncelleme: 27.10.2026)

> İçerik/sayfa değişikliğinden sonra sıra: commit → `python scripts/update_sitemap_lastmod.py` → `python scripts/build_llms_full.py` → `python scripts/build_md.py` → commit + push.

**▶ Bir sonraki oturumda ilk iş:** ~31.10.2026 GSC kontrolü (madde 2). Açık kalanlar: 2, 5, 6, 8. Bugün kapananlar: 1, 3, 4, 7.

**27.10.2026 – yeni blog yazısı:** `/blog/kagit-fatura-bitiyor-2027-e-arsiv` (589 Sıra No.lu VUK Tebliği: basit usul + işletme hesabı mükellefleri için 1.1.2027'den itibaren tüm faturalar e-Arşiv). Blog listesi, sitemap, llms.txt, llms-full, md güncellendi; IndexNow 200. GSC "Dizine eklenmesini iste" → **Kota Aşıldı**; 31.10 kontrolünde bu URL için tekrar iste. Aynı gün e-fatura-zorunluluk yazısı ve `urunler/e-arsiv-fatura` düzeltildi (5.000 TL → 3.000 TL / 2026–2027 takvimi; ceza → VUK 353/1, %10, belge başına asgari). Aynı gün cezalar-2026, e-fatura-nedir, e-faturaya-nasil-gecilir, 2026-takvim de düzeltildi ("hiç düzenlenmemiş sayılır" kaldırıldı; 2026 ceza tutarları 588 Sıra No.lu Tebliğ'e göre: 353/1 %10, asgari ilk tespit 17.000 → 6. tespit 170.000 TL, yıllık 17.000.000 TL). **Kontrol edilmesi önerilen diğer şüpheli ifadeler (kullanıcıya soruldu):** 2026-takvim tablosunda "2025 cirosu → 1 Ocak 2026" (509'a göre izleyen yılın 1 Temmuz'u); cezalar-2026'da "son iki yılın hasılatı", "e-Arşiv aynı gün 23:59" ve özel usulsüzlükte pişmanlık (VUK 371) iddiaları; e-arsiv ürün sayfasında "ihracatçılar e-Arşiv".

**17.10.2026 – özet:** GSC 69 dizinde olmayan adres incelendi (sorun yok) · `/sss` ve `/urunler/e-arsiv-fatura` için dizine ekleme istendi · ürün şeması Product → Service · sitemap lastmod betiği · eski `/cozumler/` yönlendirmeleri ilgili sayfalara · CF root→WWW kuralı http'yi de kapsıyor · Clarity doğrulandı, localhost kaydı engellendi.

**17.10.2026 – GSC kontrolü:**
- Dizine eklenen sayfa 39 → **65**; "Keşfedildi – dizine eklenmedi" 28 → 1. `iller/sakarya` ve `iller/samsun` dizinde (madde 1 ✓). 404 ve Soft 404 doğrulamaları **Başarılı**.
- Yönlendirmeli sayfa (55), Tarandı-dizine eklenmedi (2, eski `/cozumler/` ve `http://…/iletisim/`), Yeniden yönlendirme hatası (4, Temmuz'dan kalma `/iletisim` verisi): canlıda hepsi doğru yönleniyor/200 → **normal, işlem gerekmez**.
- **Düzeltilen gerçek sorunlar:** `/sss` Google'da "bilinmiyor" çıktı; `/urunler/e-arsiv-fatura` için Google eski taramadan www'suz sürümü kanonik seçmişti → ikisi için dizine ekleme istendi. Sitemap `lastmod`'ları 20.09'da donmuştu → `scripts/update_sitemap_lastmod.py` ile git tarihlerinden üretildi (commit 8540dd8), sitemap GSC'ye yeniden gönderildi (aynı gün okundu, 64 sayfa).
- 69 dizinde olmayan adresin (8 neden) hepsi canlıda test edildi; sorun yok. Eski `/cozumler/` e-imza → mali mühür yazısı, e-mutabakat → e-dekont, e-yedekleme/kep/diğerleri → `/urunler` (önce ana sayfaydı; commit d8a45f8).
- Satıcı girişleri (2 geçersiz "image eksik"), Ürün/Yorum snippet'leri: veri 15.10 tarihli, Product → Service geçişinden önce. Yeniden taramayla raporlar boşalacak.

**17.10.2026 – ürün şeması:**
- GSC Satıcı girişleri uyarısı ("validThrough/priceValidUntil eksik") geldi. Kök neden: 11 ürün sayfası Product şemasında `price: "0"` (ücretsiz) bildiriyordu, sitede gerçek fiyat yok.
- Kullanıcı kararıyla 11 ürün sayfasında Product → **Service** şeması (commit 1c9816d): Offer/fiyat ve doğrulanamayan `aggregateRating` kaldırıldı, `og:type` product → website. Satıcı girişleri / Ürün snippet'leri uyarıları bu sayfalar için sona erer.

**02-03.10.2026:**
- GSC "Keşfedildi – dizine eklenmedi" 28 sayfanın 26'sı için dizine ekleme istendi; `/hakkimizda` dizine girdi.
- GSC Satıcı girişleri uyarısı: 11 ürün sayfasına `validFrom` + PNG `image` eklendi.
- Bing Site Scan: 0 hata; 6 uzun title kısaltıldı (madde 41 ✓). IndexNow doğrulandı (madde 38 ✓). GA4 `generate_lead` önemli etkinlik yapıldı (madde 50 ✓).
- Microsoft Clarity kuruldu (çerez onayına bağlı, proje `yrt2ho1mkm`).
- Şehir sayfaları: 30 LocalBusiness → Service şeması; yerinde destek yalnızca Sakarya, Kocaeli, Düzce, Bolu, Bilecik, İstanbul, Bursa; diğerleri uzaktan.
- Genel kullanım şablonu: `site-yayin-kontrol-sablonu.xlsx` (172 madde, yapay zekâ talimatlı).

**Sıradaki işler:**
1. [x] ~~`iller/sakarya` ve `iller/samsun` dizine ekleme~~ — 17.10.2026'da ikisi de dizinde.
2. [ ] **~31.10.2026 GSC kontrolü:** `/sss`, `/urunler/e-arsiv-fatura` ve yeni `/blog/kagit-fatura-bitiyor-2027-e-arsiv` dizine girdi mi (yenisi için dizine ekleme iste) (URL denetimi); Satıcı girişleri, Ürün snippet'leri ve Yorum snippet'leri raporları boşaldı mı (artık Product şeması yok). GSC dışında: Bing, Yandex, GA4, IndexNow kontrolü (ayrıntı aşağıda) hâlâ yapılmadı.
3. [x] ~~Puan şeması riski~~ — 17.10.2026'da Product → Service ile `aggregateRating` kaldırıldı.
4. [x] ~~Clarity~~ — 17.10.2026: site tarafı doğrulandı (onaysız/reddet → 0 istek, kabul → kayıt); panelde son 30 günde 6 oturum (Google'dan gelen dahil), JS hatası 0, performans 91/100. Panele `bilgi@umaybilisim.com.tr` iş hesabıyla girilir. localhost kayıtları `js/clarity.js`'te alan adı kontrolüyle engellendi. Trafik düşük çünkü yalnızca çerez kabul edenler kaydediliyor.
5. [ ] **WhatsApp önizlemesi (madde 56):** Siteyi kendi telefonunda WhatsApp'tan kendine gönder; görsel/başlık doğru mu.
6. [ ] **Şehir referansları:** Müşteriden Kocaeli, İstanbul, Bursa ve büyük sanayi şehirleri için gerçek referans iste (ayrıntı aşağıda).
7. [x] ~~Cloudflare http→www tek adım~~ — 17.10.2026: "Redirect from root to WWW" kuralı `*://e-devlethizmetleri.com/*` → `https://www.e-devlethizmetleri.com/${2}` yapıldı; `http://` apex artık tek adımda www'ye gidiyor (eski 3 adım → 1-2).
8. [ ] **Müşteri tarafı:** Google İşletme Profili, Yandex Business, müşteri yorumları, avukat kontrolü, gerçek fotoğraflar; sonra NAP karşılaştırması.

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
