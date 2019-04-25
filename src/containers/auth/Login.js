import React,{Component} from 'react'
import {fakeAuth} from '../../containers/PrivateRoute'
import { withStyles } from '@material-ui/core/styles'
import {Card} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'

import {
    Redirect
  } from 'react-router-dom'
import { authLoginFetch } from '../../actions/auth_action';
import { connect } from 'react-redux';


  const styles = {
    card: {
      minWidth: 275,
      margin:'auto',
      maxWidth:300
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

class LoginComponent extends Component {
    constructor(props){
      super(props)
      this.login = this.login.bind(this)
    }
    state = {
      redirectToReferrer: false,
      formControls: {
            email: {
            value: ''
            },
            username: {
            value: ''
            },
            password: {
            value: ''
            }
        }
    }
  
    login(e){
      e.preventDefault()
      const { dispatch} = this.props

      dispatch(authLoginFetch(this.state.formControls.username.value,
        this.state.formControls.password.value))

     
    }
    changeHandler = event => {
      
        const name = event.target.name;
        const value = event.target.value;
      
        this.setState({
          formControls: {
              ...this.state.formControls,
              [name]: {
              ...this.state.formControls[name],
              value
            }
          }
        });
    }
    render() {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      const { redirectToReferrer } = this.state
      const { classes,isGotToken} = this.props;
      const bull = <span className={classes.bullet}>•</span>;
  
      if (isGotToken === true) {
        fakeAuth.isAuthenticated = true
        return <Redirect to={from} />
      }
  
      return (
        
        <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Login Form
          </Typography>
          <form>
         
        <TextField
          id="standard-name"
          label="Username"
          type="text" 
                  name="username"
          value={this.state.formControls.username.value}
          onChange={this.changeHandler}
          margin="normal"
        />
         <TextField
          id="standard-name"
          label="Password"
          type="password" 
                  name="password"
          value={this.state.formControls.password.value}
          onChange={this.changeHandler}
          margin="normal"
        />
          <Button variant="contained" color="primary" className={classes.button} onClick={this.login}>
        Login
      </Button>
          </form>
        </CardContent>
      
      </Card>
        
        // <div>
        //   <p>Login Form</p>
        //   <div>
        //       <form>
        //       Username : <input type="text" 
        //              name="name" 
        //              value={this.state.formControls.name.value}
        //              onChange={this.changeHandler} 
        //       />

        //       Password: <input type="password" 
        //              name="password" 
        //              value={this.state.formControls.password.value}
        //              onChange={this.changeHandler} 
        //       />
        //       </form>
        //   </div>
        //   <button onClick={this.login}>Log in</button>
        // </div>
      )
    }
  }

  function mapStateToProps(state) {
    const { auth_reducer } = state
    const { token } = auth_reducer
    let tokenLength = token?token.length:0;
   
    return {
      isGotToken:tokenLength > 0 ?true:false
    }
  }
  

  
  const Login = connect(mapStateToProps)(LoginComponent)
  export default withStyles(styles)(Login)