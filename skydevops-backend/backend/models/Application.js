const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Personal Info
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  
  // Internship Details
  track: { type: String, enum: ['technical', 'non-technical'], required: true },
  course: { type: String, required: true },
  duration: { type: String, enum: ['1month', '3months', '6months'], default: '3months' },
  college: { type: String, trim: true },
  year: { type: String, trim: true },
  
  // Message
  message: { type: String, trim: true },
  
  // Status Management
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'selected'],
    default: 'pending'
  },
  adminNotes: { type: String, default: '' },

  // Offer Letter
  offerLetterSent: { type: Boolean, default: false },
  offerLetterDate: { type: Date },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Application', applicationSchema);
