import moment from "moment";

let dashboardState = {
  orderData: [],
  productData: [],
  isLoading: false,
  error: null
};

const dashboardReducer = (state = dashboardState, action) => {
  switch (action.type) {
    case "LOADING_DASHBOARD":
      return {
        ...state,
        isLoading: true
      };
    case "LOAD_DASHBOARD_SUCCESSFULLY":
      return {
        ...state,
        orderData: action.orderData,
        isLoading: false
      };
    case "LOAD_DASHBOARD_FAILURE":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
  }
  return state;
};

export default dashboardReducer;
