import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function productReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false,
    categories:[],
    categoriesByProduct:[]
},action){
    if(action.type==="PRODUCT_CATEGORIES_RECEIVE" || action.type==="PRODUCT_ADD_CATEGORIES_RECEIVE"
        || action.type==="PRODUCT_DELETE_CATEGORIES_RECEIVE"){
        return {
            ...state,
            categoriesByProduct:action.categories
        }
    }
    return actionSwitcher('PRODUCT',state,action)
}

