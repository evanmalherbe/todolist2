import React from "react";

// Import logo image
import logo from "../eagleLogo.png";

// Import component
import LoginForm from "./LoginForm";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display buttons to list all cars or only cars older than 5 years
function Header(props) {
  let displayLoginForm;
  //console.log("Login status is: " + props.loggedIn);

  if (props.loggedIn === false || props.loggedIn === "") {
    displayLoginForm = (
      <LoginForm
        handleLogin={props.handleLogin}
        handleUsername={props.handleUsername}
        handlePassword={props.handlePassword}
        handleRegister={props.handleRegister}
      />
    );
  } else {
    displayLoginForm = (
      <div className="loggedInDiv">
        Welcome back,&nbsp;<b>{props.currentUser}</b>! &nbsp;
        <Button variant="primary" type="button" onClick={props.handleLogout}>
          Log out
        </Button>
      </div>
    );
  }

  return (
    <header className="header">
      <img src={logo} className="logoImg" alt="eagle logo" />
      <h1>To Do List</h1>
      {displayLoginForm}
    </header>
  );
}

export default Header;
