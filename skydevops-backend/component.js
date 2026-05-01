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
        <p>Owned & managed by <strong style="color:var(--white)">Ms. Sushila Mishra</strong> — delivering cutting-edge DevOps, cloud, and automation services.</p>
        <br>
        <p>📧 info@skydevopssolution.com</p>
        <p>📞 +91 98765 43210</p>
        <p>🏢 Karnataka, India</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="services.html">DevOps Solutions</a>
        <a href="services.html">CI/CD Pipelines</a>
        <a href="services.html">Cloud Migration</a>
        <a href="services.html">Automation</a>
      </div>
      <div class="footer-col">
        <h4>Internship</h4>
        <a href="internship.html">Apply Now</a>
        <a href="internship-rules.html">Rules & Guidelines</a>
        <a href="offer-letter.html">Offer Letter</a>
        <a href="certificate.html">Certificate</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="about.html">About Us</a>
        <a href="industries.html">Industries</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 SkyDevOps Solution. All rights reserved. | Sole Owner: Sushila Mishra</p>
      <p>Designed with ♥ in India</p>
    </div>
  </footer>`;
}