import React,{Component} from 'react'
import NavigationBarContainer from '../../containers/payment/NavigationBarContainer'
import {NavLink} from 'react-router-dom'
import {
    fetchData
} from '../../actions/payment_action'

class ProductListPage extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
      
        const {dispatch} = this.props
 
        dispatch(fetchData('REQUESTTYPE_ALLPRODUCT'))
    }

    render(){
        const {products} = this.props;
        return (
            <div>
                <NavigationBarContainer />
                <h1>Product List</h1>
                <ul>
                {
                    products.map((product,i)=>{
                        return (
                            <li key={i}>
                                <b>{product.name}</b> <span>{product.price}</span>
                                <NavLink to={`/product/${product.id}`}> View Detail </NavLink>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

export default ProductListPage
