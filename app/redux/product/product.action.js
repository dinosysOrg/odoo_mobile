export const loadProductSucessfully = (json) => {
    return {
        type: 'LOAD_PRODUCT_SUCCESSFULLY',
        data: json
    }
}

export const loadProductFailed = (errorMessage) => {
    return {
        type: 'LOAD_PRODUCT_FAILURE',
        error:  errorMessage
    }
} 

export const loadProduct = () => {
    console.log("loadProduct");
}