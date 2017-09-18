export const loadOrderSucessfully = (json, page, currentSearchValue) => {
    return {
        type: 'LOAD_ORDER_SUCCESSFULLY',
        data: json,
        page: page,
        searchText: currentSearchValue
    }
}

export const loadOrderFailed = (errorMessage) => {
    return {
        type: 'LOAD_ORDER_FAILURE',
        error:  errorMessage
    }
} 

export const loadingOrder = () => {
    return {
        type: 'LOADING_ORDER',
    }
} 

export const resetOrderState = () => {
    return { type: 'RESET_ORDER_DATA' } 
}

export const loadOrder = (odooApi, currentSearchValue = '', limit = 10, page = 0) => {
    let offset = page * limit
    return function action(dispatch) {
        dispatch(loadingOrder())
        const requestOrder = odooApi.fetchOrderListInCurrentMonth(currentSearchValue, limit, offset);
        return requestOrder.then(
            response => dispatch(loadOrderSucessfully(response, page, currentSearchValue)),
            err => dispatch(loadOrderFailed(err))
        )
    }
}