import {CRUDRead, CRUDSave, CRUDSaveJson, CRUDOffSave,CRUDReadOne,CRUDDelete,CRUDOffDelete} from '../helpers/CRUDActionReducer'


class BaseAction{
    /* @param pathURLModule 
        if pathURLModule is null then using its name,
        else use the  pathURLModule
    */
    constructor(name,pathURLModule=null){
        this.name = name;
        this.actionName = this.name.toUpperCase()
        this.pathURLModule = !pathURLModule===null?this.name:pathURLModule
    }

    fetch(token){
        return CRUDRead(token,'/api/v1/'+this.pathURLModule,this.actionName)
    }
    save(token,record) {
        return CRUDSave(token,record,'/api/v1/'+this.pathURLModule,this.actionName)
    }
    saveJson(token,record) {
        return CRUDSaveJson(token,record,'/api/v1/'+this.pathURLModule,this.actionName)
    }
    saveOff(){
        return CRUDOffSave(this.actionName)
    }
    readOne(token,id){
        return CRUDReadOne(token,`/api/v1/${this.pathURLModule}/${id}`,this.actionName)
    }
    delete(token,id){
        return CRUDDelete(token,`/api/v1/${this.pathURLModule}/${id}`,this.actionName)
    }
    deleteOff(){
        return CRUDOffDelete(this.actionName)
    }
}

export default BaseAction