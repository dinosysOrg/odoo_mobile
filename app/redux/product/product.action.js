
import getOdoo from '../../api/odoo';

export const loadProductSucessfully = (json) => {

    console.log('Product Fields:', json)

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

export const loadProduct = (options) => {
    return function action(dispatch) {
        dispatch(loadingProduct())  

        let requestProduct = getOdoo(options).search_read("product.product", [], {'fields': [ 'id', , 'image_small', 'display_name', 'list_price', 'virtual_available']});
                                                         //'limit': pageLimit, 'offset': pageOffset })

        //let requestProduct = getOdoo(options).fields_get("product.product", {'attributes': []})

        return requestProduct.then(
            response => dispatch(loadProductSucessfully(response)),
            err => dispatch(loadProductFailed(err))
        )
    }
}