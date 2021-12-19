import React from "react";

// Import Bootstrap components
import { Form, FormControl, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

/* Create class component*/
function ListForm(props) {
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
            onChange={props.handleItemToAdd}
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
            onChange={props.handleItemToDelete}
          />

          <Button variant="primary" onClick={props.handleDeleteItem}>
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
