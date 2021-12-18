import React from "react";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display buttons to list all cars or only cars older than 5 years
function DisplayList(props) {
  return (
    <div className="list">
      <p className="bold">List items</p>
      <p>{props.listItems}</p>
    </div>
  );
}

export default DisplayList;
