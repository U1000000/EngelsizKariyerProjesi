// Temayı kontrol etmek için.
let isDarkMode = document.body.classList.contains('dark-mode');

// Etkinlik kayıtlarını saklamak için
let eventRegistrations = JSON.parse(localStorage.getItem('eventRegistrations')) || [];

// Örnek etkinlik verileri
const events = [
    // OCAK 2025
    {
        id: 1,
        title: 'Yeni Yıl Karaoke Partisi',
        date: new Date(2025, 0, 2), // Perşembe
        time: '19:00 - 23:00',
        location: 'İstanbul',
        venue: 'Engelsiz Kafe, Kadıköy',
        type: 'karaoke',
        description: 'Yeni yıla özel karaoke gecesi.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 2,
        title: 'Kış Spor Festivali',
        date: new Date(2025, 0, 5), // Pazar
        time: '10:00 - 18:00',
        location: 'Ankara',
        venue: 'Spor Kompleksi',
        type: 'sports',
        description: 'Kış sporları festivali.',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 3,
        title: 'Sinema Günleri',
        date: new Date(2025, 0, 8), // Çarşamba
        time: '13:00 - 21:00',
        location: 'İzmir',
        venue: 'Kültür Merkezi',
        type: 'sinema',
        description: 'Engelsiz sinema günleri.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 37,
        title: 'Masa Tenisi Turnuvası',
        date: new Date(2025, 0, 11), // Cumartesi
        time: '14:00 - 19:00',
        location: 'İstanbul',
        venue: 'Spor Salonu',
        type: 'sports',
        description: 'Herkes için erişilebilir masa tenisi turnuvası.',
        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 38,
        title: 'Resim Atölyesi',
        date: new Date(2025, 0, 13), // Pazartesi
        time: '11:00 - 14:00',
        location: 'Ankara',
        venue: 'Sanat Merkezi',
        type: 'art',
        description: 'Dokunsal resim yapım atölyesi.',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 39,
        title: 'Online Satranç Turnuvası',
        date: new Date(2025, 0, 16), // Perşembe
        time: '16:00 - 20:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Çevrimiçi satranç turnuvası.',
        image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 40,
        title: 'Dans Workshopu',
        date: new Date(2025, 0, 19), // Pazar
        time: '15:00 - 17:00',
        location: 'İzmir',
        venue: 'Dans Stüdyosu',
        type: 'workshop',
        description: 'Modern dans teknikleri workshopu.',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 41,
        title: 'Müzik Terapi Seansı',
        date: new Date(2025, 0, 22), // Çarşamba
        time: '17:00 - 19:00',
        location: 'İstanbul',
        venue: 'Terapi Merkezi',
        type: 'workshop',
        description: 'Müzik ile terapi seansı.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },

    // ŞUBAT 2025
    {
        id: 4,
        title: 'Aşk Temalı Sanat Sergisi',
        date: new Date(2025, 1, 2), // Pazar
        time: '10:00 - 20:00',
        location: 'İstanbul',
        venue: 'Sanat Galerisi',
        type: 'art',
        description: 'Sevgililer gününe özel engelsiz sanat sergisi.',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988f7',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 42,
        title: 'Fotoğrafçılık Atölyesi',
        date: new Date(2025, 1, 5), // Çarşamba
        time: '13:00 - 16:00',
        location: 'Ankara',
        venue: 'Fotoğraf Stüdyosu',
        type: 'workshop',
        description: 'Temel fotoğrafçılık teknikleri.',
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 5,
        title: 'Online Oyun Turnuvası',
        date: new Date(2025, 1, 8), // Cumartesi
        time: '14:00 - 18:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Herkes için erişilebilir online oyun turnuvası.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 43,
        title: 'Sevgililer Günü Konseri',
        date: new Date(2025, 1, 14), // Cuma
        time: '19:00 - 22:00',
        location: 'İzmir',
        venue: 'Konser Salonu',
        type: 'art',
        description: 'Romantik şarkılar gecesi.',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 44,
        title: 'Bowling Turnuvası',
        date: new Date(2025, 1, 17), // Pazartesi
        time: '16:00 - 20:00',
        location: 'İstanbul',
        venue: 'Bowling Salonu',
        type: 'sports',
        description: 'Engelsiz bowling turnuvası.',
        image: 'https://images.unsplash.com/photo-1538511059256-0642efae0be0',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 45,
        title: 'Film Gösterimi',
        date: new Date(2025, 1, 20), // Perşembe
        time: '18:00 - 21:00',
        location: 'Ankara',
        venue: 'Sinema Salonu',
        type: 'sinema',
        description: 'Sesli betimleme ve altyazılı film gösterimi.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 6,
        title: 'Dans Atölyesi',
        date: new Date(2025, 1, 25), // Salı
        time: '15:00 - 17:00',
        location: 'Ankara',
        venue: 'Dans Stüdyosu',
        type: 'workshop',
        description: 'Tekerlekli sandalye dans atölyesi.',
        image: 'https://images.unsplash.com/photo-1545959570-a94b34b57f67',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 46,
        title: 'Karaoke Akşamı',
        date: new Date(2025, 1, 28), // Cuma
        time: '19:00 - 23:00',
        location: 'İzmir',
        venue: 'Müzik Cafe',
        type: 'karaoke',
        description: 'Eğlenceli karaoke gecesi.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },

    // MART 2025
    {
        id: 7,
        title: 'Bahar Konseri',
        date: new Date(2025, 2, 3), // Pazartesi
        time: '19:00 - 22:00',
        location: 'İzmir',
        venue: 'Konser Salonu',
        type: 'art',
        description: 'İşaret dili tercümanlı bahar konseri.',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 47,
        title: 'Yoga ve Meditasyon',
        date: new Date(2025, 2, 6), // Perşembe
        time: '09:00 - 11:00',
        location: 'İstanbul',
        venue: 'Wellness Merkezi',
        type: 'workshop',
        description: 'Herkes için erişilebilir yoga ve meditasyon seansı.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 48,
        title: 'E-Spor Turnuvası',
        date: new Date(2025, 2, 9), // Pazar
        time: '15:00 - 20:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Çevrimiçi oyun turnuvası.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 49,
        title: 'Seramik Atölyesi',
        date: new Date(2025, 2, 12), // Çarşamba
        time: '14:00 - 17:00',
        location: 'Ankara',
        venue: 'Sanat Atölyesi',
        type: 'workshop',
        description: 'Seramik şekillendirme atölyesi.',
        image: 'https://images.unsplash.com/photo-1565193298357-6b3b31dc1ced',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 50,
        title: 'Film Maratonu',
        date: new Date(2025, 2, 15), // Cumartesi
        time: '12:00 - 22:00',
        location: 'İzmir',
        venue: 'Kültür Merkezi',
        type: 'sinema',
        description: 'Engelsiz film maratonu.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 51,
        title: 'Bahar Dansları',
        date: new Date(2025, 2, 18), // Salı
        time: '17:00 - 19:00',
        location: 'İstanbul',
        venue: 'Dans Akademisi',
        type: 'workshop',
        description: 'Bahar temalı dans atölyesi.',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 8,
        title: 'Hikaye Okuma Günü',
        date: new Date(2025, 2, 21), // Cuma
        time: '13:00 - 16:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'workshop',
        description: 'Sesli betimleme ile hikaye okuma etkinliği.',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
        accessibility: ['visual'],
        status: 'upcoming'
    },
    {
        id: 9,
        title: 'Bowling Turnuvası',
        date: new Date(2025, 2, 24), // Pazartesi
        time: '14:00 - 18:00',
        location: 'Ankara',
        venue: 'Bowling Salonu',
        type: 'sports',
        description: 'Herkes için erişilebilir bowling turnuvası.',
        image: 'https://images.unsplash.com/photo-1538511059256-0642efae0be0',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },

    // NİSAN 2025
    {
        id: 10,
        title: 'Karaoke Yarışması',
        date: new Date(2025, 3, 2), // Çarşamba
        time: '18:00 - 23:00',
        location: 'İstanbul',
        venue: 'Müzik Cafe',
        type: 'karaoke',
        description: 'Ödüllü karaoke yarışması.',
        image: 'https://images.unsplash.com/photo-1573676564795-c92c2fb1a6cd',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 52,
        title: 'Doğa Fotoğrafçılığı',
        date: new Date(2025, 3, 5), // Cumartesi
        time: '10:00 - 15:00',
        location: 'İzmir',
        venue: 'Botanik Bahçesi',
        type: 'workshop',
        description: 'Doğa fotoğrafçılığı atölyesi.',
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 53,
        title: 'Masa Oyunları Şenliği',
        date: new Date(2025, 3, 7), // Pazartesi
        time: '13:00 - 18:00',
        location: 'Ankara',
        venue: 'Oyun Cafe',
        type: 'game',
        description: 'Çeşitli masa oyunları etkinliği.',
        image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 54,
        title: 'Voleybol Turnuvası',
        date: new Date(2025, 3, 10), // Perşembe
        time: '14:00 - 18:00',
        location: 'İstanbul',
        venue: 'Spor Salonu',
        type: 'sports',
        description: 'Engelsiz voleybol turnuvası.',
        image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 11,
        title: 'Resim Atölyesi',
        date: new Date(2025, 3, 13), // Pazar
        time: '11:00 - 14:00',
        location: 'İzmir',
        venue: 'Sanat Merkezi',
        type: 'art',
        description: 'Dokunsal resim yapım atölyesi.',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 55,
        title: 'Müzik Atölyesi',
        date: new Date(2025, 3, 16), // Çarşamba
        time: '16:00 - 18:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'workshop',
        description: 'Online müzik yapım atölyesi.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 56,
        title: 'Bahar Konseri',
        date: new Date(2025, 3, 19), // Cumartesi
        time: '20:00 - 22:00',
        location: 'Ankara',
        venue: 'Konser Salonu',
        type: 'art',
        description: 'İşaret dili tercümanlı konser.',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },

    // MAYIS 2025
    {
        id: 13,
        title: 'Bahçe Oyunları Festivali',
        date: new Date(2025, 4, 1), // Perşembe
        time: '10:00 - 18:00',
        location: 'Ankara',
        venue: 'Şehir Parkı',
        type: 'game',
        description: 'Geleneksel bahçe oyunları festivali.',
        image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 57,
        title: 'Satranç Turnuvası',
        date: new Date(2025, 4, 4), // Pazar
        time: '13:00 - 17:00',
        location: 'İstanbul',
        venue: 'Satranç Kulübü',
        type: 'game',
        description: 'Engelsiz satranç turnuvası.',
        image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 58,
        title: 'Modern Dans Gösterisi',
        date: new Date(2025, 4, 7), // Çarşamba
        time: '19:00 - 21:00',
        location: 'İzmir',
        venue: 'Kültür Merkezi',
        type: 'art',
        description: 'Modern dans gösterisi ve workshop.',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 59,
        title: 'Dijital Sanat Atölyesi',
        date: new Date(2025, 4, 10), // Cumartesi
        time: '15:00 - 18:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'workshop',
        description: 'Dijital sanat teknikleri workshop.',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988f7',
        accessibility: ['visual'],
        status: 'upcoming'
    },
    {
        id: 14,
        title: 'Müzik Atölyesi',
        date: new Date(2025, 4, 12), // Pazartesi
        time: '15:00 - 17:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'workshop',
        description: 'Ritim ve müzik terapi atölyesi.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 60,
        title: 'Sinema Günü',
        date: new Date(2025, 4, 15), // Perşembe
        time: '13:00 - 22:00',
        location: 'Ankara',
        venue: 'Sinema Salonu',
        type: 'sinema',
        description: 'Engelsiz sinema günü.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 61,
        title: 'Karaoke Gecesi',
        date: new Date(2025, 4, 18), // Pazar
        time: '19:00 - 23:00',
        location: 'İstanbul',
        venue: 'Müzik Cafe',
        type: 'karaoke',
        description: 'Eğlenceli karaoke gecesi.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 15,
        title: 'Yoga Günü',
        date: new Date(2025, 4, 21), // Çarşamba
        time: '09:00 - 12:00',
        location: 'İzmir',
        venue: 'Spor Salonu',
        type: 'sports',
        description: 'Herkes için erişilebilir yoga dersi.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },

    // HAZİRAN 2025
    {
        id: 16,
        title: 'Yaz Konseri',
        date: new Date(2025, 5, 3), // Salı
        time: '20:00 - 23:00',
        location: 'İstanbul',
        venue: 'Açık Hava Tiyatrosu',
        type: 'art',
        description: 'İşaret dili tercümanlı yaz konseri.',
        image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 62,
        title: 'Masa Tenisi Turnuvası',
        date: new Date(2025, 5, 6), // Cuma
        time: '14:00 - 18:00',
        location: 'Ankara',
        venue: 'Spor Salonu',
        type: 'sports',
        description: 'Engelsiz masa tenisi turnuvası.',
        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 63,
        title: 'Resim Sergisi',
        date: new Date(2025, 5, 9), // Pazartesi
        time: '10:00 - 20:00',
        location: 'İzmir',
        venue: 'Sanat Galerisi',
        type: 'art',
        description: 'Karma resim sergisi.',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988f7',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 64,
        title: 'Dans Workshop',
        date: new Date(2025, 5, 12), // Perşembe
        time: '16:00 - 18:00',
        location: 'İstanbul',
        venue: 'Dans Stüdyosu',
        type: 'workshop',
        description: 'Modern dans teknikleri.',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 17,
        title: 'E-Spor Turnuvası',
        date: new Date(2025, 5, 15), // Pazar
        time: '13:00 - 19:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Erişilebilir oyunlar e-spor turnuvası.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 65,
        title: 'Yaz Sineması',
        date: new Date(2025, 5, 18), // Çarşamba
        time: '21:00 - 23:00',
        location: 'Ankara',
        venue: 'Açık Hava Sineması',
        type: 'sinema',
        description: 'Açık havada film gösterimi.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 66,
        title: 'Müzik Workshop',
        date: new Date(2025, 5, 21), // Cumartesi
        time: '15:00 - 17:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'workshop',
        description: 'Online müzik atölyesi.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 18,
        title: 'Sinema Maratonu',
        date: new Date(2025, 5, 24), // Salı
        time: '12:00 - 22:00',
        location: 'Ankara',
        venue: 'Kültür Merkezi',
        type: 'sinema',
        description: 'Sesli betimleme ve altyazılı film maratonu.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },

    // HAZİRAN 2025
    {
        id: 19,
        title: 'Plaj Voleybolu',
        date: new Date(2025, 6, 2), // Çarşamba
        time: '16:00 - 19:00',
        location: 'İzmir',
        venue: 'Halk Plajı',
        type: 'sports',
        description: 'Engelsiz plaj voleybolu turnuvası.',
        image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 67,
        title: 'Yaz Resim Atölyesi',
        date: new Date(2025, 6, 5), // Cumartesi
        time: '10:00 - 13:00',
        location: 'İstanbul',
        venue: 'Sanat Merkezi',
        type: 'art',
        description: 'Açık havada resim atölyesi.',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 68,
        title: 'Satranç Turnuvası',
        date: new Date(2025, 6, 8), // Salı
        time: '14:00 - 18:00',
        location: 'Ankara',
        venue: 'Satranç Kulübü',
        type: 'game',
        description: 'Yaz satranç turnuvası.',
        image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 69,
        title: 'Açık Hava Sineması',
        date: new Date(2025, 6, 11), // Cuma
        time: '21:00 - 23:00',
        location: 'İzmir',
        venue: 'Sahil Amfi Tiyatro',
        type: 'sinema',
        description: 'Yaz akşamı film gösterimi.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 70,
        title: 'Yüzme Etkinliği',
        date: new Date(2025, 6, 14), // Pazartesi
        time: '10:00 - 12:00',
        location: 'İstanbul',
        venue: 'Yüzme Havuzu',
        type: 'sports',
        description: 'Engelsiz yüzme etkinliği.',
        image: 'https://images.unsplash.com/photo-1560090995-01632a28895b',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 71,
        title: 'Yoga ve Meditasyon',
        date: new Date(2025, 6, 17), // Perşembe
        time: '08:00 - 10:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'workshop',
        description: 'Online yoga ve meditasyon seansı.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        accessibility: ['visual'],
        status: 'upcoming'
    },
    {
        id: 20,
        title: 'Yaz Karaoke Gecesi',
        date: new Date(2025, 6, 20), // Pazar
        time: '20:00 - 00:00',
        location: 'İstanbul',
        venue: 'Teras Cafe',
        type: 'karaoke',
        description: 'Açık havada karaoke gecesi.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 21,
        title: 'Seramik Atölyesi',
        date: new Date(2025, 6, 23), // Çarşamba
        time: '14:00 - 17:00',
        location: 'Ankara',
        venue: 'Sanat Atölyesi',
        type: 'workshop',
        description: 'Dokunsal seramik yapım atölyesi.',
        image: 'https://images.unsplash.com/photo-1565193298357-6b3b31dc1ced',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },

    // AĞUSTOS 2025
    {
        id: 22,
        title: 'Yaz Sineması',
        date: new Date(2025, 7, 2), // Cumartesi
        time: '21:00 - 23:30',
        location: 'İzmir',
        venue: 'Açık Hava Sineması',
        type: 'sinema',
        description: 'Açık havada erişilebilir film gösterimi.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 72,
        title: 'Müzik Workshop',
        date: new Date(2025, 7, 5), // Salı
        time: '15:00 - 17:00',
        location: 'İstanbul',
        venue: 'Müzik Stüdyosu',
        type: 'workshop',
        description: 'Enstrüman tanıtım workshop.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 73,
        title: 'Plaj Oyunları',
        date: new Date(2025, 7, 8), // Cuma
        time: '16:00 - 19:00',
        location: 'İzmir',
        venue: 'Halk Plajı',
        type: 'sports',
        description: 'Plajda spor aktiviteleri.',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 74,
        title: 'Yaz Konseri',
        date: new Date(2025, 7, 11), // Pazartesi
        time: '20:00 - 22:00',
        location: 'Ankara',
        venue: 'Açık Hava Sahnesi',
        type: 'art',
        description: 'Açık havada müzik konseri.',
        image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 75,
        title: 'Fotoğrafçılık Gezisi',
        date: new Date(2025, 7, 14), // Perşembe
        time: '09:00 - 13:00',
        location: 'İstanbul',
        venue: 'Şehir Turu',
        type: 'workshop',
        description: 'Şehir fotoğrafçılığı gezisi.',
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 23,
        title: 'Masa Oyunları Turnuvası',
        date: new Date(2025, 7, 17), // Pazar
        time: '13:00 - 18:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Çevrimiçi masa oyunları turnuvası.',
        image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 76,
        title: 'E-Spor Turnuvası',
        date: new Date(2025, 7, 20), // Çarşamba
        time: '15:00 - 20:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Online oyun turnuvası.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 24,
        title: 'Dans Gösterisi',
        date: new Date(2025, 7, 23), // Cumartesi
        time: '19:00 - 21:00',
        location: 'İstanbul',
        venue: 'Kültür Merkezi',
        type: 'art',
        description: 'Engelsiz dans gösterisi.',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },

    // EYLÜL 2025
    {
        id: 25,
        title: 'Müzik Festivali',
        date: new Date(2025, 8, 1), // Pazartesi
        time: '14:00 - 22:00',
        location: 'Ankara',
        venue: 'Festival Alanı',
        type: 'art',
        description: 'Engelsiz müzik festivali.',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 77,
        title: 'Yoga ve Pilates',
        date: new Date(2025, 8, 4), // Perşembe
        time: '09:00 - 11:00',
        location: 'İzmir',
        venue: 'Spor Merkezi',
        type: 'sports',
        description: 'Yoga ve pilates dersi.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 78,
        title: 'Sinema Günü',
        date: new Date(2025, 8, 7), // Pazar
        time: '13:00 - 22:00',
        location: 'İstanbul',
        venue: 'Sinema Salonu',
        type: 'sinema',
        description: 'Erişilebilir film gösterimleri.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 26,
        title: 'Spor Şenliği',
        date: new Date(2025, 8, 10), // Çarşamba
        time: '10:00 - 18:00',
        location: 'İzmir',
        venue: 'Spor Kompleksi',
        type: 'sports',
        description: 'Çeşitli spor aktiviteleri ve yarışmalar.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 79,
        title: 'Resim Sergisi',
        date: new Date(2025, 8, 13), // Cumartesi
        time: '10:00 - 19:00',
        location: 'Ankara',
        venue: 'Sanat Galerisi',
        type: 'art',
        description: 'Karma resim sergisi.',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988f7',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 80,
        title: 'Dans Workshop',
        date: new Date(2025, 8, 16), // Salı
        time: '16:00 - 18:00',
        location: 'İstanbul',
        venue: 'Dans Stüdyosu',
        type: 'workshop',
        description: 'Modern dans teknikleri.',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 81,
        title: 'Masa Tenisi Turnuvası',
        date: new Date(2025, 8, 19), // Cuma
        time: '14:00 - 18:00',
        location: 'İzmir',
        venue: 'Spor Salonu',
        type: 'sports',
        description: 'Masa tenisi turnuvası.',
        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 27,
        title: 'Karaoke Partisi',
        date: new Date(2025, 8, 22), // Pazartesi
        time: '19:00 - 23:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'karaoke',
        description: 'Çevrimiçi karaoke partisi.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },

    // EKİM 2025
    {
        id: 28,
        title: 'Sonbahar Film Festivali',
        date: new Date(2025, 9, 2), // Perşembe
        time: '12:00 - 23:00',
        location: 'İstanbul',
        venue: 'Sinema Salonu',
        type: 'sinema',
        description: 'Erişilebilir film festivali.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 82,
        title: 'Müzik Atölyesi',
        date: new Date(2025, 9, 5), // Pazar
        time: '15:00 - 17:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'workshop',
        description: 'Online müzik yapım atölyesi.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 83,
        title: 'Bowling Turnuvası',
        date: new Date(2025, 9, 8), // Çarşamba
        time: '14:00 - 18:00',
        location: 'Ankara',
        venue: 'Bowling Salonu',
        type: 'sports',
        description: 'Engelsiz bowling turnuvası.',
        image: 'https://images.unsplash.com/photo-1538511059256-0642efae0be0',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 84,
        title: 'E-Spor Şampiyonası',
        date: new Date(2025, 9, 11), // Cumartesi
        time: '13:00 - 19:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Online oyun turnuvası.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 29,
        title: 'Resim Sergisi',
        date: new Date(2025, 9, 14), // Salı
        time: '10:00 - 20:00',
        location: 'Ankara',
        venue: 'Sanat Galerisi',
        type: 'art',
        description: 'Dokunsal resim sergisi.',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988f7',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 85,
        title: 'Dans Workshop',
        date: new Date(2025, 9, 17), // Cuma
        time: '16:00 - 18:00',
        location: 'İzmir',
        venue: 'Dans Stüdyosu',
        type: 'workshop',
        description: 'Modern dans teknikleri.',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 86,
        title: 'Karaoke Gecesi',
        date: new Date(2025, 9, 20), // Pazartesi
        time: '19:00 - 23:00',
        location: 'İstanbul',
        venue: 'Müzik Cafe',
        type: 'karaoke',
        description: 'Eğlenceli karaoke gecesi.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 30,
        title: 'Strateji Oyunları Turnuvası',
        date: new Date(2025, 9, 23), // Perşembe
        time: '14:00 - 18:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Erişilebilir strateji oyunları turnuvası.',
        image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },

    // KASIM 2025
    {
        id: 31,
        title: 'Tiyatro Gösterisi',
        date: new Date(2025, 10, 2), // Pazar
        time: '19:00 - 21:30',
        location: 'İzmir',
        venue: 'Şehir Tiyatrosu',
        type: 'art',
        description: 'İşaret dili tercümanlı tiyatro gösterisi.',
        image: 'https://images.unsplash.com/photo-1503095396549-807759245b35',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 87,
        title: 'Sinema Günü',
        date: new Date(2025, 10, 5), // Çarşamba
        time: '13:00 - 22:00',
        location: 'Ankara',
        venue: 'Sinema Salonu',
        type: 'sinema',
        description: 'Erişilebilir film gösterimleri.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 88,
        title: 'Masa Oyunları Şenliği',
        date: new Date(2025, 10, 8), // Cumartesi
        time: '13:00 - 18:00',
        location: 'İstanbul',
        venue: 'Oyun Cafe',
        type: 'game',
        description: 'Çeşitli masa oyunları etkinliği.',
        image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 89,
        title: 'Resim Atölyesi',
        date: new Date(2025, 10, 11), // Salı
        time: '11:00 - 14:00',
        location: 'İzmir',
        venue: 'Sanat Merkezi',
        type: 'art',
        description: 'Dokunsal resim yapım atölyesi.',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
        accessibility: ['wheelchair', 'visual'],
        status: 'upcoming'
    },
    {
        id: 32,
        title: 'Bowling Turnuvası',
        date: new Date(2025, 10, 14), // Cuma
        time: '14:00 - 18:00',
        location: 'İstanbul',
        venue: 'Bowling Salonu',
        type: 'sports',
        description: 'Engelsiz bowling turnuvası.',
        image: 'https://images.unsplash.com/photo-1538511059256-0642efae0be0',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 90,
        title: 'Karaoke Akşamı',
        date: new Date(2025, 10, 17), // Pazartesi
        time: '19:00 - 23:00',
        location: 'Ankara',
        venue: 'Müzik Cafe',
        type: 'karaoke',
        description: 'Eğlenceli karaoke gecesi.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 33,
        title: 'Yazarlık Atölyesi',
        date: new Date(2025, 10, 20), // Perşembe
        time: '15:00 - 17:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'workshop',
        description: 'Yaratıcı yazarlık atölyesi.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 91,
        title: 'Dans Gösterisi',
        date: new Date(2025, 10, 23), // Pazar
        time: '19:00 - 21:00',
        location: 'İstanbul',
        venue: 'Kültür Merkezi',
        type: 'art',
        description: 'Modern dans gösterisi.',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },

    // ARALIK 2025
    {
        id: 92,
        title: 'Yılbaşı Hazırlık Atölyesi',
        date: new Date(2025, 11, 3), // Çarşamba
        time: '14:00 - 17:00',
        location: 'Ankara',
        venue: 'Sanat Atölyesi',
        type: 'workshop',
        description: 'Yılbaşı süsleri yapım atölyesi.',
        image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be',
        accessibility: ['wheelchair'],
        status: 'upcoming'
    },
    {
        id: 93,
        title: 'Kış Sineması',
        date: new Date(2025, 11, 6), // Cumartesi
        time: '18:00 - 21:00',
        location: 'İzmir',
        venue: 'Sinema Salonu',
        type: 'sinema',
        description: 'Kış temalı film gösterimi.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 94,
        title: 'E-Spor Turnuvası',
        date: new Date(2025, 11, 9), // Salı
        time: '15:00 - 20:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Online oyun turnuvası.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 95,
        title: 'Yılbaşı Konseri Provası',
        date: new Date(2025, 11, 12), // Cuma
        time: '18:00 - 20:00',
        location: 'İstanbul',
        venue: 'Müzik Stüdyosu',
        type: 'workshop',
        description: 'Yılbaşı konseri hazırlık çalışması.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 96,
        title: 'Yılbaşı Karaoke',
        date: new Date(2025, 11, 15), // Pazartesi
        time: '20:00 - 23:00',
        location: 'Ankara',
        venue: 'Eğlence Merkezi',
        type: 'karaoke',
        description: 'Yılbaşı özel karaoke gecesi.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 35,
        title: 'Kış Oyunları Festivali',
        date: new Date(2025, 11, 18), // Perşembe
        time: '11:00 - 17:00',
        location: 'Online',
        venue: 'Çevrimiçi Platform',
        type: 'game',
        description: 'Çevrimiçi kış temalı oyun festivali.',
        image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176',
        accessibility: ['visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 36,
        title: 'Yeni Yıl Film Maratonu',
        date: new Date(2025, 11, 21), // Pazar
        time: '12:00 - 23:00',
        location: 'İzmir',
        venue: 'Kültür Merkezi',
        type: 'sinema',
        description: 'Yeni yıl temalı film maratonu.',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c',
        accessibility: ['wheelchair', 'visual', 'hearing'],
        status: 'upcoming'
    },
    {
        id: 34,
        title: 'Yılbaşı Konseri',
        date: new Date(2025, 11, 31), // Çarşamba
        time: '20:00 - 00:00',
        location: 'Ankara',
        venue: 'Konser Salonu',
        type: 'art',
        description: 'Yılbaşı özel konseri.',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae',
        accessibility: ['wheelchair', 'hearing'],
        status: 'upcoming'
    }
];

// Takvim değişkenleri
let currentDate = new Date(2025, 0, 1); // 2025 yılının başlangıcı
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Etkinlik türleri
const eventTypes = {
    karaoke: {
        name: 'Karaoke',
        icon: 'fa-microphone'
    },
    sinema: {
        name: 'Sinema',
        icon: 'fa-film'
    },
    workshop: {
        name: 'Atölye Çalışması',
        icon: 'fa-tools'
    },
    game: {
        name: 'Oyun Etkinliği',
        icon: 'fa-gamepad'
    },
    sports: {
        name: 'Spor Etkinliği',
        icon: 'fa-running'
    },
    art: {
        name: 'Sanat Etkinliği',
        icon: 'fa-palette'
    }
};

// Erişilebilirlik özellikleri
const accessibilityFeatures = {
    wheelchair: {
        name: 'Tekerlekli Sandalye Erişimi',
        icon: 'fa-wheelchair'
    },
    hearing: {
        name: 'İşitme Engelli Dostu',
        icon: 'fa-deaf'
    },
    visual: {
        name: 'Görme Engelli Dostu',
        icon: 'fa-eye'
    }
};

// Etkinlikleri filtrele
function filterEvents() {
    const typeFilter = document.getElementById('eventTypeFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const accessibilityFilter = document.getElementById('accessibilityFilter').value;
    
    let filteredEvents = [...events]; // Orijinal diziyi kopyala
    
    // Tür filtresi
    if (typeFilter !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.type === typeFilter);
    }
    
    // Konum filtresi
    if (locationFilter !== 'all') {
        filteredEvents = filteredEvents.filter(event => {
            // Büyük/küçük harf duyarsız karşılaştırma
            const eventLocation = event.location.toLowerCase().trim();
            const filterLocation = locationFilter.toLowerCase().trim();
            return eventLocation === filterLocation;
        });
    }
    
    // Erişilebilirlik filtresi
    if (accessibilityFilter !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.accessibility.includes(accessibilityFilter));
    }
    
    // Filtrelenmiş etkinlikleri takvimde göster
    updateCalendarWithFilteredEvents(filteredEvents);
    // Yaklaşan etkinlikleri güncelle
    displayUpcomingEvents();
}

// Filtrelenmiş etkinliklerle takvimi güncelle
function updateCalendarWithFilteredEvents(filteredEvents) {
    const monthYearStr = getMonthName(currentMonth) + ' ' + currentYear;
    document.getElementById('currentMonth').textContent = monthYearStr;
    
    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    let startingDay = firstDay.getDay();
    if (startingDay === 0) startingDay = 7;
    startingDay = startingDay - 1;
    
    const totalDays = lastDay.getDate();
    const totalCells = Math.ceil((totalDays + startingDay) / 7) * 7;
    
    let date = 1;
    for (let i = 0; i < totalCells / 7; i++) {
        const row = document.createElement('tr');
        
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            
            if (i === 0 && j < startingDay) {
                // Boş hücre
                cell.innerHTML = '';
            } else if (date > totalDays) {
                // Boş hücre
                cell.innerHTML = '';
            } else {
                // Bugünün tarihini kontrol et
                const currentDate = new Date();
                const isToday = date === currentDate.getDate() && 
                               currentMonth === currentDate.getMonth() && 
                               currentYear === currentDate.getFullYear();
                
                // Gün hücresi
                const dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                if (isToday) {
                    dayNumber.style.color = 'var(--accent-color)';
                    dayNumber.style.fontWeight = 'bold';
                }
                dayNumber.textContent = date;
                cell.appendChild(dayNumber);
                
                // Bu güne ait etkinlikleri bul
                const dayEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.getDate() === date && 
                           eventDate.getMonth() === currentMonth && 
                           eventDate.getFullYear() === currentYear;
                });
                
                // Etkinlikleri hücreye ekle
                if (dayEvents.length > 0) {
                    const eventsContainer = document.createElement('div');
                    eventsContainer.className = 'day-events';
                    
                    dayEvents.forEach(event => {
                        const eventElement = document.createElement('div');
                        eventElement.className = 'event-title-small';
                        eventElement.title = `${event.title} - ${event.time}`;
                        
                        // Ana içerik container'ı
                        const contentContainer = document.createElement('div');
                        contentContainer.style.display = 'flex';
                        contentContainer.style.alignItems = 'center';
                        contentContainer.style.width = '100%';
                        contentContainer.style.gap = '4px';
                        
                        // Etkinlik türü ikonu
                        const typeIcon = document.createElement('i');
                        typeIcon.className = `fas ${eventTypes[event.type].icon}`;
                        typeIcon.style.flexShrink = '0';
                        
                        // Etkinlik başlığı
                        const titleSpan = document.createElement('span');
                        titleSpan.textContent = event.title;
                        titleSpan.style.overflow = 'hidden';
                        titleSpan.style.textOverflow = 'ellipsis';
                        
                        // Erişilebilirlik ikonları container'ı
                        const accessibilityContainer = document.createElement('div');
                        accessibilityContainer.className = 'accessibility-icons';
                        
                        event.accessibility.forEach(feature => {
                            const icon = document.createElement('i');
                            icon.className = `fas ${accessibilityFeatures[feature].icon}`;
                            icon.title = accessibilityFeatures[feature].name;
                            icon.style.fontSize = '0.8em';
                            accessibilityContainer.appendChild(icon);
                        });
                        
                        // Elementleri birleştir
                        contentContainer.appendChild(typeIcon);
                        contentContainer.appendChild(titleSpan);
                        contentContainer.appendChild(accessibilityContainer);
                        eventElement.appendChild(contentContainer);
                        
                        eventElement.addEventListener('click', () => showEventDetails(event.id));
                        eventsContainer.appendChild(eventElement);
                    });
                    
                    cell.appendChild(eventsContainer);
                }
                
                date++;
            }
            
            row.appendChild(cell);
        }
        
        calendarBody.appendChild(row);
        
        if (date > totalDays) {
            break;
        }
    }
}

// Yaklaşan etkinlikleri getir
function getUpcomingEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Aktif filtreleri al
    const typeFilter = document.getElementById('eventTypeFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const accessibilityFilter = document.getElementById('accessibilityFilter').value;
    
    // Etkinlikleri tarihe göre sırala ve gelecek etkinlikleri filtrele
    let futureEvents = events
        .filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
        });
    
    // Aktif filtrelere göre filtrele
    if (typeFilter !== 'all') {
        futureEvents = futureEvents.filter(event => event.type === typeFilter);
    }
    
    if (locationFilter !== 'all') {
        futureEvents = futureEvents.filter(event => {
            const eventLocation = event.location.toLowerCase().trim();
            const filterLocation = locationFilter.toLowerCase().trim();
            return eventLocation === filterLocation;
        });
    }
    
    if (accessibilityFilter !== 'all') {
        futureEvents = futureEvents.filter(event => event.accessibility.includes(accessibilityFilter));
    }
    
    // Tarihe göre sırala
    futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // İlk 3 etkinliği al
    return futureEvents.slice(0, 3);
}

