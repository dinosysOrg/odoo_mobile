/**
 * Load product successsfully.
 * @param {object} json: The data response from odoo server. 
 * @param {integer} page: The page request. 
 * @param {string} searchKey: The search key 
 */
export const loadProductSucessfully = (json, page, searchKey) => {
    return {
        type: 'LOAD_PRODUCT_SUCCESSFULLY',
        data: json,
        page: page,
        searchKey: searchKey
    }
}

/**
 * Load product failure.
 * @param {string} errorMessage: The error message.
 */
export const loadProductFailed = (errorMessage) => {
    return {
        type: 'LOAD_PRODUCT_FAILURE',
        error:  errorMessage
    }
} 

/**
 * The loading product action.
 */
export const loadingProduct = () => {
    return {
        type: 'LOADING_PRODUCT',
    }
} 

/**
 * The reset product sate action.
 */
export const resetProductState = () => {
    return { type: 'RESET_PRODUCT_DATA' } 
}

/**
 * The load order action.
 * @param {object} odooApi: The instance of MyOdooAPI.
 * @param {string} searchKey: The search key. 
 * @param {integer} limit: The limit size.
 * @param {integer} page: The page request. 
 */
export const loadProduct = (odooApi, searchKey = '', limit = 10, page = 0) => {
    let offset = page * limit
    return function action(dispatch) {
        dispatch(loadingProduct())
        const requestProduct = odooApi.fetchProductList(searchKey, limit, offset);
        return requestProduct.then(
            response => dispatch(loadProductSucessfully(response, page, searchKey)),
            err => dispatch(loadProductFailed(err))
        )
    }
}