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

// Function to display header - includes login form
function Header(props) {
  let displayLoginForm;

  /* If statement to display login form if user not yet logged in, or welcome msg if they are logged in. Includes logout button */
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
        Welcome back,&nbsp;<b>{props.currentUser}</b>! &nbsp; &nbsp; &nbsp;
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

// Export component to be used in other files
export default Header;
