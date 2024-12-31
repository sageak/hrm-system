const Candidate = require('../models/candidate');
const path = require('path');

// Get all candidates
exports.getCandidates = async (req, res) => {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
};

// Add a new candidate
exports.addCandidate = async (req, res) => 
    try {
        const candidate = new Candidate({
            name: req.body.name,
            email: req.body.email,
            resumeUrl: req.file ? req.file.path : '', // Store the resume's path
        });
        await candidate.save();
        res.status(201).json(candidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a candidate's details or resume
exports.updateCandidate = async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            email: req.body.email,
        };
        if (req.file) updatedData.resumeUrl = req.file.path;

        const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json(updatedCandidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Candidate deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Download a resume
exports.downloadResume = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
        res.download(filePath);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
