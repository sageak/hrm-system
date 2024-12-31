const express = require('express');
const multer = require('multer');
const {
    getCandidates,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    downloadResume,
} = require('../controllers/candidateController');
const router = express.Router();

// Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // Folder to store resumes
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.get('/', getCandidates);
router.post('/', upload.single('resume'), addCandidate); // Upload resume with candidate data
router.put('/:id', upload.single('resume'), updateCandidate); // Update candidate with new resume
router.delete('/:id', deleteCandidate);
router.get('/download/:filename', downloadResume); // Route to download resumes

module.exports = router;
