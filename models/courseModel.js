// models/courseModel.js
const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
