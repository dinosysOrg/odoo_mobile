export const loginSucessfully = (json) => {
    return {
        type: 'LOGIN_SUCCESSFULLY',
        data: json
    }
}

export const loginFailure = (errorMessage) => {
    return {
        type: 'LOGIN_FAILURE',
        error:  errorMessage
    }
} 

export const doLogin = (host, database, username, password) => {
    console.log("doLogin", host, database, username, password);
}