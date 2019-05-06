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
import category_action from '../../actions/category_action'
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
      formControls:Tools.generateFields(['categoryName','categoryDescription','parent'])
    };
  }

  componentDidMount(){
    const {match:{params},dispatch} = this.props
    const {id} = params;
  
    if(id){
     dispatch(category_action.readOne(localStorage.getItem("token"),id))
    // dispatch(category_action.fetch(localStorage.getItem("token")))
    // dispatch(category_action.readOneAndFetchParent(localStorage.getItem("token"),id))
    
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
    dispatch(category_action.saveJson(localStorage.getItem("token"),Tools.objectFormat(this.state.formControls)))
  //  dispatch(category_action.saveWithParent(localStorage.getItem("token"),Tools.objectFormat(this.state.formControls)))
   
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
    const {successSave,dispatch,parents} = this.props
   
    if (successSave === true) {
      dispatch(category_action.saveOff())
      return <Redirect to={ADMIN_PATH+"/category"} />
    }

 

 
    return (
      <div className="animated fadeIn">
        
        <Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Category Form</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >
                
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                  
                     <Input type="text" id="text-input" name="categoryName" placeholder="Text" onChange={this.handleChange}  value={this.state.formControls.categoryName.value}  />
          
                    </Col>
                  </FormGroup>
                 
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description-input">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                   
                      <Input type="text" id="description-input" name="categoryDescription"  onChange={this.handleChange}  value={this.state.formControls.categoryDescription.value} />
                   </Col>
                  </FormGroup>
                  {/* <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="parent-input">Parent</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <select id="parent-input" name="parent_id" value={this.state.formControls.parent.value} 
                    onChange={this.handleChange}>
                    <option key="0" value="0">---</option>
                      {
                        parents.map((category,id)=>(
                          <option key={id} value={category.id}>{category.categoryName}</option>
                        ))
                      }
                      </select>
                   </Col>
                  </FormGroup> */}


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
    successSave:state.categoryReducer.successSave,
    record:state.categoryReducer.record,
    // parents:state.categoryReducer.records.filter((category)=>{
    //    console.log(category.id);
    //    console.log(state.categoryReducer.record.id)
    //     return category.id !== state.categoryReducer.record.id
       
    // })
  }
}

const Forms  = connect(mapStateToProps)(FormsComponent)

export default Forms;
