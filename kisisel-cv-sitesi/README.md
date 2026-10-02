# Kişisel CV & Portfolyo Web Sitesi

Bu proje, özellikle **semantik HTML5 mimarisi**, erişilebilirlik (a11y), modern CSS tasarımı ve performans odaklı JavaScript kullanılarak hazırlanmış profesyonel bir kişisel CV ve portfolyo web sitesidir.

---

## 📁 Proje Dizin Yapısı

```text
kisisel-cv-sitesi/
│
├── index.html        # Semantik HTML5 iskeleti ve tüm içerik
├── style.css         # Modern CSS3 tasarım sistemi (Koyu/Açık Tema, @media print)
├── script.js         # İnteraktif özellikler (Tema, Filtreleme, Kopyalama, Form)
├── README.md         # Rehber ve dökümantasyon
└── assets/
    └── avatar.svg    # Vektörel profil görseli
```

---

## 🌟 HTML5 Semantik Yapı Özellikleri

Kullanılan temel semantik etiketler ve amaçları:

1. **`<header>` & `<nav>`**: Sayfa başlığı, logo ve ekran okuyucular için `aria-label="Ana Navigasyon"` etiketli ana dolaşım menüsü.
2. **`<main id="ana-icerik">`**: Sayfanın asıl içeriğini kapsayan ana etiket. Sayfa başında klavye kullanıcıları için doğrudan bu alana atlayan bir erişilebilirlik bağlantısı (`skip-link`) bulunur.
3. **`<h1>`**: Sayfadaki tek ana başlık kuralına uygun olarak yalnızca giriş bölümünde ad ve unvan için kullanılmıştır.
4. **`<section>` & `aria-labelledby`**: Sayfanın her ana bölümü (Hakkımda, Eğitim, Deneyim, Yetenekler vb.) mantıksal bir bölüme ayrılmıştır ve başlığıyla ilişkilendirilmiştir.
5. **`<article>`**: Kendi içinde bağımsız anlam ifade eden eğitim öğeleri, iş deneyimleri ve projeler için kullanılmıştır.
6. **`<time datetime="YYYY-MM">`**: Tarihlerin hem insanlar hem de arama motorları tarafından doğru anlaşılmasını sağlar.
7. **`<address>`**: İletişim, konum ve e-posta bilgilerinin semantik olarak belirtilmesi için kullanılmıştır.
8. **`<dl>`, `<dt>`, `<dd>`**: Kişisel bilgi kartındaki anahtar-değer ikilileri için Tanım Listesi (Definition List) kullanılmıştır.
9. **`<details>` ve `<summary>`**: Üniversitede alınan dersleri şık ve akordeon formatında açılır-kapanır göstermek için kullanılmıştır.
10. **`Schema.org JSON-LD`**: Google ve diğer arama motorlarının özgeçmişinizi bir "Person" (Kişi) varlığı olarak tanımasını sağlayan yapısal veri içerir.

---

## 🎨 Eklenen Özellikler

- 🌓 **Koyu / Açık Tema:** Sağ üstteki güneş/ay butonu ile tema değiştirilebilir ve tercih tarayıcı hafızasında (`localStorage`) saklanır.
- 🖨️ **Tek Tıkla CV Yazdır / PDF İndir:** "CV Yazdır / PDF" butonu, özel `@media print` kuralları ile menüleri ve butonları gizleyerek CV'nizi doğrudan A4 formatında temiz bir çıktı haline getirir.
- 📋 **Tek Tıkla İletişim Kopyalama:** E-posta ve telefon numarası yanındaki "Kopyala" butonu ile tek tıkla panoya kopyalama ve toast bildirim ekranı.
- 📊 **Yetkinlik Filtreleme:** Web, Diller ve Araçlar kategorileri arasında geçiş yapılabilir.
- 📱 **Tam Mobil Uyumluluk:** Telefon, tablet ve masaüstü ekranlarda kusursuz görünüm.

---

## 🚀 Nasıl Çalıştırılır?

Herhangi bir kurulum, derleme veya sunucu gerektirmez:
1. `index.html` dosyasına çift tıklayarak doğrudan Chrome, Edge, Safari veya Firefox tarayıcınızda açabilirsiniz.
2. Kendi bilgilerinizi (ad, okul, deneyim vb.) güncellemek için `index.html` dosyasını herhangi bir metin düzenleyicide açıp düzenleyebilirsiniz.
