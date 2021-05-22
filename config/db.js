const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

//whenever we use mongoose to make requests to the database, they return a promise. so we have to use async function here
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`.cyan);
  } catch (err) {
    console.log(`Error : ${err.message}`.red);
    //process.exit(1) is used to shut down the application incase
    process.exit(1);
  }
};

module.exports = connectDB;
