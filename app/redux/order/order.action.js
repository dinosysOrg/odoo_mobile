/**
 * Load order successfully action.
 * @param {object} json: The data response.  
 * @param {integer} page: The page requested.
 * @param {integer} selectedMonth: The selected month requested.
 */
export const loadOrderSuccessfully = (json, page, from, to) => {  
    return {
        type: 'LOAD_ORDER_SUCCESSFULLY',
        data: json,
        from: from,
        to: to,
        page: page,
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
 * @param {string} from: The from date.
 * @param {string} to: The to date. 
 * @param {integer} limit: The limit size.
 * @param {integer} page: The page request. 
 */
export const loadOrder = (odooApi, from, to, limit = 10, page = 0) => {
    let offset = page * limit
    return function action(dispatch) {
        dispatch(loadingOrder())
        const requestOrder = odooApi.fetchSaleOrderListInRange(from, to, limit, offset);
        return requestOrder.then(
            response => dispatch(loadOrderSuccessfully(response, page, from, to)),
            err => dispatch(loadOrderFailed(err))
        )
    }
}
