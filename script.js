(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function init3DLogos() {
    if (window.MainSteamLogo3D && window.THREE) {
      window.MainSteamLogo3D.init('[data-logo-3d]');
      document.querySelectorAll('[data-logo-3d]').forEach(function (el) {
        el.classList.add('is-live');
      });
    }
  }

  if (window.THREE) {
    init3DLogos();
  } else {
    window.addEventListener('load', init3DLogos);
  }

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealTargets = document.querySelectorAll(
    '.service-card, .process-step, .about-content, .about-visual, .section-header, .contact-info, .contact-form, .hero-logo-wrap'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      formNote.className = 'form-note';

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill in all required fields.';
        formNote.classList.add('error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formNote.textContent = 'Please enter a valid email address.';
        formNote.classList.add('error');
        return;
      }

      formNote.textContent = 'Thank you! We\'ll be in touch within one business day.';
      formNote.classList.add('success');
      contactForm.reset();

      setTimeout(function () {
        formNote.textContent = '';
        formNote.className = 'form-note';
      }, 5000);
    });
  }
})();
