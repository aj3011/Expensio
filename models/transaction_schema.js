// const mongoose = require("mongoose");

// const TransactionSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: String,
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   }
// });

// //A mongoose model is a wrapper on the Mongoose schema.
// //A Mongoose schema defines the structure of the document,default values, validators,etc., whereas a mongoose model provides an interface to the database for creating,querying,updating,deleting records.
// module.exports = mongoose.model("transaction_schema", TransactionSchema);
const formatDate = date => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [day, month, year].join("-");
};

const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  type: {
    type: String,
    trim: true,
    required: [true, "Please add some text"]
  },
  category: {
    type: String,
    required: [true, "Please add some category"]
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"]
  },
  date: {
    type: String,
    default: formatDate(new Date())
  },
  description: String
});

module.exports = mongoose.model("Transaction", TransactionSchema);
