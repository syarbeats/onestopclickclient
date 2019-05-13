import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function forgotPasswordReducer(state={
  records:[],
  successSubmit:false,
},action){
  return actionSwitcher('RESET',state,action)
}

