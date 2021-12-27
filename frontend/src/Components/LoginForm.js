import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";
import { Form, FormControl, FormLabel, Col, Row } from "react-bootstrap";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display login form in header
function LoginForm(props) {
  return (
    <div className="loginFormDiv">
      {/* Learned how to turn autocomplete off here: 
      https://reactgo.com/react-turn-off-autocomplete/ */}
      <Form id="loginForm" autoComplete="off">
        <Row className="row">
          <Col className="addInput">
            <FormLabel> Username: </FormLabel>
          </Col>
          <Col className="addInput">
            <FormControl
              type="text"
              name="toAdd"
              placeholder="..."
              onChange={props.handleUsername}
            />{" "}
          </Col>
          <Col>
            <FormLabel> Password: </FormLabel>
          </Col>
          <Col>
            <FormControl
              type="text"
              className="addInput"
              name="toAdd"
              placeholder="..."
              onChange={props.handlePassword}
            />{" "}
          </Col>
          <Col>
            <Button
              className="loginButton"
              variant="primary"
              type="button"
              onClick={props.handleLogin}
            >
              Login
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              type="button"
              className="registerButton"
              onClick={props.handleRegister}
            >
              Register
            </Button>
          </Col>
        </Row>
      </Form>

      {/* End of loginFormDiv*/}
    </div>
  );
}

// Export component so it can be used by other components
export default LoginForm;
