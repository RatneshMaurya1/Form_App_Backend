const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
  } catch (error) {
    console.error("error connecting to database");
    process.exit(1);
  }
};

module.exports = connectDb;