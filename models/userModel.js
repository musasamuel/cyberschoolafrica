// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  role: {
    type: String,
    default: 'student', // Other roles: admin, teacher
  },
}, { timestamps: true });

// Hash passwords before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password =  bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
