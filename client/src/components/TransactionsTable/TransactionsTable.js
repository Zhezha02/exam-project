import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import * as actionCreator from "../../actions/actionCreator";
import styles from "./TransactionsTable.module.sass";
import CONSTANTS from "../../constants";

const TransactionsTable = () => {
  const { isFetching, error, transactions, totalSum } = useSelector(
    ({ transactions }) => transactions
  );

  const dispatch = useDispatch();

  const { getTransactionsRequest, getTransactionTotalRequest } =
    bindActionCreators(actionCreator, dispatch);

  useEffect(() => {
    const loadTransactions = () => getTransactionsRequest();
    loadTransactions();
  }, []);

  useEffect(() => {
    const loadTransactionsSum = () => getTransactionTotalRequest();
    loadTransactionsSum();
  }, []);

  const transactionsList = transactions.map(({ id, operationType, sum }) => (
    <tr key={id}>
      <td>{id}</td>
      <td>{operationType}</td>
      <td>{sum}</td>
    </tr>
  ));
  
  const total = Object.entries(totalSum).map(([key, value]) => (
    <div>
      {key === CONSTANTS.TRANSACTIONS.CONSUMPTION ? "-" : "+"}
      {value}
    </div>
  ));

  return (
    <>
      {isFetching && <span>Loading...</span>}
      <div className={styles.transactionsContainer}>
        <h1 className={styles.header}>Your transactions</h1>
        <table>
          <thead>
            <td>#</td>
            <td>Operation type</td>
            <td>Sum</td>
          </thead>
          <tbody>{transactionsList}</tbody>
          <div>{total}</div>
        </table>
        {error && <span>{error.message}</span>}
      </div>
    </>
  );
};

export default TransactionsTable;
