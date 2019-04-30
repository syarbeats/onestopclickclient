import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  Card, CardBody, CardHeader, Col,
  Row, Table, Button, ModalHeader, ModalBody, ModalFooter, Modal
} from 'reactstrap';
import { connect } from 'react-redux'

import {userFetch} from '../../actions/user_action.js'
import new_user_action from "../../actions/new_user_Action";

const btnStyle = {
  margin:"10px"
}

class TablesComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      modal:false,
      idToDelete:0
    }

    this.handleAddUserClick = this.handleAddUserClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handelConfirmDelete = this.handelConfirmDelete.bind(this);
  }

  handleAddUserClick(e){
    e.preventDefault()
    this.props.history.push("/adminpanel/users/add");
  }

  componentDidMount() {
    const { dispatch} = this.props

    dispatch(userFetch(localStorage.getItem("token")))
  }

  componentDidUpdate(prevProps) {
    if (this.props.afterRequestDelete !== prevProps.afterRequestDelete && this.props.afterRequestDelete===true) {
      const { dispatch} = this.props
      dispatch(userFetch(localStorage.getItem("token")))
      dispatch(new_user_action.deleteOff())
    }
  }


  handleEditClick(id){
    this.props.history.push(`/adminpanel/users/edit/${id}`);
  }

  handleDeleteClick(id){
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
    dispatch(new_user_action.delete(localStorage.getItem("token"),this.state.idToDelete))
  }

  handleRolesClick(userId){
    this.props.history.push(`/adminpanel/users/roles/${userId}`);
  }

  render() {
    const {users} = this.props;

    return (
      <div className="animated fadeIn">

        <Row style={btnStyle}>

          <Col xs="6">
            <Button color="primary" className="px-4" onClick={this.handleAddUserClick}>Add New User</Button>
          </Col>
        </Row>


        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> User List
              </CardHeader>
              <CardBody>

                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>FIRSTNAME</th>
                    <th>LASTTNAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>STATUS</th>
                    <th colspan="3"></th>

                  </tr>
                  </thead>
                  <tbody>

                  { users.map((user,i)=>(
                    <tr key={i}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{JSON.stringify(user.enabled)}</td>
                      <td><Button className="btn btn-info" onClick={e=>this.handleRolesClick(user.id)}>Roles</Button></td>
                      <td><Button className="btn btn-info" onClick={e=>this.handleEditClick(user.id)}>Edit</Button></td>
                      <td><Button className="btn btn-info" onClick={e=>this.handleDeleteClick(user.id)}>Delete</Button></td>
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
    users:state.userReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.userReducer.afterRequestDelete
  }
}

const Tables = connect(mapStateToProps)(TablesComponent);

export default Tables;
