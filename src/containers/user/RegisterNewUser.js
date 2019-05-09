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
import {userSave, userEdit,userSaveOff,userReadOne} from '../../actions/user_action'
import { Redirect} from 'react-router-dom';


class RegisterNewUser extends Component {
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
      formControls:Tools.generateFields(['username','email','password', 'firstname', 'lastname'])
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
    const {dispatch} = this.props
    dispatch(userSave(localStorage.getItem("token"),Tools.objectFormat(this.state.formControls)))
    event.preventDefault();
  }

  componentWillReceiveProps(prevProps) {
    if(prevProps.user){
      this.setState({
        formControls:{
          username:{value:prevProps.user.username},
          email:{value:prevProps.user.email},
          password:{value:prevProps.user.password},
          firstname:{value:prevProps.user.firstname},
          lastname:{value:prevProps.user.lastname},
        }
      })
    }
    
  }

  render() {
    const {successSave,dispatch,user} = this.props
   
    if (successSave === true) {
      dispatch(userSaveOff())
      return <Redirect to="/login" />
    }

    return (

      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Username</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="username-input" name="username" placeholder="Text" onChange={this.handleChange}  value={this.state.formControls.username.value}  />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Email </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="email" id="email-input" name="email" placeholder="Enter Email" autoComplete="email" onChange={this.handleChange}  value={this.state.formControls.email.value} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="password-input">Password</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="password" id="password-input" name="password" placeholder="Password" autoComplete="new-password" onChange={this.handleChange}  value={this.state.formControls.password.value} />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Firstname</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="firstname-input" name="firstname" placeholder="Text" onChange={this.handleChange} />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Lastname</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="lastname-input" name="lastname" placeholder="Text" onChange={this.handleChange}  />
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
                  <br/>
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>Facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-google-plus mb-1" block><span>Google</span></Button>
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
    successSave:state.userReducer.successSave,
    user:state.userReducer.record
  }
}

const RegisterNewUserComponent  = connect(mapStateToProps)(RegisterNewUser)

export default RegisterNewUserComponent;
