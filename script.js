// Temayı kontrol etmek için
let isDarkMode = true; // Karanlık mod başlangıçta açık

// Başvuruları saklamak için
let applications = JSON.parse(localStorage.getItem('applications')) || [];

// Sektörler listesi
const sectors = [
    'Teknoloji & Bilişim',
    'Eğitim & Danışmanlık',
    'İdari & Ofis İşleri',
    'Üretim & El Sanatları',
    'Sanat & Medya',
    'Sağlık & Sosyal Hizmetler',
    'E-Ticaret & Girişimcilik'
];

// Örnek veri
const employers = [
    {
        id: 1,
        name: 'Tech Solutions A.Ş.',
        sector: 'Teknoloji & Bilişim',
        location: 'Uzaktan',
        position: 'Yazılım Geliştirici',
        supports: 'Esnek çalışma saatleri, Yardımcı teknoloji desteği, Ergonomik ekipman desteği',
        salary: '45.000 - 65.000 TL',
        icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'Engelli bireylerin de rahatlıkla çalışabileceği yazılım geliştirme pozisyonumuz için deneyimli yazılımcılar arıyoruz. Uzaktan çalışma imkanı ile kendi evinizden çalışabilirsiniz.',
        responsibilities: [
            'Web uygulamaları geliştirme ve bakımı',
            'Mevcut sistemlerin optimizasyonu',
            'Kod kalitesi ve performans iyileştirmeleri',
            'Teknik dokümantasyon hazırlama',
            'Takım içi kod değerlendirmelerine katılım'
        ],
        requirements: [
            'En az 2 yıl yazılım geliştirme deneyimi',
            'JavaScript, React ve Node.js tecrübesi',
            'Git versiyon kontrol sistemi bilgisi',
            'Problem çözme ve analitik düşünme yeteneği',
            'Takım çalışmasına yatkınlık'
        ],
        qualifications: [
            'Bilgisayar Mühendisliği veya ilgili bölüm mezunu',
            'Modern web teknolojilerine hakim',
            'İyi derecede İngilizce',
            'CI/CD süreçlerine aşinalık',
            'Test odaklı geliştirme deneyimi'
        ],
        benefits: [
            'Tam zamanlı uzaktan çalışma',
            'Özel sağlık sigortası',
            'Yıllık izin 20 gün',
            'Kişisel gelişim bütçesi',
            'Yardımcı teknoloji ekipman desteği',
            'MacBook Pro veya eşdeğeri ekipman'
        ]
    },
    {
        id: 2,
        name: 'Veri Merkezi Ltd.',
        sector: 'Teknoloji & Bilişim',
        location: 'İstanbul',
        position: 'Veri Giriş Uzmanı',
        supports: 'Ergonomik ekipman desteği, Ulaşım desteği, Özel çalışma istasyonu',
        salary: '25.000 - 35.000 TL',
        icon: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'Veri analizi ve raporlama departmanımızda görev alacak, detaylara özen gösteren veri giriş uzmanları arıyoruz. Engelli bireylere özel tasarlanmış çalışma ortamı ve ekipman desteği sağlanacaktır.',
        responsibilities: [
            'Müşteri verilerinin sisteme doğru girilmesi',
            'Veri doğrulama ve kalite kontrol',
            'Günlük ve haftalık raporların hazırlanması',
            'Veri analizi ve raporlama',
            'Veri arşivleme ve düzenleme'
        ],
        requirements: [
            'MS Office programlarına hakimiyet',
            'Hızlı ve doğru veri girişi yapabilme',
            'Dikkatli ve detay odaklı çalışma',
            'Temel düzeyde Excel formül bilgisi',
            'Veri gizliliği konusunda hassasiyet'
        ],
        qualifications: [
            'En az lise mezunu',
            'Benzer pozisyonda deneyim tercih sebebi',
            'Organizasyon ve planlama becerileri',
            'Takım çalışmasına yatkınlık',
            'Sorumluluk sahibi'
        ],
        benefits: [
            'Ergonomik çalışma istasyonu',
            'Özel ulaşım desteği',
            'Yemek kartı',
            'Özel sağlık sigortası',
            'Düzenli mola imkanları',
            'Hibrit çalışma seçeneği'
        ]
    },
    {
        id: 3,
        name: 'Dijital Ajans',
        sector: 'Teknoloji & Bilişim',
        location: 'Uzaktan',
        position: 'Grafik Tasarımcı',
        supports: 'Esnek çalışma, Yazılım lisansları, Ergonomik ekipman',
        salary: '35.000 - 50.000 TL',
        icon: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'Yaratıcı ekibimize katılacak, modern tasarım trendlerini takip eden grafik tasarımcılar arıyoruz. Uzaktan çalışma imkanı ile yaratıcılığınızı evinizden sergileyebilirsiniz.',
        responsibilities: [
            'Sosyal medya görselleri tasarımı',
            'Web sitesi arayüz tasarımları',
            'Logo ve kurumsal kimlik tasarımları',
            'Dijital reklam materyalleri hazırlama',
            'Müşteri sunumları için görsel içerik üretimi'
        ],
        requirements: [
            'Adobe Creative Suite programlarına hakimiyet',
            'UI/UX tasarım prensipleri bilgisi',
            'Tipografi ve renk teorisi bilgisi',
            'Responsive tasarım deneyimi',
            'Portfolio sunumu'
        ],
        qualifications: [
            'Grafik Tasarım veya ilgili bölüm mezunu',
            'En az 2 yıl tasarım deneyimi',
            'Görsel iletişim becerileri',
            'Yaratıcı düşünme yeteneği',
            'Zaman yönetimi becerileri'
        ],
        benefits: [
            'Tam uzaktan çalışma',
            'Adobe Creative Cloud lisansı',
            'Tasarım ekipmanları desteği',
            'Proje bazlı primler',
            'Mesleki eğitim desteği',
            'Esnek çalışma saatleri'
        ]
    },
    {
        id: 4,
        name: 'Global Eğitim',
        sector: 'Eğitim & Danışmanlık',
        location: 'Uzaktan',
        position: 'Online İngilizce Öğretmeni',
        supports: 'Esnek çalışma saatleri, Eğitim desteği, Online eğitim platformu',
        salary: '30.000 - 45.000 TL',
        icon: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'Online eğitim platformumuzda ders verecek, deneyimli İngilizce öğretmenleri arıyoruz. Kendi ders programınızı oluşturabilir ve evden çalışabilirsiniz.',
        responsibilities: [
            'Online İngilizce dersleri verme',
            'Öğrenci gelişim takibi ve raporlama',
            'Ders materyalleri hazırlama',
            'Öğrenci motivasyonunu artırıcı aktiviteler planlama',
            'Veli görüşmeleri ve geri bildirim'
        ],
        requirements: [
            'İngilizce Öğretmenliği veya ilgili bölüm mezunu',
            'CELTA/DELTA veya eşdeğer sertifika',
            'Online eğitim deneyimi',
            'Bilgisayar ve internet kullanımında yetkinlik',
            'Sabırlı ve iletişimi güçlü olmak'
        ],
        qualifications: [
            'En az 2 yıl öğretmenlik deneyimi',
            'İleri seviye İngilizce (C1/C2)',
            'Dijital öğretim araçları kullanım becerisi',
            'Zaman yönetimi becerileri',
            'Adaptasyon yeteneği'
        ],
        benefits: [
            'Esnek çalışma saatleri',
            'Online eğitim platformu üyeliği',
            'Mesleki gelişim eğitimleri',
            'Performans primleri',
            'Özel sağlık sigortası',
            'Yıllık izin 20 gün'
        ]
    },
    {
        id: 5,
        name: 'Kariyer Merkezi',
        sector: 'Eğitim & Danışmanlık',
        location: 'İstanbul',
        position: 'Kariyer Danışmanı',
        supports: 'Hibrit çalışma, Ulaşım desteği, Ergonomik ofis ekipmanları',
        salary: '40.000 - 55.000 TL',
        icon: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'Engelli bireylere özel kariyer danışmanlığı hizmeti verecek, deneyimli danışmanlar arıyoruz. Hibrit çalışma modeli ile ofis ve uzaktan çalışma imkanı sunuyoruz.',
        responsibilities: [
            'Bireysel kariyer danışmanlığı hizmeti verme',
            'CV hazırlama ve mülakat teknikleri eğitimi',
            'Kariyer gelişim planları oluşturma',
            'İş arama stratejileri geliştirme',
            'Grup workshopları düzenleme'
        ],
        requirements: [
            'Psikoloji, PDR veya ilgili bölüm mezunu',
            'Kariyer danışmanlığı sertifikası',
            'Engelli bireylerle çalışma deneyimi',
            'İyi derecede iletişim becerileri',
            'MS Office programlarına hakimiyet'
        ],
        qualifications: [
            'En az 3 yıl danışmanlık deneyimi',
            'İnsan kaynakları süreçlerine hakimiyet',
            'Empati yeteneği yüksek',
            'Analitik düşünme becerisi',
            'Sunum ve eğitmenlik deneyimi'
        ],
        benefits: [
            'Hibrit çalışma modeli',
            'Ulaşım ve yemek desteği',
            'Özel sağlık sigortası',
            'Yıllık izin 20 gün',
            'Mesleki gelişim eğitimleri',
            'Performans primi'
        ]
    },
    {
        id: 6,
        name: 'İdeal Ofis',
        sector: 'İdari & Ofis İşleri',
        location: 'Ankara',
        position: 'İdari Asistan',
        supports: 'Ergonomik ekipman, Sağlık sigortası, Ulaşım desteği',
        salary: '25.000 - 30.000 TL',
        icon: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'Ankara merkez ofisimizde görev alacak, organizasyon becerileri yüksek idari asistan arıyoruz. Engelli bireylere özel tasarlanmış çalışma ortamı sunulmaktadır.',
        responsibilities: [
            'Genel ofis yönetimi ve koordinasyonu',
            'Toplantı ve seyahat organizasyonları',
            'Telefon ve e-posta yönetimi',
            'Dosyalama ve arşiv düzenleme',
            'Raporlama ve sunum hazırlıkları'
        ],
        requirements: [
            'En az lise mezunu',
            'MS Office programlarına hakimiyet',
            'Düzgün diksiyona sahip olmak',
            'Organizasyon ve planlama becerileri',
            'Çok yönlü çalışabilme yeteneği'
        ],
        qualifications: [
            'Benzer pozisyonda en az 1 yıl deneyim',
            'İyi derecede yazılı ve sözlü iletişim',
            'Problem çözme yeteneği',
            'Detay odaklı çalışma',
            'Takım çalışmasına yatkınlık'
        ],
        benefits: [
            'Ergonomik ofis ekipmanları',
            'Özel sağlık sigortası',
            'Yemek kartı',
            'Ulaşım desteği',
            'Yıllık izin 14 gün',
            'Bayram ikramiyeleri'
        ]
    },
    {
        id: 7,
        name: 'Sanat Atölyesi',
        sector: 'Üretim & El Sanatları',
        location: 'İzmir',
        position: 'El Sanatları Ustası',
        supports: 'Tam zamanlı, Malzeme desteği, Ergonomik çalışma alanı',
        salary: '25.000 - 32.000 TL',
        icon: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'El sanatları atölyemizde çalışacak, yaratıcı ve yetenekli el sanatları ustaları arıyoruz. Engelli bireylere uygun çalışma ortamı ve özel ekipman desteği sağlanacaktır.',
        responsibilities: [
            'El yapımı ürünler tasarlama ve üretme',
            'Atölye çalışmalarına katılım',
            'Malzeme planlaması ve takibi',
            'Ürün kalite kontrolü',
            'Müşteri siparişlerini hazırlama'
        ],
        requirements: [
            'El sanatları alanında deneyim',
            'El becerisi ve yaratıcılık',
            'Detaylara özen gösterme',
            'Malzeme bilgisi',
            'Takım çalışmasına yatkınlık'
        ],
        qualifications: [
            'El sanatları sertifikası tercih sebebi',
            'Benzer pozisyonda deneyim',
            'Estetik görüş',
            'Sabırlı ve dikkatli çalışma',
            'Yenilikçi düşünce yapısı'
        ],
        benefits: [
            'Malzeme ve ekipman desteği',
            'Ergonomik çalışma istasyonu',
            'Öğle yemeği',
            'Servis imkanı',
            'Satış primler',
            'Yıllık izin 14 gün'
        ]
    },
    {
        id: 8,
        name: 'Medya Plus',
        sector: 'Sanat & Medya',
        location: 'Uzaktan',
        position: 'İçerik Üretici',
        supports: 'Esnek çalışma, Ekipman desteği, Online eğitimler',
        salary: '25.000 - 30.000 TL',
        icon: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'Dijital medya ekibimize katılacak, yaratıcı içerik üreticileri arıyoruz. Uzaktan çalışma imkanı ile kendi çalışma ortamınızı oluşturabilirsiniz.',
        responsibilities: [
            'Blog yazıları ve makaleler hazırlama',
            'Sosyal medya içerikleri üretme',
            'SEO uyumlu içerik yazımı',
            'İçerik stratejisi geliştirme',
            'Görsel içerik düzenleme'
        ],
        requirements: [
            'Türkçe dilbilgisi ve yazım kurallarına hakimiyet',
            'SEO prensipleri bilgisi',
            'Sosyal medya platformları deneyimi',
            'Temel görsel düzenleme becerileri',
            'Araştırma ve analiz yeteneği'
        ],
        qualifications: [
            'İletişim veya ilgili bölüm mezunu tercih sebebi',
            'İçerik üretimi konusunda deneyim',
            'Yaratıcı düşünme yeteneği',
            'Zaman yönetimi becerileri',
            'Portfolio sunumu'
        ],
        benefits: [
            'Tam uzaktan çalışma',
            'Ekipman desteği',
            'Online eğitimler',
            'Esnek çalışma saatleri',
            'Performans primleri',
            'Yıllık izin 14 gün'
        ]
    },
    {
        id: 9,
        name: 'Sağlık Destek',
        sector: 'Sağlık & Sosyal Hizmetler',
        location: 'İstanbul',
        position: 'Psikolojik Danışman',
        supports: 'Hibrit çalışma, Süpervizyon desteği, Özel ofis',
        salary: '25.000 - 35.000 TL',
        icon: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'Engelli bireylerle çalışma deneyimi olan, empati yeteneği yüksek psikolojik danışmanlar arıyoruz. Hibrit çalışma modeli ile hem online hem yüz yüze danışmanlık imkanı.',
        responsibilities: [
            'Bireysel psikolojik danışmanlık hizmeti',
            'Online terapi seansları',
            'Vaka takibi ve raporlama',
            'Grup terapisi yönetimi',
            'Süpervizyon toplantılarına katılım'
        ],
        requirements: [
            'Psikoloji veya PDR bölümü mezunu',
            'Terapi eğitimi ve sertifikası',
            'En az 3 yıl klinik deneyim',
            'Engelli bireylerle çalışma deneyimi',
            'Süpervizyon altında çalışma'
        ],
        qualifications: [
            'Yüksek lisans tercih sebebi',
            'Farklı terapi yaklaşımları bilgisi',
            'Güçlü empati yeteneği',
            'İyi derecede iletişim becerileri',
            'Profesyonel etik değerlere bağlılık'
        ],
        benefits: [
            'Hibrit çalışma imkanı',
            'Düzenli süpervizyon desteği',
            'Özel sağlık sigortası',
            'Mesleki gelişim desteği',
            'Konferans katılım desteği',
            'Yıllık izin 20 gün'
        ]
    },
    {
        id: 10,
        name: 'E-Ticaret Pro',
        sector: 'E-Ticaret & Girişimcilik',
        location: 'Uzaktan',
        position: 'E-Ticaret Uzmanı',
        supports: 'Esnek çalışma, Online eğitimler, Yazılım lisansları',
        salary: '32.000 - 45.000 TL',
        icon: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
        description: 'E-ticaret operasyonlarımızı yönetecek, dijital pazarlama konusunda deneyimli uzmanlar arıyoruz. Tam uzaktan çalışma imkanı ile esnek çalışma saatleri sunuyoruz.',
        responsibilities: [
            'E-ticaret platformu yönetimi',
            'Ürün listelemeleri ve içerik optimizasyonu',
            'Satış ve performans analizi',
            'Dijital pazarlama kampanyaları',
            'Müşteri deneyimi iyileştirme'
        ],
        requirements: [
            'E-ticaret platformları deneyimi',
            'Dijital pazarlama bilgisi',
            'Analitik düşünme yeteneği',
            'MS Office ve e-ticaret yazılımları kullanımı',
            'Proje yönetimi becerileri'
        ],
        qualifications: [
            'İşletme veya ilgili bölüm mezunu',
            'E-ticaret sektöründe en az 2 yıl deneyim',
            'Google Analytics sertifikası',
            'SEO/SEM bilgisi',
            'Veri analizi becerileri'
        ],
        benefits: [
            'Tam uzaktan çalışma',
            'Online eğitim platformu üyeliği',
            'E-ticaret yazılımları lisansları',
            'Performans primleri',
            'Esnek çalışma saatleri',
            'Yıllık izin 14 gün'
        ]
    }
];

