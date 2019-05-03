import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function tokenReducer(state={
  records:[],
  affectedRecord:null,
  successSave:false,
  afterRequestDelete:false
},action){
  return actionSwitcher('TOKEN',state,action)
}

