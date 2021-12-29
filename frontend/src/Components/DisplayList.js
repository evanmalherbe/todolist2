import React from "react";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import bootstrap component
import Button from "react-bootstrap/Button";

// Import custom stylesheet
import "../App.css";

// Function to display list of items for the currently logged in user
function DisplayList(props) {
  // Make variables easier to deal with - shorter names
  let data = props.listItems;
  let idData = props.idArray;
  let userData = props.userArray;

  /* Learned to create a new array by splitting an existing array on every comma - consulted this site:
  https://stackoverflow.com/questions/2858121/how-can-i-convert-a-comma-separated-string-to-an-array */

  let arrayData = data.split(",");
  let arrayId = idData.split(",");
  let arrayUser = userData.split(",");

  let displayItems = [];

  // ---------------------------------------------- //

  /* For loop to populate an array with divs for each list item - includes "delete" button for each item. Delete button passes id of list item along to handler function so it can delete the correct item from the
   db */
  for (let i = 0; i <= arrayData.length - 1; i++) {
    if (arrayUser[i] === props.currentUser) {
      displayItems.push(
        <div className="listItemDiv" key={i}>
          {arrayData[i]}{" "}
          <Button
            variant="danger"
            onClick={() => props.handleDeleteItem(arrayId[i])}
          >
            X
          </Button>
        </div>
      );
    }
  }

  // Display message if user has no list items stored yet
  if (displayItems.length === 0) {
    displayItems.push(<div className="redDiv">No items saved yet.</div>);
  }

  return (
    <div className="list">
      <p className="bold">List items</p>
      {displayItems}
    </div>
  );
}

// Export component
export default DisplayList;
