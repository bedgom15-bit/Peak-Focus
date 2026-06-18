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

  // Aparición suave de las tarjetas al hacer scroll
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.card').forEach(function (card, i) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity .5s ease ' + (i * 0.05) + 's, transform .5s ease ' + (i * 0.05) + 's';
      obs.observe(card);
    });
  }
})();
