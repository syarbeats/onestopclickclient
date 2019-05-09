import BaseAction from './base_action'
import axios from 'axios'
import {API_URL} from '../config/Config'




function actionProductReceive(json){
    return {
        type:`PROMOTEDPRODUCT_PRODUCTS_RECEIVE`,
        data:json.content
    }
}



//const role_action = new BaseAction('role','roles')

class role_actionBase extends BaseAction{
    constructor(name,pathURLModule=null){
        super(name,pathURLModule)
    }

    redProducts(token){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.get(`${API_URL}/api/v1/products`)
            .then(response => response.data)
            .then((json) =>dispatch(actionProductReceive(json)))
        }
    }

    selectProduct(id){
        return {
            type:"PROMOTEDPRODUCT_PRODUCTS_SELECT",
            productId:id
        }
    }

    addProductToList(id){
        return {
            type:"PROMOTEDPRODUCT_PRODUCT_ADD",
            productId:id
        }
    }

    removePromotedProduct(id){
        return {
            type:"PROMOTEDPRODUCT_PRODUCT_REMOVE",
            productId:id
        }
    }


}


const promotedproduct_action = new role_actionBase('promotedproduct','promotedproduct')

export default promotedproduct_action



