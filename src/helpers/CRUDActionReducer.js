import axios from 'axios'
import {API_URL} from '../config/Config'
import { callbackify } from 'util';

export function actionSwitcher(name,state,action){

    if(action.type===`${name}_RECEIVE`){
        return {
            ...state,
            records:action.data
        }
    }else if(action.type===`${name}_SAVE_RECEIVE`){
        return {
            ...state,
            affectedRecord:action.data,
            successSave:true
        }
    }else if(action.type===`${name}_SAVE_OFF`){
        return {
            ...state,
            affectedRecord:null,
            successSave:false
        }
    }else if(action.type===`${name}_READONE_RECEIVE`){
        return {
            ...state,
            record:action.data
        }
    }


    return state
   
  
}

function actionReceive(name,json){
    return {
        type:`${name}_RECEIVE`,
        data:json.content
    }
}

function actionSaveReceive(name,json){
    return {
        type:`${name}_SAVE_RECEIVE`,
        data:json
    }
}

function actionOffSave(name){
    return {
        type:`${name}_SAVE_OFF`
    }
}

function actionReadOneReceive(name,json){
    return {
        type:`${name}_READONE_RECEIVE`,
        data:json
    }
}



export function CRUDOffSave(name){
    return actionOffSave(name)
}

export function CRUDRead(token,pathUrl,name) {

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
    return dispatch => {
 
        return axios.get(`${API_URL}${pathUrl}`)
        .then(response => response.data)
        .then((json) =>dispatch(actionReceive(name,json)))
    }
    
}

export function CRUDSave(token,params,pathUrl,name) {

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
    return dispatch => {
 
        return axios.post(`${API_URL}${pathUrl}`,params)
        .then(response => response.data)
        .then((json) =>dispatch(actionSaveReceive(name,json)))
    }
    
}




export function CRUDReadOne(token,pathUrl,name) {

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
    return dispatch => {
 
        return axios.get(`${API_URL}${pathUrl}`)
        .then(response => response.data)
        .then((json) =>{
            dispatch(actionReadOneReceive(name,json))
         
        }
        
        )
    }
    
}