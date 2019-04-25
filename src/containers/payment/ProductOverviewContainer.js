import React from 'react'
import {connect} from 'react-redux'
import PaymentOverview from '../../components/payment/PaymentOverview'

function mapStateToProps(state){
    const {cart} = state
    const {selectedProduct} = cart
    return {
        product:selectedProduct
    }
}

const PaymentOverviewContainer = connect(mapStateToProps)(PaymentOverview)
export default PaymentOverviewContainer