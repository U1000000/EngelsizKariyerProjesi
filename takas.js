// Temayı kontrol etmek için.
let isDarkMode = true; // Karanlık mod başlangıçta açık

// Takas ilanlarını saklamak için
let exchanges = JSON.parse(localStorage.getItem('exchanges')) || [];

// Örnek veri
const sampleExchanges = [
    {
        id: 1,
        title: "İngilizce Özel Ders",
        category: "beceri",
        description: "İngilizce özel ders veriyorum. Karşılığında bilgisayar tamir/destek hizmeti arıyorum.",
        location: "istanbul",
        contact: "0532 123 4567",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
    },
    {
        id: 2,
        title: "Grafik Tasarım Hizmeti",
        category: "hizmet",
        description: "Logo ve kurumsal kimlik tasarımı yapabilirim. Karşılığında web sitesi geliştirme arıyorum.",
        location: "online",
        contact: "0505 987 6543",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
    },
    {
        id: 3,
        title: "Tekerlekli Sandalye",
        category: "urun",
        description: "Az kullanılmış, katlanabilir tekerlekli sandalye. Karşılığında işitme cihazı arıyorum.",
        location: "ankara",
        contact: "0555 333 2211",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
    },
    {
        id: 4,
        title: "Yoga Dersi",
        category: "beceri",
        description: "Online yoga dersi verebilirim. Karşılığında müzik dersi arıyorum.",
        location: "online",
        contact: "0533 444 5566",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
    },
    {
        id: 5,
        title: "Beyaz Baston",
        category: "urun",
        description: "Yeni, katlanabilir beyaz baston. Karşılığında sesli kitap arşivi arıyorum.",
        location: "izmir",
        contact: "0542 789 0123",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
    },
    {
        id: 6,
        title: "Evde Bakım Hizmeti",
        category: "hizmet",
        description: "Yaşlı veya engelli bireyler için evde bakım ve refakat hizmeti sunabilirim. Karşılığında evde yemek hizmeti arıyorum.",
        location: "istanbul",
        contact: "0531 222 3344",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: 7,
        title: "Braille Kitap Takası",
        category: "urun",
        description: "Farklı türlerde Braille kitaplarım var, karşılığında sesli kitap arşivi ile takas yapmak isterim.",
        location: "ankara",
        contact: "0543 111 2233",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: 8,
        title: "Web Sitesi Erişilebilirlik Danışmanlığı",
        category: "beceri",
        description: "Web sitenizin erişilebilirliğini artırmak için danışmanlık verebilirim. Karşılığında sosyal medya yönetimi desteği arıyorum.",
        location: "online",
        contact: "0537 555 6677",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: 9,
        title: "İşitme Cihazı Takası",
        category: "urun",
        description: "Kullanılabilir durumda işitme cihazım var, karşılığında akıllı baston arıyorum.",
        location: "izmir",
        contact: "0551 888 9900",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=120&q=80"
    },
    {
        id: 10,
        title: "Psikolojik Danışmanlık",
        category: "hizmet",
        description: "Online psikolojik danışmanlık hizmeti sunabilirim. Karşılığında işaret dili eğitimi almak istiyorum.",
        location: "online",
        contact: "0544 333 2211",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=120&q=80"
    }
];

// Takas ilanlarını filtreleme
function filterExchanges() {
    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value;

    const filteredExchanges = exchanges.filter(exchange => {
        const matchesCategory = !category || exchange.category === category;
        const matchesLocation = !location || exchange.location === location;

        return matchesCategory && matchesLocation;
    });

    displayExchanges(filteredExchanges);
}

// Takas ilanlarını listele
function displayExchanges(exchangesToDisplay = exchanges) {
    const exchangeListings = document.querySelector('.exchange-listings');
    if (!exchangeListings) return;
    
    exchangeListings.innerHTML = '';
    
    if (exchangesToDisplay.length === 0) {
        exchangeListings.innerHTML = '<p class="no-results">Aradığınız kriterlere uygun takas ilanı bulunamadı.</p>';
        return;
    }
    
    exchangesToDisplay.forEach(exchange => {
        exchangeListings.appendChild(createExchangeCard(exchange));
    });
}

