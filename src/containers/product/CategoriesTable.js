import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, 
  PaginationLink, Row, Table,Button,Modal, ModalBody, ModalFooter, ModalHeader,Input} from 'reactstrap';
  import { connect } from 'react-redux'
  import Checkbox from './Checkbox'


  import product_action from '../../actions/product_action'
  import category_action from '../../actions/category_action'

const btnStyle = {
  margin:"10px"
}

class CategoriesTableComponent extends Component {

  constructor(props){
    super(props)
    this.submitCategory = this.submitCategory.bind(this)
    this.handleChooseCategory = this.handleChooseCategory.bind(this)
    this.handleChooseAcquiredCategory = this.handleChooseAcquiredCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.checkedValue = this.checkedValue.bind(this)
   
    this.state={
      checkedCategories:{},
      checkedAcquriredCategories:{},
      roleId:0
    }
  }


  componentDidMount() {
    const { dispatch,match:{params}} = this.props
    const {id} = params;
    this.setState({
      roleId:id
    })
    dispatch(product_action.readCategories(localStorage.getItem("token"),id))
    dispatch(category_action.fetch(localStorage.getItem("token")))
  }
  submitCategory(){
    const { dispatch} = this.props
      const {checkedCategories} = this.state
      let categoryId = 0;
      for (var key in checkedCategories) {
        if (checkedCategories.hasOwnProperty(key)) {
            if(categoryId===0 && checkedCategories[key]){
              categoryId = key
            }
        }
      }
      if(categoryId > 0){
        this.setState({
          checkedCategories:{}
        })
        dispatch(product_action.addCategories(localStorage.getItem("token"),this.state.roleId,categoryId))
      }
     
  }

  deleteCategory(){
    const { dispatch} = this.props
      const {checkedAcquriredCategories} = this.state
      let categoryId = 0;
      for (var key in checkedAcquriredCategories) {
        if (checkedAcquriredCategories.hasOwnProperty(key)) {
            if(categoryId===0 && checkedAcquriredCategories[key]){
              categoryId = key
            }
        }
      }
      if(categoryId > 0){
        this.setState({
          checkedAcquriredCategories:{}
        })
        dispatch(product_action.removeCategories(localStorage.getItem("token"),this.state.roleId,categoryId))
      }
     
  }

  handleChooseCategory(id,e){
   
    this.setState({
      checkedCategories:{
        ...this.state.checkedCategories,
        [id]:e.target.checked
      }
    })
   
  }

  handleChooseAcquiredCategory(id,e){
   
    this.setState({
      checkedAcquriredCategories:{
        ...this.state.checkedAcquriredCategories,
        [id]:e.target.checked
      }
    })
   
  }

  checkedValue(permId){
    const {checkedAcquriredCategories} = this.state;
    let checked = checkedAcquriredCategories[permId];

    return checked?checked:false;
  }


  render() {
    const {categoriesByProduct,categories,checkedAcquriredCategories} = this.props
    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col xs="12" md="5">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Available</strong>
                
              </CardHeader>
              <CardBody>
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
              
                  { categories.map((rec,i)=>(
                      <tr key={i} >
                        <td>{rec.id}</td>
                        <td>{rec.categoryName}</td>
                        <td>{rec.categoryDescription}</td>
                        <td><Input className="form-check-input" type="checkbox" onClick={e=>this.handleChooseCategory(rec.id,e)} /></td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="2">
            <Card>
              <CardHeader>
               
              </CardHeader>
              <CardBody>
                <Button onClick={e=>this.submitCategory()}> <span class="cui-chevron-right" aria-hidden="true"></span> </Button> <br/>
                <Button onClick={e=>this.deleteCategory()}> <span class="cui-chevron-left" aria-hidden="true"></span> </Button>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="5">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Acquired</strong>
              </CardHeader>
              <CardBody>
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
              
                  { categoriesByProduct.map((rec,i)=>(
                      <tr key={i}>
                        <td>{rec.id}</td>
                        <td>{rec.categoryName}</td>
                        <td>{rec.categoryDescription}</td>
                        {/* <td><Input className="form-check-input" type="checkbox" onClick={e=>this.handleChooseAcquiredCategory(rec.id,e)} /></td> */}
                        <td><Checkbox recId={rec.id} handleChooseAcquiredCategory={this.handleChooseAcquiredCategory} /></td>
                    
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

function mapStateToProps(state) {
  
  return {
    records:state.productReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.productReducer.afterRequestDelete,
    categoriesByProduct:state.productReducer.categoriesByProduct,
    categories:state.categoryReducer.records.filter(function(perms){
      let found = state.productReducer.categoriesByProduct.find(function(element) {
        return element.id === perms.id;
      })
  
      return found?false:true
    })
  }
}

const CategoriesTable = connect(mapStateToProps)(CategoriesTableComponent);

export default CategoriesTable;
