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
    '.service-card, .process-step, .about-content, .section-header, .contact-info, .contact-form, .hero-logo-wrap, .subsidiary-card, .olas-offering'
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

  /* OLAS Technologies & General Merchandise — 24hr live chat */
  (function initOlasChat() {
    const root = document.querySelector('[data-olas-chat]');
    if (!root) return;

    const toggle = document.getElementById('olasChatToggle');
    const panel = document.getElementById('olasChatPanel');
    const closeBtn = document.getElementById('olasChatClose');
    const openBtn = document.getElementById('olasChatOpenBtn');
    const form = document.getElementById('olasChatForm');
    const input = document.getElementById('olasChatInput');
    const messages = document.getElementById('olasChatMessages');
    const phoneDisplay = '08038387515';
    const phoneE164 = '2348038387515';
    const email = 'tbs4one@live.com';

    function addBubble(text, role) {
      const bubble = document.createElement('div');
      bubble.className = 'olas-chat-bubble olas-chat-bubble--' + role;
      bubble.textContent = text;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
    }

    function setOpen(isOpen) {
      panel.hidden = !isOpen;
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen && messages.childElementCount === 0) {
        addBubble(
          'Welcome to OLAS Technologies & General Merchandise. We are online 24 hours. How can we help you today?',
          'bot'
        );
        addBubble(
          'Official email: ' + email + ' · Phone: ' + phoneDisplay,
          'bot'
        );
      }
      if (isOpen) {
        input.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(panel.hidden);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setOpen(false);
      });
    }

    if (openBtn) {
      openBtn.addEventListener('click', function () {
        setOpen(true);
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      addBubble(text, 'user');
      input.value = '';

      addBubble(
        'Connecting you now for a 24hr reply via WhatsApp… You can also email ' +
          email +
          ' or call ' +
          phoneDisplay +
          '.',
        'bot'
      );

      const waUrl =
        'https://wa.me/' +
        phoneE164 +
        '?text=' +
        encodeURIComponent(
          'Hello OLAS Technologies & General Merchandise,\n\n' + text
        );

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  })();
})();
