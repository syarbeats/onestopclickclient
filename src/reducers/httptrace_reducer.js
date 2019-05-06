import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function httpTraceReducer(state={
  records:[],
  affectedRecord:null,
  successSave:false,
  afterRequestDelete:false
},action){
  return actionSwitcher('HTTPTRACE',state,action)
}

