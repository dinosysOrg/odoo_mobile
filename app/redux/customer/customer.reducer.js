let customerState = {
    data: null,
    error: null,
    page: 0,
    pageLimit: 20,
    isLoading: false
}

const customerReducer = (state = customerState, action) => {
   switch (action.type) {
       case 'LOADING_CUSTOMER':
       return {
           ...state,
           isLoading: true
       }
       case 'LOAD_CUSTOMER_SUCCESSFULLY':
       return {
           ...state, 
           data: [...action.data],
           isLoading: false
       }
       case 'LOAD_CUSTOMER_FAILURE':
       return {
           ...state,
           error: action.error,
           isLoading: false
       }
   }
   return state;
}

export default customerReducer;