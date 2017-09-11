let productState = {
     data: null,
     error: null,
     page: 0,
     pageOffset: 1,
     pageLimit: 20,
     isLoading: false
}

const productReducer = (state = productState, action) => {
    switch (action.type) {
        case 'LOADING_PRODUCT':
        return {
            ...state,
            isLoading: true
        }
        case 'LOAD_PRODUCT_SUCCESSFULLY':
        return {
            ...state, 
            data: [...action.data],
            isLoading: false
        }
        case 'LOAD_PRODUCT_FAILURE':
        return {
            ...state,
            error: action.error,
            isLoading: false
        }
    }
    return state;
}
 
export default productReducer;