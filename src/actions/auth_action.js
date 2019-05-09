import axios from 'axios'
import {API_URL} from '../config/Config'

export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_FETCHING = 'AUTH_FETCHING'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_SOCIAL_LOGIN = 'AUTH_LOGIN'

export function authReceive(username,json){
    return {
        type:AUTH_LOGIN,
        username,
        json
    }
}

export function authSocialLoginReceive(token){
  return {
    type:AUTH_SOCIAL_LOGIN,
    token
  }
}

export function authReceiveError(response){
    return {
        type:AUTH_ERROR,
        response
    }
}

export function authFetching(){
    return {
        type:AUTH_FETCHING
    }
}

export function authLogout(){
    return {
        type:AUTH_LOGOUT
    }
}


export function authLoginFetch(username,password) {

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    
    axios.defaults.headers.common = {}
 
    return dispatch => {
        dispatch(authFetching())


        return axios.post(`${API_URL}/auth/signin`,formData)
        .then(response => response.data)
        .then((json) =>  dispatch(authReceive(username,json)))
        .catch( error => {
          
         dispatch(authReceiveError(error.response))
      
        }
        )
    }
    
}




