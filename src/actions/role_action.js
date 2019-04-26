import BaseAction from './base_action'


//const role_action = new BaseAction('role','roles')

class role_action2 extends BaseAction{
    constructor(name,pathURLModule=null){
        super(name,pathURLModule)
    }


}

const role_action = new role_action2('role','roles')

export default role_action



