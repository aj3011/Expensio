// const express = require("express");
// const dotenv = require("dotenv");
// const colors = require("colors");
// const morgan = require("morgan");
// const connectDB = require("./config/db");

// dotenv.config({ path: "./config/config.env" });

// connectDB();

// const app = express();

// //implementing the authentication for this website
// app.use("/users", require("./routes/users"));

// // app.use(function (req, res, next) {
// //   res.header("Access-Control-Allow-Origin", "*");
// //   res.header(
// //     "Access-Control-Allow-Headers",
// //     "Origin, X-Requested-With, Content-Type, Accept"
// //   );
// //   next();
// // });

// //this allows us to use body parser
// app.use(express.json());

// const transactions = require("./routes/transactions");

// //we use this .use() to redirect the server to the transactions folder and ther route here "/api/v1/transactions" is equivalent to making a get request "/"
// app.use("/api/v1/transactions", transactions);

// //way to access PORT variable in config.env
// const PORT = 5000;

// app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   )
// );

const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const transactions = require("./routes/transactions");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // This will allow us to use body-parser

app.use("/api/v1/transactions", transactions);

const PORT = 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
