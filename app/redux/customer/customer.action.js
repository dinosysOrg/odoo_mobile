
import getOdoo from '../../api/odoo';

export const loadCustomerSucessfully = (json) => {
    return {
        type: 'LOAD_CUSTOMER_SUCCESSFULLY',
        data: json
    }
}

export const loadCustomerFailed = (errorMessage) => {
    return {
        type: 'LOAD_CUSTOMER_FAILURE',
        error:  errorMessage
    }
} 

export const loadingProduct = () => {
    return { type: 'LOADING_CUSTOMER' } 
}

export const loadCustomer = (options, currentSearchValue = '', offset = 0, limitSize = 10) => {
    return function action(dispatch) {
        dispatch(loadingProduct())
        let requestCustomer = getOdoo(options).search_read("res.partner", [[ ['customer', '=', true], ['name', 'like', currentSearchValue] ]], {'fields': ['name', 'image'], 'limit': limitSize, 'offset': limitSize})
        return requestCustomer.then(
            response => dispatch(loadCustomerSucessfully(response)),
            err => dispatch(loadCustomerFailed(err))
        )
    }
}