import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function userReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    successEdit:false,
    successUserDelete:false,
    afterRequestDelete:false

},action){
    return actionSwitcher('USER',state,action)
}

