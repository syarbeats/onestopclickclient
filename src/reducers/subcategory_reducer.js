import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function subCategoryReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false
},action){
    return actionSwitcher('SUBCATEGORY',state,action)
}

