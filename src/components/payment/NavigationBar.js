import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'

class NavigationBar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {total} = this.props
        return (
            <div>
                <NavLink to='/productlist'> Product List </NavLink>
                <NavLink to='/cart'> Cart ({total}) </NavLink>
            </div>
        )
    }
}

export default NavigationBar
