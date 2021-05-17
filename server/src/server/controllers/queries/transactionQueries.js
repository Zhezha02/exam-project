const createHttpError = require("http-errors");
const { TransactionHistory } = require("../../models");

module.exports.createTransaction = async ({ userId, operationType, sum }, transaction) => {
  const newTransaction = await TransactionHistory.create(
    { userId, operationType, sum },
    { transaction }
  );
  console.log('newTransaction>>>', newTransaction);
  if (!newTransaction) {
    throw createHttpError(400, "Transaction can't be create");
  }
};