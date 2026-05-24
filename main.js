const progress = document.querySelector('.progress');
const cursor = document.querySelector('.cursor');
const dot = document.querySelector('.dot');
let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;

document.documentElement.classList.add('js-ready');

if (cursor && dot) {
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
  }, { passive: true });

  document.querySelectorAll('a:not(.brand),.poster,.button,.work-item,.work-card,.image-tile,.resume-card,.case-img').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-big'));
  });
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      if (entry.target.matches('.poster,.work-item,.work-card,.case-row,.resume-card,.image-tile,.case-img')) {
        entry.target.classList.add('pop-in');
      }
    }
  });
}, { threshold: 0.13, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal,.poster,.case-row,.image-tile,.work-item,.work-card,.resume-card,.section-head,.case-img').forEach(el => io.observe(el));

// Magnetic buttons: subtle and smooth, never jumpy.
document.querySelectorAll('.magnetic,.button').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.08;
    const y = (e.clientY - r.top - r.height / 2) * 0.08;
    el.style.transform = `translate3d(${x}px,${y}px,0)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = 'translate3d(0,0,0)'; });
});

// Smooth poster tilt.
document.querySelectorAll('.poster,.work-card').forEach(card => {
  let tx = 0, ty = 0, rx = 0, ry = 0;
  let active = false;
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 5;
    ty = ((e.clientY - r.top) / r.height - 0.5) * -5;
    active = true;
  });
  card.addEventListener('mouseleave', () => { tx = 0; ty = 0; active = false; });
  function tiltFrame(){
    rx += (ty - rx) * 0.12;
    ry += (tx - ry) * 0.12;
    card.style.setProperty('--rx', `${rx}deg`);
    card.style.setProperty('--ry', `${ry}deg`);
    requestAnimationFrame(tiltFrame);
  }
  tiltFrame();
});

function raf() {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.max(0, scrollY / max) : 0})`;

  document.querySelectorAll('.parallax').forEach(el => {
    const speed = parseFloat(el.dataset.speed || 0.06);
    const r = el.getBoundingClientRect();
    const y = (innerHeight / 2 - r.top - r.height / 2) * speed;
    el.style.setProperty('--py', `${y}px`);
  });

  const heroStage = document.querySelector('.cutout-stage, .split-name-panel');
  if (heroStage) {
    const heroProgress = Math.min(1, Math.max(0, scrollY / Math.max(1, innerHeight)));
    heroStage.style.setProperty('--heroScroll', heroProgress.toFixed(3));
  }

  if (cursor) {
    cx += (mx - cx) * 0.16;
    cy += (my - cy) * 0.16;
    cursor.style.transform = `translate3d(${cx}px,${cy}px,0)`;
  }
  requestAnimationFrame(raf);
}
raf();


// Hero-only pointer field: gives the landing section a heavier, poster-like microinteraction.
document.querySelectorAll('[data-tilt-area]').forEach(area => {
  area.addEventListener('mousemove', (e) => {
    const r = area.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    area.querySelectorAll('.hero-stage').forEach(el => {
      el.style.setProperty('--mx', x.toFixed(2));
      el.style.setProperty('--my', y.toFixed(2));
    });
  }, { passive:true });
});

document.querySelectorAll('[data-tilt-card]').forEach(card => {
  let tx = 0, ty = 0, rx = 0, ry = 0;
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 7;
    ty = ((e.clientY - r.top) / r.height - 0.5) * -7;
  }, { passive:true });
  card.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
  function loop(){
    rx += (ty - rx) * 0.10;
    ry += (tx - ry) * 0.10;
    card.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    requestAnimationFrame(loop);
  }
  loop();
});


// Mobile hamburger navigation
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.nav nav');
if (menuToggle && siteNav) {
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
}
