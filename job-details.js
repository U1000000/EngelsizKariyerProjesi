// Temayı kontrol etmek için
let isDarkMode = true; // Karanlık mod başlangıçta açık

// Geçerli iş
let currentJob = null;

// Yorumlar ve değerlendirmeler için veri yapıları
let jobRatings = JSON.parse(localStorage.getItem('jobRatings')) || {};
let jobComments = JSON.parse(localStorage.getItem('jobComments')) || {};

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Karanlık mod durumunu kontrol et
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        isDarkMode = true;
    } else if (savedDarkMode === 'false') {
        document.body.classList.remove('dark-mode');
        isDarkMode = false;
    }
    
    // Modallerin varlığını kontrol et
    const applicationModal = document.getElementById('applicationModal');
    
    // URL'den iş ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('id'));
    
    if (!jobId) {
        window.location.href = 'index.html';
        return;
    }
    
    // İş verilerini localStorage'dan al
    const employers = JSON.parse(localStorage.getItem('employers'));
    
    if (!employers) {
        // Eğer localStorage'da veri yoksa, ana sayfaya yönlendir
        window.location.href = 'index.html';
        return;
    }
    
    // İş detaylarını bul
    currentJob = employers.find(job => job.id === jobId);
    
    if (!currentJob) {
        window.location.href = 'index.html';
        return;
    }
    
    // Sayfa başlığını güncelle
    document.title = `${currentJob.position} - ${currentJob.name} | Engelsiz Kariyer`;
    
    // İş detaylarını göster
    displayJobDetails();
    
    // Değerlendirmeleri göster
    displayRatings();
    
    // Yorumları göster
    displayComments();
    
    // Beğen/Beğenme butonlarına tıklanınca
    document.getElementById('likeButton').addEventListener('click', () => {
        rateJob('like');
    });
    
    document.getElementById('dislikeButton').addEventListener('click', () => {
        rateJob('dislike');
    });
    
    // Yorum gönder butonuna tıklanınca
    document.getElementById('submitComment').addEventListener('click', () => {
        submitComment();
    });
    
    // Tema ayarlarını güncelle
    updateThemeIcon();
    
    // Modalları kapatmak için dışarı tıklanınca
    window.onclick = function(event) {
        const applicationModal = document.getElementById('applicationModal');
        if (event.target === applicationModal) {
            closeModal('applicationModal');
        }
        
        const supportModal = document.getElementById('supportModal');
        if (supportModal && event.target === supportModal) {
            closeModal('supportModal');
        }
    };
});

// İş detaylarını göster
function displayJobDetails() {
    // İş detaylarını DOM elementlerine yerleştir
    document.querySelector('.company-logo img').src = currentJob.icon;
    document.querySelector('.company-logo img').alt = `${currentJob.name} logosu`;
    document.getElementById('jobTitle').textContent = currentJob.position;
    document.getElementById('companyName').textContent = currentJob.name;
    document.querySelector('.company-location').textContent = currentJob.location;
    document.getElementById('jobType').textContent = currentJob.type || 'Tam Zamanlı';
    document.getElementById('jobSalary').textContent = currentJob.salary;
    document.getElementById('jobRequirements').innerHTML = `
        <ul>
            ${currentJob.requirements ? currentJob.requirements.map(req => `<li>${req}</li>`).join('') : '<li>Gereksinimler belirtilmemiş</li>'}
        </ul>
    `;
    document.getElementById('jobBenefits').innerHTML = `
        <ul>
            ${currentJob.benefits ? currentJob.benefits.map(ben => `<li>${ben}</li>`).join('') : '<li>Sunulan imkanlar belirtilmemiş</li>'}
        </ul>
    `;
    document.getElementById('jobQualifications').innerHTML = `
        <ul>
            ${currentJob.qualifications ? currentJob.qualifications.map(q => `<li>${q}</li>`).join('') : '<li>İstenilen özellikler belirtilmemiş</li>'}
        </ul>
    `;
    document.getElementById('jobResponsibilities').innerHTML = `
        <ul>
            ${currentJob.responsibilities ? currentJob.responsibilities.map(r => `<li>${r}</li>`).join('') : '<li>Sorumluluklar belirtilmemiş</li>'}
        </ul>
    `;
}

