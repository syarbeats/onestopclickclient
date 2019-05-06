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
import subcategory_action from '../../actions/subcategory_action'
import { Redirect} from 'react-router-dom';
import {ADMIN_PATH} from '../../config/Config'
import category_action from '../../actions/category_action'

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
      // formControls:Tools.generateFields(['subCategoryName','subCategoryDescription','category_id'])
      formControls:{
        subCategoryName:{value:''},
        subCategoryDescription:{value:''},
        category_id:{value:0}
      },
      subCategoryId:0
    };
  }

  componentDidMount(){
    const {match:{params},dispatch} = this.props
    const {id} = params;
    
    dispatch(category_action.fetch(localStorage.getItem("token")))
    if(id){
      this.setState({
        subCategoryId:id
       })
   dispatch(subcategory_action.readOne(localStorage.getItem("token"),id))
     
     
    }else{
      dispatch(subcategory_action.resetRecord())
     
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

  selectChange=event=>{
    this.setState({
      formControls:{
        ...this.state.formControls,
        category_id:{
          value:event.target.value
        }
      }
    });
  }

  handleSubmit(event) {
    const {dispatch} = this.props
    event.preventDefault();
  if(this.state.subCategoryId > 0){
    dispatch(subcategory_action.updateWithCategory(localStorage.getItem("token"),Tools.objectFormat(this.state.formControls),this.state.formControls.category_id.value))
    
  }else{
    let subCategory = Tools.objectFormat(this.state.formControls);
    if(this.state.formControls.category_id.value > 0){
      subCategory = {
        ...subCategory,
        category:{
          id:this.state.formControls.category_id.value
        }
      }
    }else{
      subCategory = {
        ...subCategory,
        category:null
      }
    }
    
     dispatch(subcategory_action.saveJson(localStorage.getItem("token"),subCategory));
 
  }

  }


  componentWillReceiveProps(prevProps) {
  
    let record = prevProps.record
  
   
    if(Object.keys(record).length > 0){
     
      let tempRecord = {}
      let keys = Object.keys(record);
      keys.map((key)=>{
        tempRecord[key] = {value:record[key]}
      })
     
      if(record.category){
        tempRecord['category_id'] = {value:record.category.id}
      }
     

      this.setState({
        formControls:tempRecord
      })
    }
    
  }
  

  render() {
    const {successSave,dispatch,categories} = this.props
   
    if (successSave === true) {
      dispatch(subcategory_action.saveOff())
      return <Redirect to={ADMIN_PATH+"/subcategory"} />
    }

 

 
    return (
      <div className="animated fadeIn">
        
        <Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Sub Category Form</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >
                
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                  
                     <Input type="text" id="text-input" name="subCategoryName" placeholder="Text" onChange={this.handleChange}  value={this.state.formControls.subCategoryName.value}  />
          
                    </Col>
                  </FormGroup>
                 
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description-input">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                   
                      <Input type="text" id="description-input" name="subCategoryDescription"  onChange={this.handleChange}  value={this.state.formControls.subCategoryDescription.value} />
                   </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description-input">Category</Label>
                    </Col>
                    <Col xs="12" md="9">
                   
                      {/* <Input type="text" id="description-input" name="subCategoryDescription"  onChange={this.handleChange}  value={this.state.formControls.subCategoryDescription.value} /> */}
                      <select id="parent-input" name="category_id" value={this.state.formControls.category_id.value} 
                    onChange={this.selectChange}>
                    <option key="0" value="0">---</option>
                      {
                        categories.map((category,id)=>(
                          <option key={id} value={category.id}>{category.categoryName}</option>
                        ))
                      }
                      </select>
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
  let subCategory = state.subCategoryReducer.record;

  if(Object.keys(subCategory).length === 0 && subCategory.constructor === Object){
    
  }else{
    if(subCategory.id > 0 ){
      if(!subCategory.hasOwnProperty('category_id')){
        subCategory['category_id'] = {value:0};
      }
    }
    
  }


 
  return {
    successSave:state.subCategoryReducer.successSave,
    record:subCategory,
    categories:state.categoryReducer.records
  }
}

const Forms  = connect(mapStateToProps)(FormsComponent)

export default Forms;