// Kaynaklar için örnek veri
const resources = [
    {
        id: 1,
        title: 'Özgeçmiş Hazırlama Rehberi',
        icon: 'fas fa-file-alt',
        content: `
            <h3>Etkili Bir Özgeçmiş Nasıl Hazırlanır?</h3>
            <ul>
                <li>Kişisel bilgilerinizi eksiksiz ve doğru bir şekilde belirtin</li>
                <li>İş deneyimlerinizi kronolojik sırayla ve detaylı olarak açıklayın</li>
                <li>Eğitim bilgilerinizi ve sertifikalarınızı ekleyin</li>
                <li>Becerilerinizi ve yetkinliklerinizi öne çıkarın</li>
                <li>Varsa gönüllü çalışmalarınızı ve projelerinizi belirtin</li>
                <li>Referanslarınızı ekleyin</li>
            </ul>
            <h4>Dikkat Edilmesi Gerekenler:</h4>
            <ul>
                <li>Profesyonel bir fotoğraf kullanın</li>
                <li>Yazım hatalarından kaçının</li>
                <li>Düzenli ve okunaklı bir format kullanın</li>
                <li>Başvurduğunuz pozisyona uygun bilgileri öne çıkarın</li>
            </ul>
        `
    },
    {
        id: 2,
        title: 'Mülakat İpuçları',
        icon: 'fas fa-comments',
        content: `
            <h3>Başarılı Bir Mülakat İçin İpuçları</h3>
            <ul>
                <li>Şirket hakkında önceden araştırmalar yapın</li>
                <li>Pozisyon için gerekli becerileri gözden geçirin</li>
                <li>Olası sorulara hazırlıklı olun</li>
                <li>Profesyonel bir görünüm sergileyin</li>
                <li>Vücut dilinize dikkat edin</li>
                <li>Aktif dinleme yapın ve net cevaplar verin</li>
            </ul>
            <h4>Sık Sorulan Mülakat Soruları:</h4>
            <ul>
                <li>Kendinizden bahseder misiniz?</li>
                <li>Neden bizimle çalışmak istiyorsunuz?</li>
                <li>Güçlü ve zayıf yönleriniz nelerdir?</li>
                <li>Stresli durumlarla nasıl başa çıkarsınız?</li>
            </ul>
        `
    },
    {
        id: 3,
        title: 'İşyeri Uyarlama Bilgileri',
        icon: 'fas fa-universal-access',
        content: `
            <h3>İşyeri Uyarlama ve Destek Hizmetleri</h3>
            <ul>
                <li>Fiziksel Erişilebilirlik:
                    <ul>
                        <li>Rampa ve asansör sistemleri</li>
                        <li>Engelli tuvaletleri</li>
                        <li>Ergonomik çalışma istasyonları</li>
                        <li>Özel park alanları</li>
                    </ul>
                </li>
                <li>Teknolojik Destekler:
                    <ul>
                        <li>Ekran okuyucu yazılımlar</li>
                        <li>Büyütücü sistemler</li>
                        <li>Özel klavye ve mouse seçenekleri</li>
                        <li>Ses tanıma yazılımları</li>
                    </ul>
                </li>
                <li>Çalışma Düzenlemeleri:
                    <ul>
                        <li>Esnek çalışma saatleri</li>
                        <li>Uzaktan çalışma imkanı</li>
                        <li>Molalar için uygun düzenlemeler</li>
                        <li>İş paylaşımı seçenekleri</li>
                    </ul>
                </li>
            </ul>
            <h4>Yasal Haklar ve Destekler:</h4>
            <ul>
                <li>İş Kanunu'ndaki engelli hakları</li>
                <li>Devlet teşvikleri ve destekleri</li>
                <li>Vergi muafiyetleri</li>
                <li>Sosyal güvenlik avantajları</li>
            </ul>
        `
    },
    {
        id: 4,
        title: 'Kariyer Gelişim Kaynakları',
        icon: 'fas fa-chart-line',
        content: `
            <h3>Kariyer Gelişimi İçin Önemli Kaynaklar</h3>
            <ul>
                <li>Eğitim ve Sertifika Programları:
                    <ul>
                        <li>Online eğitim platformları</li>
                        <li>Mesleki sertifikasyon programları</li>
                        <li>Dil kursları</li>
                        <li>Teknik beceri eğitimleri</li>
                    </ul>
                </li>
                <li>Networking Fırsatları:
                    <ul>
                        <li>Profesyonel network platformları</li>
                        <li>Kariyer fuarları</li>
                        <li>Sektörel etkinlikler</li>
                        <li>Mentorluk programları</li>
                    </ul>
                </li>
                <li>Kişisel Gelişim:
                    <ul>
                        <li>Liderlik becerileri</li>
                        <li>İletişim yetenekleri</li>
                        <li>Zaman yönetimi</li>
                        <li>Problem çözme teknikleri</li>
                    </ul>
                </li>
            </ul>
            <h4>Faydalı Online Platformlar:</h4>
            <ul>
                <li>LinkedIn Learning</li>
                <li>Coursera</li>
                <li>Udemy</li>
                <li>EdX</li>
            </ul>
        `
    }
];

