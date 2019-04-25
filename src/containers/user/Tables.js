import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, 
  PaginationLink, Row, Table,Button} from 'reactstrap';
  import { connect } from 'react-redux'

  import {userFetch} from '../../actions/user_action.js'

const btnStyle = {
  margin:"10px"
}

class TablesComponent extends Component {

  constructor(props){
    super(props)
    this.handleAddUserClick = this.handleAddUserClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleAddUserClick(e){
    e.preventDefault()
    this.props.history.push("/users/add");
  }

  componentDidMount() {
    const { dispatch} = this.props
   
    dispatch(userFetch(localStorage.getItem("token")))
  }
  handleEditClick(id){
    
    //e.preventDefault()
    this.props.history.push(`/users/edit/${id}`);

  }
  handleDeleteClick(e){
    e.preventDefault()
    
  }


  render() {
    const {users} = this.props
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
                    <th></th>
                    <th></th>
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
                        <td>{user.enabled}</td>
                        <td><Button className="btn btn-info" onClick={e=>this.handleEditClick(user.id)}>Edit</Button></td>
                        <td><Button className="btn btn-info" onClick={this.handleDeleteClick}>Delete</Button></td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
                {/* <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav> */}
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
    token:state.auth_reducer.token
  }
}

const Tables = connect(mapStateToProps)(TablesComponent);

export default Tables;
