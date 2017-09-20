import moment from "moment";

let orderState = {
    month: null,
    data: [],
    error: null,
    page: 0,
    limit: 10,
    isLoading: false,
    isFinish: false
}

const orderReducer = (state = orderState, action) => {
    switch (action.type) {
        case 'LOADING_ORDER':
        return {
            ...state,
            isLoading: true
        }
        case 'RESET_ORDER_DATA': 
            return {
                ...state,
                data: [],
                page: 0,
                isLoading: false,
                isFinish: false
        }
        case 'LOAD_ORDER_SUCCESSFULLY':
            if (action.page > 0 && action.data.length == 0) {
                return {
                    ...state,
                    isLoading: false,
                    isFinish: true
                }
            }
            let currentPage = ++action.page;
            let orderList = [...state.data, ...action.data];
            let selectedMonth = action.month;
            return {
                ...state, 
                month: selectedMonth,
                data: orderList,
                isLoading: false,
                page: currentPage
            }
        case 'LOAD_ORDER_FAILURE':
        return {
            ...state,
            error: action.error,
            isLoading: false
        }
    }
    return state;
}
 
export default orderReducer;