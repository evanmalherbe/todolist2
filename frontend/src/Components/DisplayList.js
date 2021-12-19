import React from "react";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display buttons to list all cars or only cars older than 5 years
function DisplayList(props) {
  let toDisplay;
  if (props.loggedIn === true) {
    toDisplay = <p>{props.listItems}</p>;
  } else {
    toDisplay = <p className="redPara">Not logged in.</p>;
  }

  return (
    <div className="list">
      <p className="bold">List items</p>
      {toDisplay}
    </div>
  );
}

export default DisplayList;
