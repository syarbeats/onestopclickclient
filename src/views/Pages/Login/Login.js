import React, { Component } from 'react';
import { Link,Redirect} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { authLoginFetch } from '../../../actions/auth_action';
import { connect } from 'react-redux';
import {fakeAuth} from '../../../containers/PrivateRoute'

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

  login(e){
    e.preventDefault()
    const { dispatch} = this.props

    dispatch(authLoginFetch(this.state.formControls.username.value,
      this.state.formControls.password.value))

   
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
      const { redirectToReferrer } = this.state
      const { isGotToken,errorLogin,signing,token} = this.props;
     
  
      if (isGotToken === true) {
        localStorage.setItem("token",token);
        fakeAuth.isAuthenticated = true
        return <Redirect to={from} />
      }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
            {errorLogin?(<div className="alert alert-danger" role="alert">Username or password is invalid.</div>):(<div></div>)}
            {signing?(<div className="alert alert-secondary" role="alert">Signing...</div>):(<div></div>)}
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name="username"  onChange={this.changeHandler}  value={this.state.formControls.username.value} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password"  onChange={this.changeHandler}  value={this.state.formControls.password.value} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.login}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-dark py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth_reducer } = state
  const { token } = auth_reducer
  let tokenLength = token?token.length:0;
 
  return {
    isGotToken:tokenLength > 0 ?true:false,
    errorLogin:auth_reducer.errorLogin,
    signing:auth_reducer.signing,
    token:token
  }
}

const Login = connect(mapStateToProps)(LoginComponent)

export default Login;
