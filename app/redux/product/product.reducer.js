let productState = {
     productList: null,
     error: null
}

const productReducer = (state = productState, action) => {
    switch (action.type) {
        case 'LOAD_PRODUCT_SUCCESSFULLY':
        return {
            productList: action.data,
            error: null
        }
        case 'LOAD_PRODUCT_FAILURE':
        return {
            ...state,
            error: action.error
        }
    }
    return state;
}
 
export default productReducer;