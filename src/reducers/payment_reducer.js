import {PAYMENT_ADD_PRODUCT_TO_CART,
    PAYMENT_RECEIVE_PRODUCT,
    PAYMENT_DELETE_PRODUCT,
    PAYMENT_RECEIVE_ALL_PRODUCT,
    PAYMENT_VIEW_PRODUCT} from '../actions/payment_action'





export default function cart(state={
    products:[],
    selectedProduct:{},
    cart:[],
    cartTotalPrice:0,
    token:""
},action){
    switch(action.type){
        case PAYMENT_ADD_PRODUCT_TO_CART:
            let product = state.selectedProduct
            let productId = product.id
            let existProduct = state.cart.find(product=>product.id===productId)
            if(existProduct){
                existProduct.quantity += 1;
                return {
                    ...state,
              
                    cartTotalPrice:state.cartTotalPrice

                }
            }else{
                product.quantity = 1;
                return {
                    ...state,
                    cart:[...state.cart,product],
                    cartTotalPrice:state.cartTotalPrice
                }
            }
        case PAYMENT_DELETE_PRODUCT:
      
            return {
                ...state,
                cart:state.cart.filter(product=>product.id != action.productId)
            }
            
        case PAYMENT_RECEIVE_PRODUCT:
            return Object.assign({},state,{
                selectedProduct:{
                    id:action.data.id,
                    name:action.data.name,
                    price:action.data.price,
                    description:action.data.description
                }
            })
        case PAYMENT_RECEIVE_ALL_PRODUCT:
            return Object.assign({},state,{
                products:action.products
            })
        case PAYMENT_VIEW_PRODUCT:
           // console.log(state.products)
            let findProduct = state.products.find(product=>product.id===parseInt(action.productId))
            if(findProduct){
                return Object.assign({},state,{
                    selectedProduct:findProduct
                })
            }
            return state
        default:
            return state
    }
}



