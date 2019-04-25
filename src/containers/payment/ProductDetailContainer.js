import React from 'react'
import {connect} from 'react-redux'
import ProductDetail from '../../components/payment/ProductDetail'

function mapStateToProps(state){
    const {selectedProduct} = state
    return {
        product:selectedProduct
    }
}

const ProductDetailContainer = connect(mapStateToProps)(ProductDetail)
export default ProductDetailContainer