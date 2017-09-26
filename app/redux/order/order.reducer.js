import moment from "moment";
// The default state for order

let orderState = {
  data: [],
  from: moment()
    .subtract(1, "M")
    .format("YYYY-MM-DD"),
  to: moment().format("YYYY-MM-DD"),
  page: 0,
  limit: 10,
  isLoading: false,
  isFinish: false,
  error: null
};

const orderReducer = (state = orderState, action) => {
  switch (action.type) {
    case "RESET_ALL_DATA":
      return {
        ...orderState
      };
    case "LOADING_ORDER":
      return {
        ...state,
        isLoading: true
      };
    case "RESET_ORDER_DATA":
      return {
        ...state,
        data: [],
        page: 0,
        isLoading: false,
        isFinish: false
      };
    case "LOAD_ORDER_SUCCESSFULLY":
      if (action.page > 0 && action.data.length == 0) {
        return {
          ...state,
          isLoading: false,
          isFinish: true
        };
      }
      let currentPage = ++action.page;
      let orderList = [...state.data, ...action.data];
      let from = action.from;
      let to = action.to;
      return {
        ...state,
        data: orderList,
        from: from,
        to: to,
        isLoading: false,
        page: currentPage
      };
    case "LOAD_ORDER_FAILURE":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
  }
  return state;
};

export default orderReducer;