// Değerlendirmeleri göster
function displayRatings() {
    const jobId = currentJob.id;
    
    // Bu iş için değerlendirme verisi yoksa oluştur
    if (!jobRatings[jobId]) {
        jobRatings[jobId] = {
            likes: 0,
            dislikes: 0,
            userRating: null // Kullanıcının değerlendirmesi
        };
    }
    
    // Değerlendirme sayılarını güncelle
    document.getElementById('likeCount').textContent = jobRatings[jobId].likes;
    document.getElementById('dislikeCount').textContent = jobRatings[jobId].dislikes;
    
    // Kullanıcının daha önce değerlendirme yapıp yapmadığını kontrol et
    if (jobRatings[jobId].userRating === 'like') {
        document.getElementById('likeButton').classList.add('active');
        document.getElementById('ratingMessage').textContent = 'Bu iş ilanını olumlu değerlendirdiniz.';
    } else if (jobRatings[jobId].userRating === 'dislike') {
        document.getElementById('dislikeButton').classList.add('active');
        document.getElementById('ratingMessage').textContent = 'Bu iş ilanını olumsuz değerlendirdiniz.';
    }
}

// İşi değerlendir
function rateJob(rating) {
    const jobId = currentJob.id;
    
    // Bu iş için değerlendirme verisi yoksa oluştur
    if (!jobRatings[jobId]) {
        jobRatings[jobId] = {
            likes: 0,
            dislikes: 0,
            userRating: null
        };
    }
    
    // Kullanıcının önceki değerlendirmesini kontrol et
    const previousRating = jobRatings[jobId].userRating;
    
    // Aynı değerlendirmeye tekrar tıklandıysa, değerlendirmeyi kaldır
    if (previousRating === rating) {
        jobRatings[jobId].userRating = null;
        
        // Değerlendirme sayısını azalt
        if (rating === 'like') {
            jobRatings[jobId].likes--;
            document.getElementById('likeButton').classList.remove('active');
        } else {
            jobRatings[jobId].dislikes--;
            document.getElementById('dislikeButton').classList.remove('active');
        }
        
        document.getElementById('ratingMessage').textContent = '';
    } else {
        // Önceki değerlendirmeyi kaldır
        if (previousRating === 'like') {
            jobRatings[jobId].likes--;
            document.getElementById('likeButton').classList.remove('active');
        } else if (previousRating === 'dislike') {
            jobRatings[jobId].dislikes--;
            document.getElementById('dislikeButton').classList.remove('active');
        }
        
        // Yeni değerlendirmeyi ekle
        jobRatings[jobId].userRating = rating;
        
        if (rating === 'like') {
            jobRatings[jobId].likes++;
            document.getElementById('likeButton').classList.add('active');
            document.getElementById('dislikeButton').classList.remove('active');
            document.getElementById('ratingMessage').textContent = 'Bu iş ilanını olumlu değerlendirdiniz.';
        } else {
            jobRatings[jobId].dislikes++;
            document.getElementById('dislikeButton').classList.add('active');
            document.getElementById('likeButton').classList.remove('active');
            document.getElementById('ratingMessage').textContent = 'Bu iş ilanını olumsuz değerlendirdiniz.';
        }
    }
    
    // Değerlendirme sayılarını güncelle
    document.getElementById('likeCount').textContent = jobRatings[jobId].likes;
    document.getElementById('dislikeCount').textContent = jobRatings[jobId].dislikes;
    
    // Değerlendirmeleri localStorage'a kaydet
    localStorage.setItem('jobRatings', JSON.stringify(jobRatings));
}

