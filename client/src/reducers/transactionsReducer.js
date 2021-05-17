import ACTION from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  error: null,
  transactions: [],
  totalSum: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_TRANSACTIONS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_TRANSACTIONS_SUCCESS: {
      const { transactions } = action.payload;
      return {
        ...state,
        isFetching: false,
        error: null,
        transactions,
      };
    }
    case ACTION.GET_TRANSACTIONS_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    case ACTION.GET_TRANSACTIONS_TOTAL_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_TRANSACTIONS_TOTAL_SUCCESS: {
      const { totalSum } = action.payload;
      return {
        ...state,
        isFetching: false,
        error: null,
        totalSum,
      };
    }
    case ACTION.GET_TRANSACTIONS_TOTAL_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        isFetching: false,
        error,
      };
    }
    default:
      return state;
  }
}