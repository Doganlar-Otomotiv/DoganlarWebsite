// Loading screen
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  setTimeout(() => {
    loading.classList.add('hidden');
    setTimeout(() => loading.remove(), 500);
  }, 1000);
});

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('header nav');

function toggleMenu() {
  const isOpen = nav.classList.contains('open');
  nav.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', !isOpen);
  
  if (!isOpen) {
    nav.querySelector('a').focus();
  }
}

hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    hamburger.focus();
  }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    document.querySelectorAll('.error-message').forEach(error => {
      error.style.display = 'none';
      error.textContent = '';
    });
    
    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name) {
      showError('name-error', 'Ad Soyad gereklidir');
      isValid = false;
    }
    
    if (!phone) {
      showError('phone-error', 'Telefon numarası gereklidir');
      isValid = false;
    } else if (!/^[\+]?[\d\s\(\)\-]{10,}$/.test(phone)) {
      showError('phone-error', 'Geçerli bir telefon numarası giriniz');
      isValid = false;
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email-error', 'Geçerli bir e-posta adresi giriniz');
      isValid = false;
    }
    
    if (!message) {
      showError('message-error', 'Mesaj gereklidir');
      isValid = false;
    }
    
    if (isValid) {
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Gönderiliyor...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  });
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Particles.js initialization
function loadParticles() {
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("particles-js", {
      background: { color: { value: "#0c0c0c" } },
      fpsLimit: 60,
      particles: {
        color: { value: "#3ea6ff" },
        links: { 
          enable: true, 
          color: "#3ea6ff", 
          distance: 150, 
          opacity: 0.4, 
          width: 1 
        },
        move: { 
          enable: true, 
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          outModes: "bounce"
        },
        number: { value: 40 },
        opacity: { value: 0.3 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } }
      },
      detectRetina: true,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: true,
            mode: "connect"
          }
        }
      }
    }).catch(err => {
      console.log('Particles.js yüklenemedi:', err);
    });
  } else {
    console.log('Particles.js kütüphanesi bulunamadı');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadParticles);
} else {
  loadParticles();
}

// Navigation active state handling
const navLinks = document.querySelectorAll("nav a");
const sections = [...document.querySelectorAll("section")];
let isScrolling = false;

function updateActiveNavigation() {
  if (isScrolling) return;
  
  const scrollY = window.pageYOffset;
  let currentSection = '';
  
  sections.forEach((section) => {
    const offsetTop = section.offsetTop - 120;
    const offsetBottom = offsetTop + section.offsetHeight;
    const id = section.getAttribute("id");
    
    if (scrollY >= offsetTop && scrollY < offsetBottom) {
      currentSection = id;
    }
  });
  
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (currentSection && link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(updateActiveNavigation, 10);
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        isScrolling = true;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => { isScrolling = false; }, 1000);
      }
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  sections.forEach(section => {
    section.style.opacity = '0.8';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// FAQ functionality
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item').forEach((item) => {
      const button = item.querySelector('.faq-question');
      button.setAttribute('aria-expanded', 'false');
      item.classList.remove('active');
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.parentElement.classList.add('active');
    }
  });
});