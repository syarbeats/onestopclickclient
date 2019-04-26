import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function productReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false
},action){
    return actionSwitcher('PRODUCT',state,action)
}

