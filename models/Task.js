const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meeting',
      required: false, // Opsional, task bisa berasal dari rapat tertentu atau berdiri sendiri
    },
    title: {
      type: String,
      required: [true, 'Judul task/jobdesk wajib diisi'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    assignee: {
      type: String,
      required: [true, 'Penanggung jawab (PIC/Assignee) wajib diisi'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    dueDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