// Kaynak detaylarını göster
function showResource(resourceId) {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource) return;
    
    // Create resource modal if it doesn't exist
    if (!document.getElementById('resourceModal')) {
        const modal = document.createElement('div');
        modal.id = 'resourceModal';
        modal.className = 'modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeModal('resourceModal')">&times;</span>
                <div id="resourceDetailsContent">
                    <h2>${resource.title}</h2>
                    ${resource.content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    } else {
        // If modal exists, just update its content
        const detailsContent = document.getElementById('resourceDetailsContent');
        detailsContent.innerHTML = `
            <h2>${resource.title}</h2>
            ${resource.content}
        `;
    }
    
    // Scroll to top to ensure modal is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show the resource modal
    document.getElementById('resourceModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// İş ilanlarını filtreleme
function filterJobs() {
    const location = document.getElementById('locationFilter').value;
    const sector = document.getElementById('sectorFilter').value;

    const filteredJobs = employers.filter(job => {
        const matchesLocation = !location || job.location === location;
        const matchesSector = !sector || job.sector === sector;

        return matchesLocation && matchesSector;
    });

    displayEmployers(filteredJobs);
}

// İş ilanlarını listele
function displayEmployers(jobsToDisplay = employers) {
    const jobListings = document.querySelector('.job-listings');
    if (!jobListings) return;
    
    jobListings.innerHTML = '';
    
    if (jobsToDisplay.length === 0) {
        jobListings.innerHTML = '<p class="no-results">Aradığınız kriterlere uygun iş ilanı bulunamadı.</p>';
        return;
    }
    
    jobsToDisplay.forEach(job => {
        jobListings.appendChild(createJobCard(job));
    });
}

// İş kartlarını oluştur
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card animate-slide-up';
    card.style.animationDelay = `${Math.random() * 0.5}s`; // Random delay for staggered animation
    
    card.innerHTML = `
        <div class="job-card-header">
            <img src="${job.icon}" alt="${job.name} logosu" class="company-logo">
            <h3>${job.position}</h3>
        </div>
        <p class="company-name">${job.name}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
        <p><i class="fas fa-tag"></i> ${job.sector}</p>
        <p><i class="fas fa-money-bill-wave"></i> ${job.salary}</p>
        <div class="job-card-actions">
            <button onclick="showApplicationModal(${job.id})" class="btn">Başvur</button>
            <button onclick="window.location.href='job-details.html?id=${job.id}'" class="btn">Detaylar</button>
        </div>
    `;
    
    return card;
}

// İş detaylarını göster
function showJobDetails(jobId) {
    // Artık detay sayfasına yönlendiriyoruz
    window.location.href = `job-details.html?id=${jobId}`;
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    displayEmployers();
    
    // İş verilerini localStorage'a kaydet
    localStorage.setItem('employers', JSON.stringify(employers));
    
    // Sektör filtreleme için sektörleri ekle
    const sectorFilter = document.getElementById('sectorFilter');
    if (sectorFilter) {
        // Önce "Tüm Sektörler" seçeneği
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = 'Tüm Sektörler';
        sectorFilter.appendChild(allOption);
        
        // Sonra diğer sektörler
        sectors.forEach(sector => {
            const option = document.createElement('option');
            option.value = sector;
            option.textContent = sector;
            sectorFilter.appendChild(option);
        });
        
        // Filtre değişikliğini dinle
        sectorFilter.addEventListener('change', filterJobs);
    }
    
    // Konum filtreleme için
    const locationFilter = document.getElementById('locationFilter');
    if (locationFilter) {
        // Önce "Tüm Konumlar" seçeneği
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = 'Tüm Konumlar';
        locationFilter.appendChild(allOption);
        
        // Konumları topla (benzersiz)
        const locations = [...new Set(employers.map(job => job.location))];
        
        // Sonra diğer konumlar
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
        
        // Filtre değişikliğini dinle
        locationFilter.addEventListener('change', filterJobs);
    }
    
    // Tema tercihini kontrol et
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        isDarkMode = true;
    } else if (savedDarkMode === 'false') {
        document.body.classList.remove('dark-mode');
        isDarkMode = false;
    }
    
    // Tema ikonunu güncelle
    updateThemeIcon();
    
    // İşverenleri göster
    displayEmployers();
});

