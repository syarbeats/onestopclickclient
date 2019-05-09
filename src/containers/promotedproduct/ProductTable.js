import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, 
  PaginationLink, Row, Table,Button,Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
  import { connect } from 'react-redux'

  import promotedproduct_action from '../../actions/promotedproduct_action'


class ProductTableContainer extends Component {

  constructor(props){
    super(props)
    this.handleSelectProductClick = this.handleSelectProductClick.bind(this)
   
  }

  componentDidMount(){
    const {dispatch} = this.props
    dispatch(promotedproduct_action.redProducts(localStorage.getItem("token")))

  
  }


  handleSelectProductClick(id){
    const {dispatch} = this.props
    dispatch(promotedproduct_action.selectProduct(id))
  }


  render() {
    const {products} = this.props

    return (
    <div>
        <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
           
                    <th colSpan="2"></th>
                 
                  </tr>
                  </thead>
                  <tbody>

                  { 
                    products.map((rec,i)=>(
                      <tr key={i}>
                        <td>{rec.id}</td>
                        <td>{rec.name}</td>
           
                        <td>
                          { rec.selected? (<Button className="btn btn-info" onClick={e=>this.handleSelectProductClick(rec.id)}>Un Select</Button>)
                          :(<Button className="btn btn-info" onClick={e=>this.handleSelectProductClick(rec.id)}>Select</Button>)}
                          
                        </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
    </div>

    );
  }
}

function mapStateToProps(state) {
  
  return {
    products:state.promotedproductReducer.products,
    
  }
}

const ProductTable = connect(mapStateToProps)(ProductTableContainer);

export default ProductTable;
