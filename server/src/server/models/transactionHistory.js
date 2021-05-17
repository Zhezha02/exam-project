"use strict";
const { Model } = require("sequelize");
const { TRANSACTIONS } = require("../../constants");

module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    static associate({ User }) {
      TransactionHistory.belongsTo(User, {
        foreignKey: "userId",
      });
    }
  }
  TransactionHistory.init(
    {
      operationType: {
        type: DataTypes.ENUM(...Object.values(TRANSACTIONS)),
      },
      sum: {
        type: DataTypes.DECIMAL,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionHistory",
      updatedAt: false,
    }
  );
  return TransactionHistory;
}; 