// Modal'ı kapat
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto'; // Scrolling'i geri aç
}

// Başvuru gönder
function submitApplication(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get the resume file
    const resumeFile = formData.get('resume');
    const resumeFileName = resumeFile ? resumeFile.name : '';
    
    // Get job details
    const jobId = parseInt(formData.get('jobId'));
    console.log('Job ID:', jobId); // Debug log
    
    const job = employers.find(j => j.id === jobId);
    console.log('Found job:', job); // Debug log
    
    if (!job) {
        alert('İş ilanı bulunamadı!');
        return;
    }
    
    // Create application object
    const application = {
        id: Date.now().toString(),
        jobId: jobId,
        jobTitle: job.position,
        companyName: job.name,
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        accommodation: formData.get('accommodation'),
        resumeFileName: resumeFileName,
        applicationDate: new Date().toISOString(),
        status: 'pending',
        jobDetails: {
            location: job.location,
            sector: job.sector,
            salary: job.salary,
            supports: job.supports,
            icon: job.icon,
            description: job.description
        }
    };
    
    console.log('New application:', application); // Debug log
    
    // Save application
    if (saveApplication(application)) {
        alert('Başvurunuz başarıyla kaydedildi!');
        closeModal('applicationModal');
        form.reset();
        document.getElementById('resumeFileName').textContent = '';
    } else {
        alert('Başvuru kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
}

function saveApplication(application) {
    try {
        // Get existing applications or initialize empty array
        let applications = JSON.parse(localStorage.getItem('applications')) || [];
        console.log('Existing applications:', applications); // Debug log
        
        // Add new application
        applications.push(application);
        
        // Save back to localStorage
        localStorage.setItem('applications', JSON.stringify(applications));
        console.log('Saved applications:', applications); // Debug log
        
        return true;
    } catch (error) {
        console.error('Error saving application:', error);
        return false;
    }
}

// İşveren kaydı
function submitEmployer(event) {
    event.preventDefault();
    
    const employer = {
        name: document.getElementById('companyName').value,
        email: document.getElementById('companyEmail').value,
        phone: document.getElementById('companyPhone').value,
        sector: document.getElementById('companySector').value,
        accommodations: document.getElementById('companyAccommodations').value
    };

    alert('Kaydınız başarıyla alındı! İncelendikten sonra size dönüş yapılacaktır.');
    closeModal('employerModal');
    document.getElementById('employerForm').reset();
}

// Destek modalını göster
function showSupportModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('supportModal')) {
        const modal = document.createElement('div');
        modal.id = 'supportModal';
        modal.className = 'modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeModal('supportModal')">&times;</span>
                <h2>Destek</h2>
                <div class="support-content">
                    <p>Bize Ulaşın: testordusu@gmail.com | Telefon: 543 210 98 76</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Scroll to top to ensure modal is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.getElementById('supportModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Scrolling'i engelle
}

// Başvuruları göster
function displayApplications() {
    const applicationsTab = document.getElementById('applications-tab');
    
    // Eğer applications-tab elementi yoksa, fonksiyondan çık
    if (!applicationsTab) {
        console.log('Applications tab not found'); // Debug log
        return;
    }
    
    // Başlık ve açıklama ekle
    applicationsTab.innerHTML = `
        <h2>Başvurularım</h2>
        <p>Yaptığınız iş başvurularını buradan takip edebilirsiniz.</p>
        <div id="applications-list" class="job-listings"></div>
    `;
    
    const applicationsList = document.getElementById('applications-list');
    
    // Get applications from localStorage
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    console.log('Displaying applications:', applications); // Debug log
    
    if (!applications || applications.length === 0) {
        applicationsList.innerHTML = '<p class="no-results">Henüz bir başvurunuz bulunmamaktadır.</p>';
        return;
    }

    // Başvuruları göster
    applications.sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));
    
    let html = '';
    applications.forEach(app => {
        console.log('Processing application:', app); // Debug log
        
        const applicationDate = new Date(app.applicationDate).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        html += `
            <div class="job-card">
                <div class="job-card-header">
                    ${app.jobDetails?.icon ? 
                        `<img src="${app.jobDetails.icon}" alt="${app.companyName} logosu" class="company-logo">` : 
                        ''
                    }
                    <h3>${app.jobTitle}</h3>
                </div>
                <p class="company-name">${app.companyName}</p>
                ${app.jobDetails ? `
                    <p><i class="fas fa-map-marker-alt"></i> ${app.jobDetails.location}</p>
                    <p><i class="fas fa-tag"></i> ${app.jobDetails.sector}</p>
                    <p><i class="fas fa-money-bill-wave"></i> ${app.jobDetails.salary}</p>
                ` : ''}
                <p><i class="fas fa-calendar"></i> Başvuru Tarihi: ${applicationDate}</p>
                <p><i class="fas fa-info-circle"></i> Durum: <span class="status-badge ${app.status}">${app.status}</span></p>
                <div class="job-card-actions">
                    <button onclick="showApplicationDetails('${app.id}')" class="btn">Başvuru Detayları</button>
                    <button onclick="deleteApplication('${app.id}')" class="btn delete-btn" title="Başvuruyu Sil">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    if (applicationsList) {
        applicationsList.innerHTML = html;
    }
}

// Başvuru sil
function deleteApplication(applicationId) {
    console.log('Deleting application:', applicationId); // Debug log
    
    if (confirm('Bu başvuruyu silmek istediğinize emin misiniz?')) {
        try {
            // Get applications from localStorage
            let applications = JSON.parse(localStorage.getItem('applications')) || [];
            console.log('Before deletion:', applications); // Debug log
            
            // Remove the application
            applications = applications.filter(app => app.id !== applicationId);
            console.log('After deletion:', applications); // Debug log
            
            // Save back to localStorage
            localStorage.setItem('applications', JSON.stringify(applications));
            
            // Refresh the display
            displayApplications();
            
            // Show success message
            alert('Başvuru başarıyla silindi.');
        } catch (error) {
            console.error('Error deleting application:', error);
            alert('Başvuru silinirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
}

// Tema ikonunu güncelle
function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        // Güneş ikonu - Karanlık moddan aydınlık moda geçiş için
        themeIcon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
    } else {
        // Ay ikonu - Aydınlık moddan karanlık moda geçiş için
        themeIcon.innerHTML = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>';
    }
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    updateThemeIcon();
}

// Başvuru detaylarını göster
function showApplicationDetails(applicationId) {
    console.log('Showing details for application:', applicationId); // Debug log
    
    // Get applications from localStorage
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    console.log('All applications:', applications); // Debug log
    
    const application = applications.find(app => app.id === applicationId);
    console.log('Found application:', application); // Debug log
    
    if (!application) {
        alert('Başvuru bulunamadı.');
        return;
    }
    
    const applicationDate = new Date(application.applicationDate).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let modal = document.getElementById('applicationDetailsModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'applicationDetailsModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('applicationDetailsModal')">&times;</span>
            <h2>Başvuru Detayları</h2>
            
            <div class="detail-section">
                <h3>İş Bilgileri</h3>
                <p><strong>Pozisyon:</strong> ${application.jobTitle}</p>
                <p><strong>Şirket:</strong> ${application.companyName}</p>
                ${application.jobDetails ? `
                    <p><strong>Konum:</strong> ${application.jobDetails.location}</p>
                    <p><strong>Sektör:</strong> ${application.jobDetails.sector}</p>
                    <p><strong>Maaş Aralığı:</strong> ${application.jobDetails.salary}</p>
                    <p><strong>Sunulan Destekler:</strong> ${application.jobDetails.supports}</p>
                    <p><strong>İş Tanımı:</strong> ${application.jobDetails.description}</p>
                ` : ''}
            </div>
            
            <div class="detail-section">
                <h3>Başvuru Bilgileri</h3>
                <p><strong>Ad Soyad:</strong> ${application.fullName}</p>
                <p><strong>E-posta:</strong> ${application.email}</p>
                <p><strong>Telefon:</strong> ${application.phone}</p>
                <p><strong>Başvuru Tarihi:</strong> ${applicationDate}</p>
                <p><strong>Durum:</strong> <span class="status-badge ${application.status}">${application.status}</span></p>
            </div>

            <div class="detail-section">
                <h3>Başvuru Detayları</h3>
                ${application.experience ? 
                    `<div class="detail-item">
                        <strong>Deneyim:</strong>
                        <p>${application.experience}</p>
                    </div>` : ''
                }
                ${application.accommodation ? 
                    `<div class="detail-item">
                        <strong>İhtiyaç Duyulan Destekler:</strong>
                        <p>${application.accommodation}</p>
                    </div>` : ''
                }
                ${application.resumeFileName ? 
                    `<div class="detail-item">
                        <strong>Özgeçmiş:</strong>
                        <p>${application.resumeFileName}</p>
                    </div>` : ''
                }
            </div>
            
            <div class="form-actions">
                <button onclick="closeModal('applicationDetailsModal')" class="btn">Kapat</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Sayfa dışında bir yere tıklandığında modalları kapat
window.onclick = function(event) {
    const modals = [
        document.getElementById('applicationModal'),
        document.getElementById('employerModal'),
        document.getElementById('applicationDetailsModal')
    ];
    
    modals.forEach(modal => {
        if (modal && event.target === modal) {
            closeModal(modal.id);
        }
    });
};

// Başvuru modalını göster
function showApplicationModal(jobId) {
    const job = employers.find(j => j.id === jobId);
    if (!job) return;

    // Form alanlarını doldur
    document.getElementById('jobId').value = job.id;
    document.getElementById('jobTitle').value = job.position;
    document.getElementById('applicantCompanyName').value = job.name;

    // Modalı göster
    const modal = document.getElementById('applicationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}