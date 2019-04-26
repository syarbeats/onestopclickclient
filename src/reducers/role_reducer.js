import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function roleReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false,
    permissions:[],
    permissionsByRole:[]
},action){
    if(action.type==="ROLE_PERMISSIONS_RECEIVE"){
        return {
            ...state,
            permissionsByRole:action.permissions
        }
    }
    return actionSwitcher('ROLE',state,action)
}

