// Nav hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Active nav link
const links = document.querySelectorAll('.nav-links a');
const current = location.pathname.split('/').pop() || 'index.html';
links.forEach(l => { if (l.getAttribute('href') === current) l.style.color = 'var(--sky)'; });

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.animation = 'fadeUp 0.6s ease both'; e.target.style.opacity = '1'; } });
}, { threshold: 0.1 });
document.querySelectorAll('.card, .stat, .price-card, .doc-section').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Contact form submit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('formMsg').style.display = 'block';
    contactForm.reset();
    setTimeout(() => { document.getElementById('formMsg').style.display = 'none'; }, 4000);
  });
}

// Internship form submit
const internForm = document.getElementById('internForm');
if (internForm) {
  internForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('internMsg').style.display = 'block';
    internForm.reset();
    setTimeout(() => { document.getElementById('internMsg').style.display = 'none'; }, 4000);
  });
}
