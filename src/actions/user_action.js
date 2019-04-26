import {CRUDRead, CRUDSave, CRUDEdit, CRUDOffSave,CRUDReadOne} from '../helpers/CRUDActionReducer'



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

export function userReadOne(token,id){
    return CRUDReadOne(token,`/api/v1/users/${id}`,'USER')
}






