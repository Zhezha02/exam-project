"use strict";
const { TRANSACTIONS } = require("../../constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("TransactionHistories", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        operationType: {
          type: Sequelize.ENUM(...Object.values(TRANSACTIONS)),
          allowNull: false,
        },
        sum: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        createdAt: {
          defaultValue: new Date(),
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint("TransactionHistories", {
          type: "check",
          fields: ["sum"],
          where: {
            sum: {
              [Sequelize.Op.gt]: 0,
            },
          },
        })
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TransactionHistories");
  },
};