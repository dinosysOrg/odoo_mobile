import moment from "moment";

var _ = require("lodash");
/**
 * Load dashboard successfully action.
 * @param {object} orderData: The order data.  
 */
export const loadDashboardSuccessfully = orderData => {
  return {
    type: "LOAD_DASHBOARD_SUCCESSFULLY",
    orderData: orderData
  };
};

/**
 * Load dashboard failure action.
 * @param {string} errorMessage: The error message
 */
export const loadDashboardFailed = errorMessage => {
  return {
    type: "LOAD_DASHBOARD_FAILURE",
    error: errorMessage
  };
};

/**
 * Loading dashboard action.
 */
export const loadingDashboard = () => {
  return {
    type: "LOADING_DASHBOARD"
  };
};

/**
 * The load dashboard action.
 * @param {object} odooApi: The instance of MyOdooAPI
 */
export const loadDashboard = odooApi => {
  return function action(dispatch) {
    dispatch(loadingDashboard());

    let days = 7;

    let from = moment()
      .subtract(days, "Y")
      .format("YYYY-MM-DD");

    let to = moment().format("YYYY-MM-DD");

    let limit = 1000;

    let offset = 0;

    const requestOrder = odooApi.fetchSaleOrderListInRange({
      from,
      to,
      limit,
      offset
    });
    return requestOrder.then(
      response => {
        let ordersGroup = _.groupBy(response, function(item) {
          return moment(item.create_date).format("MM-DD");
        });

        let orderData = [];

        const calculateTotalAmount = orders => {
          return orders.reduce(function(sum, value) {
            return sum + value.amount_total;
          }, 0);
        };

        for (var date in ordersGroup) {
          orderData.push({
            create_date: date,
            amount_total: calculateTotalAmount(ordersGroup[date]),
            currency: ordersGroup[date][0].currency_id[1]
          });
        }

        dispatch(loadDashboardSuccessfully(orderData));
      },
      error => dispatch(loadDashboardFailed(error))
    );
  };
};
