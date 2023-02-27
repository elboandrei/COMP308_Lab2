const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      name: {
        type: String,
        required: true,
        minlength: 4,
      },
      section: {
        type: String,
        required: true,
        minlength: 2,
      },
      semester: {
        type: String,
        required: true,
        minlength: 2,
      },
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    }
  )

  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course