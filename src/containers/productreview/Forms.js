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
     // formControls:Tools.generateFields(['categoryName','categoryDescription','parent']),
      productId:0,
      productReviewComment:'',
      productReviewRate:''
    };
  }

  componentDidMount(){
    const {match:{params},dispatch} = this.props
    const {productId} = params;
    dispatch(product_action.addUpdateOffReview())
    
     dispatch(product_action.readOne(localStorage.getItem("token"),productId))
    // dispatch(product_action.fetch(localStorage.getItem("token")))
    // dispatch(product_action.readOneAndFetchParent(localStorage.getItem("token"),id))
      this.setState({
        productId:productId
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
    event.preventDefault();
    const {dispatch} = this.props
    const {productId,productReviewComment,productReviewRate} = this.state
    dispatch(product_action.addReview(localStorage.getItem("token"),productId,{
      productReviewComment:productReviewComment,
      productReviewRate:productReviewRate
    }))
  

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
    const {successSave,dispatch,record,afterSaveReview} = this.props
    const {productId} = this.state

    if(!record){
      return (
        <div>Please wait...</div>
      )
    }

  
   
    if (afterSaveReview === true) {
    
      return <Redirect to={ADMIN_PATH+"/product/"+productId+"/review"} />
    }

 

 
    return (
      <div className="animated fadeIn">
        
        <Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Review Form</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >
                
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Product Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                  
                      <p>{record.name}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Review Comment</Label>
                    </Col>
                    <Col xs="12" md="9">
                  
                     <Input type="text" id="text-input" name="productReviewComment" placeholder="Text" 
                        onChange={this.handleChange}  value={this.state.productReviewComment}  
                     />
          
                    </Col>
                  </FormGroup>
                 
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Rate</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="productReviewRate" id="productReviewRate-id" onChange={this.handleChange}  value={this.state.productReviewRate}  >
                        <option value="0">Please select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </Input>
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
    afterSaveReview:state.productReducer.afterSaveReview
    // parents:state.productReducer.records.filter((category)=>{
    //    console.log(category.id);
    //    console.log(state.productReducer.record.id)
    //     return category.id !== state.productReducer.record.id
       
    // })
  }
}

const Forms  = connect(mapStateToProps)(FormsComponent)

export default Forms;
