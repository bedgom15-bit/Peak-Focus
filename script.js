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
