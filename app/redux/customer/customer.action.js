/**
 * Load customer successfully action.
 * @param {object} json: The data return from server 
 * @param {integer} page: The current page  
 * @param {string} currentSearchValue: The search key value
 */
export const loadCustomerSucessfully = (json, page, currentSearchValue) => {
    return {
        type: 'LOAD_CUSTOMER_SUCCESSFULLY',
        data: json,
        page: page,
        searchText: currentSearchValue
    }
}
/**
 * Load customer with failure action.
 * @param {string} errorMessage: The error message 
 */
export const loadCustomerFailed = (errorMessage) => {
    return {
        type: 'LOAD_CUSTOMER_FAILURE',
        error:  errorMessage
    }
}

/**
 * The loading customer action.
 */
export const loadingCustomer = () => {
    return { type: 'LOADING_CUSTOMER' }
}

export const resetCustomerState = () => {
    return { type: 'RESET_CUSTOMER_DATA' }
}
/**
 * Do load customer.
 * @param {object} odooApi: The instance of MyOdooAPI.
 * @param {string} currentSearchValue: The search key of query
 * @param {integer} limit: The limit size of query
 * @param {integer} page: The page 
 * @param {string} orderBy: Order by column name
 */
export const loadCustomer = (odooApi, currentSearchValue = '', limit = 10, page = 0, orderBy = 'id') => {
    let offset = page * limit
    return function action(dispatch) {
        dispatch(loadingCustomer())
        let requestCustomer = odooApi.fetchCustomerList(currentSearchValue, limit, offset)
        return requestCustomer.then(
            response => dispatch(loadCustomerSucessfully(response, page, currentSearchValue)),
            err => dispatch(loadCustomerFailed(err))
        )
    }
}
