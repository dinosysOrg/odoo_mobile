
export const loadOrderSuccessfully = (json, page, selectedMonth) => {    
    return {
        type: 'LOAD_ORDER_SUCCESSFULLY',
        data: json,
        page: page,
        month: selectedMonth
    }
}

export const loadOrderFailed = (errorMessage) => {
    return {
        type: 'LOAD_ORDER_FAILURE',
        error: errorMessage
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

export const loadOrder = (odooApi, month, limit = 10, page = 0) => {
    let offset = page * limit
    return function action(dispatch) {
        dispatch(loadingOrder())
        const requestOrder = odooApi.fetchSaleOrderListByMonth(month, limit, offset);
        return requestOrder.then(
            response => dispatch(loadOrderSuccessfully(response, page, month)),
            err => dispatch(loadOrderFailed(err))
        )
    }
}
