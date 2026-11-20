const express = require('express');
const router = express.Router();
const {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} = require('../controllers/meetingController');

// Endpoint CRUD Meetings (Notulensi / MoM)
router.post('/', createMeeting);       // CREATE (POST)
router.get('/', getAllMeetings);       // READ ALL (GET)
router.get('/:id', getMeetingById);    // READ BY ID (GET)
router.put('/:id', updateMeeting);     // UPDATE (PUT)
router.patch('/:id', updateMeeting);   // UPDATE (PATCH)
router.delete('/:id', deleteMeeting);  // DELETE (DELETE)

module.exports = router;
