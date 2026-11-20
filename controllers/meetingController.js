const Meeting = require('../models/Meeting');
const Task = require('../models/Task');

// @desc    Buat notulensi rapat (MoM) baru
// @route   POST /api/meetings
const createMeeting = async (req, res) => {
  try {
    const newMeeting = await Meeting.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Notulensi rapat (MoM) berhasil dibuat',
      data: newMeeting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal membuat notulensi rapat',
      error: error.message,
    });
  }
};

// @desc    Ambil semua data notulensi rapat (MoM)
// @route   GET /api/meetings
const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ date: -1 });
    return res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil daftar notulensi rapat',
      error: error.message,
    });
  }
};

// @desc    Ambil detail satu notulensi rapat beserta list task terkait
// @route   GET /api/meetings/:id
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: 'Notulensi rapat tidak ditemukan',
      });
    }

    // Ambil juga daftar task/jobdesk yang terhubung dengan rapat ini
    const tasks = await Task.find({ meetingId: meeting._id });

    return res.status(200).json({
      success: true,
      data: {
        ...meeting.toObject(),
        tasks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail notulensi rapat',
      error: error.message,
    });
  }
};

// @desc    Update notulensi rapat (MoM)
// @route   PUT /api/meetings/:id
const updateMeeting = async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({
        success: false,
        message: 'Notulensi rapat tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Notulensi rapat berhasil diperbarui',
      data: updatedMeeting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui notulensi rapat',
      error: error.message,
    });
  }
};

// @desc    Hapus notulensi rapat (MoM)
// @route   DELETE /api/meetings/:id
const deleteMeeting = async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!deletedMeeting) {
      return res.status(404).json({
        success: false,
        message: 'Notulensi rapat tidak ditemukan',
      });
    }

    // Opsional: Hapus juga task yang terkait dengan rapat ini
    await Task.deleteMany({ meetingId: req.params.id });

    return res.status(200).json({
      success: true,
      message: 'Notulensi rapat beserta task terkait berhasil dihapus',
      data: deletedMeeting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus notulensi rapat',
      error: error.message,
    });
  }
};

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
