
import getOdoo from '../../api/odoo';

export const loadProductSucessfully = (json) => {
    return {
        type: 'LOAD_PRODUCT_SUCCESSFULLY',
        data: json
    }
}

export const loadProductFailed = (errorMessage) => {
    return {
        type: 'LOAD_PRODUCT_FAILURE',
        error:  errorMessage
    }
} 

export const loadingProduct = () => {
    return {
        type: 'LOADING_PRODUCT',
    }
} 

export const loadProduct = (options, page = 0, pageLimit = 10) => {
    return function action(dispatch) {
        dispatch(loadingProduct())
        let pageOffset = page <= 0 ? pageLimit : page * pageLimit;
        let requestProduct = getOdoo(options).search_read("product.product", [], {'fields': ['name', 'price'], 'limit': pageLimit, 'offset': pageOffset })
        return requestProduct.then(
            response => dispatch(loadProductSucessfully(response)),
            err => dispatch(loadProductFailed(err))
        )
    }
}