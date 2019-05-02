import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function categoryReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false
},action){
    return actionSwitcher('CATEGORY',state,action)
}

