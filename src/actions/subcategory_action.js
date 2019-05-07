import BaseAction from './base_action'
import axios from 'axios'
import {API_URL} from '../config/Config'

function actionUpdateWithCategory(json){
    return {
        type:`SUBCATEGORY_SAVEWITHCATEGORY_RECEIVE`,
        subcategory:json
    }
}

function actionSaveReceive(name,json){
    return {
        type:`${name}_SAVE_RECEIVE`,
        data:json
    }
}


//const subcategory_action = new BaseAction('subcategory','subcategory')

class subcategory_actionBase extends BaseAction{
    constructor(name,pathURLModule=null){
        super(name,pathURLModule)
    }

    updateWithCategory(token,subCategory,categoryId){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        let saveSubCategory = subCategory;
     
        if(categoryId > 0){
            saveSubCategory = {
                ...subCategory,
                category:{
                    id:categoryId
                }
            }
        }else{
            
            saveSubCategory = {
                ...subCategory,
                category:null
            }
        }
       
        return dispatch => {
    
            return axios.put(`${API_URL}/api/v1/subcategory/${subCategory.id}`,saveSubCategory)
            .then(response => response.data)
            .then((json) =>dispatch(actionSaveReceive("SUBCATEGORY",json)))
        }
    }
}

const subcategory_action = new subcategory_actionBase('subcategory','subcategory')

export default subcategory_action



