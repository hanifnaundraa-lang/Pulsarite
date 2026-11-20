const Task = require('../models/Task');

// @desc    Buat task / jobdesk baru
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Task / Jobdesk berhasil dibuat',
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal membuat task / jobdesk',
      error: error.message,
    });
  }
};

// @desc    Ambil semua task / jobdesk (bisa difilter berdasarkan status, assignee, atau meetingId)
// @route   GET /api/tasks
const getAllTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.assignee) filter.assignee = req.query.assignee;
    if (req.query.meetingId) filter.meetingId = req.query.meetingId;

    const tasks = await Task.find(filter)
      .populate('meetingId', 'title date notulis')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil daftar task / jobdesk',
      error: error.message,
    });
  }
};

// @desc    Ambil detail satu task / jobdesk berdasarkan ID
// @route   GET /api/tasks/:id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      'meetingId',
      'title date notulis'
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task / Jobdesk tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail task / jobdesk',
      error: error.message,
    });
  }
};

// @desc    Update task / jobdesk (PUT / PATCH)
// @route   PUT /api/tasks/:id atau PATCH /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task / Jobdesk tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task / Jobdesk berhasil diperbarui',
      data: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui task / jobdesk',
      error: error.message,
    });
  }
};

// @desc    Hapus task / jobdesk
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task / Jobdesk tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task / Jobdesk berhasil dihapus',
      data: deletedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus task / jobdesk',
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
