import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function eventReducer(state={
  records:[],
  affectedRecord:null,
  successSave:false,
  afterRequestDelete:false
},action){
  return actionSwitcher('EVENT',state,action)
}

