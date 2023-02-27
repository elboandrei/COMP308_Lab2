const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      courses: [
        {type: mongoose.Schema.Types.ObjectId, 
          ref: "Course"}
      ],
    }
  );

  const Student = mongoose.model('Student', studentSchema);
  module.exports = Student