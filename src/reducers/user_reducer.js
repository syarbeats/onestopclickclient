import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function userReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    successEdit:false,
    successUserDelete:false,
    afterRequestDelete:false,
    roles:[],
    rolesByUser:[]

},action){
    if(action.type==="USER_ROLES_RECEIVE" || action.type==="USER_ADD_ROLES_RECEIVE"
        || action.type==="USER_DELETE_ROLES_RECEIVE"){
        return {
            ...state,
            rolesByUser:action.roles
        }
    }
    return actionSwitcher('USER',state,action)
}

