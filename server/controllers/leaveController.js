const Leave = require('../models/leave');

exports.getLeaves = async (req, res) => {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
};

exports.addLeave = async (req, res) => {
    const newLeave = new Leave(req.body);
    await newLeave.save();
    res.status(201).json(newLeave);
};

exports.updateLeave = async (req, res) => {
    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLeave);
};
