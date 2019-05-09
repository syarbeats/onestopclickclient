import {actionSwitcher} from '../helpers/CRUDActionReducer'
import {PRODUCT_DETAILSMEDIA_RECEIVE,PRODUCT_DETAILSMEDIA_SAVE_RECEIVE} from '../actions/product_action'

export default function productReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false,
    categories:[],
    categoriesByProduct:[],
    detailsMedia:[],
    afterUploadMedia:false,
    reviews:[],
    afterSaveReview:false
},action){
    if(action.type==="PRODUCT_CATEGORIES_RECEIVE" || action.type==="PRODUCT_ADD_CATEGORIES_RECEIVE"
        || action.type==="PRODUCT_DELETE_CATEGORIES_RECEIVE"){
        return {
            ...state,
            categoriesByProduct:action.categories
        }
    }
    if(action.type===PRODUCT_DETAILSMEDIA_RECEIVE){
        return {
            ...state,
            detailsMedia:action.detailsMedia
        }
    }
    if(action.type===PRODUCT_DETAILSMEDIA_SAVE_RECEIVE){
        return {
            ...state,
            afterUploadMedia:true
        }
    }
    if(action.type==="PRODUCT_REVIEW_RECEIVE"){
        return {
            ...state,
            reviews:action.data
        }
    }
    if(action.type==="PRODUCT_ADD_REVIEW_RECEIVE"){
        return {
            ...state,
            afterSaveReview:true
        }
    }
    if(action.type==="PRODUCT_ADD_REVIEW_OFF_RECEIVE"){
        return {
            ...state,
            afterSaveReview:false
        }
    }
    if(action.type==="PRODUCT_DELETE_REVIEW_RECEIVE"){
 
        const newAr = state.reviews.filter(function(record){
            return record.id != action.id
        })
        return {
            ...state,
            reviews:newAr
        }
    }
    if(action.type==="PRODUCT_REVIEW_ONE_RECEIVE"){
        return {
            ...state,
            review:action.data
        }
    }
    return actionSwitcher('PRODUCT',state,action)
}