// Yorumları göster
function displayComments() {
    const jobId = currentJob.id;
    const commentsContainer = document.getElementById('commentsContainer');
    
    // Yorumlar konteynırını temizle
    commentsContainer.innerHTML = '';
    
    // Bu iş için yorum verisi yoksa oluştur
    if (!jobComments[jobId]) {
        jobComments[jobId] = [];
    }
    
    // Yorumlar yoksa mesaj göster
    if (jobComments[jobId].length === 0) {
        commentsContainer.innerHTML = '<p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>';
        return;
    }
    
    // Yorumları tarih sırasına göre göster (en yeniden en eskiye)
    jobComments[jobId].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Yorumları ekle
    jobComments[jobId].forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.dataset.id = comment.id;
        
        const commentDate = new Date(comment.date);
        const formattedDate = `${commentDate.toLocaleDateString()} ${commentDate.toLocaleTimeString()}`;
        
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${formattedDate}</span>
            </div>
            <p>${comment.text}</p>
            <div class="comment-actions">
                <button class="delete-comment" title="Yorumu Sil" onclick="deleteComment(${comment.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        commentsContainer.appendChild(commentElement);
    });
}

// Yorum sil
function deleteComment(commentId) {
    const jobId = currentJob.id;
    
    // Kullanıcıya silme işlemini onaylatma
    if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
        // Yorumu bul ve sil
        jobComments[jobId] = jobComments[jobId].filter(comment => comment.id !== commentId);
        
        // Yorumları localStorage'a kaydet
        localStorage.setItem('jobComments', JSON.stringify(jobComments));
        
        // Yorumları yeniden göster
        displayComments();
    }
}

// Yorum gönder
function submitComment() {
    const commentText = document.getElementById('commentText').value.trim();
    
    if (!commentText) {
        alert('Lütfen bir yorum yazın.');
        return;
    }
    
    const jobId = currentJob.id;
    
    // Bu iş için yorum verisi yoksa oluştur
    if (!jobComments[jobId]) {
        jobComments[jobId] = [];
    }
    
    // Yeni yorumu ekle
    const newComment = {
        id: Date.now(), // Benzersiz ID
        author: 'Anonim Kullanıcı', // Gerçek uygulamada kullanıcı adı olacak
        text: commentText,
        date: new Date().toISOString()
    };
    
    jobComments[jobId].push(newComment);
    
    // Yorumları localStorage'a kaydet
    localStorage.setItem('jobComments', JSON.stringify(jobComments));
    
    // Yorumları yeniden göster
    displayComments();
    
    // Yorum alanını temizle
    document.getElementById('commentText').value = '';
}

// Başvuru modalını göster
function showApplicationModal() {
    const applicationModal = document.getElementById('applicationModal');
    if (!applicationModal) {
        console.error('Application modal not found!');
        return;
    }
    
    // Form alanlarını doldur
    document.getElementById('jobId').value = currentJob.id;
    document.getElementById('jobTitle').value = currentJob.position;
    document.getElementById('companyName').value = currentJob.name;

    // Modalı göster
    applicationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
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
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
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

// Modal'ı kapat
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto'; // Scrolling'i geri aç
}

// Başvuru gönder
function submitApplication(event) {
    event.preventDefault();
    
    // Başvuru verilerini al
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const experience = document.getElementById('experience').value;
    const accommodation = document.getElementById('accommodation').value;
    
    // Başvuruları localStorage'dan al
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    
    // Yeni başvuruyu oluştur
    const application = {
        id: Date.now(),
        jobId: currentJob.id,
        jobTitle: currentJob.position,
        company: currentJob.name,
        jobDetails: {
            location: currentJob.location,
            salary: currentJob.salary,
            sector: currentJob.sector,
            supports: currentJob.supports,
            icon: currentJob.icon
        },
        applicationDate: new Date().toISOString(),
        personalInfo: {
            fullName: fullName,
            email: email,
            phone: phone
        },
        applicationDetails: {
            experience: experience,
            accommodations: accommodation
        },
        status: 'Başvuru Alındı',
        statusHistory: [
            {
                status: 'Başvuru Alındı',
                date: new Date().toISOString()
            }
        ]
    };
    
    // Başvuruyu listeye ekle
    applications.push(application);
    
    // Başvuruları localStorage'a kaydet
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // Başvuru formunu kapat
    closeModal('applicationModal');
    
    // Başvuru başarılı mesajı
    alert('Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.');
}