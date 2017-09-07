let loginState = {
    user: null,
    error: null
}

const loginReducer = (state = forgotState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFULLY':
        return {
            user: action.data,
            error: null
        }
        case 'LOGIN_FAILURE':
        return {
            ...state,
            error: action.error
        }
    }
    return state;
}
 
export default loginReducer;