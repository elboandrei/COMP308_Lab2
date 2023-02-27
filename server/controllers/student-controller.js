const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");

async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    await Student.create({ username, password: hashedPassword });
    
    res.sendStatus(200);
  } catch (err) {
    console.log(err.response);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const student = await Student.findOne({ username });
    if (!student) return res.sendStatus(401);
    const passwordMatch = bcrypt.compareSync(password, student.password);
    if (!passwordMatch) return res.sendStatus(401);

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: student._id, exp }, process.env.SECRET);

    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
    res.sendStatus(400);
  }
}

function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  res.sendStatus(200);
}
module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
