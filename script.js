// Year stamp
document.getElementById('year').textContent = new Date().getFullYear();

// Mark <html> so CSS can apply the hide-then-fade-in only when JS is enabled.
// JS-disabled visitors (and any failure path) get instant content with no flash.
document.documentElement.classList.add('js');

// Reveal-on-scroll for sections (subtle fade-in). The .reveal initial state and
// .in transition rules live in styles.css so a strict CSP (no inline-style) works.
const reveals = document.querySelectorAll('.section, .hero');
reveals.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((el) => io.observe(el));

// Smooth-scroll offset for sticky nav (Safari fix)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
