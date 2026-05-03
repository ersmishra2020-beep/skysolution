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
        <p>Proprietor: <strong style="color:#fff">Sushila Mishra</strong></p>
        <p style="font-size:0.78rem;margin-top:8px;line-height:2;color:#94a3b8;">
          MSME: UDYAM-UP-28-0216875<br/>GSTIN: 09AJOPC8312N1ZS<br/>NIC 62013 · Micro Enterprise · Est. 2020<br/>203, Block 5, Greater Noida, UP – 201308
        </p>
        <p>📧 <a href="mailto:er.smishra2020@gmail.com" style="color:#00b4f0;">er.smishra2020@gmail.com</a></p>
        <p>📞 <a href="tel:9650716663" style="color:#00b4f0;">+91 9650716663</a></p>
      </div>
      <div class="footer-col"><h4>Services</h4><a href="services.html">DevOps Solutions</a><a href="services.html">CI/CD Pipelines</a><a href="services.html">Cloud Migration</a></div>
      <div class="footer-col"><h4>Internship</h4><a href="internship.html">Apply Now</a><a href="internship-rules.html">Rules</a><a href="offer-letter.html">Offer Letter</a><a href="certificate.html">Certificate</a></div>
      <div class="footer-col"><h4>Company</h4><a href="about.html">About Us</a><a href="industries.html">Industries</a><a href="contact.html">Contact</a></div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 SkyDevOps Solution | Proprietor: Sushila Mishra | MSME: UDYAM-UP-28-0216875 | GSTIN: 09AJOPC8312N1ZS</p>
      <p>Made with ♥ in India</p>
    </div>
  </footer>\`; }