// Yaklaşan etkinlikleri görüntüle
function displayUpcomingEvents() {
    const upcomingEvents = getUpcomingEvents();
    const upcomingEventsList = document.getElementById('upcomingEventsList');
    upcomingEventsList.innerHTML = '';
    
    upcomingEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = `${eventDate.getDate()} ${getMonthName(eventDate.getMonth())} ${eventDate.getFullYear()}`;
        
        // Erişilebilirlik ikonlarını oluştur
        const accessibilityIcons = event.accessibility
            .map(feature => `<i class="fas ${accessibilityFeatures[feature].icon}" title="${accessibilityFeatures[feature].name}"></i>`)
            .join('');
        
        const eventCard = document.createElement('div');
        eventCard.className = 'upcoming-event-card';
        eventCard.innerHTML = `
            <div class="upcoming-event-date">
                <i class="fas fa-calendar"></i> ${formattedDate}
            </div>
            <div class="upcoming-event-title">${event.title}</div>
            <div class="upcoming-event-location">
                <i class="fas fa-map-marker-alt"></i> ${event.venue}, ${event.location}
            </div>
            <div class="upcoming-event-time">
                <i class="fas fa-clock"></i> ${event.time}
            </div>
            <div class="upcoming-event-accessibility">
                ${accessibilityIcons}
            </div>
        `;
        
        eventCard.addEventListener('click', () => showEventDetails(event.id));
        upcomingEventsList.appendChild(eventCard);
    });
}

