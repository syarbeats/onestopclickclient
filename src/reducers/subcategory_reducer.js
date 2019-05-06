import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function subCategoryReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false,
    record:{}
},action){
    if(action.type==="SUBCATEGORY_SAVEWITHCATEGORY_RECEIVE"){
        return {
            ...state,
            record:action.subcategory
        }

    }
    return actionSwitcher('SUBCATEGORY',state,action)
}

