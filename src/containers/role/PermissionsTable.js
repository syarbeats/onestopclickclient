import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, 
  PaginationLink, Row, Table,Button,Modal, ModalBody, ModalFooter, ModalHeader,Input} from 'reactstrap';
  import { connect } from 'react-redux'
  import Checkbox from './Checkbox'


  import role_action from '../../actions/role_action'
  import permission_action from '../../actions/permission_action'

const btnStyle = {
  margin:"10px"
}

class PermissionsTableComponent extends Component {

  constructor(props){
    super(props)
    this.submitPermission = this.submitPermission.bind(this)
    this.handleChoosePermission = this.handleChoosePermission.bind(this)
    this.handleChooseAcquiredPermission = this.handleChooseAcquiredPermission.bind(this)
    this.deletePermission = this.deletePermission.bind(this)
    this.checkedValue = this.checkedValue.bind(this)
   
    this.state={
      checkedPermissions:{},
      checkedAcquriredPermissions:{},
      roleId:0
    }
  }


  componentDidMount() {
    const { dispatch,match:{params}} = this.props
    const {id} = params;
    this.setState({
      roleId:id
    })
    dispatch(role_action.readPermissions(localStorage.getItem("token"),id))
    dispatch(permission_action.fetch(localStorage.getItem("token")))
  }
  submitPermission(){
    const { dispatch} = this.props
      const {checkedPermissions} = this.state
      let permissionId = 0;
      for (var key in checkedPermissions) {
        if (checkedPermissions.hasOwnProperty(key)) {
            if(permissionId===0 && checkedPermissions[key]){
              permissionId = key
            }
        }
      }
      if(permissionId > 0){
        this.setState({
          checkedPermissions:{}
        })
        dispatch(role_action.addPermissions(localStorage.getItem("token"),this.state.roleId,permissionId))
      }
     
  }

  deletePermission(){
    const { dispatch} = this.props
      const {checkedAcquriredPermissions} = this.state
      let permissionId = 0;
      for (var key in checkedAcquriredPermissions) {
        if (checkedAcquriredPermissions.hasOwnProperty(key)) {
            if(permissionId===0 && checkedAcquriredPermissions[key]){
              permissionId = key
            }
        }
      }
      if(permissionId > 0){
        this.setState({
          checkedAcquriredPermissions:{}
        })
        dispatch(role_action.removePermissions(localStorage.getItem("token"),this.state.roleId,permissionId))
      }
     
  }

  handleChoosePermission(id,e){
   
    this.setState({
      checkedPermissions:{
        ...this.state.checkedPermissions,
        [id]:e.target.checked
      }
    })
   
  }

  handleChooseAcquiredPermission(id,e){
   
    this.setState({
      checkedAcquriredPermissions:{
        ...this.state.checkedAcquriredPermissions,
        [id]:e.target.checked
      }
    })
   
  }

  checkedValue(permId){
    const {checkedAcquriredPermissions} = this.state;
    let checked = checkedAcquriredPermissions[permId];

    return checked?checked:false;
  }


  render() {
    const {permissionsByRole,permissions,checkedAcquriredPermissions} = this.props
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
              
                  { permissions.map((rec,i)=>(
                      <tr key={i} >
                        <td>{rec.id}</td>
                        <td>{rec.permissionName}</td>
                        <td>{rec.permissionDescription}</td>
                        <td><Input className="form-check-input" type="checkbox" onClick={e=>this.handleChoosePermission(rec.id,e)} /></td>
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
                <Button onClick={e=>this.submitPermission()}> <span class="cui-chevron-right" aria-hidden="true"></span> </Button> <br/>
                <Button onClick={e=>this.deletePermission()}> <span class="cui-chevron-left" aria-hidden="true"></span> </Button>
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
              
                  { permissionsByRole.map((rec,i)=>(
                      <tr key={i}>
                        <td>{rec.id}</td>
                        <td>{rec.permissionName}</td>
                        <td>{rec.permissionDescription}</td>
                        {/* <td><Input className="form-check-input" type="checkbox" onClick={e=>this.handleChooseAcquiredPermission(rec.id,e)} /></td> */}
                        <td><Checkbox recId={rec.id} handleChooseAcquiredPermission={this.handleChooseAcquiredPermission} /></td>
                    
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
    records:state.roleReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.roleReducer.afterRequestDelete,
    permissionsByRole:state.roleReducer.permissionsByRole,
    permissions:state.permissionReducer.records.filter(function(perms){
      let found = state.roleReducer.permissionsByRole.find(function(element) {
        return element.id === perms.id;
      })
  
      return found?false:true
    })
  }
}

const PermissionsTable = connect(mapStateToProps)(PermissionsTableComponent);

export default PermissionsTable;
