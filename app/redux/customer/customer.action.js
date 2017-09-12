
import getOdoo from '../../api/odoo';

export const loadCustomerSucessfully = (json, page, currentSearchValue) => {
    return {
        type: 'LOAD_CUSTOMER_SUCCESSFULLY',
        data: json,
        page: page,
        searchText: currentSearchValue
    }
}

export const loadCustomerFailed = (errorMessage) => {
    return {
        type: 'LOAD_CUSTOMER_FAILURE',
        error:  errorMessage
    }
} 

export const loadingCustomer = () => {
    return { type: 'LOADING_CUSTOMER' } 
}

export const resetCustomerState = () => {
    return { type: 'RESET_CUSTOMER_DATA' } 
}

export const loadCustomer = (odooApi, currentSearchValue = '', limit = 10, page = 0) => {
    console.log("loadCustomer", limit, page, currentSearchValue);
    let offset = page * limit
    return function action(dispatch) {
        dispatch(loadingCustomer())
        let requestCustomer = odooApi.fetchCustomerList(currentSearchValue, limit, offset)
        return requestCustomer.then(
            response => dispatch(loadCustomerSucessfully(response, page, currentSearchValue)),
            err => dispatch(loadCustomerFailed(err))
        )
    }
}