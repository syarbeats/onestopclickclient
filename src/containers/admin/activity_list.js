import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  Card, CardBody, CardHeader, Col,
  Row, Table, Button, ModalHeader, ModalBody, ModalFooter, Modal
} from 'reactstrap';
import { connect } from 'react-redux'

import {activityFetch} from '../../actions/activitylist_action.js'

const btnStyle = {
  margin:"10px"
}

class ActivityListComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      modal:false,
      idToDelete:0
    }

    this.handleShowClick = this.handleShowClick.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  componentDidMount() {
    //const { dispatch} = this.props
    const {match:{params},dispatch} = this.props
    const {id} = params;

    if(id){
      dispatch(activityFetch(localStorage.getItem("token"), id))
    }

  }

  /*componentDidUpdate(prevProps) {
    if (this.props.afterRequestDelete !== prevProps.afterRequestDelete && this.props.afterRequestDelete===true) {
      const { dispatch} = this.props
      dispatch(activityFetch(localStorage.getItem("token")))
    }
  }*/


  handleShowClick(id){
    this.props.history.push(`/adminpanel/admin/activityList/${id}`);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  render() {
    const {activities} = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Activity List
              </CardHeader>
              <CardBody>

                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>ACTIVITY</th>
                    <th>TIME</th>
                    <th colspan="3"></th>

                  </tr>
                  </thead>
                  <tbody>

                  { activities.map((activity,i)=>(
                    <tr key={i}>
                      <td>{activity.id}</td>
                      <td>{activity.activity}</td>
                      <td>{activity.time}</td>
                      <td><Button className="btn btn-info" onClick={e=>this.handleShowClick(activity.id)}>PRINT</Button></td>
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
    activities:state.activityReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.activityReducer.afterRequestDelete
  }
}

const ActivityList = connect(mapStateToProps)(ActivityListComponent);

export default ActivityList;
