import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col, Container,
  Form,
  FormGroup,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import Tools from '../../helpers/Tools'
import { connect } from 'react-redux';
import {submitNewPassword} from '../../actions/reset_password_action'
import { Redirect} from 'react-router-dom';
import {userSaveOff} from "../../actions/user_action";
import {authSocialLoginReceive} from "../../actions/auth_action";


class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      formControls:Tools.generateFields(['username', 'password'])
    };
  }

  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    let results = regex.exec(this.props.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  handleChange = event => {

    Tools.changeHandler(event,this)
  }

  handleSubmit(event) {
    console.log("submit new password for username:"+this.state.formControls.username.value)
    const {dispatch} = this.props
    dispatch(submitNewPassword(localStorage.getItem("token"),this.state.formControls.username.value,this.state.formControls.password.value))
    console.log("After submit reset password request..")
    event.preventDefault();
  }

  componentDidMount() {
    console.log("Username:"+this.getUrlParameter('username'));
    this.setState({
      formControls:{
        username:{value:this.getUrlParameter('username')},
      }
    })
  }


  render() {

    console.log("GET TOKEN : "+this.getUrlParameter('token'));
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');
    const username = this.getUrlParameter('username');
    console.log("GET USERNAME : "+this.getUrlParameter('username'));

    if(token) {
      localStorage.setItem("token", token);
    }

    const {successSubmit,dispatch} = this.props

    if (successSubmit === true) {
      dispatch(userSaveOff())
      return <Redirect to="/login" />
    }

    return (

      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardHeader>
                  <label><b>Please insert your new password!!!</b></label>
                </CardHeader>
                <CardBody className="p-4">
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="username-input">Username </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="username" id="username-input" name="username" placeholder="Enter username" autoComplete="username" onChange={this.handleChange}  value={this.state.formControls.username.value} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="password-input">password </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="password" id="password-input" name="password" placeholder="Enter password" autoComplete="password" onChange={this.handleChange} />
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button type="submit" onClick={this.handleSubmit} className="btn-spotify mb-1" block> <span>Submit</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    successSubmit:state.forgotPasswordReducer.successSubmit,
  }
}

const ForgotPasswordComponent  = connect(mapStateToProps)(ForgotPassword)

export default ForgotPasswordComponent;
