import {CRUDRead, CRUDSave, CRUDEdit, CRUDOffSave, CRUDReadOne, CRUDOffEdit} from '../helpers/CRUDActionReducer'
import axios from 'axios'
import {API_URL} from '../config/Config'

export function userFetch(token){
    return CRUDRead(token,'/api/v1/users','USER')
}

export function userSave(token,user) {
   
    return CRUDSave(token,user,'/api/v1/users/register','USER')
}

export function userEdit(token,user) {

  return CRUDEdit(token,user,'/api/v1/users/user/edit','USER')
}

export function userSaveOff(){
    return CRUDOffSave('USER')
}

export function userEditOff(){
  return CRUDOffEdit('USER')
}

export function userReadOne(token,id){
    return CRUDReadOne(token,`/api/v1/users/${id}`,'USER')
}

function actionRolesReceive(json){
  return {
      type:`USER_ROLES_RECEIVE`,
      roles:json
  }
}

function actionAddRolesReceive(json){
  return {
      type:`USER_ADD_ROLES_RECEIVE`,
      roles:json
  }
}

function actionDeleteRolesReceive(json){
  return {
      type:`USER_DELETE_ROLES_RECEIVE`,
      roles:json
  }
}

export function readRoles(token,id){
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

  return dispatch => {

      return axios.get(`${API_URL}/api/v1/users/${id}/roles`)
      .then(response => response.data)
      .then((json) =>dispatch(actionRolesReceive(json)))
  }
}

export function addRoles(token,userId,roleId){
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

  return dispatch => {

      return axios.post(`${API_URL}/api/v1/users/${userId}/roles/${roleId}`)
      .then(response => response.data)
      .then((json) =>dispatch(actionAddRolesReceive(json)))
  }
}

export function removeRoles(token,userId,roleId){
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

  return dispatch => {

      return axios.delete(`${API_URL}/api/v1/users/${userId}/roles/${roleId}`)
      .then(response => response.data)
      .then((json) =>dispatch(actionDeleteRolesReceive(json)))
  }
}






