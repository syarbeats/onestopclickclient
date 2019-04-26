import {CRUDRead, CRUDSave, CRUDSaveJson, CRUDOffSave,CRUDReadOne,CRUDDelete,CRUDOffDelete} from '../helpers/CRUDActionReducer'


class BaseAction{
    constructor(name){
        this.name = name;
        this.actionName = this.name.toUpperCase()
    }
    fetch(token){
        return CRUDRead(token,'/api/v1/'+this.name,this.actionName)
    }
    save(token,record) {
        return CRUDSave(token,record,'/api/v1/'+this.name,this.actionName)
    }
    saveJson(token,record) {
        return CRUDSaveJson(token,record,'/api/v1/'+this.name,this.actionName)
    }
    saveOff(){
        return CRUDOffSave(this.actionName)
    }
    readOne(token,id){
        return CRUDReadOne(token,`/api/v1/${this.name}/${id}`,this.actionName)
    }
    delete(token,id){
        return CRUDDelete(token,`/api/v1/${this.name}/${id}`,this.actionName)
    }
    deleteOff(){
        return CRUDOffDelete(this.actionName)
    }
}

export default BaseAction