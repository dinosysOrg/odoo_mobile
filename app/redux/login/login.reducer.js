import MyOdooAPI from '../../api/odoo'
import UserSession from '../../api/user'

const initFirstState = () => {
    let odoApi = new MyOdooAPI()
    let sessionApi = new UserSession()
    return {
        odoo: odoApi,
        session: sessionApi,
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