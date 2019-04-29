import BaseAction from './base_action'
import axios from 'axios'
import {API_URL} from '../config/Config'


function actionPermissionsReceive(json){
    return {
        type:`ROLE_PERMISSIONS_RECEIVE`,
        permissions:json
    }
}

function actionAddPermissionsReceive(json){
    return {
        type:`ROLE_ADD_PERMISSIONS_RECEIVE`,
        permissions:json
    }
}

function actionDeletePermissionsReceive(json){
    return {
        type:`ROLE_DELETE_PERMISSIONS_RECEIVE`,
        permissions:json
    }
}


//const role_action = new BaseAction('role','roles')

class role_actionBase extends BaseAction{
    constructor(name,pathURLModule=null){
        super(name,pathURLModule)
    }

    readPermissions(token,id){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.get(`${API_URL}/api/v1/roles/${id}/permissions`)
            .then(response => response.data)
            .then((json) =>dispatch(actionPermissionsReceive(json)))
        }
    }

    addPermissions(token,roleId,permissionId){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.post(`${API_URL}/api/v1/roles/${roleId}/permissions/${permissionId}`)
            .then(response => response.data)
            .then((json) =>dispatch(actionAddPermissionsReceive(json)))
        }
    }

    removePermissions(token,roleId,permissionId){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.delete(`${API_URL}/api/v1/roles/${roleId}/permissions/${permissionId}`)
            .then(response => response.data)
            .then((json) =>dispatch(actionDeletePermissionsReceive(json)))
        }
    }


}

const role_action = new role_actionBase('role','roles')

export default role_action



