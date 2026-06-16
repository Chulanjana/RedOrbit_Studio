// ============================================================
// REDORBIT STUDIOS — Site Interactions
// ============================================================

(function () {
  'use strict';

  // ---- Nav: add .scrolled class once user scrolls past 20px ----
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll-reveal: add .in to .reveal elements once visible ----
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  // ---- Contact form: client-side success state (no backend wired) ----
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.textContent = 'Signal received. We\'ll be in touch within two business days.';
      }
      form.querySelectorAll('input, textarea, select').forEach(f => { f.value = ''; });
    });
  }

  // ---- Newsletter form: same idea ----
  document.querySelectorAll('.newsletter form').forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = f.querySelector('input');
      const btn = f.querySelector('button');
      if (input) input.value = '';
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Subscribed';
        setTimeout(() => { btn.textContent = original; }, 2500);
      }
    });
  });

  // ---- Games filter (only fires on /games.html) ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card-v[data-status]');
  if (filterBtns.length && gameCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        gameCards.forEach(card => {
          if (filter === 'all' || card.dataset.status === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
})();
