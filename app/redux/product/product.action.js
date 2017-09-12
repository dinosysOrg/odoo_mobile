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

export const loadProduct = (odooApi, limit = 0, offset = 10) => {
    return function action(dispatch) {
        dispatch(loadingProduct())
        const requestProduct = odooApi.fetchProductList(limit, offset);
        return requestProduct.then(
            response => dispatch(loadProductSucessfully(response)),
            err => dispatch(loadProductFailed(err))
        )
    }
}