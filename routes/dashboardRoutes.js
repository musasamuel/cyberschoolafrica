// routes/dashboardRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const {
  getStudentDashboard,
  getAdminDashboard
} = require('../controllers/dashboardController');

const router = express.Router();

// Get data for student dashboard
router.get('/student', protect, getStudentDashboard);

// Get data for admin dashboard
router.get('/admin', protect, getAdminDashboard);

module.exports = router;

