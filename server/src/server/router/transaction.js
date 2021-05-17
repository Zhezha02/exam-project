const transactionRouter = require("express").Router();
const transactionController = require("../controllers/transactionController");

transactionRouter.get("/history", transactionController.getTransartionHistory);
transactionRouter.get("/total", transactionController.getTransactionsTotalAmount);

module.exports = transactionRouter 