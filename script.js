// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const sunIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
const moonIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
let dark = false;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  root.classList.toggle('dark', dark);
  themeBtn.innerHTML = dark ? sunIcon : moonIcon;
});

// Scroll header
const header = document.querySelector('header.site');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20));

// Mobile menu
const menuBtn = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// FAQ accordion
document.querySelectorAll('.faq button').forEach(btn => {
  btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
});

// Music toggle
const musicBtn = document.getElementById('musicToggle');
let audio, playing = false;
const musicOn = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
const musicOff = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4l-7 4"/></svg>';
musicBtn.addEventListener('click', () => {
  if (!audio) {
    audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_2c8d0e2b09.mp3?filename=happy-acoustic-children-piano-117809.mp3');
    audio.loop = true; audio.volume = 0.25;
  }
  playing = !playing;
  if (playing) audio.play().catch(()=>{}); else audio.pause();
  musicBtn.innerHTML = playing ? musicOn : musicOff;
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Counters
document.querySelectorAll('[data-counter]').forEach(el => {
  const to = +el.dataset.counter, suf = el.dataset.suffix || '';
  const cio = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.floor(to * (1 - Math.pow(1 - p, 3))).toLocaleString() + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.disconnect();
  }, { threshold: 0.4 });
  cio.observe(el);
});

// Form
document.querySelector('form.contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert("Thanks! We'll be in touch soon ✨");
});
