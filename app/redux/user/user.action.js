export const loadUserSucessfully = (json, page) => {
  console.log("load success", json)
    return {
        type: 'LOAD_USER_SUCCESSFULLY',
        data: json,
        page: page,
    }
}

export const loadUserFailed = (errorMessage) => {
    return {
        type: 'LOAD_USER_FAILURE',
        error:  errorMessage
    }
}

export const loadingUser = () => {
    return {
        type: 'LOADING_USER',
    }
}

export const resetUserState = () => {
    return { type: 'RESET_USER_DATA' }
}

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
