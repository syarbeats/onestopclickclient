import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function roleReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false,
    permissions:[],
    permissionsByRole:[]
},action){
    return actionSwitcher('ROLE',state,action)
}

