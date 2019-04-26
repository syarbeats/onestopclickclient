import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, 
  PaginationLink, Row, Table,Button,Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
  import { connect } from 'react-redux'

  import permission_action from '../../actions/permission_action'

const btnStyle = {
  margin:"10px"
}

class TablesComponent extends Component {

  constructor(props){
    super(props)
    this.handleAddUserClick = this.handleAddUserClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handelConfirmDelete = this.handelConfirmDelete.bind(this)
    this.state = {
      modal:false,
      idToDelete:0
    }
  }

  handleAddUserClick(e){
    e.preventDefault()
    this.props.history.push("/adminpanel/permission/add");
  }

  componentDidMount() {
    const { dispatch} = this.props
   
    dispatch(permission_action.fetch(localStorage.getItem("token")))
  }


  componentDidUpdate(prevProps) {
    if (this.props.afterRequestDelete !== prevProps.afterRequestDelete && this.props.afterRequestDelete===true) {
      const { dispatch} = this.props
      dispatch(permission_action.fetch(localStorage.getItem("token")))
      dispatch(permission_action.deleteOff())
    }
  }

  handleEditClick(id){
    
    //e.preventDefault()
    this.props.history.push(`/adminpanel/permission/edit/${id}`);

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
    dispatch(permission_action.delete(localStorage.getItem("token"),this.state.idToDelete))
  }


  render() {
    const {records} = this.props
    return (
      <div className="animated fadeIn">
        
        <Row style={btnStyle}>
              
                <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleAddUserClick}>Add New Permission</Button>
                        </Col>
            </Row>
        

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Permission List
              </CardHeader>
              <CardBody>
              
              <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th></th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
              
                  { records.map((rec,i)=>(
                      <tr key={i}>
                        <td>{rec.id}</td>
                        <td>{rec.permissionName}</td>
                        <td>{rec.permissionDescription}</td>
                        <td><Button className="btn btn-info" onClick={e=>this.handleEditClick(rec.id)}>Edit</Button></td>
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
    records:state.permissionReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.permissionReducer.afterRequestDelete
  }
}

const Tables = connect(mapStateToProps)(TablesComponent);

export default Tables;
