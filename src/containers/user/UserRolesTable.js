import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, 
  PaginationLink, Row, Table,Button,Modal, ModalBody, ModalFooter, ModalHeader,Input} from 'reactstrap';
  import { connect } from 'react-redux'
  import Checkbox from './Checkbox'


  import {readRoles,addRoles,removeRoles} from '../../actions/user_action'
  import role_action from '../../actions/role_action'

const btnStyle = {
  margin:"10px"
}

class UserRolesTableComponent extends Component {

  constructor(props){
    super(props)
    this.submitRole = this.submitRole.bind(this)
    this.handleChooseRole = this.handleChooseRole.bind(this)
    this.handleChooseAcquiredRole = this.handleChooseAcquiredRole.bind(this)
    this.deleteRole = this.deleteRole.bind(this)
    this.checkedValue = this.checkedValue.bind(this)
   
    this.state={
      checkedRoles:{},
      checkedAcquriredRoles:{},
      userId:0
    }
  }


  componentDidMount() {
    const { dispatch,match:{params}} = this.props
    const {id} = params;
    this.setState({
      userId:id
    })
    dispatch(readRoles(localStorage.getItem("token"),id))
    dispatch(role_action.fetch(localStorage.getItem("token")))
  }
  submitRole(){
    const { dispatch} = this.props
      const {checkedRoles} = this.state
      let roleId = 0;
      for (var key in checkedRoles) {
        if (checkedRoles.hasOwnProperty(key)) {
            if(roleId===0 && checkedRoles[key]){
              roleId = key
            }
        }
      }
      if(roleId > 0){
        this.setState({
          checkedRoles:{}
        })
        dispatch(addRoles(localStorage.getItem("token"),this.state.userId,roleId))
      }
     
  }

  deleteRole(){
    const { dispatch} = this.props
      const {checkedAcquriredRoles} = this.state
      let roleId = 0;
      for (var key in checkedAcquriredRoles) {
        if (checkedAcquriredRoles.hasOwnProperty(key)) {
            if(roleId===0 && checkedAcquriredRoles[key]){
              roleId = key
            }
        }
      }
      if(roleId > 0){
        this.setState({
          checkedAcquriredRoles:{}
        })
        dispatch(removeRoles(localStorage.getItem("token"),this.state.userId,roleId))
      }else{
        
      }
     
  }

  handleChooseRole(id,e){
   
    this.setState({
      checkedRoles:{
        ...this.state.checkedRoles,
        [id]:e.target.checked
      }
    })
   
  }

  handleChooseAcquiredRole(id,e){
   
    this.setState({
      checkedAcquriredRoles:{
        ...this.state.checkedAcquriredRoles,
        [id]:e.target.checked
      }
    })
   
  }

  checkedValue(permId){
    const {checkedAcquriredRoles} = this.state;
    let checked = checkedAcquriredRoles[permId];

    return checked?checked:false;
  }


  render() {
    const {rolesByUser,roles,checkedAcquriredRoles} = this.props
   
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
              
                  { roles.map((rec,i)=>(
                      <tr key={i} >
                        <td>{rec.id}</td>
                        <td>{rec.roleName}</td>
                        <td>{rec.roleDescription}</td>
                        <td><Input className="form-check-input" type="checkbox" onClick={e=>this.handleChooseRole(rec.id,e)} /></td>
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
                <Button onClick={e=>this.submitRole()}> <span class="cui-chevron-right" aria-hidden="true"></span> </Button> <br/>
                <Button onClick={e=>this.deleteRole()}> <span class="cui-chevron-left" aria-hidden="true"></span> </Button>
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
              
                  { rolesByUser.map((rec,i)=>(
                      <tr key={i}>
                        <td>{rec.id}</td>
                        <td>{rec.roleName}</td>
                        <td>{rec.roleDescription}</td>
                        {/* <td><Input className="form-check-input" type="checkbox" onClick={e=>this.handleChooseAcquiredRole(rec.id,e)} /></td> */}
                        <td><Checkbox recId={rec.id} handleChooseAcquiredRole={this.handleChooseAcquiredRole} /></td>
                    
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
   // records:state.roleReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.roleReducer.afterRequestDelete,
    rolesByUser:state.userReducer.rolesByUser,
    roles:state.roleReducer.records.filter(function(role){
      let found = state.userReducer.rolesByUser.find(function(element) {
        return element.id === role.id;
      })
  
      return found?false:true
    })
  }
}

const UserRolesTable = connect(mapStateToProps)(UserRolesTableComponent);

export default UserRolesTable;
