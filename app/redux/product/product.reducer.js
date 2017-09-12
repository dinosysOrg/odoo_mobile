let productState = {
    data: [],
    error: null,
    page: 0,
    limit: 10,
    isLoading: false,
    searchText: '',
    isFinish: false
}

const productReducer = (state = productState, action) => {
    switch (action.type) {
        case 'LOADING_PRODUCT':
        return {
            ...state,
            isLoading: true
        }
        case 'RESET_PRODUCT_DATA': 
            return {
                ...state,
                data: [],
                page: 0,
                isLoading: false,
                isFinish: false
        }
        case 'LOAD_PRODUCT_SUCCESSFULLY':
            if (action.page > 0 && action.data.length == 0) {
                return {
                    ...state,
                    isLoading: false,
                    isFinish: true
                }
            }
            let currentPage = ++action.page;
            let customerList = [...state.data, ...action.data]
            return {
                ...state, 
                data: customerList,
                isLoading: false,
                page: currentPage,
                searchText: action.searchText
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