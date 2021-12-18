import React from "react";

// Import Bootstrap components
import { Form, FormControl, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

/* Create class component*/
function ListForm(props) {
  // // Function to store list item to be added in state
  // handleAddChange(event) {
  //   this.setState({
  //     addItem: event.target.value,
  //   });
  // }

  // // Function to store list item to be deleted in state
  // handleDeleteChange(event) {
  //   this.setState({
  //     deleteItem: event.target.value,
  //   });
  // }

  // // Function to add list item to array
  // addListItem(event) {
  //   // Checks that input field is not empty
  //   if (this.state.addItem !== "") {
  //     // Adds item to array
  //     this.state.listArray.push(this.state.addItem);

  //     /* Resets state so that it updates to do list immediately. I learned to do this here:
  //           https://www.pluralsight.com/guides/add-data-into-an-array-in-a-state-object
  //           https://pretagteam.com/question/react-setstate-not-updating-state-value */
  //     this.setState({ listArray: this.state.listArray });
  //   }
  // }

  // // Function to delete list item from array
  // deleteListItem(event) {
  //   // Check that input field is not empty
  //   if (this.state.deleteItem !== "") {
  //     // Iterate through array
  //     for (let i = 0; i <= this.state.listArray.length - 1; i++) {
  //       // If item to be deleted matches an item in the array, then continue
  //       if (this.state.listArray[i] === this.state.deleteItem) {
  //         // Remove array item from position "i"
  //         this.state.listArray.splice(i, 1);

  //         /* Resets state so that it updates to do list immediately. I learned to do this here:
  //                    https://www.pluralsight.com/guides/add-data-into-an-array-in-a-state-object
  //                    https://pretagteam.com/question/react-setstate-not-updating-state-value */
  //         this.setState({ listArray: this.state.listArray });
  //         // Create alert to tell user the item has been deleted.
  //         alert("List item '" + this.state.deleteItem + "' deleted.");
  //       }
  //     }
  //   }
  // }

  // Render page elements

  return (
    <div className="form">
      {/* Create form for adding or deleting items.Includes onChange and onClick events to handle user 
                input. Styled with React Bootstrap. Learned how to use forms here:
                https://react-bootstrap.netlify.app/components/forms/ */}

      <p className="bold">Add or delete an item from your list</p>
      <Form>
        <div className="form-group">
          <FormLabel> Add Item: </FormLabel>
          <FormControl
            type="text"
            className="addItemInput"
            name="toAdd"
            placeholder="..."
            onChange={props.handleListItem}
          />{" "}
          <Button variant="primary" onClick={props.handleAddItem}>
            Add item
          </Button>
        </div>

        <div className="form-group">
          <FormLabel> Delete Item: </FormLabel>
          <FormControl
            type="text"
            className="deleteItemInput"
            name="toDelete"
            placeholder="..."
            onChange={props.handleDeleteChange}
          />

          <Button variant="primary" onClick={props.deleteListItem}>
            Delete item
          </Button>
        </div>
      </Form>

      {/* End of "form" container */}
    </div>

    // End of return()
  );
}

// Export component so it can be used by App.js
export default ListForm;
