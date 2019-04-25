import {CRUDRead, CRUDSave, CRUDOffSave,CRUDReadOne} from '../helpers/CRUDActionReducer'



export function userFetch(token){
    return CRUDRead(token,'/api/v1/users','USER')
}


export function userSave(token,user) {
   
    return CRUDSave(token,user,'/api/v1/users','USER')
}

export function userSaveOff(){
    return CRUDOffSave('USER')
}

export function userReadOne(token,id){
    return CRUDReadOne(token,`/api/v1/users/${id}`,'USER')
}






