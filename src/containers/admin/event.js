import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  Card, CardBody, CardHeader, Col,
  Row, Table, Button, ModalHeader, ModalBody, ModalFooter, Modal
} from 'reactstrap';
import { connect } from 'react-redux'

import {eventFetch} from '../../actions/event_action.js'

const btnStyle = {
  margin:"10px"
}

class EventComponent extends Component {

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
    const { dispatch} = this.props

    dispatch(eventFetch(localStorage.getItem("token")))
  }

  componentDidUpdate(prevProps) {
    if (this.props.afterRequestDelete !== prevProps.afterRequestDelete && this.props.afterRequestDelete===true) {
      const { dispatch} = this.props
      dispatch(eventFetch(localStorage.getItem("token")))
    }
  }


  handleShowClick(id){
    this.props.history.push(`/adminpanel/users/edit/${id}`);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  render() {
    const {events} = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Event List
              </CardHeader>
              <CardBody>

                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>TIME</th>
                    <th>USERNAME</th>
                    <th>TYPE</th>
                    <th>IP</th>
                    <th>SESSION ID</th>
                    <th>MESSAGE</th>
                    <th>TYPE</th>
                    <th colspan="3"></th>

                  </tr>
                  </thead>
                  <tbody>

                  { events.map((event,i)=>(
                    <tr key={i}>
                      <td>{event.timestamp}</td>
                      <td>{event.principal}</td>
                      <td>{event.type}</td>
                      <td>{JSON.stringify(event.data.details.remoteAddress)}</td>
                      <td>{event.data.details.sessionId}</td>
                      <td>{event.data.message}</td>
                      <td>{event.data.type}</td>
                      <td><Button className="btn btn-info" onClick="">PRINT</Button></td>
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
    events:state.eventReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.eventReducer.afterRequestDelete
  }
}

const Event = connect(mapStateToProps)(EventComponent);

export default Event;
