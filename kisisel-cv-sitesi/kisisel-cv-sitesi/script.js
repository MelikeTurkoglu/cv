/**
 * KİŞİSEL CV & PORTFOLYO ETKİLEŞİM VE MANTIK SCRIPTI (script.js)
 * -------------------------------------------------------------
 * 1. Koyu / Açık Tema Yönetimi (LocalStorage Destekli)
 * 2. Okuma İlerleme Çubuğu (Scroll Progress)
 * 3. Dinamik Aktif Menü Takibi (IntersectionObserver)
 * 4. Mobil Navigasyon Menüsü
 * 5. Yetenek Kategorisi Filtreleme
 * 6. Panoya Kopyalama (Toast Bildirimli)
 * 7. CV Yazdırma & PDF Çıktısı
 * 8. İletişim Formu Doğrulaması & Geribildirim
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. SABİT PROFESYONEL KURUMSAL TEMA
  // =========================================================================
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', '#070b14');
  }

  // =========================================================================
  // 2. OKUMA İLERLEME ÇUBUĞU (SCROLL PROGRESS)
  // =========================================================================
  const progressBar = document.getElementById('okuma-cubugu');

  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }
  }, { passive: true });

  // =========================================================================
  // 3. AKTİF MENÜ BAĞLANTISI (INTERSECTION OBSERVER)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // =========================================================================
  // 4. MOBİL MENÜ YÖNETİMİ
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('ana-menu');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      mainNav.classList.toggle('active');
    });

    // Menü bağlantılarına tıklandığında menüyü kapat
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // =========================================================================
  // 5. YETENEK KATEGORİSİ FİLTRELEME
  // =========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // =========================================================================
  // 6. CV YAZDIRMA & PDF ÇIKTISI
  // =========================================================================
  const printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // 7. PANOYA KOPYALAMA & TOAST BİLDİRİMİ
  // =========================================================================
  const copyButtons = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toast-notification');
  let toastTimeout;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Panoya kopyalandı: ${textToCopy}`);
        }).catch(() => {
          showToast('Kopyalama işlemi başarısız oldu.');
        });
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.hidden = true;
      }, 300);
    }, 3000);
  }

  // =========================================================================
  // 8. İLETİŞİM FORMU DOĞRULAMASI VE SİMÜLASYONU
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const msgError = document.getElementById('msg-error');

      // Hata mesajlarını sıfırla
      nameError.textContent = '';
      emailError.textContent = '';
      msgError.textContent = '';

      let isValid = true;

      // İsim Kontrolü
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Lütfen adınızı ve soyadınızı giriniz.';
        isValid = false;
      }

      // E-posta Kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Lütfen e-posta adresinizi giriniz.';
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Lütfen geçerli bir e-posta adresi yazınız.';
        isValid = false;
      }

      // Mesaj Kontrolü
      if (!messageInput.value.trim()) {
        msgError.textContent = 'Lütfen iletmek istediğiniz mesajı yazınız.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        msgError.textContent = 'Mesajınız en az 10 karakter olmalıdır.';
        isValid = false;
      }

      if (!isValid) return;

      // Form Gönderme Simülasyonu
      const submitBtn = document.getElementById('form-submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Gönderiliyor...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        formFeedback.hidden = false;
        formFeedback.className = 'form-feedback-message success';
        formFeedback.textContent = `Teşekkürler Sayın ${nameInput.value.trim()}, mesajınız başarıyla alındı! En kısa sürede sizinle iletişime geçeceğim.`;

        contactForm.reset();

        setTimeout(() => {
          formFeedback.hidden = true;
        }, 6000);
      }, 1000);
    });
  }

  // =========================================================================
  // 9. DİNAMİK PROFİL FOTOĞRAFI YÜKLEME VE SAKLAMA
  // =========================================================================
  const photoInput = document.getElementById('foto-yukle');
  const profileImg = document.getElementById('profile-img');

  // Tarayıcı hafızasında daha önce seçilmiş fotoğraf varsa yükle
  const savedPhoto = localStorage.getItem('user-profile-photo');
  if (savedPhoto && profileImg) {
    profileImg.src = savedPhoto;
  }

  if (photoInput && profileImg) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast('Lütfen geçerli bir resim dosyası seçiniz.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const photoUrl = event.target.result;
          profileImg.src = photoUrl;
          try {
            localStorage.setItem('user-profile-photo', photoUrl);
          } catch (err) {
            console.warn('Görsel boyutu yerel hafıza limitini aştı.');
          }
          showToast('Profil fotoğrafınız başarıyla güncellendi! 🎉');
        };
        reader.readAsDataURL(file);
      }
    });
  }
});
