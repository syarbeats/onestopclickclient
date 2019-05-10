import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function shopReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false,
    products:[],
    product:{}
},action){
    if(action.type==="SHOP_PRODUCTS_RECEIVE"){
        return {
            ...state,
            products:action.products
        }
    }
    if(action.type==="SHOP_PRODUCT_RECEIVE"){
        return {
            ...state,
            product:action.product
        }
    }

    
    return actionSwitcher('CATEGORY',state,action)
}

