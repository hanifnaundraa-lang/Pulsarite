const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Endpoint CRUD Tasks (List Task / Jobdesk)
router.post('/', createTask);       // CREATE (POST)
router.get('/', getAllTasks);       // READ ALL (GET)
router.get('/:id', getTaskById);    // READ BY ID (GET)
router.put('/:id', updateTask);     // UPDATE (PUT)
router.patch('/:id', updateTask);   // UPDATE (PATCH)
router.delete('/:id', deleteTask);  // DELETE (DELETE)

module.exports = router;