// Takas kartlarını oluştur
function createExchangeCard(exchange) {
    const card = document.createElement('div');
    card.className = 'exchange-card animate-slide-up';
    card.style.animationDelay = `${Math.random() * 0.5}s`; // Random delay for staggered animation
    
    card.innerHTML = `
        <div class="exchange-card-header">
            <img src="${exchange.image}" alt="${exchange.title}" class="exchange-image">
            <h3>${exchange.title}</h3>
        </div>
        <p class="exchange-type">${getCategoryName(exchange.category)}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${getLocationName(exchange.location)}</p>
        <p><i class="fas fa-info-circle"></i> ${exchange.description}</p>
        <div class="exchange-card-actions">
            <button onclick="contactExchange(${exchange.id})" class="btn">İletişime Geç</button>
        </div>
    `;
    
    return card;
}

// Kategori adını getir
function getCategoryName(category) {
    switch(category) {
        case 'beceri':
            return 'Beceri Takası';
        case 'hizmet':
            return 'Hizmet Takası';
        case 'urun':
            return 'Ürün Takası';
        default:
            return category;
    }
}

// Konum adını getir
function getLocationName(location) {
    switch(location) {
        case 'istanbul':
            return 'İstanbul';
        case 'ankara':
            return 'Ankara';
        case 'izmir':
            return 'İzmir';
        case 'online':
            return 'Çevrimiçi';
        default:
            return location;
    }
}

// İletişime geç
function contactExchange(exchangeId) {
    const exchange = exchanges.find(e => e.id === exchangeId);
    if (exchange) {
        alert(`${exchange.title} için iletişim bilgileri: ${exchange.contact}`);
    }
}

// Takas teklifi gönder
function submitExchange(event) {
    event.preventDefault();
    
    const exchange = {
        id: Date.now(),
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        location: document.getElementById('location').value,
        contact: document.getElementById('contact').value,
        image: getRandomImage() // Rastgele bir görsel seç
    };

    exchanges.unshift(exchange);
    
    // LocalStorage'a kaydet
    localStorage.setItem('exchanges', JSON.stringify(exchanges));
    
    alert('Takas teklifiniz başarıyla eklendi!');
    closeModal('exchangeModal');
    document.getElementById('exchangeForm').reset();
    
    // Listeyi güncelle
    displayExchanges();
}

// Rastgele görsel seç
function getRandomImage() {
    const images = [
        'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80'
    ];
    
    return images[Math.floor(Math.random() * images.length)];
}

// Modalı kapat
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
}

// Destek modalını göster
function showSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Tema değiştirme
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateThemeIcon();
}

// Tema ikonunu güncelle
function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    
    if (isDarkMode) {
        // Güneş ikonu - Karanlık moddan aydınlık moda geçiş için
        themeIcon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
    } else {
        // Ay ikonu - Aydınlık moddan karanlık moda geçiş için
        themeIcon.innerHTML = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>';
    }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage'dan ilanları yükle
    let storedExchanges = JSON.parse(localStorage.getItem('exchanges')) || [];
    
    // Eğer hiç ilan yoksa, örnek ilanları ekle
    if (storedExchanges.length === 0) {
        exchanges = sampleExchanges;
        localStorage.setItem('exchanges', JSON.stringify(exchanges));
    } else {
        exchanges = storedExchanges;
    }
    
    // Takas ilanlarını göster
    displayExchanges();
    
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
    
    // Sayfa dışında bir yere tıklandığında modalları kapat
    window.onclick = function(event) {
        const modals = [
            document.getElementById('exchangeModal'),
            document.getElementById('supportModal')
        ];
        
        modals.forEach(modal => {
            if (modal && event.target === modal) {
                closeModal(modal.id);
            }
        });
    };

}); 
