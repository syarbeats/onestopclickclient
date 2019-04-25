import axios from 'axios'
import {API_URL} from '../config/Config'

export const PAYMENT_ADD_PRODUCT_TO_CART = 'PAYMENT_ADD_PRODUCT_TO_CART'
export const PAYMENT_SHOW_PRODUCTS_IN_CART = 'PAYMENT_SHOW_PRODUCTS_IN_CART'
export const PAYMENT_RECEIVE_PRODUCT = 'PAYMENT_RECEIVE_PRODUCT'
export const PAYMENT_REQUEST_ALL_PRODUCT = 'PAYMENT_REQUEST_ALL_PRODUCT'
export const PAYMENT_RECEIVE_ALL_PRODUCT = 'PAYMENT_RECEIVE_ALL_PRODUCT'
export const PAYMENT_VIEW_PRODUCT = 'PAYMENT_VIEW_PRODUCT'
export const PAYMENT_DELETE_PRODUCT = 'PAYMENT_DELETE_PRODUCT'

export function paymentDeleteItemFromCart(productId){
    return {
        type:PAYMENT_DELETE_PRODUCT,
        productId
    }
}

export function paymentAddItemToCart(){
    return {
        type:PAYMENT_ADD_PRODUCT_TO_CART
    }
}

export function paymentShowProductsInCart(){
    return {
        type:PAYMENT_SHOW_PRODUCTS_IN_CART
    }
}

export function receiveProduct(productId,json){
    return {
        type:PAYMENT_RECEIVE_PRODUCT,
        productId,
        data:json,
        receiveAt:Date.now()
    }
}

export function viewProduct(productId){
    return {
        type:PAYMENT_VIEW_PRODUCT,
        productId
    }
}


function fetchDataDetail(productId) {
    return dispatch => {
        return axios.get(`${API_URL}/product/${productId}`)
        .then(response => response.data)
        .then((json) => dispatch(receiveProduct(productId,json)))
    }
    
}

export function receiveAllProduct(json){
    return {
        type:PAYMENT_RECEIVE_ALL_PRODUCT,
        products:json,
        receiveAt:Date.now()
    }
}


function fetchAllProduct(token) {
  
    
  
    // let config = {
    //     headers: {'Authorization': "bearer " + token}
    // };
    
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    return dispatch => {
        return axios.get(`${API_URL}/product`
        )
        .then(response => response.data)
        .then((json) => dispatch(receiveAllProduct(json)))
    }
    
}

export function fetchData(requestType){
    return (dispatch,getState) => {
     
        const state = getState();

        switch (requestType){
            case 'REQUESTTYPE_ALLPRODUCT':
                return dispatch(fetchAllProduct(state.auth_reducer.token))
            default:
                return false;
        }
        
  
    }
}


