import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col, Container,
  Form,
  FormGroup,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import Tools from '../../helpers/Tools'
import { connect } from 'react-redux';
import {resetPassword} from '../../actions/reset_password_action'
import { Redirect} from 'react-router-dom';
import {userSaveOff} from "../../actions/user_action";
import Link from "react-router-dom/es/Link";


class CheckEmail extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardHeader>
                  <label><b>Please check your email to reset your password!!! <Link to="/login">Login</Link></b></label>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CheckEmail;
