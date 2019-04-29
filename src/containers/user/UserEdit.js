import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Tools from '../../helpers/Tools'
import { connect } from 'react-redux';
import {userEdit,userEditOff,userReadOne} from '../../actions/user_action'
import { Redirect} from 'react-router-dom';


class UserEdit extends Component {
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
      formControls:Tools.generateFields(['username','email','password', 'firstName', 'lastName', 'id'])
    };
  }

  componentDidMount(){
    const {match:{params},dispatch,user} = this.props
    const {id} = params;
  
    if(id){
      dispatch(userReadOne(localStorage.getItem("token"),id))
    }
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
    dispatch(userEdit(localStorage.getItem("token"),Tools.objectFormat(this.state.formControls)))
    event.preventDefault();
  }

  componentWillReceiveProps(prevProps) {
    if(prevProps.user){
      this.setState({
        formControls:{
          username:{value:prevProps.user.username},
          email:{value:prevProps.user.email},
          password:{value:prevProps.user.password},
          firstName:{value:prevProps.user.firstName},
          lastName:{value:prevProps.user.lastName},
          id:{value:prevProps.user.id},
        }
      })
    }
    
  }

  render() {
    const {successEdit,dispatch,user} = this.props

    if (successEdit === true) {
      dispatch(userEditOff())
      return <Redirect to="/adminpanel/users" />
    }

    return (
      <div className="animated fadeIn">
        
        <Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Edit User Data</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">id</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input readOnly type="text" id="id-input" name="id" placeholder="Text" onChange={this.handleChange} value={this.state.formControls.id.value} />
                    </Col>
                  </FormGroup>

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
                      <Input type="text" id="firstname-input" name="firstName" placeholder="Text" onChange={this.handleChange}  value={this.state.formControls.firstName.value} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Lastname</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="lastname-input" name="lastName" placeholder="Text" onChange={this.handleChange} value={this.state.formControls.lastName.value} />
                    </Col>
                  </FormGroup>

                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    successEdit:state.userReducer.successEdit,
    user:state.userReducer.record
  }
}

const UserEditForm  = connect(mapStateToProps)(UserEdit)

export default UserEditForm;
