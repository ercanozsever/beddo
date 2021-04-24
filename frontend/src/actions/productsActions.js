import Axios from "axios";
import { PRODUCT_DETAILS_FAIL, 
         PRODUCT_DETAILS_REQUEST, 
         PRODUCT_DETAILS_SUCCESS, 
         PRODUCT_LIST_FAIL, 
         PRODUCT_LIST_REQUEST, 
         PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    await Axios.get('/api/products')
        .then((response) => {
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data })
        }).catch((error) => {
            dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    });
};

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST, payload: productId
    });
    await Axios.get(`/api/products/${productId}`)
        .then((response) => {
            dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data })
        }).catch((error) => {
            dispatch({ type: PRODUCT_DETAILS_FAIL, 
                       payload: 
                        error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.message});
    });
}