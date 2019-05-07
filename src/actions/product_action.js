import BaseAction from './base_action'
import axios from 'axios'
import {API_URL} from '../config/Config'

export const PRODUCT_DETAILSMEDIA_RECEIVE = 'PRODUCT_DETAILSMEDIA_RECEIVE'
export const PRODUCT_DETAILSMEDIA_SAVE_RECEIVE = 'PRODUCT_DETAILSMEDIA_SAVE_RECEIVE'

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

function actionDetailsMediaReceive(json){
    return {
        type:PRODUCT_DETAILSMEDIA_RECEIVE,
        detailsMedia:json
    }
}

function actionSaveDetailsMediaReceive(json){
    return {
        type:PRODUCT_DETAILSMEDIA_SAVE_RECEIVE,
        detailsMedia:json
    }
}

class product_actionBase extends BaseAction{
    constructor(name,pathURLModule=null){
        super(name,pathURLModule)
    }

    readCategories(token,id){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.get(`${API_URL}/api/v1/${this.pathURLModule}/${id}/subcategories`)
            .then(response => response.data)
            .then((json) =>dispatch(actionCategoriesReceive(json)))
        }
    }

    addCategories(token,roleId,permissionId){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.post(`${API_URL}/api/v1/${this.pathURLModule}/${roleId}/subcategories/${permissionId}`)
            .then(response => response.data)
            .then((json) =>dispatch(actionAddCategoriesReceive(json)))
        }
    }

    removeCategories(token,roleId,permissionId){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.delete(`${API_URL}/api/v1/${this.pathURLModule}/${roleId}/subcategories/${permissionId}`)
            .then(response => response.data)
            .then((json) =>dispatch(actionDeleteCategoriesReceive(json)))
        }
    }


    readDetailsMedia(token,id){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.get(`${API_URL}/api/v1/${this.pathURLModule}/${id}/details`)
            .then(response => response.data)
            .then((json) =>dispatch(actionDetailsMediaReceive(json)))
        }
    }

    addDetailsMedia(token,productId,detailsInfo){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        
        const data = new FormData();
        data.append("productDetailFileName", detailsInfo.productDetailFileName);
        data.append("productDetailType", detailsInfo.productDetailType);
        return dispatch => {
    
           // return axios.post(`${API_URL}/api/v1/${this.pathURLModule}/${productId}/details`,
         //   detailsInfo)
            return axios({
                method: 'post',
                url: `${API_URL}/api/v1/${this.pathURLModule}/${productId}/details`,
                data: data,
              })
            .then(response => response.data)
            .then((json) =>dispatch(actionSaveDetailsMediaReceive(json)))
        }
    }

    


}

const product_action = new product_actionBase('product','products')

export default product_action



