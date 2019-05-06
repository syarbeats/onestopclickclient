import BaseAction from './base_action'
import axios from 'axios'
import {API_URL} from '../config/Config'

function actionReadOneReceive(name,json){
    return {
        type:`${name}_READONE_RECEIVE`,
        data:json
    }
}

function actionReceive(name,json){
    return {
        type:`${name}_RECEIVE`,
        data:json.content
    }
}

class category_actionBase extends BaseAction{
    constructor(name,pathURLModule=null){
        super(name,pathURLModule)
    }

    readOneAndFetchParent(token,id){

        

        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.get(`${API_URL}/api/v1/category/${id}`)
            .then(response => response.data)
            .then((json) =>{
                dispatch(actionReadOneReceive('CATEGORY',json))
                
                /// call categories
                return axios.get(`${API_URL}/api/v1/category/`)
                .then(response => response.data)
                .then((json2) =>{
                    dispatch(actionReceive('CATEGORY',json2))
                    
                }
                    
                )
                /// end call categories
            }
                
            )
        }
    }

    saveWithParent(token,category){

        

        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
        return dispatch => {
    
            return axios.post(`${API_URL}/api/v1/category/${category.id}/withparent`,category)
            .then(response => response.data)
            .then((json) =>{
                //dispatch(actionReadOneReceive('CATEGORY',json))
                
                
            }
                
            )
        }
    }



}

const category_action = new category_actionBase('category','category')

export default category_action



