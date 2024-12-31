const express = require('express');
const { getAttendance, addAttendance } = require('../controllers/attendanceController');
const router = express.Router();

router.get('/', getAttendance);
router.post('/', addAttendance);

module.exports = router;

