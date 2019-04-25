import React from 'react'
import {connect} from 'react-redux'
import NavigationBar from '../../components/payment/NavigationBar'

function mapStateToProps(state){
    return {
        total:state.cart.length
    }
}

const NavigationBarContainer = connect(mapStateToProps)(NavigationBar)
export default NavigationBarContainer