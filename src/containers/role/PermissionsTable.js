import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, 
  PaginationLink, Row, Table,Button,Modal, ModalBody, ModalFooter, ModalHeader,Input} from 'reactstrap';
  import { connect } from 'react-redux'


  import role_action from '../../actions/role_action'
  import permission_action from '../../actions/permission_action'

const btnStyle = {
  margin:"10px"
}

class PermissionsTableComponent extends Component {

  constructor(props){
    super(props)
   
  }


  componentDidMount() {
    const { dispatch,match:{params}} = this.props
    const {id} = params;
    dispatch(role_action.readPermissions(localStorage.getItem("token"),id))
    dispatch(permission_action.fetch(localStorage.getItem("token")))
  }

  handleChoosePermission(id){

  }

  render() {
    const {permissionsByRole,permissions} = this.props
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
                      <tr key={i} onClick={e=>this.handleChoosePermission(rec.id)}>
                        <td>{rec.id}</td>
                        <td>{rec.permissionName}</td>
                        <td>{rec.permissionDescription}</td>
                        <td><Input className="form-check-input" type="checkbox" /></td>
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
              <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                  </tr>
                  </thead>
                  <tbody>
              
                  { permissionsByRole.map((rec,i)=>(
                      <tr key={i}>
                        <td>{rec.id}</td>
                        <td>{rec.permissionName}</td>
                        <td>{rec.permissionDescription}</td>
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
    permissions:state.permissionReducer.records
  }
}

const PermissionsTable = connect(mapStateToProps)(PermissionsTableComponent);

export default PermissionsTable;
