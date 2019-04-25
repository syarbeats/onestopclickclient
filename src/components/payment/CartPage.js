import React,{Component} from 'react'
import NavigationBarContainer from '../../containers/payment/NavigationBarContainer'
import {paymentDeleteItemFromCart} from '../../actions/payment_action'
import {NavLink} from 'react-router-dom'

class CartPage extends Component{
    constructor(props){
        super(props)
        this.handleRemoveClick = this.handleRemoveClick.bind(this)
    }

    handleRemoveClick(e,data){
        e.preventDefault()

        const { dispatch} = this.props
       // console.log(data)
        dispatch(paymentDeleteItemFromCart(data.id))
    }

    handleCheckoutClcik(e){

    }

    render(){
        const {products} = this.props
        return (
            <div>
                <NavigationBarContainer />
                <h1>Cart</h1>
                <table>
                    <thead>
                        <tr><th>Product Name</th><th>Price</th><th>Quantity</th><th>Total</th><th></th></tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product,i)=>(
                                <tr key={i}><td>{product.name}</td><td>{product.price}</td><td>{product.quantity}</td><td>{product.price*product.quantity}</td><td><button onClick={((e)=>this.handleRemoveClick(e,product))}>Remove</button></td></tr>
                            ))
                        }
                       
                    </tbody>
                </table>
                <div>
                    <NavLink to={`/paymentoverview`}> Get Product </NavLink>
                </div>
            </div>
        )
    }
}

export default CartPage