// Takvimi güncelle fonksiyonunu güncelle
function updateCalendar() {
    filterEvents();
}

// Sayfa yüklendiğinde çalışacak fonksiyonu güncelle
document.addEventListener('DOMContentLoaded', function() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        isDarkMode = true;
    } else if (savedDarkMode === 'false') {
        document.body.classList.remove('dark-mode');
        isDarkMode = false;
    }
    
    updateThemeIcon();
    
    // Filtre değişikliklerini dinle
    document.getElementById('eventTypeFilter').addEventListener('change', filterEvents);
    document.getElementById('locationFilter').addEventListener('change', filterEvents);
    document.getElementById('accessibilityFilter').addEventListener('change', filterEvents);
    
    // İlk yükleme
    filterEvents();
    
    document.getElementById('prevMonth').addEventListener('click', function() {
        // Prevent going back before January 2025
        if (currentYear === 2025 && currentMonth === 0) {
            return;
        }
        
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        filterEvents();
    });
    
    document.getElementById('nextMonth').addEventListener('click', function() {
        // Prevent going forward beyond December 2025
        if (currentYear === 2025 && currentMonth === 11) {
            return;
        }
        
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        filterEvents();
    });
    
    // Etkinliğe katıl butonu
    document.getElementById('registerEventBtn').addEventListener('click', function() {
        const eventId = this.getAttribute('data-event-id');
        showRegisterModal(eventId);
    });
    
    displayJoinedEvents();
});

