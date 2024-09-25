// controllers/notificationController.js
const Notification = require('../models/notificationModel');

// Get notifications for the logged-in user
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching notifications' });
  }
};

// Mark a specific notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Ensure the notification belongs to the logged-in user
    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access to notification' });
    }

    // Mark the notification as read
    notification.isRead = true;
    await notification.save();

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating notification' });
  }
};

// Admin: Create a new notification (for example, for assignments or events)
const createNotification = async (req, res) => {
  const { title, message, type, userId } = req.body;

  if (!title || !message || !type || !userId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const notification = new Notification({
      user: userId,
      title,
      message,
      type,
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating notification' });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  createNotification,
};
