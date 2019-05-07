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
    afterUploadMedia:false
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
    return actionSwitcher('PRODUCT',state,action)
}

