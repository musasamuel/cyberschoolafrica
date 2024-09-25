// routes/courseRoutes.js
const express = require('express');
const { getCourses, enrollCourse } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getCourses);
router.post('/enroll/:id', protect, enrollCourse);

module.exports = router;
