// Shared nav HTML
function renderNav(active) {
  return `
  <nav>
    <a href="index.html" class="logo">Sky<span>DevOps</span></a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html" ${active==='home'?'style="color:var(--sky)"':''}>Home</a></li>
      <li><a href="services.html" ${active==='services'?'style="color:var(--sky)"':''}>Services</a></li>
      <li><a href="internship.html" ${active==='internship'?'style="color:var(--sky)"':''}>Internship</a></li>
      <li><a href="industries.html" ${active==='industries'?'style="color:var(--sky)"':''}>Industries</a></li>
      <li><a href="about.html" ${active==='about'?'style="color:var(--sky)"':''}>About</a></li>
      <li><a href="contact.html" class="nav-cta">Contact Us</a></li>
    </ul>
    <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
  </nav>`;
}

// Shared footer HTML
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