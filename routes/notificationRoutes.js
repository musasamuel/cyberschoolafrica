// routes/notificationRoutes.js
const express = require('express');
const {
  getNotifications,
  markAsRead,
  createNotification
} = require('../controllers/notificationController'); // Ensure this path is correct
const { protect } = require('../middleware/authMiddleware'); // Middleware to protect routes

const router = express.Router();

// Route to get all notifications for the logged-in user
router.get('/', protect, getNotifications);

// Route to mark a specific notification as read
router.put('/:id/read', protect, markAsRead);

// Admin route to create a new notification
router.post('/', protect, createNotification);

module.exports = router;

