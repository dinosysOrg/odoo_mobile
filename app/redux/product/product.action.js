/**
 * Load product with successsfully.
 * @param {object} json: The data response from odoo server. 
 * @param {integer} page: The page request. 
 * @param {string} currentSearchValue: The search key 
 */
export const loadProductSucessfully = (json, page, currentSearchValue) => {
    return {
        type: 'LOAD_PRODUCT_SUCCESSFULLY',
        data: json,
        page: page,
        searchText: currentSearchValue
    }
}

/**
 * Load product with failure.
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
 * @param {string} currentSearchValue: The search key. 
 * @param {integer} limit: The limit size.
 * @param {integer} page: The page request. 
 */
export const loadProduct = (odooApi, currentSearchValue = '', limit = 10, page = 0) => {
    let offset = page * limit
    return function action(dispatch) {
        dispatch(loadingProduct())
        const requestProduct = odooApi.fetchProductList(currentSearchValue, limit, offset);
        return requestProduct.then(
            response => dispatch(loadProductSucessfully(response, page, currentSearchValue)),
            err => dispatch(loadProductFailed(err))
        )
    }
}