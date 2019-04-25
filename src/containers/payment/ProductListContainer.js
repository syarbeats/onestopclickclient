import React from 'react'
import {connect} from 'react-redux'
import ProductListPage from '../../components/payment/ProductListPage'


function mapStateToProps(state){
    const {cart} = state
    const {products} = cart
    return {
        products:products
    }
}

const ProductListContainer = connect(mapStateToProps)(ProductListPage)
export default ProductListContainer