const jwt = require("jsonwebtoken");
const Student = require("../models/student");
async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.Authorization;
    const decoded = jwt.verify(token, process.env.SECRET);

    if (Date.now() > decoded.exp) return res.sendStatus(401);

    const student = await Student.findById(decoded.sub);
    if (!student) return res.sendStatus(401);

    req.student = student;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;
