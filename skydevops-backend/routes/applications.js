const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect } = require('../middleware/auth');
const {
  sendApplicationConfirmation,
  sendAdminNotification,
  sendOfferLetterEmail
} = require('../utils/email');

// ── PUBLIC: Submit internship application ──
// POST /api/applications/apply
router.post('/apply', async (req, res) => {
  try {
    const { name, email, phone, track, course, duration, college, year, message } = req.body;

    if (!name || !email || !phone || !track || !course) {
      return res.status(400).json({ error: 'Please fill all required fields.' });
    }

    // Check duplicate
    const existing = await Application.findOne({ email, course });
    if (existing) {
      return res.status(409).json({ error: 'You have already applied for this course.' });
    }

    const newApp = new Application({ name, email, phone, track, course, duration, college, year, message });
    await newApp.save();

    // Send emails (non-blocking)
    try {
      await sendApplicationConfirmation(newApp);
      await sendAdminNotification(newApp);
    } catch (emailErr) {
      console.log('Email error (non-critical):', emailErr.message);
    }

    res.status(201).json({
      message: 'Application submitted successfully! We will contact you within 2-3 business days.',
      id: newApp._id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ADMIN: Get all applications ──
// GET /api/applications
router.get('/', protect, async (req, res) => {
  try {
    const { status, track, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (track) filter.track = track;

    const total = await Application.countDocuments(filter);
    const apps = await Application.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ total, page: parseInt(page), data: apps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ADMIN: Get single application ──
// GET /api/applications/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Application not found.' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ADMIN: Update application status ──
// PATCH /api/applications/:id/status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, updatedAt: Date.now() },
      { new: true }
    );
    if (!app) return res.status(404).json({ error: 'Application not found.' });

    // If selected, send offer letter email
    if (status === 'selected' && !app.offerLetterSent) {
      try {
        await sendOfferLetterEmail(app);
        await Application.findByIdAndUpdate(req.params.id, {
          offerLetterSent: true,
          offerLetterDate: Date.now()
        });
      } catch (emailErr) {
        console.log('Offer letter email error:', emailErr.message);
      }
    }

    res.json({ message: 'Status updated successfully.', data: app });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ADMIN: Delete application ──
// DELETE /api/applications/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ADMIN: Stats ──
// GET /api/applications/stats/summary
router.get('/stats/summary', protect, async (req, res) => {
  try {
    const total = await Application.countDocuments();
    const pending = await Application.countDocuments({ status: 'pending' });
    const shortlisted = await Application.countDocuments({ status: 'shortlisted' });
    const selected = await Application.countDocuments({ status: 'selected' });
    const rejected = await Application.countDocuments({ status: 'rejected' });
    const technical = await Application.countDocuments({ track: 'technical' });
    const nonTechnical = await Application.countDocuments({ track: 'non-technical' });

    res.json({ total, pending, shortlisted, selected, rejected, technical, nonTechnical });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
