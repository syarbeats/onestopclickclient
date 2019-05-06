import BaseAction from './base_action'
import axios from 'axios'
import {API_URL} from '../config/Config'


function actionCategoriesReceive(json){
    return {
        type:`PRODUCT_CATEGORIES_RECEIVE`,
        categories:json
    }
}

function actionAddCategoriesReceive(json){
    return {
        type:`PRODUCT_ADD_CATEGORIES_RECEIVE`,
        categories:json
    }
}

function actionDeleteCategoriesReceive(json){
    return {
        type:`PRODUCT_DELETE_CATEGORIES_RECEIVE`,
        categories:json
    }
}

class product_actionBase extends BaseAction{
    constructor(name,pathURLModule=null){
        super(name,pathURLModule)
    }

    readCategories(token,id){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.get(`${API_URL}/api/v1/product/${id}/categories`)
            .then(response => response.data)
            .then((json) =>dispatch(actionCategoriesReceive(json)))
        }
    }

    addCategories(token,roleId,permissionId){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.post(`${API_URL}/api/v1/product/${roleId}/categories/${permissionId}`)
            .then(response => response.data)
            .then((json) =>dispatch(actionAddCategoriesReceive(json)))
        }
    }

    removeCategories(token,roleId,permissionId){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.delete(`${API_URL}/api/v1/product/${roleId}/categories/${permissionId}`)
            .then(response => response.data)
            .then((json) =>dispatch(actionDeleteCategoriesReceive(json)))
        }
    }


}

const product_action = new product_actionBase('product','product')

export default product_action



