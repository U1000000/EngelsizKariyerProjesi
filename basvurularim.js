// Tema kontrolü.
let isDarkMode = true;

// Başvuruları saklamak için
let applications = JSON.parse(localStorage.getItem('applications')) || [];

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
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
    
    // Başvuruları göster
    displayApplications();
});

// Başvuruları göster
function displayApplications() {
    const applicationsList = document.getElementById('applicationsList');
    if (!applicationsList) return;

    // Get applications from localStorage
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    console.log('Displaying applications:', applications); // Debug log

    if (applications.length === 0) {
        applicationsList.innerHTML = `
            <div class="no-applications">
                <h3>Henüz başvurunuz bulunmamaktadır.</h3>
                <p>İş ilanları sayfasından başvuru yapabilirsiniz.</p>
            </div>
        `;
        return;
    }

    // Sort applications by date (newest first)
    applications.sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));

    // Create HTML for each application
    applicationsList.innerHTML = applications.map(application => `
        <div class="application-card animate-slide-up">
            <div class="application-header">
                ${application.jobDetails?.icon ? `
                    <img src="${application.jobDetails.icon}" alt="${application.companyName}" class="company-logo">
                ` : ''}
                <div class="company-info">
                    <h3>${application.jobTitle}</h3>
                    <p class="company-name">${application.companyName}</p>
                </div>
            </div>
            <div class="application-content">
                <div class="application-info">
                    <div class="info-row">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${application.jobDetails?.location || 'Belirtilmemiş'}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-briefcase"></i>
                        <span>${application.jobDetails?.sector || 'Belirtilmemiş'}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>${application.jobDetails?.salary || 'Belirtilmemiş'}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${new Date(application.applicationDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-info-circle"></i>
                        <span class="status-badge ${application.status}">${getStatusText(application.status)}</span>
                    </div>
                </div>
                <div class="application-actions">
                    <button class="btn" onclick="showApplicationDetails('${application.id}')">
                        <i class="fas fa-eye"></i> Detaylar
                    </button>
                    <button class="btn delete-btn" onclick="deleteApplication('${application.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getStatusText(status) {
    switch (status) {
        case 'pending':
            return 'Beklemede';
        case 'accepted':
            return 'Kabul Edildi';
        case 'rejected':
            return 'Reddedildi';
        default:
            return 'Beklemede';
    }
}

// Başvuru detaylarını göster
function showApplicationDetails(applicationId) {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    const application = applications.find(app => app.id === applicationId);
    
    if (!application) {
        alert('Başvuru bulunamadı!');
        return;
    }

    const modal = document.getElementById('applicationDetailsModal');
    const modalContent = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('applicationDetailsModal')"><span>×</span></span>
            <h2>Başvuru Detayları</h2>
            
            <div class="detail-section">
                <h3>İş Bilgileri</h3>
                <p><strong>Pozisyon:</strong> ${application.jobTitle}</p>
                <p><strong>Şirket:</strong> ${application.companyName}</p>
                ${application.jobDetails?.location ? `<p><strong>Konum:</strong> ${application.jobDetails.location}</p>` : ''}
                ${application.jobDetails?.sector ? `<p><strong>Sektör:</strong> ${application.jobDetails.sector}</p>` : ''}
                ${application.jobDetails?.salary ? `<p><strong>Maaş:</strong> ${application.jobDetails.salary}</p>` : ''}
                ${application.jobDetails?.supports ? `<p><strong>Destekler:</strong> ${application.jobDetails.supports}</p>` : ''}
                ${application.jobDetails?.description ? `<p><strong>İş Tanımı:</strong> ${application.jobDetails.description}</p>` : ''}
            </div>

            <div class="detail-section">
                <h3>Başvuru Bilgileri</h3>
                <p><strong>Ad Soyad:</strong> ${application.fullName}</p>
                <p><strong>E-posta:</strong> ${application.email}</p>
                <p><strong>Telefon:</strong> ${application.phone}</p>
                <p><strong>Başvuru Tarihi:</strong> ${new Date(application.applicationDate).toLocaleDateString('tr-TR')}</p>
                <p><strong>Durum:</strong> <span class="status-badge ${application.status}">${getStatusText(application.status)}</span></p>
                ${application.experience ? `<p><strong>Deneyim:</strong> ${application.experience}</p>` : ''}
                ${application.accommodation ? `<p><strong>Konaklama İhtiyacı:</strong> ${application.accommodation}</p>` : ''}
                ${application.resumeFileName ? `<p><strong>Özgeçmiş:</strong> ${application.resumeFileName}</p>` : ''}
            </div>
        </div>
    `;

    modal.innerHTML = modalContent;
    modal.style.display = 'block';
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

// Modal'ı kapat
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Destek modalını göster
function showSupportModal() {
    document.getElementById('supportModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Tema ikonunu güncelle
function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    
    if (isDarkMode) {
        themeIcon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
    } else {
        themeIcon.innerHTML = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>';
    }
}

// Tema değiştir
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Save preference
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateThemeIcon();
}

// Tüm başvuruları temizle
function clearAllApplications() {
    if (confirm('Tüm başvurularınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
        try {
            // localStorage'dan applications verisini sil
            localStorage.removeItem('applications');
            
            // Başvuruları göster (boş liste gösterecek)
            displayApplications();
            
            alert('Tüm başvurular başarıyla silindi.');
        } catch (error) {
            console.error('Error clearing applications:', error);
            alert('Başvurular silinirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
} 
