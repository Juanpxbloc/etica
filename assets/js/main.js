// Interacciones del micrositio: menú móvil, scroll spy, animaciones, pestañas y acordeón.

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const progressBar = document.getElementById('progress-bar');
  const backToTop = document.getElementById('back-to-top');

  // --- Menú móvil ---
  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenu.classList.toggle('hidden', isOpen);
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  // --- Header, barra de progreso y botón "volver arriba" ---
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;

    header.classList.toggle('shadow-lg', scrollTop > 20);
    backToTop.classList.toggle('opacity-0', scrollTop < 600);
    backToTop.classList.toggle('pointer-events-none', scrollTop < 600);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0 }));

  // --- Scroll spy: resalta la sección visible en el menú ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => spy.observe(section));

  // --- Animación de aparición ---
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // --- Pestañas (principios bioéticos y perspectivas) ---
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const buttons = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-panel]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tab;

        buttons.forEach((b) => {
          const selected = b === button;
          b.setAttribute('aria-selected', String(selected));
          b.classList.toggle('bg-navy-900', selected);
          b.classList.toggle('text-white', selected);
          b.classList.toggle('bg-white', !selected);
          b.classList.toggle('text-navy-900', !selected);
        });

        panels.forEach((panel) => panel.classList.toggle('hidden', panel.dataset.panel !== target));
      });
    });
  });

  // --- Acordeón (guion del podcast) ---
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // --- Figura 1 de la Sección 1: si el archivo no existe, se oculta y queda el marcador ---
  const figureImg = document.getElementById('figure-1-img');
  const hideFigure = () => figureImg.classList.add('hidden');

  if (figureImg.complete && figureImg.naturalWidth === 0) hideFigure();
  else figureImg.addEventListener('error', hideFigure);

  // --- Video de la Sección 3: se muestra solo si el archivo existe ---
  const video = document.getElementById('experience-video');
  const videoPlaceholder = document.getElementById('video-placeholder');

  const showVideo = () => {
    video.classList.remove('hidden');
    videoPlaceholder.classList.add('hidden');
  };

  if (video.readyState >= 1) showVideo();
  else video.addEventListener('loadedmetadata', showVideo);

  // --- Año dinámico en el pie de página ---
  document.getElementById('year').textContent = new Date().getFullYear();
});
