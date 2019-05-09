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
  Table,
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import Tools from '../../helpers/Tools'
import { connect } from 'react-redux';
import promotedproduct_action from '../../actions/promotedproduct_action'
import { Redirect} from 'react-router-dom';
import {ADMIN_PATH} from '../../config/Config'
import Checkbox from './Checkbox'
import ProductTable from './ProductTable'

class FormsComponent extends Component {
  constructor(props) {
    super(props);

    // this.toggle = this.toggle.bind(this);
    // this.toggleFade = this.toggleFade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.toggle = this.toggle.bind(this)
    this.handleSubmitProduct = this.handleSubmitProduct.bind(this)
    this.handleCheckBox = this.handleCheckBox.bind(this)
    this.handleSubmitSelectedProduct = this.handleSubmitSelectedProduct.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
    this.state = {
      modal:false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      promotedProductId:0,
      promotedProductName:'',
      promotedProductDescription:'',
      products:{}
    //  formControls:Tools.generateFields(['categoryName','categoryDescription','parent'])
    };
  }

  componentDidMount(){
    const {match:{params},dispatch,products,promotedProducts} = this.props
    const {id} = params;
    this.setState({
      promotedProductId:0
    })

    if(id){
      this.setState({
        promotedProductId:id
      })
     dispatch(promotedproduct_action.readOne(localStorage.getItem("token"),id))
    // dispatch(promotedproduct_action.fetch(localStorage.getItem("token")))
    // dispatch(promotedproduct_action.readOneAndFetchParent(localStorage.getItem("token"),id))
    
    }
    dispatch(promotedproduct_action.redProducts(localStorage.getItem("token")))

  
  }

 


  // toggle() {
  //   this.setState({ collapse: !this.state.collapse });
  // }

  // toggleFade() {
  //   this.setState((prevState) => { return { fadeIn: !prevState }});
  // }


  handleChange = event => {
     this.setState({
      [event.target.name]:event.target.value
     })
  }

  handleChangeAlt = event => {
    
  }

  handleSubmit(event) {
    const {dispatch,promotedProducts} = this.props
    dispatch(promotedproduct_action.saveJson(localStorage.getItem("token"),{
      promotedProductName:this.state.promotedProductName,
      promotedProductDescription:this.state.promotedProductDescription,
      id:this.state.promotedProductId,
      products:promotedProducts
    }))
  //  dispatch(promotedproduct_action.saveWithParent(localStorage.getItem("token"),Tools.objectFormat(this.state.formControls)))
   
   event.preventDefault();
  }

  componentWillReceiveProps(nextProps) {
    let record = nextProps.record
   // const products = prevProps.products
   
    if(record){
     

      this.setState({
        promotedProductName:record.promotedProductName,
        promotedProductDescription:record.promotedProductDescription
      })
    }

   
    
  }

  handleAddClick(event){
    this.setState({
      modal:true,
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSelectProductClick(id){
    const {dispatch} = this.props
    dispatch(promotedproduct_action.selectProduct(id))
  }

  handleSubmitProduct(e){
    const { dispatch} = this.props
    e.preventDefault()
    this.setState({
      modal:false,
      idToDelete:0
    })
    dispatch(promotedproduct_action.delete(localStorage.getItem("token"),this.state.idToDelete))
  }

  handleCheckBox(id){
    const product = this.state.products[id]
    const selected = product?!product:true;
     this.setState({
        products:{
          ...this.state.products,
          [id]:selected
        }
     })
  }

  handleSubmitSelectedProduct(){
    const {dispatch} = this.props
     console.log(this.state.products)
     const products = this.state.products;
     const keys = Object.keys(products);
     keys.map((k)=>{
       dispatch(promotedproduct_action.addProductToList(k))
     })
     this.setState({
      modal:false,
      idToDelete:0
    })
  }

  handleRemoveClick(id){
      const {dispatch} = this.props;

      dispatch(promotedproduct_action.removePromotedProduct(id));
  }

  render() {
    const {successSave,dispatch,record,products,promotedProducts} = this.props
  


   
    if (successSave === true) {
      dispatch(promotedproduct_action.saveOff())
      return <Redirect to={ADMIN_PATH+"/promoted-product"} />
    }



 
    return (
      <div className="animated fadeIn">
        
        <Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Promote Form</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"  >
                
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                  
                     <Input type="text" id="text-input" name="promotedProductName" placeholder="Text" onChange={this.handleChange}  value={this.state.promotedProductName}  />
          
                    </Col>
                  </FormGroup>
                 
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description-input">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                   
                      <Input type="text" id="description-input" name="promotedProductDescription"  onChange={this.handleChange}  value={this.state.promotedProductDescription} />
                   </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description-input">Product List</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Button onClick={e=>this.handleAddClick()}>Add Product</Button>
                    <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
           
                    <th></th>
                 
                  </tr>
                  </thead>
                  <tbody>

                  { promotedProducts.map((rec,i)=>(
                      <tr key={i}>
                        <td>{rec.id}</td>
                        <td>{rec.name}</td>
                        <td>{rec.description}</td>
           
                        <td><Button className="btn btn-info" onClick={e=>this.handleRemoveClick(rec.id)}>Remove</Button></td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
               
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
        
        
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Product List</ModalHeader>
                        <ModalBody>
                        <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
           
                    <th></th>
                 
                  </tr>
                  </thead>
                  <tbody>

                  { 
                    products.map((rec,i)=>(
                      <tr key={i}>
                        <td>{rec.id}</td>
                        <td>{rec.name}</td>
           
                        <td>
                          {/* { this.state.products[i].selected? (<Button className="btn btn-info" onClick={e=>this.handleSelectProductClick(rec.id)}>Un Select</Button>)
                          :(<Button className="btn btn-info" onClick={e=>this.handleSelectProductClick(rec.id)}>Select</Button>)}
                           */}
                           <Checkbox handleChooseAcquiredPermission={this.handleCheckBox} recId={rec.id}/>
                        </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
                         </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.handleSubmitSelectedProduct}>Submit Selected Product</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                </Modal>
        
      
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    successSave:state.promotedproductReducer.successSave,
    record:state.promotedproductReducer.record,
    products:state.promotedproductReducer.products,
    promotedProducts:state.promotedproductReducer.promotedProducts
  }
}

const Forms  = connect(mapStateToProps)(FormsComponent)

export default Forms;
