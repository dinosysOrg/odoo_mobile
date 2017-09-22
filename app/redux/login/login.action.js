/**
 * Login with successfully action.
 */
export const loginSuccessfully = () => {
    return {
        type: 'LOGIN_SUCCESSFULLY',
    }
}

/**
 * Login with failure.
 * @param {string} errorMessage: The error message
 */
export const loginFailure = (errorMessage) => {
    return {
        type: 'LOGIN_FAILURE',
        error:  errorMessage
    }
} 