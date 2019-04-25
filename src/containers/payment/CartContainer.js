import React from 'react'
import {connect} from 'react-redux'
import CartPage from '../../components/payment/CartPage'

function mapStateToProps(state){
    return {
        products:state.cart.cart
    }
}

const CartContainer = connect(mapStateToProps)(CartPage)
export default CartContainer