import {AUTH_LOGIN, AUTH_ERROR, AUTH_FETCHING, AUTH_LOGOUT, AUTH_SOCIAL_LOGIN} from '../actions/auth_action'


export default function authModule(state={
    token:null,
    errorLogin:false,
    signing:false
},action){
    switch(action.type){
        
        case AUTH_LOGIN:
            
            return {
                ...state,
                token:action.json.token,
                signing:false,
                errorLogin:false
            }
        case AUTH_ERROR:
       
            return {
                ...state,
                errorLogin:true,
                signing:false
            }
        case AUTH_FETCHING:
            return {
                ...state,
                signing:true,
                errorLogin:false
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token:null,
                signing:false,
                errorLogin:false
            }
      case AUTH_SOCIAL_LOGIN:
        return {
          ...state,
          token:action.token,
          signing:false,
          errorLogin:false
        }
        default:
            return state
    }
}

