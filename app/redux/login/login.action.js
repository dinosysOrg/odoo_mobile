/**
 * Login successfully action.
 */
export const loginSuccessfully = () => {
    return {
        type: 'LOGIN_SUCCESSFULLY',
    }
}

/**
 * Login failure.
 * @param {string} errorMessage: The error message
 */
export const loginFailure = (errorMessage) => {
    return {
        type: 'LOGIN_FAILURE',
        error:  errorMessage
    }
} 