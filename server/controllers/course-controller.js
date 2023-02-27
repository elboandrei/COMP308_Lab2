const Course = require("../models/course");

const fetchCourses = async (req, res) => {
  const courses = await Course.find({student: req.student._id});

  res.json({ courses: courses });
};

const fetchCourse = async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.findOne({_id: courseId, student: req.student._id});
  res.json({ course: course });
};

const createCourse = async (req, res) => {
  const { code, name, section, semester } = req.body;

  const course = await Course.create({
    code,
    name,
    section,
    semester,
    student: req.student._id
  });

  res.json({ course });
};

const updateCourse = async (req, res) => {
  const courseId = req.params.id;

  const { code, name, section, semester } = req.body;

  await Course.findOneAndUpdate({_id: courseId, student: req.student._id}, {
    code,
    name,
    section,
    semester,
  });
  const course = await Course.findById(courseId);

  res.json({ course });
};

const deleteCourse = async (req, res) => {
  const courseId = await req.params.id;

  await Course.deleteOne({ id: courseId, student: req.student._id });

  res.json({ success: "Course deleted" });
};

module.exports = {
  fetchCourses,
  fetchCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
