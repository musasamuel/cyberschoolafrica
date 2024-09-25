// controllers/courseController.js
const Course = require('../models/courseModel');

const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

const enrollCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  course.students.push(req.user._id);
  await course.save();

  res.json({ message: 'Course enrolled successfully' });
};

module.exports = { getCourses, enrollCourse };
