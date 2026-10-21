// Siteyi kendine göre düzenlemek için bu dosyayı değiştir. Boş bırakılan bağlantılar sitede görünmez.
export const PROFILE = { email: 'alikaanncaglayan@gmail.com', github: 'https://github.com/AliKaan55' }

export const SKILLS = [
  { name: 'ASP.NET Core', text: 'Web API’ler, MVC ve Razor uygulamaları, kimlik doğrulama, arka plan servisleri ve bakımı kolay katmanlı mimari.' },
  { name: 'C#', text: 'Alan mantığı, asenkron kod, LINQ ve gereksinimler değiştiğinde de güvenebileceğim testler.' },
  { name: 'SQL Server', text: 'Şema tasarımı, indeksleme, sorgu iyileştirme, saklı yordamlar ve bunlara bağlı raporlar.' },
  { name: 'JavaScript', text: 'Bu API’lerin üzerinde React arayüzleri ve WebGL; şu an baktığın 3D dünya dahil.' },
  { name: 'SAP', text: 'Özel .NET sistemlerini SAP’ye bağlama: veri alışverişi, uzantılar ve iki tarafı senkron tutma.' },
]

export const PROJECTS = [
  { name: 'Order Bridge', kind: 'ASP.NET Core · SAP', github: '', live: '',
    text: 'Özel bir web portalı ile SAP arasında satış siparişlerini taşıyan servis: yeniden deneme, denetim kaydı ve başarısız belgeler için bir panel içerir.',
    flow: ['Portal (JavaScript)', 'ASP.NET Core API', 'SQL Server kuyruğu', 'SAP'] },
  { name: 'Ledger API', kind: 'C# · SQL Server', github: '', live: '',
    text: 'Büyük bir SQL Server şeması üzerinde raporlama API’si. İndeksli görünümler ve iyileştirilmiş saklı yordamlar ağır raporları dakikalardan saniyelere indirdi.',
    flow: ['İstemci', 'ASP.NET Core API', 'Saklı yordamlar', 'SQL Server'] },
  { name: 'Stock Pulse', kind: 'JavaScript · .NET', github: '', live: '',
    text: 'SAP destekli verilerdeki stok değişikliklerini SignalR ile depo zeminine canlı aktaran envanter panosu.',
    flow: ['SAP çıktısı', 'ASP.NET Core işçi servisi', 'SignalR hub’ı', 'Tarayıcı'] },
  { name: 'Project Nebula', kind: 'React · Three.js', github: '', live: '',
    text: 'Bu site: altı 3D sahnenin içinden geçen, kaydırmayla ilerleyen bir uçuş. React Three Fiber, GSAP ve Lenis ile yapıldı.',
    flow: ['Lenis kaydırma', 'GSAP tetikleyicileri', 'Kamera düzeneği', 'WebGL'] },
]

export const STAGES = [
  { name: 'Temeller', text: 'C# ve ilişkisel veri: her şeyin üzerine oturduğu alışkanlıklar.' },
  { name: 'Web servisleri', text: 'Kimlik doğrulamadan arka plan işlerine kadar ASP.NET Core API’leri ve uygulamaları.' },
  { name: 'Veri derinliği', text: 'SQL Server performans çalışmaları: yürütme planları, indeksleme ve dürüst ölçümler.' },
  { name: 'Kurumsal', text: 'SAP entegrasyonu: iş belgelerini sistemler arasında güvenilir biçimde taşımak.' },
  { name: 'Arayüz', text: 'JavaScript ve gerçek zamanlı 3D: iyi çalışan sistemler aynı zamanda kullanması keyifli olsun.' },
]