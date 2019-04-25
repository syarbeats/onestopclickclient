import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function userReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false
},action){
    return actionSwitcher('USER',state,action)
}

