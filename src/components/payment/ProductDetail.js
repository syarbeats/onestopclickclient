import React,{Component} from 'react'
import PropTypes from 'prop-types'
import NavigationBarContainer from '../../containers/payment/NavigationBarContainer'
import {
    viewProduct
} from '../../actions/payment_action'
import {NavLink} from 'react-router-dom'

class ProductDetail extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
      
        const {dispatch} = this.props
        const {productId} = this.props.match.params;
 
        dispatch(viewProduct(productId))
    }

   

    render(){
        const {product} = this.props;
       // const {params} = this.props.match;
    
        return (
            <div>
                <NavigationBarContainer />
                <h1>Product Detail {product.id}</h1>
                <p> <b>Name</b>: {product.name}</p>
                <p> <b>Description</b>: {product.description}</p>
                <p> <b>Price</b>: {product.price}</p>
                <p> <NavLink to={`/paymentoverview`}> Get Product </NavLink>
                </p>
            </div>
        )
    }
}

ProductDetail.propTypes = {
    productId:PropTypes.number
}

export default ProductDetail
