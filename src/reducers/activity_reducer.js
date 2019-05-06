import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function activityReducer(state={
  records:[],
  affectedRecord:null,
  successSave:false,
  afterRequestDelete:false
},action){
  return actionSwitcher('ACTIVITY',state,action)
}

