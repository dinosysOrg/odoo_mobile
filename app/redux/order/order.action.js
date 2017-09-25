/**
 * Load order successfully action.
 * @param {object} json: The data response.  
 * @param {integer} page: The page requested.
 * @param {integer} selectedMonth: The selected month requested.
 */
export const loadOrderSuccessfully = (json, page, selectedMonth) => {    
    return {
        type: 'LOAD_ORDER_SUCCESSFULLY',
        data: json,
        page: page,
        month: selectedMonth
    }
}

/**
 * Load order failure action.
 * @param {string} errorMessage: The error message
 */
export const loadOrderFailed = (errorMessage) => {
    return {
        type: 'LOAD_ORDER_FAILURE',
        error: errorMessage
    }
}

/**
 * The loading order action.
 */
export const loadingOrder = () => {
    return {
        type: 'LOADING_ORDER',
    }
}

/**
 * Reset order state action.
 */
export const resetOrderState = () => {
    return { type: 'RESET_ORDER_DATA' }
}

/**
 * The load order action.
 * @param {object} odooApi: The instance of MyOdooAPI
 * @param {string} date: The date. 
 * @param {integer} limit: The limit size.
 * @param {integer} page: The page request. 
 */
export const loadOrder = (odooApi, date, limit = 10, page = 0) => {
    let offset = page * limit
    return function action(dispatch) {
        dispatch(loadingOrder())
        const requestOrder = odooApi.fetchSaleOrderListByMonth(date, limit, offset);
        return requestOrder.then(
            response => dispatch(loadOrderSuccessfully(response, page, date)),
            err => dispatch(loadOrderFailed(err))
        )
    }
}
