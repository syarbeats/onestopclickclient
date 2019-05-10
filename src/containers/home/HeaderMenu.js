import React from 'react';
import {fakeAuth} from "../PrivateRoute";
import {authLogout} from "../../actions/auth_action";
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom'

class HeaderMenu extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      logout: 'false'
    }

    this.signOut = this.signOut.bind(this)
  }

  signOut(e) {
    e.preventDefault()
    const {dispatch} = this.props
    localStorage.setItem("token","")
    fakeAuth.isAuthenticated = false
    dispatch(authLogout())
    this.setState({logout: 'true'})
    console.log("Logout: "+this.props.logout)
    //this.props.history.push('/login')
  }

  render() {

    if(this.props.logout == 'true'){
      return (<Redirect to="http://localhost:3000/#/login"/>)
    }
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    <button type="button" className="btn btn-primary">Home</button><span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/adminpanel/dashboard">
                                    <button type="button" className="btn btn-secondary">Admin Dashboard</button></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <button type="button" className="btn btn-success" onClick={e=>this.signOut(e)}>Logout</button></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state){
  return {
    receiveResponse500:state.errorReducer.receivedResponse500
  }
}

const HeaderMenuLayout = connect(mapStateToProps)(HeaderMenu)


export default HeaderMenuLayout;
