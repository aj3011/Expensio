// //Importing the mongoose model for the schema
// const Transaction = require("../models/transaction_schema");

// //all mongoose methods return promises so we have to use async functions

// //@desc Get all transactions
// //@route GET /api/v1/transactions
// exports.getTransactions = async (req, res, next) => {
//   try {
//     const transactions = await Transaction.find();

//     return res.status(200).json({
//       success: true,
//       count: transactions.length,
//       data: transactions
//     });
//   } catch (err) {
//     return res.send(500).json({
//       success: false,
//       error: "server Error"
//     });
//   }
// };

// //@desc ADD transaction
// //@route  POST /api/v1/transactions

// //data from the client side is going to come in req and we need bodyParser to read it
// exports.addTransaction = async (req, res, next) => {
//   try {
//     const { type, category, amount } = req.body;

//     const transaction = await Transaction.create(req.body);

//     return res.status(201).json({
//       success: true,
//       data: transaction
//     });
//   } catch (err) {
//     // If we will add nothing to it, it will show nothing instead will show the error in terminal
//     // So we have to send the error message.
//     // console.log(err);
//     // This condition was used as per the result in terminal that was shown on console logging the error.
//     // Validation Error has a list of errors.
//     if (err.name === "ValidationError") {
//       const messages = Object.values(err.errors).map(val => val.message);
//       return res.status(400).json({
//         success: false,
//         error: messages
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         error: "Server Error"
//       });
//     }
//   }

//   // res.send("POST transactions");
// };

// //@desc Delete transaction
// //@route GET/api/v1/transactions
// exports.deleteTransaction = async (req, res, next) => {
//   try {
//     const transaction = await Transaction.findById(req.params.id);

//     if (!transaction) {
//       return res.status(404).json({
//         success: false,
//         error: "No transaction found with given Id"
//       });
//     }

//     await transaction.remove();

//     return res.status(200).json({
//       success: true,
//       data: {}
//     });
//   } catch (err) {
//     res.status(500);
//   }
// };

const Transaction = require("../models/transaction_schema");

// @description -> Get all transactions
// @route -> GET /api/v1/transactions
// @access PUBLIC

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @description -> Add transaction
// @route -> POST /api/v1/transactions
// @access PUBLIC

exports.addTransaction = async (req, res, next) => {
  try {
    const { type, category, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    // If we will add nothing to it, it will show nothing instead will show the error in terminal
    // So we have to send the error message.
    // console.log(err);
    // This condition was used as per the result in terminal that was shown on console logging the error.
    // Validation Error has a list of errors.
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
  }

  // res.send("POST transactions");
};

// @description -> Delete transaction
// @route -> DELETE /api/v1/transactions/:id
// @access PUBLIC

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      res.status(404).json({
        success: false,
        error: "No transaction found"
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
  // res.send("DELETE transaction");
};
