import React from "react";

// Import custom stylesheet
import "./App.css";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import ListForm from "./Components/ListForm";
import Header from "./Components/Header";
import DisplayList from "./Components/DisplayList";

// App component Display to do list
class App extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables. Includes array to store to do list.
    this.state = {
      username: "",
      password: "",
      token: "",
      isLoaded: false,
      items: [],
      item: "",
      itemToDelete: "",
      loggedIn: "",
      message: "",
      error: null,
    };

    // Binding to make "this" work correctly
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    //this.updateLoginStatus = this.updateLoginStatus.bind(this);
    //this.fetchLoginStatus = this.fetchLoginStatus.bind(this);

    this.handleItemToDelete = this.handleItemToDelete.bind(this);
    this.handleItemToAdd = this.handleItemToAdd.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);

    //this.loadList = this.loadList.bind(this);
    this.reloadList = this.reloadList.bind(this);
  }

  // Function to log user out when they click "logout" button in header
  handleLogout(event) {
    this.setState({ loggedIn: false }, () => {
      console.log("User, " + this.state.username + ", logged out.");
      sessionStorage.setItem("loggedIn", false);
    });
  }

  // Functions to save list item user wants to delete or add to state variable
  handleItemToDelete(event) {
    this.setState(
      {
        itemToDelete: event.target.value,
      },
      () => console.log("Item to delete saved: " + this.state.itemToDelete)
    );
  }

  handleItemToAdd(event) {
    this.setState(
      {
        item: event.target.value,
      },
      () => console.log("New list item saved: " + this.state.item)
    );
  }

  // Functions to save username and password to state when user types them in to login form in header
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

  // --------------------------------------------------------- //

  // // Update database with current login status (logged in or logged out - boolean)
  // updateLoginStatus(username, loginStatus) {
  //   sessionStorage.setItem("loggedIn", loginStatus);
  //   //sessionStorage.setItem("currentUser", username);

  //   //let loggedInState = sessionStorage.getItem("loggedIn");

  //   this.setState(
  //     {
  //       isLoaded: false,
  //     },
  //     () => {
  //       console.log("Login status is: " + sessionStorage.getItem("loggedIn"));
  //       this.reloadList();
  //     }
  //   );

  //   // End of updateLoginStatus function
  // }

  /* Takes token created in "handleLogin" function and authenticates user */
  handleAuth(token) {
    fetch("/resource", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              message: result.message,
              isLoaded: false,
              loggedIn: true,
            },
            () => {
              console.log("handleAuth run. Welcome, " + this.state.message);
              sessionStorage.setItem("loggedIn", true);
              this.reloadList();
            }
          );
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
    // End of handleauth function
  }

  // Take user login details and create JWT token, then call "handleAuth" function to authenticate user
  handleLogin(event) {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

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
              token: result.message,
            },
            () => {
              console.log(
                "Login details sent via post. Token is " + result.message
              );
              this.handleAuth(this.state.token);
            }
          );
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
    // End of handlelogin function
  }

  // Handler function to delete list item from database when user submits form
  handleDeleteItem() {
    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: this.state.itemToDelete,
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
                "Post request to delete list item sent. " + result.message
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

  // Handler function to add list item to database when user submits form
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

  // Function to reload list of items from database after a change (delete or update)
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

  // // Function to fetch list items from database and save them to state variable
  // loadList() {
  //   if (this.state.isLoaded === false) {
  //     console.log("Load list has run.");

  //     fetch("/getList")
  //       .then((res) => res.json())
  //       .then(
  //         (result) => {
  //           this.setState({
  //             isLoaded: true,
  //             items: result.message,
  //           });
  //         },
  //         (error) => {
  //           this.setState({
  //             isLoaded: true,
  //             error,
  //           });
  //         }
  //       );

  //     // End of if statement to check if list has been loaded yet.
  //   }
  // }

  // // Function to fetch login status from database (user logged in or not - boolean)
  // fetchLoginStatus() {
  //   fetch("/loginStatus", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: "evan",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         this.setState(
  //           {
  //             loggedIn: result.message,
  //             isLoaded: false,
  //           },
  //           () => {
  //             console.log(
  //               "Post request to retrieve login status sent. Login status is: " +
  //                 result.message
  //             );
  //             this.loadList();
  //           }
  //         );
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: false,
  //           error,
  //         });
  //       }
  //     );

  //   // End of fetch login status function
  // }

  componentDidMount() {
    if (this.state.isLoaded === false) {
      console.log("componentDidMount - Load list has run.");

      fetch("/getList")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: true,
                items: result.message,
              },
              () => {
                if (sessionStorage.getItem("loggedIn") === undefined) {
                  sessionStorage.setItem("loggedIn", false);
                  console.log("Session storage - login status set to false");
                }
              }
            );
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );

      // End of if statement to check if list has been loaded yet.
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (
      sessionStorage.getItem("loggedIn") === false ||
      this.state.loggedIn === "" ||
      this.state.loggedIn === false
    ) {
      return (
        <div className="app">
          <Header
            handleLogin={this.handleLogin}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
            loggedIn={this.state.loggedIn}
            handleLogout={this.handleLogout}
          />
          <div className="row">
            <h2 className="redHeading">Please log in</h2>
          </div>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Header
            handleLogin={this.handleLogin}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
            loggedIn={this.state.loggedIn}
            handleLogout={this.handleLogout}
          />
          <div className="row">
            <ListForm
              handleAddItem={this.handleAddItem}
              handleItemToAdd={this.handleItemToAdd}
              handleDeleteItem={this.handleDeleteItem}
              handleItemToDelete={this.handleItemToDelete}
              loggedIn={this.state.loggedIn}
            />
            <DisplayList listItems={items} loggedIn={this.state.loggedIn} />
          </div>
        </div>
      );

      // End of if statement
    }
  }
}

// Export component so it can be used by index.js
export default App;
