# Project Nebula

Kaydırmayla ilerleyen, 3D uzay temalı bir portfolyo sitesi. Tek bir sabit WebGL sahnesi içinde altı bölüm (Varış, Köken, Yetenekler, Projeler, Yol, İletişim) vardır. Sayfayı kaydırdıkça kamera bu bölümlerin sahneleri arasında uçar.
<img width="1856" height="923" alt="image" src="https://github.com/user-attachments/assets/20476e6b-3ea5-4480-b4a0-a7964c9afc6b" />
<img width="1855" height="921" alt="image" src="https://github.com/user-attachments/assets/42f8ec5b-c769-4748-849a-15f93ee4fdbf" />


## Özellikler

- **Sahneler:** Etkileşimli gezegen, spiral galaksi, 3D yetenek takımyıldızı, asteroit alanı, Tron tarzı halka tüneli ve son bölümde ikinci bir gezegen.
- **Kamera:** Kaydırma ilerlemesine bağlı yumuşak geçişler ve imleç paralaksı.
- **Gezinme:** Masaüstünde yan ray, mobilde alt çubuk. Tıklayınca ilgili bölüme kayar.
- **Yetenekler:** Takımyıldızındaki bir düğümün üzerine gelince listedeki karşılığı vurgulanır, listenin üzerine gelince de düğüm vurgulanır.
- **Projeler:** Holografik kartlar (imleci takip eden 3D eğim), canlı önizleme penceresi ve GitHub bağlantıları.
- **Yol:** GSAP ile sabitlenmiş, yatay kayan zaman çizelgesi.
- **Erişilebilirlik:** Görünür klavye odağı, `Esc` ile kapanan pencere ve `prefers-reduced-motion` desteği.

## Teknolojiler

React 18, Vite, Three.js, React Three Fiber, drei, Framer Motion, GSAP (ScrollTrigger) ve Lenis (yumuşak kaydırma).

## Kurulum

Node.js 18 veya üstü gerekir.

```bash
npm install
npm run dev
```

Geliştirme sunucusu varsayılan olarak `http://localhost:5173` adresinde açılır.

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Üretim derlemesini `dist/` klasörüne yazar |
| `npm run preview` | Derlenmiş siteyi yerelde önizler |

## Klasör yapısı

```
project-nebula/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            Giriş noktası
    ├── App.jsx             Bölümleri ve sahneyi bir araya getirir
    ├── styles.css          Renk değişkenleri ve tüm stiller
    ├── components/         Bölüm bileşenleri (Hero, About, Skills, Projects, Timeline, Contact, Nav, ProjectModal)
    ├── data/
    │   └── content.js      Tüm içerik: profil, yetenekler, projeler, yol aşamaları
    ├── hooks/
    │   └── useStory.js     Lenis + ScrollTrigger; kaydırmayı kamera konumuna çevirir
    └── three/
        ├── Experience.jsx  Canvas, kamera düzeneği, galaksi, takımyıldızı, asteroitler, tünel
        ├── Planet.jsx      Gezegen (özel shader)
        └── shaders.js      GLSL kodları
```

## Siteyi kendine göre düzenleme

### İçerik

Her şey `src/data/content.js` dosyasında:

- `PROFILE`: e-posta ve GitHub adresin. Boş bırakılan alanlar sitede görünmez.
- `SKILLS`: yetenek adları ve açıklamaları. Takımyıldızındaki düğümler bu sıraya göre eşleşir (5 öğe).
- `PROJECTS`: her proje için `name`, `kind`, `text`, `flow`, `github` ve `live` alanları. `live` doluysa önizleme penceresinde iframe açılır, boşsa `flow` adımları gösterilir. Not: bazı siteler iframe içinde açılmayı engeller. Önizleme boş görünürse `live` alanını boşaltıp "Canlı siteyi aç" yerine GitHub bağlantısını kullanabilirsin.
- `STAGES`: "Yol" bölümündeki aşamalar.

Bölüm başlıkları ve ana metinler (`Hero`, `About`, `Contact` vb.) ilgili bileşen dosyalarındadır.

### Renkler

`src/styles.css` dosyasının başındaki CSS değişkenleri (`--void`, `--navy`, `--violet`, `--cyan`, `--mist`) arayüz renklerini belirler. Gezegen ve galaksi renkleri `three/shaders.js` ve `three/Experience.jsx` içinde ayrıca tanımlıdır.

### Kamera yolu

`src/three/Experience.jsx` içindeki `WP` dizisi her bölüm için bir `[kamera konumu, bakış noktası]` çifti tutar. Sahne nesnelerinin yerini veya kameranın nereden bakacağını buradan ayarlarsın. Mobil için ayrı değerler `NARROW` nesnesindedir.

### Yeni bölüm eklemek

1. `src/hooks/useStory.js` içindeki `SECTIONS` dizisine `[id, etiket]` ekle.
2. `src/components/` altında `id`'si aynı olan bir `<section>` bileşeni yaz ve `App.jsx` içine yerleştir.
3. `Experience.jsx` içindeki `WP` dizisine yeni bölümün kamera çiftini ekle. Kamera ilerlemesi `0` ile `SECTIONS.length - 1` arasında çalıştığı için `Rig` bileşenindeki `5` sabitini de güncelle.

## Yayınlama

`npm run build` komutu `dist/` klasörünü üretir. Bu klasör herhangi bir statik barındırmada çalışır (Vercel, Netlify, GitHub Pages, Cloudflare Pages). Vercel veya Netlify'da build komutu `npm run build`, çıktı klasörü `dist` olmalıdır.

Dosya adlarının büyük/küçük harfi önemlidir. Linux sunucularda `content.js` ile `Content.js` farklı dosyalardır.

## Performans notları

- Düşük güçlü cihazlarda `Experience.jsx` içinde `Stars` ve `Sparkles` sayılarını ve galaksideki yıldız sayısını (`n = 14000`) azaltabilirsin.
- `Canvas` bileşeninde `dpr={[1, 2]}` ayarı, yüksek çözünürlüklü ekranlarda çizim yükünü sınırlar.
- Asteroitler tek bir `instancedMesh` ile çizilir, bu yüzden sayıları artırmak ucuzdur.