// Etkinliklerin durumunu güncelle (geçmiş, bugün, gelecek)
function updateEventStatus() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    events.forEach(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        
        if (eventDate.getTime() < today.getTime()) {
            event.status = 'past';
        } else if (eventDate.getTime() === today.getTime()) {
            event.status = 'today';
        } else {
            event.status = 'upcoming';
        }
    });
}

// Etkinlikleri göster
function displayEvents(eventsToDisplay = events) {
    const eventsGrid = document.getElementById('eventsGrid');
    eventsGrid.innerHTML = '';
    
    if (eventsToDisplay.length === 0) {
        eventsGrid.innerHTML = '<div class="no-events">Bu kriterlere uygun etkinlik bulunamadı.</div>';
        return;
    }
    
    eventsToDisplay.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

// Etkinlik kartı oluştur
function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    
    const eventDate = new Date(event.date);
    const formattedDate = `${eventDate.getDate()} ${getMonthName(eventDate.getMonth())} ${eventDate.getFullYear()}`;
    
    let statusClass = '';
    let statusText = '';
    
    switch(event.status) {
        case 'past':
            statusClass = 'status-past';
            statusText = 'Geçmiş Etkinlik';
            break;
        case 'today':
            statusClass = 'status-today';
            statusText = 'Bugün';
            break;
        case 'upcoming':
            statusClass = 'status-upcoming';
            statusText = 'Yaklaşan Etkinlik';
            break;
    }
    
    // Erişilebilirlik ikonları
    let accessibilityIcons = '';
    event.accessibility.forEach(feature => {
        accessibilityIcons += `<i class="fas ${accessibilityFeatures[feature].icon}" title="${accessibilityFeatures[feature].name}"></i> `;
    });
    
    eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.title}" class="event-image">
        <div class="event-content">
            <span class="event-date">${formattedDate}</span>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-location">
                <i class="fas fa-map-marker-alt"></i>
                ${event.venue}
            </div>
            <p class="event-description">${event.description.substring(0, 100)}${event.description.length > 100 ? '...' : ''}</p>
            <div class="event-footer">
                <div class="event-status ${statusClass}">
                    <span class="status-indicator"></span>
                    ${statusText}
                </div>
                <button class="btn" onclick="showEventDetails(${event.id})">Detaylar</button>
            </div>
        </div>
    `;
    
    return eventCard;
}

// Etkinlik detaylarını göster
function showEventDetails(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    const eventDate = new Date(event.date);
    const formattedDate = `${eventDate.getDate()} ${getMonthName(eventDate.getMonth())} ${eventDate.getFullYear()}`;
    
    document.getElementById('modalEventTitle').textContent = event.title;
    document.getElementById('modalEventDate').textContent = formattedDate;
    document.getElementById('modalEventTime').textContent = event.time;
    document.getElementById('modalEventLocation').textContent = `${event.venue}, ${event.location}`;
    
    // Erişilebilirlik özellikleri
    let accessibilityText = '';
    event.accessibility.forEach((feature, index) => {
        accessibilityText += accessibilityFeatures[feature].name;
        if (index < event.accessibility.length - 1) {
            accessibilityText += ', ';
        }
    });
    document.getElementById('modalEventAccessibility').textContent = accessibilityText;
    
    document.getElementById('modalEventDescription').textContent = event.description;
    
    // Etkinliğe katıl butonu
    const registerBtn = document.getElementById('registerEventBtn');
    registerBtn.setAttribute('data-event-id', eventId);
    
    // Geçmiş etkinlikler için katılım butonunu devre dışı bırak
    if (event.status === 'past') {
        registerBtn.disabled = true;
        registerBtn.textContent = 'Etkinlik Sona Erdi';
    } else {
        registerBtn.disabled = false;
        registerBtn.textContent = 'Etkinliğe Katıl';
    }
    
    // Modal'ı göster
    openModal('eventModal');
}

// Kayıt modalını göster
function showRegisterModal(eventId) {
    document.getElementById('eventId').value = eventId;
    closeModal('eventModal');
    openModal('registerModal');
}

// Etkinlik kaydını gönder
function submitEventRegistration(event) {
    event.preventDefault();
    
    const eventId = document.getElementById('eventId').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const specialNeeds = document.getElementById('specialNeeds').value;
    
    // Yeni kayıt oluştur
    const registration = {
        id: Date.now(),
        eventId: parseInt(eventId),
        fullName,
        email,
        phone,
        specialNeeds,
        date: new Date()
    };
    
    // Kayıtları güncelle
    eventRegistrations.push(registration);
    localStorage.setItem('eventRegistrations', JSON.stringify(eventRegistrations));
    
    // Modal'ı kapat
    closeModal('registerModal');
    
    // Kullanıcıya bilgi ver
    alert('Etkinlik kaydınız başarıyla alınmıştır. Teşekkür ederiz!');
    displayJoinedEvents();
}

// Modal'ı kapat
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
}

// Ay adını getir
function getMonthName(monthIndex) {
    const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return months[monthIndex];
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

// Karanlık/Aydınlık modu değiştir
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateThemeIcon();
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
    document.body.style.overflow = 'hidden';
}

// Modal açıldığında body'ye modal-open ekle
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

// Katıldığım Etkinlikler'i göster
function displayJoinedEvents() {
    const joinedEventsList = document.getElementById('joinedEventsList');
    joinedEventsList.innerHTML = '';
    const registrations = JSON.parse(localStorage.getItem('eventRegistrations')) || [];
    if (registrations.length === 0) {
        joinedEventsList.innerHTML = '<div style="color:var(--text-color);opacity:0.7;font-size:1.1rem;padding:1.5rem 0;">Başvurduğunuz etkinlik yoktur.</div>';
        return;
    }
    registrations.sort((a, b) => new Date(b.date) - new Date(a.date));
    registrations.forEach(reg => {
        const event = events.find(e => e.id === reg.eventId);
        if (!event) return;
        const eventDate = new Date(event.date);
        const formattedEventDate = `${eventDate.getDate()} ${getMonthName(eventDate.getMonth())} ${eventDate.getFullYear()}`;
        const applyDate = new Date(reg.date);
        const formattedApplyDate = `${applyDate.getDate()} ${getMonthName(applyDate.getMonth())} ${applyDate.getFullYear()} ${applyDate.getHours().toString().padStart(2,'0')}:${applyDate.getMinutes().toString().padStart(2,'0')}`;
        const accessibilityIcons = event.accessibility.map(feature => `<i class="fas ${accessibilityFeatures[feature].icon}" title="${accessibilityFeatures[feature].name}"></i>`).join('');
        const card = document.createElement('div');
        card.className = 'joined-event-card';
        card.innerHTML = `
            <div class="joined-event-title">${event.title}</div>
            <div class="joined-event-info"><b>Başvuru Tarihi:</b> ${formattedApplyDate}</div>
            <div class="joined-event-info"><b>Etkinlik Tarihi:</b> ${formattedEventDate}</div>
            <div class="joined-event-info"><b>Konum:</b> ${event.venue}, ${event.location}</div>
            <div class="joined-event-info"><b>Saat:</b> ${event.time}</div>
            <div class="joined-event-info"><b>Ad Soyad:</b> ${reg.fullName}</div>
            <div class="joined-event-info"><b>E-posta:</b> ${reg.email}</div>
            <div class="joined-event-accessibility">${accessibilityIcons}</div>
            <button class="delete-btn" title="Başvuruyu Kaldır" onclick="removeEventRegistration(${reg.id})"><i class='fas fa-trash'></i></button>
        `;
        joinedEventsList.appendChild(card);
    });
}

function removeEventRegistration(registrationId) {
    let registrations = JSON.parse(localStorage.getItem('eventRegistrations')) || [];
    registrations = registrations.filter(reg => reg.id !== registrationId);
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    displayJoinedEvents();
}
