"use strict";
const {TRANSACTIONS} = require('../../constants')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "TransactionHistories",
      [
        {
          operationType: TRANSACTIONS.CONSUMPTION,
          sum: 1000,
          userId: 1,
        },
        {
          operationType: TRANSACTIONS.CONSUMPTION,
          sum: 330,
          userId: 1,
        },
        {
          operationType: TRANSACTIONS.CONSUMPTION,
          sum: 2300,
          userId: 1,
        },
        {
          operationType: TRANSACTIONS.INCOME,
          sum: 770.6,
          userId: 1,
        },
        {
          operationType: TRANSACTIONS.CONSUMPTION,
          sum: 200,
          userId: 2,
        },
        {
          operationType: TRANSACTIONS.INCOME,
          sum: 4400,
          userId: 2,
        },
        {
          operationType: TRANSACTIONS.INCOME,
          sum: 903.3,
          userId: 2,
        },
        {
          operationType: TRANSACTIONS.INCOME,
          sum: 66,
          userId: 2,
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    /*
      await queryInterface.bulkDelete('People', null, {});
     */
  },
};