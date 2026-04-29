const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ── Send application confirmation to student ──
const sendApplicationConfirmation = async (applicant) => {
  const mailOptions = {
    from: `"SkyDevOps Solution" <${process.env.EMAIL_USER}>`,
    to: applicant.email,
    subject: '✅ Internship Application Received - SkyDevOps Solution',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0f1e; color: #ffffff; padding: 30px; border-radius: 12px;">
        <div style="text-align:center; margin-bottom:20px;">
          <h1 style="color:#00bfff;">SkyDevOps Solution</h1>
          <p style="color:#aaa;">DevOps | Cloud | Automation</p>
        </div>
        <h2 style="color:#00bfff;">Application Received! 🎉</h2>
        <p>Dear <strong>${applicant.name}</strong>,</p>
        <p>Thank you for applying to the SkyDevOps Solution Internship Program. We have received your application successfully.</p>
        <div style="background:#111827; padding:20px; border-radius:8px; margin:20px 0;">
          <p><strong>Track:</strong> ${applicant.track}</p>
          <p><strong>Course:</strong> ${applicant.course}</p>
          <p><strong>Duration:</strong> ${applicant.duration}</p>
        </div>
        <p>Our team will review your application and get back to you within <strong>2-3 business days</strong>.</p>
        <p style="color:#aaa; font-size:13px; margin-top:30px;">© 2025 SkyDevOps Solution. All rights reserved.</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};

// ── Notify admin about new application ──
const sendAdminNotification = async (applicant) => {
  const mailOptions = {
    from: `"SkyDevOps System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 New Internship Application - ${applicant.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Internship Application Received</h2>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse; width:100%;">
          <tr><td><strong>Name</strong></td><td>${applicant.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${applicant.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${applicant.phone}</td></tr>
          <tr><td><strong>Track</strong></td><td>${applicant.track}</td></tr>
          <tr><td><strong>Course</strong></td><td>${applicant.course}</td></tr>
          <tr><td><strong>College</strong></td><td>${applicant.college || 'N/A'}</td></tr>
          <tr><td><strong>Message</strong></td><td>${applicant.message || 'N/A'}</td></tr>
        </table>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};

// ── Send contact form notification ──
const sendContactNotification = async (contact) => {
  const mailOptions = {
    from: `"SkyDevOps System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `📩 New Contact Inquiry - ${contact.name} (${contact.industry})`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Contact Form Submission</h2>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse; width:100%;">
          <tr><td><strong>Name</strong></td><td>${contact.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${contact.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${contact.phone || 'N/A'}</td></tr>
          <tr><td><strong>Company</strong></td><td>${contact.company || 'N/A'}</td></tr>
          <tr><td><strong>Industry</strong></td><td>${contact.industry}</td></tr>
          <tr><td><strong>Service Interested</strong></td><td>${contact.service || 'N/A'}</td></tr>
          <tr><td><strong>Message</strong></td><td>${contact.message}</td></tr>
        </table>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};

// ── Send offer letter notification ──
const sendOfferLetterEmail = async (applicant) => {
  const mailOptions = {
    from: `"SkyDevOps Solution" <${process.env.EMAIL_USER}>`,
    to: applicant.email,
    subject: '🎓 Offer Letter - SkyDevOps Solution Internship',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0f1e; color: #ffffff; padding: 30px; border-radius: 12px;">
        <h1 style="color:#00bfff; text-align:center;">SkyDevOps Solution</h1>
        <h2 style="color:#00bfff;">Congratulations! 🎉</h2>
        <p>Dear <strong>${applicant.name}</strong>,</p>
        <p>We are pleased to inform you that you have been <strong style="color:#00bfff;">selected</strong> for the SkyDevOps Solution Internship Program.</p>
        <div style="background:#111827; padding:20px; border-radius:8px; margin:20px 0;">
          <p><strong>Track:</strong> ${applicant.track}</p>
          <p><strong>Course:</strong> ${applicant.course}</p>
          <p><strong>Duration:</strong> ${applicant.duration}</p>
          <p><strong>Start Date:</strong> Joining instructions will follow shortly.</p>
        </div>
        <p>Please reply to this email to confirm your acceptance.</p>
        <p>Welcome to the SkyDevOps family! 🚀</p>
        <p style="color:#aaa; font-size:13px; margin-top:30px;">© 2025 SkyDevOps Solution. All rights reserved.</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendApplicationConfirmation,
  sendAdminNotification,
  sendContactNotification,
  sendOfferLetterEmail
};
