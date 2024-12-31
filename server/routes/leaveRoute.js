const express = require('express');
const { getLeaves, addLeave, updateLeave } = require('../controllers/leaveController');
const router = express.Router();

router.get('/', getLeaves);
router.post('/', addLeave);
router.put('/:id', updateLeave);

module.exports = router;
