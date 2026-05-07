/* SRS — Homepage interactions
   - Reveal-on-scroll
   - FAQ accordion (single-open)
   - Animated stat counters
   - Testimonial carousel
   - Marquee duplication for seamless loop
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* Marquee — duplicate track for seamless infinite scroll ---- */
  document.querySelectorAll('.marquee__track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  /* Reveal-on-scroll using IntersectionObserver --------------- */
  const reveal = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          reveal.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));

  /* FAQ accordion --------------------------------------------- */
  document.querySelectorAll('.accordion').forEach(acc => {
    acc.addEventListener('click', e => {
      const btn = e.target.closest('.accordion__btn');
      if (!btn) return;
      const item = btn.parentElement;
      const panel = item.querySelector('.accordion__panel');
      const isOpen = item.classList.contains('accordion__item--open');

      acc.querySelectorAll('.accordion__item--open').forEach(open => {
        open.classList.remove('accordion__item--open');
        const p = open.querySelector('.accordion__panel');
        p.style.maxHeight = '0px';
        open.querySelector('.accordion__btn').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('accordion__item--open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Animated counters ----------------------------------------- */
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const animateCounter = el => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1600;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const v = target * easeOut(p);
      el.textContent = v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString(undefined, {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      });
    };
    requestAnimationFrame(tick);
  };
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  /* Testimonial carousel -------------------------------------- */
  document.querySelectorAll('.story-stage').forEach(stage => {
    const slides = stage.querySelectorAll('.story-slide');
    const images = stage.querySelectorAll('.story-stage__media img');
    const counter = stage.querySelector('.story-controls__counter');
    const total = slides.length;
    let idx = 0;
    const setIndex = i => {
      idx = (i + total) % total;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === idx));
      images.forEach((img, k) => img.style.opacity = k === idx ? '1' : '0');
      if (counter) counter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    };
    stage.querySelector('[data-prev]')?.addEventListener('click', () => setIndex(idx - 1));
    stage.querySelector('[data-next]')?.addEventListener('click', () => setIndex(idx + 1));
    setIndex(0);
  });

  /* Mobile menu toggle ---------------------------------------- */
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-header__nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* Header — solidify on scroll ------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
});
