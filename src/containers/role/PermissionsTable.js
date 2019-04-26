import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, 
  PaginationLink, Row, Table,Button,Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
  import { connect } from 'react-redux'


  import role_action from '../../actions/role_action'

const btnStyle = {
  margin:"10px"
}

class PermissionsTableComponent extends Component {

  constructor(props){
    super(props)
    this.handleAddUserClick = this.handleAddUserClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handelConfirmDelete = this.handelConfirmDelete.bind(this)
    this.handlePermissionClick = this.handlePermissionClick.bind(this)
    this.state = {
      modal:false,
      idToDelete:0
    }
  }

  handleAddUserClick(e){
    e.preventDefault()
    this.props.history.push("/adminpanel/role/add");
  }

  componentDidMount() {
    const { dispatch} = this.props
   
    dispatch(role_action.fetch(localStorage.getItem("token")))
  }


  componentDidUpdate(prevProps) {
    if (this.props.afterRequestDelete !== prevProps.afterRequestDelete && this.props.afterRequestDelete===true) {
      const { dispatch} = this.props
      dispatch(role_action.fetch(localStorage.getItem("token")))
      dispatch(role_action.deleteOff())
    }
  }
  handlePermissionClick(id){
    this.props.history.push(`/adminpanel/role/${id}/permissions`);
  }
  handleEditClick(id){
    
    //e.preventDefault()
    this.props.history.push(`/adminpanel/role/edit/${id}`);

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
    dispatch(role_action.delete(localStorage.getItem("token"),this.state.idToDelete))
  }


  render() {
    const {records} = this.props
    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col xs="12" md="5">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Available</strong>
                
              </CardHeader>
              <CardBody>
                adsd
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="2">
            <Card>
              <CardHeader>
               
              </CardHeader>
              <CardBody>
                <Button> <span class="cui-chevron-right" aria-hidden="true"></span> </Button> <br/>
                <Button> <span class="cui-chevron-left" aria-hidden="true"></span> </Button>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="5">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Acquired</strong>
              </CardHeader>
              <CardBody>
                
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
    records:state.roleReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.roleReducer.afterRequestDelete
  }
}

const PermissionsTable = connect(mapStateToProps)(PermissionsTableComponent);

export default PermissionsTable;
