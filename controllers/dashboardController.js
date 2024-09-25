// controllers/dashboardController.js
const User = require('../models/userModel');
const Course = require('../models/courseModel');
const Notification = require('../models/notificationModel');

// Get student dashboard data
exports.getStudentDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('courses')
      .populate('notifications');

    const dashboardData = {
      courses: user.courses,
      notifications: user.notifications,
    };

    res.json(dashboardData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get admin dashboard data
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const recentNotifications = await Notification.find().limit(5);

    const dashboardData = {
      totalStudents,
      totalCourses,
      recentNotifications,
    };

    res.json(dashboardData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
