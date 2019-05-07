import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, 
  PaginationLink, Row, Table,Button,Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
  import { connect } from 'react-redux'

  import product_action from '../../actions/product_action'

const btnStyle = {
  margin:"10px"
}

const urlPathPrefix = '/adminpanel/product'

class ImagesTableComponent extends Component {

  constructor(props){
    super(props)
    this.handleAddUserClick = this.handleAddUserClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handelConfirmDelete = this.handelConfirmDelete.bind(this)
    this.handleCategoriesClick = this.handleCategoriesClick.bind(this)
    this.handleImagesClick = this.handleImagesClick.bind(this)
    this.state = {
      modal:false,
      idToDelete:0,
      productId:0
    }
  }

  handleAddUserClick(e){
    const {dispatch} = this.props
    e.preventDefault()
  
    dispatch(product_action.setFlag('afterUploadMedia',false))
    this.props.history.push(`${urlPathPrefix}/${this.state.productId}/add-images`);
  }

  componentDidMount() {
    const {match:{params},dispatch} = this.props
    const {id} = params
    this.setState({
      productId:id
    })
   
    dispatch(product_action.readDetailsMedia(localStorage.getItem("token"),id))
  }


  componentDidUpdate(prevProps) {
    if (this.props.afterRequestDelete !== prevProps.afterRequestDelete && this.props.afterRequestDelete===true) {
      const { dispatch} = this.props
      dispatch(product_action.fetch(localStorage.getItem("token")))
      dispatch(product_action.deleteOff())
    }
  }

  handleEditClick(id){
    
    //e.preventDefault()
    this.props.history.push(`${urlPathPrefix}/edit/${id}`);

  }
  handleDeleteClick(id){
   // e.preventDefault()
    this.setState({
      modal:true,
      idToDelete:id
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handelConfirmDelete(e){
    const { dispatch} = this.props
    e.preventDefault()
    this.setState({
      modal:false,
      idToDelete:0
    })
    dispatch(product_action.delete(localStorage.getItem("token"),this.state.idToDelete))
  }
  handleCategoriesClick(id){
    this.props.history.push(`${urlPathPrefix}/${id}/categories`);
  }

  handleImagesClick(id){
    this.props.history.push(`${urlPathPrefix}/${id}/images`);
  }

  render() {
    const {detailsMedia} = this.props
    return (
      <div className="animated fadeIn">
        
        <Row style={btnStyle}>
              
                <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleAddUserClick}>Add New Media</Button>
                        </Col>
            </Row>
        

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Media List
              </CardHeader>
              <CardBody>
              
              <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>FILE</th>
                    <th>TYPE</th>
                   
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
              
                  { detailsMedia.map((rec,i)=>(
                      <tr key={i}>
                        <td>{rec.id}</td>
                        <td><img src={rec.productDetailFileName} width="100" height="100" /></td>
                        <td>{rec.productDetailType}</td>
                
                        <td><Button className="btn btn-info" onClick={e=>this.handleDeleteClick(rec.id)}>Delete</Button></td>
                    </tr>
                  ))}
                  </tbody>
                </Table>

                <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Warning</ModalHeader>
                        <ModalBody>
                          Are you sure to delete this record?
                         </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.handelConfirmDelete}>Yes</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                </Modal>
               
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
    detailsMedia:state.productReducer.detailsMedia,
    records:state.productReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.productReducer.afterRequestDelete
  }
}

const ImagesTable = connect(mapStateToProps)(ImagesTableComponent);

export default ImagesTable;
