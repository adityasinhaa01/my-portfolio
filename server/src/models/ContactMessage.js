const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    ipAddress: {
      type: String,
      trim: true
    },
    userAgent: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
