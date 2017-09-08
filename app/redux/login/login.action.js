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