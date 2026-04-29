const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');
const { sendContactNotification } = require('../utils/email');

// ── PUBLIC: Submit contact form ──
// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, industry, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newContact = new Contact({ name, email, phone, company, industry, service, message });
    await newContact.save();

    // Notify admin
    try {
      await sendContactNotification(newContact);
    } catch (emailErr) {
      console.log('Email error (non-critical):', emailErr.message);
    }

    res.status(201).json({ message: 'Thank you! We will get back to you within 24 hours.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ADMIN: Get all contacts ──
// GET /api/contact
router.get('/', protect, async (req, res) => {
  try {
    const { status, industry, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (industry) filter.industry = industry;

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ total, page: parseInt(page), data: contacts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ADMIN: Update contact status ──
// PATCH /api/contact/:id/status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );
    if (!contact) return res.status(404).json({ error: 'Contact not found.' });
    res.json({ message: 'Status updated.', data: contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ADMIN: Delete contact ──
// DELETE /api/contact/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
