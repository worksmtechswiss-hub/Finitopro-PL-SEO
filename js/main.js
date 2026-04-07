/* FinitoPro PL — Main JavaScript */

(function() {
  'use strict';

  // ===== INTERSECTION OBSERVER: Fade-up on scroll =====
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-up-target').forEach(el => {
    fadeObserver.observe(el);
  });

  // ===== NAVBAR: Scroll shadow =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ===== NAVBAR: Mobile toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Toggle hamburger/close icon
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });
  }

  // ===== NAVBAR: Mega dropdown — desktop hover, mobile click =====
  const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');
  const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  dropdownTriggers.forEach(trigger => {
    const dropdown = trigger.querySelector('.mega-dropdown');
    const btn = trigger.querySelector('.nav-dropdown-btn');
    if (!dropdown || !btn) return;

    // Desktop: hover
    trigger.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        closeAllDropdowns();
        dropdown.classList.add('open');
        trigger.classList.add('open');
      }
    });

    trigger.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        dropdown.classList.remove('open');
        trigger.classList.remove('open');
      }
    });

    // Click (mobile + touch)
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add('open');
        trigger.classList.add('open');
      }
    });
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.mega-dropdown.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.nav-dropdown-trigger.open').forEach(t => t.classList.remove('open'));
  }

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown-trigger')) {
      closeAllDropdowns();
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a:not(.nav-dropdown-btn)').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('open');
    });
  });

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach(i => {
        if (i !== item) i.classList.remove('active');
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 20 : 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        // Close mobile menu
        if (navLinks) navLinks.classList.remove('open');
      }
    });
  });

})();
