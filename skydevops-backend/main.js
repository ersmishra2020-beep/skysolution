// ============================================
//   SkyDevOps Solution – main.js
// ============================================

// ── Mobile Navigation ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ── Scroll Animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .stat, .owner-card, .track-card, .pricing-card, .timeline-item, .doc-section, .contact-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ── Navbar Scroll Effect ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(3,13,26,0.98)';
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      nav.style.background = 'rgba(3,13,26,0.9)';
      nav.style.boxShadow = 'none';
    }
  }
});

// ── Stat Counter Animation ──
function animateCounter(el, target, duration = 1500) {
  const isPercent = target.includes('%');
  const isPlus = target.includes('+');
  const num = parseInt(target);
  let start = 0;
  const step = num / (duration / 16);

  const timer = setInterval(() => {
    start += step;
    if (start >= num) {
      start = num;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + (isPercent ? '%' : '') + (isPlus ? '+' : '');
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const original = el.textContent;
      animateCounter(el, original);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => {
  statObserver.observe(el);
});

// ── Certificate Generator ──
function generateCertificate() {
  const name = document.getElementById('certName')?.value?.trim();
  const track = document.getElementById('certTrack')?.value;
  const duration = document.getElementById('certDuration')?.value;

  if (!name) { alert('Please enter intern name'); return; }

  const certId = 'SKY-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9000 + 1000);
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const preview = document.getElementById('certPreview');
  if (preview) {
    preview.innerHTML = `
      <div style="border:3px solid #00b4f0;padding:3rem;text-align:center;background:linear-gradient(135deg,#061428,#0a1f3a);border-radius:12px;position:relative;">
        <div style="font-family:'Orbitron',monospace;color:#00b4f0;font-size:0.7rem;letter-spacing:4px;margin-bottom:1rem;">CERTIFICATE OF COMPLETION</div>
        <div style="font-size:0.9rem;color:#7a9bb5;margin-bottom:1.5rem;">This is to certify that</div>
        <div style="font-family:'Orbitron',monospace;font-size:2rem;font-weight:900;color:#e8f4fd;margin-bottom:1rem;">${name}</div>
        <div style="color:#7a9bb5;margin-bottom:0.5rem;">has successfully completed the</div>
        <div style="color:#00b4f0;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">${track}</div>
        <div style="color:#7a9bb5;margin-bottom:2rem;">Internship Program (${duration})</div>
        <div style="display:flex;justify-content:space-between;margin-top:2rem;padding-top:1.5rem;border-top:1px solid rgba(0,180,240,0.2);">
          <div style="text-align:left;">
            <div style="font-family:'Orbitron',monospace;font-size:0.8rem;color:#00b4f0;">Sushila Mishra</div>
            <div style="font-size:0.75rem;color:#7a9bb5;">CEO, SkyDevOps Solution</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.75rem;color:#7a9bb5;">Date: ${date}</div>
            <div style="font-size:0.75rem;color:#7a9bb5;">ID: ${certId}</div>
          </div>
        </div>
      </div>
    `;
    preview.style.display = 'block';
  }
}

// ── Offer Letter Generator ──
function generateOfferLetter() {
  const name = document.getElementById('olName')?.value?.trim();
  const track = document.getElementById('olTrack')?.value;
  const startDate = document.getElementById('olStart')?.value;
  const duration = document.getElementById('olDuration')?.value;

  if (!name || !startDate) { alert('Please fill all required fields'); return; }

  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const start = new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const preview = document.getElementById('olPreview');
  if (preview) {
    preview.innerHTML = `
      <div style="background:#061428;border:1px solid rgba(0,180,240,0.3);border-radius:12px;padding:3rem;text-align:left;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(0,180,240,0.2);">
          <div style="font-family:'Orbitron',monospace;font-size:1.2rem;font-weight:700;color:#e8f4fd;">Sky<span style="color:#00b4f0;">DevOps</span> Solution</div>
          <div style="font-size:0.8rem;color:#7a9bb5;">Date: ${date}</div>
        </div>
        <div style="font-family:'Orbitron',monospace;color:#00b4f0;font-size:0.9rem;letter-spacing:2px;margin-bottom:1.5rem;">INTERNSHIP OFFER LETTER</div>
        <p style="color:#e8f4fd;margin-bottom:1rem;">Dear <strong>${name}</strong>,</p>
        <p style="color:#7a9bb5;line-height:1.8;margin-bottom:1rem;">We are pleased to offer you an internship position at <strong style="color:#e8f4fd;">SkyDevOps Solution</strong> under the <strong style="color:#00b4f0;">${track}</strong>.</p>
        <p style="color:#7a9bb5;line-height:1.8;margin-bottom:2rem;">Your internship will commence on <strong style="color:#e8f4fd;">${start}</strong> for a duration of <strong style="color:#e8f4fd;">${duration}</strong>. Upon successful completion, you will receive an official certificate.</p>
        <div style="margin-top:3rem;padding-top:1.5rem;border-top:1px solid rgba(0,180,240,0.2);">
          <div style="font-family:'Orbitron',monospace;font-size:0.85rem;color:#00b4f0;">Sushila Mishra</div>
          <div style="font-size:0.8rem;color:#7a9bb5;">Sole Owner & CEO — SkyDevOps Solution</div>
        </div>
      </div>
    `;
    preview.style.display = 'block';
  }
}

// ── Contact Form ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = '#00f5c4';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      this.reset();
    }, 3000);
  });
}

// ── Internship Form ──
const internForm = document.getElementById('internForm');
if (internForm) {
  internForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Application Submitted! ✓';
    btn.style.background = '#00f5c4';
    btn.style.color = '#030d1a';
    setTimeout(() => {
      btn.textContent = 'Submit Application';
      btn.style.background = '';
      btn.style.color = '';
      this.reset();
    }, 3000);
  });
}

// ── Print Certificate / Offer Letter ──
function printDoc(elementId) {
  const content = document.getElementById(elementId)?.innerHTML;
  if (!content) return;
  const win = window.open('', '_blank');
  win.document.write(`
    <html><head>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      body { margin: 0; padding: 40px; background: #030d1a; font-family: 'Exo 2', sans-serif; }
      @media print { body { background: white; } }
    </style>
    </head><body>${content}</body></html>
  `);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

console.log('🚀 SkyDevOps Solution — Initialized');
