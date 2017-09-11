
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

export const loadProduct = (options) => {
    return function action(dispatch) {
        dispatch({ type: 'LOADING_PRODUCT' })
        
        let requestProduct = getOdoo(options).search_read("product.product", [], {'fields': ['name', 'price'], 'limit': 5})
        return requestProduct.then(
            response => dispatch(loadProductSucessfully(response)),
            err => dispatch(loadProductFailed(err))
        )
    }
}