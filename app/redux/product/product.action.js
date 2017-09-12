export const loadProductSucessfully = (json, page, currentSearchValue) => {
    return {
        type: 'LOAD_PRODUCT_SUCCESSFULLY',
        data: json,
        page: page,
        searchText: currentSearchValue
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

export const resetProductState = () => {
    return { type: 'RESET_PRODUCT_DATA' } 
}

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