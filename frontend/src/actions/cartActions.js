import Axios from 'axios';
import { CART_ADD_ITEM, 
         CART_REMOVE_ITEM, 
         CART_SAVE_PAYMENT_METHOD, 
         CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    await Axios.get(`/api/products/${productId}`)
        .then((response) => {
            dispatch({
                type: CART_ADD_ITEM,
                payload: {
                    name: response.data.name,
                    image: response.data.image,
                    price: response.data.price,
                    countInStock: response.data.countInStock,
                    product: response.data._id,
                    quantity
                }
            });
        });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));   
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data});
};