import React from "react";

// Import logo image
import logo from "../eagleLogo.png";

// Import component
import LoginForm from "./LoginForm";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display buttons to list all cars or only cars older than 5 years
function Header(props) {
  let displayLoginForm;
  if (!props.loggedIn) {
    displayLoginForm = (
      <LoginForm
        handleLogin={props.handleLogin}
        handleUsername={props.handleUsername}
        handlePassword={props.handlePassword}
      />
    );
  } else {
    displayLoginForm = <p className="loggedInMsg">Logged in</p>;
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
