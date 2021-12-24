import React from "react";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import bootstrap component
import Button from "react-bootstrap/Button";

// Import custom stylesheet
import "../App.css";

// Function to display buttons to list all cars or only cars older than 5 years
function DisplayList(props) {
  let data = props.listItems;
  let idData = props.idArray;

  let arrayData = data.split(",");
  let arrayId = idData.split(",");

  let displayItems = [];

  for (let i = 0; i <= arrayData.length - 1; i++) {
    displayItems.push(
      <div className="listItemDiv" key={i}>
        {i + 1}. {arrayData[i]}{" "}
        <Button
          variant="primary"
          onClick={() => props.handleDeleteItem(arrayId[i])}
        >
          X
        </Button>
      </div>
    );
  }

  return (
    <div className="list">
      <p className="bold">List items</p>
      {displayItems}
    </div>
  );
}

export default DisplayList;
