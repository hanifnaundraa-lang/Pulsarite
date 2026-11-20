const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Judul rapat wajib diisi'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Tanggal rapat wajib diisi'],
      default: Date.now,
    },
    location: {
      type: String,
      default: 'Online / Zoom',
      trim: true,
    },
    notulis: {
      type: String,
      required: [true, 'Nama notulis wajib diisi'],
      trim: true,
    },
    attendees: {
      type: [String],
      default: [],
    },
    agenda: {
      type: String,
      required: [true, 'Agenda rapat wajib diisi'],
    },
    discussionSummary: {
      type: String,
      required: [true, 'Ringkasan pembahasan / notulensi (MoM) wajib diisi'],
    },
    decisions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Meeting', meetingSchema);
