/* ========== CURSOR PERSONALIZADO ========== */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});

function follow() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  requestAnimationFrame(follow);
}
follow();

document.querySelectorAll('a, button, input, select, textarea, .service-row, .project-scene-link, .feature-item, .contact-method, .form-submit').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

/* ========== SPOTLIGHTS QUE SIGUEN AL CURSOR EN EL HERO ========== */
const hero = document.querySelector('.hero');
const blobs = document.querySelectorAll('.blob');

/* Posición inicial: centro del hero */
let heroRect = hero.getBoundingClientRect();
let targetX = heroRect.width / 2;
let targetY = heroRect.height / 2;

/* Cada blob tiene su propia posición actual (para crear el efecto de trail/retraso) */
const blobPositions = Array.from(blobs).map(() => ({ x: targetX, y: targetY }));

/* Diferentes velocidades de seguimiento: el primero es rápido, los demás lentos = efecto estela */
const easeFactors = [0.08, 0.05, 0.035, 0.025];

hero.addEventListener('mousemove', (e) => {
  heroRect = hero.getBoundingClientRect();
  targetX = e.clientX - heroRect.left;
  targetY = e.clientY - heroRect.top;
});

/* Cuando el mouse sale, los blobs mantienen la última posición (memoria) */
/* No hacemos nada en mouseleave: el target se queda donde estaba */

function animateBlobs() {
  blobs.forEach((blob, i) => {
    const pos = blobPositions[i];
    pos.x += (targetX - pos.x) * easeFactors[i];
    pos.y += (targetY - pos.y) * easeFactors[i];
    blob.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
  });
  requestAnimationFrame(animateBlobs);
}
animateBlobs();

/* ========== SPOTLIGHT EN CARDS (ultra eficiente con CSS vars) ========== */
/* Un solo listener global, se activa solo cuando el mouse está sobre una card */
const spotlightCards = document.querySelectorAll('.service-row, .feature-item, .contact-method');

spotlightCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    /* Solo actualizamos las CSS vars — el navegador hace el resto en GPU */
    card.style.setProperty('--mx', x + 'px');
    card.style.setProperty('--my', y + 'px');
  });
  /* Al salir, dejamos la última posición (memoria) - no reseteamos */
});

/* ========== BARRA DE PROGRESO PORTFOLIO ========== */
const portfolioSection = document.querySelector('.portfolio');
const progressBar = document.querySelector('.portfolio-progress');
const progressFill = document.querySelector('.portfolio-progress-fill');

if (portfolioSection && progressBar && progressFill) {
  window.addEventListener('scroll', () => {
    const rect = portfolioSection.getBoundingClientRect();
    const vh = window.innerHeight;
    /* Está visible cuando el top está arriba y el bottom aún no pasó */
    const inView = rect.top < 0 && rect.bottom > vh;

    if (inView) {
      progressBar.classList.add('active');
      /* Progreso: cuánto recorrió dentro de la sección */
      const total = portfolioSection.offsetHeight - vh;
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      progressFill.style.height = pct + '%';
    } else {
      progressBar.classList.remove('active');
    }
  }, { passive: true });
}

/* ========== FORMULARIO DE CONTACTO ========== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      service: document.getElementById('service').value,
      message: document.getElementById('message').value.trim()
    };

    /* Validación básica */
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      formStatus.textContent = '⚠ Completá los campos obligatorios.';
      formStatus.className = 'form-status show error';
      return;
    }

    /* Mapeo de servicios legible */
    const servicios = {
      'branding': 'Branding / Identidad visual',
      'landing': 'Landing page / Web institucional',
      'ecommerce': 'E-commerce / Tienda online',
      'app': 'App o sistema a medida',
      'otro': 'Consulta general'
    };

    /* Armamos el mensaje formateado para WhatsApp */
    let msg = `Hola Budev! Mi nombre es ${formData.name}.%0A%0A`;
    msg += `📧 Email: ${formData.email}%0A`;
    if (formData.phone) msg += `📱 Teléfono: ${formData.phone}%0A`;
    msg += `🎯 Me interesa: ${servicios[formData.service]}%0A%0A`;
    msg += `💬 Mi proyecto:%0A${formData.message}`;

    /* Redirigimos a WhatsApp con el mensaje pre-cargado */
    const waUrl = `https://wa.me/5491170591714?text=${encodeURIComponent(decodeURIComponent(msg))}`;

    formStatus.innerHTML = '✓ Abriendo WhatsApp con tu mensaje...';
    formStatus.className = 'form-status show success';

    /* Pequeño delay para que se vea el mensaje antes de redirigir */
    // Redirigir directamente para evitar bloqueadores de pop-ups
    window.location.href = waUrl;
  });
}

/* ========== LOADER + TELÓN ========== */
const loader = document.getElementById('loader');
const curtain = document.getElementById('curtain');
const progress = document.getElementById('loaderProgress');

let pct = 0;
const progressInterval = setInterval(() => {
  pct += Math.random() * 18;
  if (pct >= 100) { pct = 100; clearInterval(progressInterval); }
  progress.textContent = `LOADING · ${String(Math.floor(pct)).padStart(2, '0')}%`;
}, 120);

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    curtain.classList.add('open');
    setTimeout(() => { loader.style.display = 'none'; }, 500);
  }, 1800);
});

/* ========== TYPEWRITER EN HERO ========== */
const words = ['impactantes', 'a tu medida', 'del futuro', 'para vos'];
const twEl = document.getElementById('typeword');
let wordIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = words[wordIdx];
  if (!deleting) {
    twEl.textContent = current.slice(0, charIdx++);
    if (charIdx > current.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    twEl.textContent = current.slice(0, charIdx--);
    if (charIdx < 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      charIdx = 0;
      setTimeout(typeLoop, 300);
      return;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 100);
}

/* Arranca después de que el telón se abre */
setTimeout(typeLoop, 3200);

/* ========== REVEAL ON SCROLL ========== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ========== HEADER SCROLL EFFECT ========== */
const header = document.querySelector('.header');
let lastScroll = 0;
let scrollTimer = null;

window.addEventListener('scroll', () => {
  const s = window.scrollY;

  /* Cambio de fondo según posición */
  if (s > 80) {
    header.style.background = 'rgba(7, 6, 13, 0.85)';
  } else {
    header.style.background = 'rgba(13, 10, 31, 0.6)';
  }

  /* Mostrar / ocultar según dirección del scroll */
  if (s < 100) {
    /* Siempre visible cerca del top */
    header.classList.remove('hidden');
  } else if (s > lastScroll + 5) {
    /* Scrolleando hacia abajo: ocultar */
    header.classList.add('hidden');
  } else if (s < lastScroll - 5) {
    /* Scrolleando hacia arriba: mostrar */
    header.classList.remove('hidden');
  }

  lastScroll = s;
}, { passive: true });