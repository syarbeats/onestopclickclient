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
import permission_action from '../../actions/permission_action'
import { Redirect} from 'react-router-dom';
import {ADMIN_PATH} from '../../config/Config'

class FormsComponent extends Component {
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
      formControls:Tools.generateFields(['permissionName','permissionDescription'])
    };
  }

  componentDidMount(){
    const {match:{params},dispatch} = this.props
    const {id} = params;
  
    if(id){
     dispatch(permission_action.readOne(localStorage.getItem("token"),id))
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
    dispatch(permission_action.saveJson(localStorage.getItem("token"),Tools.objectFormat(this.state.formControls)))
    event.preventDefault();
  }

  componentWillReceiveProps(prevProps) {
    let record = prevProps.record
   
    if(record){
      let tempRecord = {}
      let keys = Object.keys(record);
      keys.map((key)=>{
        tempRecord[key] = {value:record[key]}
      })

      this.setState({
        formControls:tempRecord
      })
    }
    
  }

  render() {
    const {successSave,dispatch} = this.props
   
    if (successSave === true) {
      dispatch(permission_action.saveOff())
      return <Redirect to={ADMIN_PATH+"/permission"} />
    }

 

 
    return (
      <div className="animated fadeIn">
        
        <Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Permission Form</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >
                
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                  
                     <Input type="text" id="text-input" name="permissionName" placeholder="Text" onChange={this.handleChange}  value={this.state.formControls.permissionName.value}  />
          
                    </Col>
                  </FormGroup>
                
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description-input">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                   
                      <Input type="text" id="description-input" name="permissionDescription"  onChange={this.handleChange}  value={this.state.formControls.permissionDescription.value} />
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
    successSave:state.permissionReducer.successSave,
    record:state.permissionReducer.record
  }
}

const Forms  = connect(mapStateToProps)(FormsComponent)

export default Forms;
