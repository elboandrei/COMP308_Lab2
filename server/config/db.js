const mongoose = require("mongoose");

async function db() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.error("Connection error", e.message);
  }
}

module.exports = db;
