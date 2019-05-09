import {actionSwitcher} from '../helpers/CRUDActionReducer'
import Tools from '../helpers/Tools'

export default function promotedproductReducer(state={
    records:[],
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false,
    products:[],
    promotedProducts:[]
},action){
    if(action.type==="PROMOTEDPRODUCT_PRODUCTS_RECEIVE"){
        action.data.forEach(element => {
            element.show = true;
        });
        return {
            ...state,
            products:action.data
        }
    }
    if(action.type==="PROMOTEDPRODUCT_READONE_RECEIVE"){
       
        return {
            ...state,
            record:action.data,
            promotedProducts:action.data.products
        }
    }
    if(action.type==="PROMOTEDPRODUCT_PRODUCT_REMOVE"){
        
        const promoted = state.promotedProducts;
        let newAr = [];
      
        if(promoted.length > 1){
            // const foundIndex = promoted.findIndex((el)=>{
           
            //     return el.id===action.productId
            // })

            newAr = state.promotedProducts.filter(function(promoprod){
                return promoprod.id != action.productId
            })
            
            return {
                ...state,
                promotedProducts:newAr
            }
        
           
        }
        
        return {
            ...state,
            promotedProducts:newAr
        }
    }
    if(action.type==="PROMOTEDPRODUCT_PRODUCT_ADD"){
       

        const foundIndex = state.promotedProducts.findIndex((el)=>{
           
            return el.id===action.productId
        });

        console.log(foundIndex)

        if(foundIndex >= 0){
          //  const {selected} = state.products[foundIndex] 
            state.promotedProducts[foundIndex] = {
                ...state.promotedProducts[foundIndex],
                id:action.productId
            }
        }else{
            state.promotedProducts.push({
                id:action.productId
            })
        }
        return state
    }
    return actionSwitcher('PROMOTEDPRODUCT',state,action)
}

