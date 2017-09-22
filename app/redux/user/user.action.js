/**
 * Load user successfully action.
 * @param {object} json: The data response from odoo server 
 * @param {integer} page: The page  
 */
export const loadUserSucessfully = (json, page) => {
    return {
        type: 'LOAD_USER_SUCCESSFULLY',
        data: json,
        page: page,
    }
}
/**
 * Load user with failure action.
 * @param {string} errorMessage: The error message
 */
export const loadUserFailed = (errorMessage) => {
    return {
        type: 'LOAD_USER_FAILURE',
        error:  errorMessage
    }
}

/**
 * The loading user action.
 */
export const loadingUser = () => {
    return {
        type: 'LOADING_USER',
    }
}

/**
 * Reset user state action.
 */
export const resetUserState = () => {
    return { type: 'RESET_USER_DATA' }
}

/**
 * Load user  action.
 * @param {object} odooApi: The instance of MyOdooAPI.
 * @param {integer} limit: The limit size of query.  
 * @param {integer} page: The page.
 * @param {integer} id: The id of user.
 */
export const loadUser = (odooApi, limit = 10, page = 0, id = "") => {
    let offset = page * limit
    return function action(dispatch) {
        dispatch(loadingUser())
        const requestUser = odooApi.fetchUserProfile(limit, offset, id);
        return requestUser.then(
            response => dispatch(loadUserSucessfully(response, page)),
            err => dispatch(loadUserFailed(err))
        )
    }
}
