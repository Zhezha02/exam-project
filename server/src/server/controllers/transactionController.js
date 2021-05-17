const sequelize = require("sequelize");
const createHttpError = require("http-errors");
const isEmpty = require("lodash").isEmpty;
const { TransactionHistory } = require("../models");
const { TRANSACTIONS } = require("../../constants");

module.exports.getTransartionHistory = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
    } = req;

    const transactions = await TransactionHistory.findAll({
      attributes: { exclude: ["userId", "updatedAt"] },
      where: { userId },
    });

    if (isEmpty(transactions)) {
      return next(createHttpError(404, "Transactions not found"));
    }

    res.send({ data: { transactions } });
  } catch (err) {
    next(err);
  }
};

module.exports.getTransactionsTotalAmount = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
    } = req;

    const totalAmount = await TransactionHistory.findAll({
      where: { userId },
      attributes: [
        "operationType",
        [sequelize.fn("sum", sequelize.col("sum")), "amount"],
      ],
      group: ["operationType"],
    });

    const totalSum = {
      [TRANSACTIONS.CONSUMPTION]: 0,
      [TRANSACTIONS.INCOME]: 0,
    };
    totalAmount.map(({ dataValues: { operationType, amount } }) => {
      totalSum[operationType] = amount;
    });

    res.send({ data: totalSum });
  } catch (err) {
    next(err);
  }
};
