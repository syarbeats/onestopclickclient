import BaseAction from './base_action'
import axios from 'axios'
import {API_URL} from '../config/Config'

function actionShopProductReceive(json){
    return {
        type:`SHOP_PRODUCTS_RECEIVE`,
        products:json
    }
}

function actionShopProductOneReceive(json){
    return {
        type:`SHOP_PRODUCT_RECEIVE`,
        product:json
    }
}


class shopActionBase extends BaseAction{
    readProducts(token){
     //   axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.get(`${API_URL}/api/v1/shop/products`)
            .then(response => response.data)
            .then((json) =>dispatch(actionShopProductReceive(json)))
        }
    }

    readProduct(token,id){
        //   axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    
           return dispatch => {
       
               return axios.get(`${API_URL}/api/v1/shop/products/${id}`)
               .then(response => response.data)
               .then((json) =>dispatch(actionShopProductOneReceive(json)))
           }
       }
}

const shop_action = new shopActionBase('shop','shop')

export default shop_action