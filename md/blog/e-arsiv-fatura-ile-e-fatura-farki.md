# e-Arşiv Fatura ile e-Fatura Arasındaki Farklar

> e-Arşiv Fatura ile e-Fatura arasındaki temel farklar nelerdir? Hangi durumda hangisi düzenlenir? Karşılaştırma tablosu ve örnek senaryolar.

Kaynak: https://www.e-devlethizmetleri.com/blog/e-arsiv-fatura-ile-e-fatura-farki

28 Şubat 2026 6 dakika okuma
e-Fatura ve e-Arşiv Fatura, Türkiye'deki elektronik belge sisteminin iki temel bileşenidir. Her ikisi de elektronik fatura olmasına rağmen önemli farklar barındırırlar. Bu yazıda iki sistemin temel farklarını, hangi durumda hangisinin düzenleneceğini ve pratik örnekleri inceliyoruz.

## e-Fatura ve e-Arşiv Fatura nedir?

### e-Fatura

e-Fatura, sadece e-Fatura kullanıcısı olan firmalar arasında düzenlenen elektronik faturadır. Düzenlenen fatura GİB'in özel altyapısı (BIS) üzerinden alıcıya iletilir.

### e-Arşiv Fatura

e-Arşiv Fatura, e-Fatura kullanıcısı olmayan kişi veya kurumlara düzenlenen elektronik faturadır. Müşteriye e-posta veya basılı şekilde iletilir, GİB'e raporlanır.

## e-Arşiv Fatura ile e-Fatura arasındaki farklar nelerdir?

| Kriter | e-Fatura | e-Arşiv Fatura |
|---|---|---|
| Alıcı Tipi | e-Fatura mükellefi | Mükellef olmayan kişi/kurum |
| İletim Kanalı | GİB BIS sistemi | E-posta / yazıcı çıktısı |
| Karşı Onay | Alıcı onaylar | Onay gerekmez |
| İptal Süresi | 8 gün (red hakkı) | 8 gün (iptal) |
| Karekod | Zorunlu değil | Zorunlu |
| Format | UBL-TR XML | UBL-TR XML + PDF |
| Hukuki Geçerlilik | Tam | Tam |

## Hangi Durumda Hangisini Düzenlemeliyim?

Karar mekanizması basit: Alıcı, e-Fatura sisteminde kayıtlı bir mükellef mi?

- Evet: e-Fatura düzenleyin.
- Hayır: e-Arşiv Fatura düzenleyin.

Programımız alıcının VKN/TCKN bilgisini girdiğinizde otomatik olarak e-Fatura mükellefi olup olmadığını kontrol eder ve uygun fatura tipini önerir.

## Hangi durumda hangi fatura düzenlenir? (Pratik senaryolar)

### Senaryo 1: B2B Satış (Toptan Tekstil Firması)

Müşteriniz ABC Konfeksiyon Ltd. Şti., e-Fatura mükellefi. Doğru tercih: e-Fatura. Mali mühürle imzalanır, GİB üzerinden iletilir.

### Senaryo 2: B2C Satış (e-Ticaret)

Müşteriniz Ahmet Yılmaz (son tüketici), e-Fatura mükellefi değil. Doğru tercih: e-Arşiv Fatura. E-posta ile gönderilir, karekod ile doğrulanabilir.

### Senaryo 3: Karma Müşteri Portföyü

Hem KOBİ'lere hem son tüketicilere satış yapıyorsunuz. e-Fatura mükellefi olduğunuzda, otomatik olarak her iki sistemi de kullanmak zorundasınız. Programımız doğru fatura tipini otomatik belirler.

### e-Fatura ve e-Arşiv ihtiyacınızı tek paketle karşılayalım

Her iki çözüm de tek lisansla, GİB onaylı altyapımız üzerinde.

## Sık yapılan hatalar nelerdir?

- Yanlış tip seçimi: Mükellef olmayan birine e-Fatura kesilemez. Sistem otomatik olarak reddeder.
- Karekod eksikliği: e-Arşiv faturada karekod zorunlu. Manuel hazırlanan faturalarda bu unutulur.
- Geç iletim: e-Arşiv fatura ay sonuna kadar GİB'e raporlanmalı. Geç raporlama özel usulsüzlük cezası gerektirir.

## Sonuç

e-Fatura ve e-Arşiv Fatura, modern iş süreçlerinin ayrılmaz parçalarıdır. Hangisinin düzenleneceği alıcının e-Fatura mükellefi olup olmadığına bağlıdır. Profesyonel bir entegratör çözümü, bu kararı otomatik olarak verir ve hata yapmanızı engeller.

---

Bu, https://www.e-devlethizmetleri.com/blog/e-arsiv-fatura-ile-e-fatura-farki sayfasının Markdown sürümüdür. Tüm site içeriği tek dosyada: https://www.e-devlethizmetleri.com/llms-full.txt · Özet: https://www.e-devlethizmetleri.com/llms.txt
