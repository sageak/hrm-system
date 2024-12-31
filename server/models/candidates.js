const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resume: { type: String, required: true }, // Path to the resume file
    status: { type: String, default: 'candidate' },
});

module.exports = mongoose.model('Candidate', CandidateSchema);