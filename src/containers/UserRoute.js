
import React from 'react'
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import {connect} from 'react-redux'

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
   
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  },
  tokenExist(){
    let token = this.getToken()
    if(!token) return false
    if(token.length===0) return false
    return true
  },
  getToken(){
    return localStorage.getItem("token")
  }
  
}




export const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))


const UserRoute = ({ component: Component, ...rest }) => (
 
  <Route {...rest} render={(props) => (
  
    fakeAuth.tokenExist() === true
    ? <Component {...props} />
    : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
   
  )} />

  
)

function mapStateToProps(state) {
  const { auth_reducer } = state
  const { token } = auth_reducer
  let tokenLength = token?token.length:0;
 
  return {
    isGotToken:tokenLength > 0 ?true:false
  }
}

export const UserRouteComponent = connect(mapStateToProps)(UserRoute)