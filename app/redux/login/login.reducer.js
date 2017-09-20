import MyOdooAPI from '../../api/odoo'

const initFirstState = () => {
    let odoApi = new MyOdooAPI()
    return {
        odoo: odoApi,
        error: null
    }
}

const loginReducer = (state = initFirstState(), action) => {
    switch (action.type) {
        case 'LOGIN_FAILURE':
        return {
            ...state,
            error: action.error
        }
    }
    return state;
}
 
export default loginReducer;