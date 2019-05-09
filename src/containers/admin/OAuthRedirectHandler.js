import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {fakeAuth} from "../PrivateRoute";
import {authSocialLoginReceive} from "../../actions/auth_action";

class OAuth2RedirectHandler extends Component {
  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    var results = regex.exec(this.props.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  componentDidUpdate() {
    const { dispatch} = this.props;
    dispatch(authSocialLoginReceive(localStorage.getItem("token")));
  }

  render() {
    console.log("GET TOKEN : "+this.getUrlParameter('token'));
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');


    if(token) {
      localStorage.setItem("token", token);
      console.log("SET TOKEN : "+token);
      fakeAuth.isAuthenticated = true;

      return <Redirect to={{
        pathname: "/",
        state: { from: this.props.location }
      }}/>;
    } else {
      return <Redirect to={{
        pathname: "/login",
        state: {
          from: this.props.location,
          error: error
        }
      }}/>;
    }
  }
}

export default OAuth2RedirectHandler;
