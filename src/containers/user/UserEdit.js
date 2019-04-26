import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
 
  Form,
  FormGroup,
  FormText,

  Input,
  Label,
  Row,
} from 'reactstrap';
import Tools from '../../helpers/Tools'
import { connect } from 'react-redux';
import {userEdit,userSaveOff,userReadOne} from '../../actions/user_action'
import { Redirect} from 'react-router-dom';
import InputComponent from './InputComponent'

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

  handleChangeAlt = event => {
    
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
    const {successSave,dispatch,user} = this.props

    if (successSave === true) {
      dispatch(userSaveOff())
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
                      <Input readOnly type="text" id="text-input" name="id" placeholder="Text" onChange={this.handleChange} value={this.state.formControls.id.value} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Username</Label>
                    </Col>
                    <Col xs="12" md="9">
                    {/* <Input type="text" id="text-input" name="username" placeholder="Text" onChange={this.handleChangeAlt} value={formFields.username} /> */}
                     
                     <Input type="text" id="text-input" name="username" placeholder="Text" onChange={this.handleChange}  value={this.state.formControls.username.value}  />
                      {/* <FormText color="muted">This is a help text</FormText> */}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email </Label>
                    </Col>
                    <Col xs="12" md="9">
                    {/* <Input type="email" id="email-input" name="email" placeholder="Enter Email" autoComplete="email"   /> */}
                     
                      <Input type="email" id="email-input" name="email" placeholder="Enter Email" autoComplete="email" onChange={this.handleChange}  value={this.state.formControls.email.value} />
                      {/* <FormText className="help-block">Please enter your email</FormText> */}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                    {/* <Input type="password" id="password-input" name="password" placeholder="Password" autoComplete="new-password" /> */}
                     
                      <Input type="password" id="password-input" name="password" placeholder="Password" autoComplete="new-password" onChange={this.handleChange}  value={this.state.formControls.password.value} />
                      {/* <FormText className="help-block">Please enter a complex password</FormText> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Firstname</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="firstname" placeholder="Text" onChange={this.handleChange}  value={this.state.formControls.firstName.value} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Lastname</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="lastname" placeholder="Text" onChange={this.handleChange} value={this.state.formControls.lastName.value} />
                    </Col>
                  </FormGroup>

                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                {/* <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button> */}
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
    successSave:state.userReducer.successSave,
    user:state.userReducer.record
  }
}

const Forms  = connect(mapStateToProps)(UserEdit)

export default Forms;
