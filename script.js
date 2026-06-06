/* ====================================================
   DEEHAN PAUL PORTFOLIO — script.js
   Interactions, Animations, Theme, Typewriter, Scroll
   ==================================================== */

'use strict';

// ===== PROTECTION: DISABLE RIGHT-CLICK & DEVTOOLS =====
(function () {
  // Block right-click context menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  // Block DevTools keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I  (Inspect)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J  (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C  (Element picker)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U  (View source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S  (Save page)
    if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+A  (Select all)
    if (e.ctrlKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      return false;
    }
  });

  // Disable text selection via CSS injection
  const noSelectStyle = document.createElement('style');
  noSelectStyle.textContent = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
    /* Re-enable selection inside form inputs & textareas */
    input, textarea {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
  `;
  document.head.appendChild(noSelectStyle);

  // Block drag of images
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  });
})();

// ===== THEME TOGGLE =====
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  currentTheme = theme;
}

applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
  setTimeout(() => { themeToggle.style.transform = ''; }, 400);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  toggleBackToTop();
}, { passive: true });

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) {
      link.classList.add('active');
    }
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== TYPEWRITER EFFECT =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'AI Automation Engineer',
  'Workflow Automation Expert',
  'D2C Tech Enthusiast',
  'IBM watsonx Developer',
  'Data & AI Innovator',
  'B.Tech CSE (AI/ML) Student',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typeTimeout = setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  typeTimeout = setTimeout(typeWriter, isDeleting ? 60 : 100);
}

typeWriter();

// ===== FLOATING PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const colors = ['#6366f1', '#a855f7', '#06b6d4', '#818cf8', '#e879f9'];
  const count = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.2};
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

    container.appendChild(particle);
  }
}

createParticles();

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe fade-up elements
document.querySelectorAll('.section-header, .skill-category, .cert-card, .edu-card, .contact-info, .contact-form-wrapper').forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

// Timeline items
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 150);
    }
  });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function step(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number[data-target]');
      counters.forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById('back-to-top');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('contact-submit-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !email || !message) {
    shakeForm();
    return;
  }

  if (!isValidEmail(email)) {
    const emailInput = document.getElementById('contact-email');
    emailInput.style.borderColor = '#ef4444';
    emailInput.focus();
    setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
    return;
  }

  // Simulate sending
  const btnSpan = submitBtn.querySelector('span');
  btnSpan.textContent = 'Sending...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  setTimeout(() => {
    btnSpan.textContent = 'Send Message';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    formSuccess.style.display = 'flex';
    contactForm.reset();

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1500);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeForm() {
  contactForm.style.animation = 'shake 0.4s ease';
  setTimeout(() => { contactForm.style.animation = ''; }, 400);
}

// Add shake animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
  }

  .cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: #818cf8;
    margin-left: 2px;
    animation: blink 0.8s step-end infinite;
    vertical-align: middle;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
document.head.appendChild(style);

// Add cursor to typewriter
const cursor = document.createElement('span');
cursor.className = 'cursor';
typewriterEl.after(cursor);

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===== SKILL TAG HOVER TOOLTIP =====
document.querySelectorAll('.skill-tag').forEach(tag => {
  const level = tag.dataset.level;
  if (level) {
    tag.title = `Proficiency: ${level}%`;
  }
});

// ===== PARALLAX ON HERO BG =====
const heroBgImg = document.querySelector('.hero-bg-img');
window.addEventListener('scroll', () => {
  if (heroBgImg) {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBgImg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }
}, { passive: true });

// ===== CARD TILT EFFECT (subtle 3D) =====
document.querySelectorAll('.cert-card, .edu-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -6;
    const rotateY = (x - centerX) / centerX * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== INITIAL LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

console.log('%c 👋 Deehan Paul Portfolio ', 'background: linear-gradient(135deg,#6366f1,#a855f7); color:white; font-size:14px; padding:8px 16px; border-radius:8px; font-weight:bold;');
console.log('%c AI Automation & Workflow Engineer | KIIT University ', 'color: #818cf8; font-size: 12px;');
