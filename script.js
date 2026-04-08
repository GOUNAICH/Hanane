/* ══════════════════════════════════════════════
   script.js — Portfolio Hanane Boukind
════════════════════════════════════════════ */

// ─── Navbar scroll effect ───────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ─── Mobile menu toggle ──────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  // Animate hamburger lines
  const spans = menuToggle.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (menuOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// ─── Intersection Observer for fade-up ──────
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => fadeObserver.observe(el));

// ─── Skill bars animation ────────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const target = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = target + '%';
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ─── Active nav link highlighting ───────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(s => sectionObserver.observe(s));

// ─── Contact form submission ─────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');

    // Visual loading state
    btn.textContent = 'Envoi en cours...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Message envoyé ✓';
      btn.style.opacity = '1';
      formSuccess.classList.add('visible');
      contactForm.reset();

      setTimeout(() => {
        btn.textContent = 'Envoyer le message ✦';
        btn.disabled = false;
        formSuccess.classList.remove('visible');
      }, 4000);
    }, 1200);
  });
}

// ─── Smooth scroll for all anchor links ─────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Subtle parallax on hero shapes ─────────
const shapes = document.querySelectorAll('.hero-bg-shape');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight * 1.5) {
    shapes.forEach((shape, i) => {
      const speed = 0.03 + i * 0.02;
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }
}, { passive: true });

// ─── Page load initial animations ───────────
document.addEventListener('DOMContentLoaded', () => {
  // Trigger hero elements immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-up').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
});

// ─── Number counter animation for stats ─────
function animateCounter(el, target, duration = 1400) {
  const isInfinity = el.textContent.trim() === '∞';
  if (isInfinity) return;

  const suffix = el.textContent.includes('+') ? '+' : '';
  const start = 0;
  const num = parseFloat(target.replace(/[^0-9.]/g, ''));
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * num);

    // Handle year-like numbers (2025)
    if (num > 100) {
      el.textContent = Math.round(start + eased * (num - start)).toString();
    } else {
      el.textContent = current + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const original = el.textContent.trim();
      if (original !== '∞') {
        animateCounter(el, original);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.7 });

statNums.forEach(el => counterObserver.observe(el));

// ─── Input focus label lift effect ──────────
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
  });
});

// ─── Cursor glow effect (subtle) ─────────────
const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroSection.style.setProperty('--mx', x + '%');
    heroSection.style.setProperty('--my', y + '%');
  });
}
