import React from "react";

// Import custom stylesheet
import "./App.css";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import ListForm from "./Components/ListForm";
import Header from "./Components/Header";
import DisplayList from "./Components/DisplayList";

// Display to do list
class App extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state. Includes array to store to do list.
    this.state = {
      username: "",
      password: "",
      token: "",
      isLoaded: false,
      items: [],
      item: "",
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.handleListItem = this.handleListItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);

    this.reloadList = this.reloadList.bind(this);
  }

  handleListItem(event) {
    this.setState(
      {
        item: event.target.value,
      },
      () => console.log("New list item saved: " + this.state.item)
    );
  }

  handleUsername(event) {
    this.setState(
      {
        username: event.target.value,
      },
      () => console.log("Username saved: " + this.state.username)
    );
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleLogin(event) {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send new url in body of request
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              isLoaded: false,
              token: result.message,
            },
            () => {
              console.log("Login details sent via post. " + result.message);
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );
    // End of handleaddcar function
  }

  handleAddItem() {
    fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send new url in body of request
      body: JSON.stringify({
        item: this.state.item,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              isLoaded: false,
            },
            () => {
              console.log(
                "Post request to add list item sent. " + result.message
              );
              this.reloadList();
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );
  }

  // Reload list of items
  reloadList() {
    if (this.state.isLoaded === false) {
      console.log("Reload list has run.");

      fetch("/getList")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.message,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );

      // End of if statement to check if list of items has been loaded yet.
    }
  }

  componentDidMount() {
    if (this.state.isLoaded === false) {
      fetch("/getList")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.message,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );

      // End of if statement to check if list of cars has been loaded yet.
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="app">
          <Header
            handleLogin={this.handleLogin}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
          />

          {/* Call List component to display to do list */}

          <div className="row">
            <ListForm
              handleAddItem={this.handleAddItem}
              handleListItem={this.handleListItem}
            />
            <DisplayList listItems={items} />
          </div>
        </div>
      );

      // End of if statement
    }
  }
}

// Export component so it can be used by index.js
export default App;
