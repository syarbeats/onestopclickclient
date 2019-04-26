import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function permissionReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false
},action){
    return actionSwitcher('PERMISSION',state,action)
}

