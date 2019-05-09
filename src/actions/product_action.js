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

function actionReviewReceive(json){
    return {
        type:`PRODUCT_REVIEW_RECEIVE`,
        data:json
    }
}

function actionAddReviewReceive(json){
    return {
        type:`PRODUCT_ADD_REVIEW_RECEIVE`,
        data:json
    }
}

function actionDeleteReviewReceive(json,reviewId){
    return {
        type:`PRODUCT_DELETE_REVIEW_RECEIVE`,
        data:json,
        id:reviewId
    }
}

function actionOneReviewReceive(json){
    return {
        type:`PRODUCT_REVIEW_ONE_RECEIVE`,
        data:json
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

    readReview(token,id){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.get(`${API_URL}/api/v1/${this.pathURLModule}/${id}/reviews`)
            .then(response => response.data)
            .then((json) =>dispatch(actionReviewReceive(json)))
        }
    }

    addReview(token,productId,review){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

        const data = new FormData();
      //  data.append("productReviewComment", review.productReviewComment);
       // data.append("productReviewRate", review.productReviewRate);
       // data.append("userId", 1);
        return dispatch => {
    
            return axios.post(`${API_URL}/api/v1/${this.pathURLModule}/${productId}/reviews`,review)
        // return axios({
        //     method: 'post',
        //     url: `${API_URL}/api/v1/${this.pathURLModule}/${productId}/reviews`,
        //     data: data,
        //   })
            .then(response => response.data)
            .then((json) =>dispatch(actionAddReviewReceive(json)))
        }
    }

    editReview(token,productId,reviewId,review){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

        return dispatch => {
    
            return axios.put(`${API_URL}/api/v1/${this.pathURLModule}/${productId}/reviews/${reviewId}`,review)
   
            .then(response => response.data)
            .then((json) =>dispatch(actionAddReviewReceive(json)))
        }
    }

    addUpdateOffReview(){
        return {
            type:`PRODUCT_ADD_REVIEW_OFF_RECEIVE`
        }
    }

    removeReview(token,productId,reviewId){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.delete(`${API_URL}/api/v1/${this.pathURLModule}/${productId}/reviews/${reviewId}`)
            .then(response => response.data)
            .then((json) =>dispatch(actionDeleteReviewReceive(json,reviewId)))
        }
    }

    readOneReview(token,id,reviewId){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.get(`${API_URL}/api/v1/${this.pathURLModule}/${id}/reviews/${reviewId}`)
            .then(response => response.data)
            .then((json) =>dispatch(actionOneReviewReceive(json)))
        }
    }

    


}

const product_action = new product_actionBase('product','products')

export default product_action



