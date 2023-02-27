// load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// import dependencis
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const courseController = require("./controllers/course-controller");
const studentController = require("./controllers/student-controller");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth");
// express app
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

// connect to db
db();

// routing
app.post("/signup", studentController.signup);
app.post("/login", studentController.login);
app.get("/logout", studentController.logout);
app.get("/check-auth", requireAuth, studentController.checkAuth);
app.get("/courses", requireAuth, courseController.fetchCourses);
app.get("/courses/:id", requireAuth, courseController.fetchCourse);
app.post("/courses", requireAuth, courseController.createCourse);
app.put("/courses/:id", requireAuth, courseController.updateCourse);
app.delete("/courses/:id", requireAuth, courseController.deleteCourse);

// start server
app.listen(process.env.PORT);
