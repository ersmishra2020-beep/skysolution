// ================= NAVBAR TOGGLE =================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
}

// ================= ACTIVE LINK =================
const links = document.querySelectorAll('.nav-links a');
const current = location.pathname.split('/').pop() || 'index.html';

links.forEach(link => {
  if (link.getAttribute('href') === current) {
    link.classList.add('active-link');
  }
});

// ================= SCROLL REVEAL =================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.classList.add('show');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .stat, .price-card, .doc-section').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// ================= FORM HANDLER =================
function handleForm(formId, msgId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById(msgId);
    msg.style.display = 'block';

    form.reset();

    setTimeout(() => {
      msg.style.display = 'none';
    }, 3000);
  });
}

handleForm('contactForm', 'formMsg');
handleForm('internForm', 'internMsg');


// ================= NAV + FOOTER RENDER =================
function renderNav() {
  return `
  <nav>
    <a href="index.html" class="logo">Sky<span>DevOps</span></a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="internship.html">Internship</a></li>
      <li><a href="industries.html">Industries</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html" class="nav-cta">Contact Us</a></li>
    </ul>
    <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer>
    <div class="footer-grid">
      <div class="footer-col">
        <h4>SkyDevOps Solution</h4>
        <p>Owned & managed by <strong style="color:var(--white)">Ms. Sushila Mishra</strong></p>
        <p>📧 info@skydevopssolution.com</p>
        <p>📞 +91 98765 43210</p>
        <p>🏢 Karnataka, India</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="services.html">DevOps</a>
        <a href="services.html">CI/CD</a>
        <a href="services.html">Cloud</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
  </footer>`;
}