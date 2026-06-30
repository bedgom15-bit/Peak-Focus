// ===== Peak Focus — Landing =====

(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'peak-theme';

  // Tema inicial: guardado > preferencia del sistema > oscuro
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }

  toggle.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  // ===== Idioma (ES / EN) =====
  const LANG_KEY = 'peak-lang';
  const langToggle = document.getElementById('langToggle');

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    // Texto plano
    document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });
    // Texto con marcado (títulos, párrafos con <strong>, etc.)
    document.querySelectorAll('[data-' + lang + '-html]').forEach(function (el) {
      el.innerHTML = el.getAttribute('data-' + lang + '-html');
    });
    // El botón muestra el idioma al que se cambiará
    langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
    // Título de la pestaña
    document.title = lang === 'es'
      ? 'Peak Focus — Alcanza tu Peak'
      : 'Peak Focus — Reach your Peak';
  }

  // Idioma inicial: guardado > idioma del navegador > español
  const savedLang = localStorage.getItem(LANG_KEY);
  const browserLang = (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  applyLang(savedLang || browserLang);

  langToggle.addEventListener('click', function () {
    const next = root.getAttribute('data-lang') === 'es' ? 'en' : 'es';
    applyLang(next);
    localStorage.setItem(LANG_KEY, next);
  });

  // Año del footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Aviso si el APK aún no está disponible
  const dl = document.getElementById('downloadBtn');
  dl.addEventListener('click', function (e) {
    fetch(dl.getAttribute('href'), { method: 'HEAD' })
      .then(function (res) {
        if (!res.ok) showMissingApk(e);
      })
      .catch(function () { /* sin red: dejamos que el navegador intente */ });
  });

  function showMissingApk(e) {
    e.preventDefault();
    alert('El APK aún no está disponible aquí. Coloca el archivo "peak-focus.apk" junto a esta página.');
  }

  // Revelado suave al hacer scroll (entradas con ease-out, una sola vez).
  // El movimiento/easing/stagger vive en el CSS; aquí solo conmutamos la clase.
  const reveals = document.querySelectorAll('[data-reveal]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // Sin animación: mostrar todo de inmediato.
    reveals.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target); // se anima una vez, no en cada scroll
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    reveals.forEach(function (el) { obs.observe(el); });
  }
})();
