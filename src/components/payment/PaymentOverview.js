import React,{Component} from 'react'
import NavigationBarContainer from '../../containers/payment/NavigationBarContainer'
import {NavLink} from 'react-router-dom'
import {
    paymentAddItemToCart
} from '../../actions/payment_action'

class PaymentOverview extends Component{
    constructor(props){
        super(props)
        this.handleAddToCartClick = this.handleAddToCartClick.bind(this)
    }

    handleAddToCartClick(e) {
        e.preventDefault()
    
        const { dispatch} = this.props
        dispatch(paymentAddItemToCart())
    }

    render(){
        const {product} = this.props;
        return (
            <div>
                <NavigationBarContainer />
                <h1>Product Overview</h1>
                <p> Name: {product.name}</p>
                <p> Price: {product.price}</p>
                <p>  <button onClick={this.handleAddToCartClick}>Add To Cart</button> | 
                <NavLink to={`/product/${product.id}`}> Cancel </NavLink>
                </p>
            </div>
        )
    }
}

export default PaymentOverview
