const Attendance = require('../models/attendance');

exports.getAttendance = async (req, res) => {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
};

exports.addAttendance = async (req, res) => {
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.status(201).json(newAttendance);
};
