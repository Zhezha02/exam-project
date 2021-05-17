import * as actionCreators from "../actions/actionCreator";
import { put } from "redux-saga/effects";
import * as restController from "../api/http/restController";

export function* getUserTransactions(action) {
  try {
    const {
      data: {
        data: { transactions },
      },
    } = yield restController.getTransactionHistory();
    yield put(actionCreators.getTransactionsSuccess(transactions));
  } catch (err) {
    yield put(actionCreators.getTransactionsError(err));
  }
}
export function* getUserTransactionsTotal(action) {
  try {
    const {
      data:{data}
    } = yield restController.getTotalTransaction();
    yield put(actionCreators.getTransactionsTotalSuccess(data));
  } catch (err) {
    yield put(actionCreators.getTransactionsTotalError(err));
  }
}