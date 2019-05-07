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
import product_action from '../../actions/product_action'
import { Redirect} from 'react-router-dom';
import {ADMIN_PATH} from '../../config/Config'

const urlPathPrefix = '/adminpanel/product'

class ImagesFormsComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      formControls:Tools.generateFields(['productDetailType']),
      fileUpload:null,
      productId:0,
      productDetailType:null
    };
  }

  componentDidMount(){
    const {match:{params},dispatch} = this.props
    const {id} = params;

    

  
    if(id){
     dispatch(product_action.readOne(localStorage.getItem("token"),id))
    }

    this.setState({
      fileUpload:null,
      productId:id
    })


  
  }

 


  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }


  handleChange = event => {
     this.setState({
       [event.target.name]:event.target.value
     })
  }

  handleChangeAlt = event => {
    
  }

  handleSubmit(event) {
    const {dispatch} = this.props
    dispatch(product_action.addDetailsMedia(localStorage.getItem("token"),this.state.productId,{
      productDetailType:this.state.productDetailType,
      productDetailFileName:this.state.fileUpload
    }))
    event.preventDefault();
  }

  handleFileChange(event){
    const file = document.getElementById("uploadInput").files[0];
    console.log(file);
    this.setState({
      fileUpload:file
    })
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
    const {dispatch,afterUploadMedia} = this.props
    const {productId} = this.state
   // console.log(afterUploadMedia);
   
    if (afterUploadMedia === true) {
      dispatch(product_action.setFlag('afterUploadMedia',false))
      return <Redirect to={`${urlPathPrefix}/${productId}/images`} />
    }

 

 
    return (
      <div className="animated fadeIn">
        
        <Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Media Form</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="price-input">Type </Label>
                    </Col>
                    <Col xs="12" md="9">
                  
                      <Input type="text" id="price-input" name="productDetailType" placeholder="Enter Type" onChange={e=>this.handleChange(e)} value={this.state.productDetailType} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">File</Label>
                    </Col>
                    <Col xs="12" md="9">
                  
                     <Input type="file" id="uploadInput" name="productDetailFileName" placeholder="File Name" onChange={e=>this.handleFileChange()}  />
          
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
    successSave:state.productReducer.successSave,
    record:state.productReducer.record,
    afterUploadMedia:state.productReducer.afterUploadMedia
  }
}

const ImagesForms  = connect(mapStateToProps)(ImagesFormsComponent)

export default ImagesForms;
