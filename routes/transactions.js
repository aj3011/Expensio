// const express = require("express");

// //Usually , we make requests as app.get, app.post, etc.
// //But since we are creating a separate folder here, we are requiring teh router() function here to perform the same thing
// const router = express.Router();
// const {
//   getTransactions,
//   addTransaction,
//   deleteTransaction
// } = require("../controllers/transaction_controllers");

// router.route("/").get(getTransactions);

// router.route("/").post(addTransaction);

// router.route("/:id").delete(deleteTransaction);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction
} = require("../controllers/transaction_controllers");

//we have added auth as a middleware function here
router.route("/").get(getTransactions).post(addTransaction);

router.route("/:id").delete(deleteTransaction);

// router.get("/", (req, res) => res.send("Hello"));

module.exports = router;
