import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  Card, CardBody, CardHeader, Col,
  Row, Table, Button, ModalHeader, ModalBody, ModalFooter, Modal
} from 'reactstrap';
import { connect } from 'react-redux'

import {tokenFetch} from '../../actions/tokenlist_action.js'

const btnStyle = {
  margin:"10px"
}

class TokenListComponent extends Component {

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

    dispatch(tokenFetch(localStorage.getItem("token")))
  }

  componentDidUpdate(prevProps) {
    if (this.props.afterRequestDelete !== prevProps.afterRequestDelete && this.props.afterRequestDelete===true) {
      const { dispatch} = this.props
      dispatch(tokenFetch(localStorage.getItem("token")))
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
    const {tokens} = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Token List
              </CardHeader>
              <CardBody>

                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>USERNAME</th>
                    <th>LOGIN TIME</th>
                    <th>TOKEN</th>
                    <th colspan="3"></th>

                  </tr>
                  </thead>
                  <tbody>

                  { tokens.map((token,i)=>(
                    <tr key={i}>
                      <td>{token.username}</td>
                      <td>{token.time}</td>
                      <td>{token.token}</td>
                      <td><Button className="btn btn-info" onClick={e=>this.handleShowClick()}>Show</Button></td>
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
    tokens:state.tokenReducer.records,
    token:state.auth_reducer.token,
    afterRequestDelete:state.tokenReducer.afterRequestDelete
  }
}

const Token_list = connect(mapStateToProps)(TokenListComponent);

export default Token_list;
