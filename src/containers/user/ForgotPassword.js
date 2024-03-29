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
import {resetPassword} from '../../actions/reset_password_action'
import { Redirect} from 'react-router-dom';
import {userSaveOff} from "../../actions/user_action";


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
      formControls:Tools.generateFields(['email'])
    };
  }

  componentDidMount(){

  }

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
    console.log("submit reset password request for email:"+this.state.formControls.email.value)
    const {dispatch} = this.props
    dispatch(resetPassword(this.state.formControls.email.value))
    console.log("After submit reset password request..")
    event.preventDefault();
  }


  render() {
    const {successSubmit,dispatch} = this.props

    if (successSubmit === true) {
      dispatch(userSaveOff())
      return <Redirect to="/checkemail" />
    }

    return (

      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardHeader>
                  <label><b>Please insert your email to reset your password!!!</b></label>
                </CardHeader>
                <CardBody className="p-4">
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Email </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="email" id="email-input" name="email" placeholder="Enter Email" autoComplete="email" onChange={this.handleChange}  value={this.state.formControls.email.value} />
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
