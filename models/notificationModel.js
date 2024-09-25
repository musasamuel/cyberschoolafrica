// models/notificationModel.js
const mongoose = require('mongoose');

// Define the schema for notifications
const notificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // Each notification is linked to a specific user
  },
  title: {
    type: String,
    required: true,  // Title of the notification
  },
  message: {
    type: String,
    required: true,  // The message body of the notification
  },
  type: {
    type: String,
    enum: ['assignment', 'event', 'announcement'],  // Type of notification
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,  // Flag to indicate if the notification has been read
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
