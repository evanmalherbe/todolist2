import React from "react";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display buttons to list all cars or only cars older than 5 years
function DisplayList(props) {
  let data = props.listItems;

  let array = data.split(",");
  let displayItems = [];

  for (let i = 0; i <= array.length - 1; i++) {
    displayItems.push(<li key={i}>{array[i]}</li>);
  }

  return (
    <div className="list">
      <p className="bold">List items</p>
      <ul>{displayItems}</ul>
    </div>
  );
}

export default DisplayList;
