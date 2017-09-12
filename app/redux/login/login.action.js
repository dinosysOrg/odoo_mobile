export const loginSuccessfully = () => {
    return {
        type: 'LOGIN_SUCCESSFULLY',
    }
}

export const loginFailure = (errorMessage) => {
    return {
        type: 'LOGIN_FAILURE',
        error:  errorMessage
    }
} 