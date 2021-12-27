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
      username: null,
      password: null,
      currentUser: null,
      users: [],
      pwords: [],
      token: "",
      isLoaded: false,
      items: [],
      idArray: [],
      userArray: [],
      item: null,
      itemToDelete: "",
      loggedIn: false,
      message: "",
      error: null,
    };

    // Binding to make "this" work correctly
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    //this.updateLoginStatus = this.updateLoginStatus.bind(this);
    //this.fetchLoginStatus = this.fetchLoginStatus.bind(this);

    this.handleItemToAdd = this.handleItemToAdd.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);

    //this.loadList = this.loadList.bind(this);
    this.reloadList = this.reloadList.bind(this);
  }

  // Function to log user out when they click "logout" button in header
  handleLogout(event) {
    this.setState(
      {
        loggedIn: false,
        isLoaded: false,
        username: null,
        password: null,
        item: null,
      },
      () => {
        console.log("User logged out.");
        sessionStorage.setItem("loggedIn", false);
        sessionStorage.setItem("currentUser", null);
        this.reloadList();
      }
    );
  }

  // Add/save list item to state
  handleItemToAdd(event) {
    let value = event.target.value;

    /* Learned to trim spaces from a string here:
    https://www.w3schools.com/jsref/jsref_trim_string.asp */
    let trimmedItem = value.trim();
    this.setState({
      item: trimmedItem,
    });
  }

  // Functions to save username and password to state when user types them in to login form in header
  handleUsername(event) {
    let value = event.target.value;
    let user = value.trim();
    this.setState(
      {
        username: user,
      },
      () => {
        console.log("Username saved: " + this.state.username);
      }
    );
  }

  handlePassword(event) {
    let value = event.target.value;
    let pwd = value.trim();
    this.setState({
      password: pwd,
    });
  }

  // --------------------------------------------------------- //

  /* Takes token created in "handleLogin" function and authenticates user */
  handleAuth(token) {
    if (token !== "Incorrect login!") {
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
                currentUser: result.message,
                username: null,
                password: null,
              },
              () => {
                console.log(
                  "handleAuth has run. Welcome, " + this.state.currentUser
                );
                sessionStorage.setItem("loggedIn", true);
                sessionStorage.setItem("currentUser", this.state.currentUser);
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
    } else {
      /* Learned to clear/reset form here:
      https://stackoverflow.com/questions/3786694/how-to-reset-clear-form-through-javascript */
      document.forms["loginForm"].reset();
      alert("Incorrect login details. Please try again.");
      console.log("Invalid token. Not logged in.");
      this.reloadList();
    }
    // End of handleauth function
  }

  // Take user login details and create JWT token, then call "handleAuth" function to authenticate user
  handleLogin(event) {
    if (this.state.username !== null && this.state.password !== null) {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          users: this.state.users,
          pwords: this.state.pwords,
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
      // End of if statement to check that username and password fields are not empty
    } else {
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Username and password fields blank.");
          alert(
            "Please enter your username and password, then click 'Login' again."
          );
          this.reloadList();
        }
      );
    }
    // End of handlelogin function
  }

  // Take user login details and create JWT token, then call "handleAuth" function to authenticate user
  handleRegister(event) {
    if (this.state.username !== null && this.state.password !== null) {
      fetch("/register", {
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
                isLoaded: false,
              },
              () => {
                console.log("Registration details sent via post.");
                alert(
                  "New user, " +
                    this.state.username +
                    ", registered. Please log in."
                );
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
      // End of if statement to check that state variables "username" and "password" are not null
    } else {
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Username and password fields blank.");
          alert(
            "Please enter your new username and password, then click 'Register' again."
          );
          this.reloadList();
        }
      );
    }
    // End of handleregister function
  }

  // Handler function to delete list item from database when user submits form
  handleDeleteItem(itemId) {
    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: itemId,
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
    // End of handledeleteitem function
  }

  // Handler function to add list item to database when user submits form
  handleAddItem() {
    if (this.state.item !== null) {
      fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: this.state.currentUser,
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
      // End of if statement to check that user has not submitted empty form field
    } else {
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          alert(
            "Form is blank. Please type in a list item to save, then click 'Add item' again."
          );
          this.reloadList();
        }
      );
    }
    // End of handleadditem function
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
              idArray: result.id,
              userArray: result.user,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );

      // Retrieve usernames and passwords from database
      fetch("/getLogins")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                users: result.users,
                pwords: result.pwords,
              },
              () => {
                console.log("Logins retrieved from db.");
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

      // End of if statement to check if list of items has been loaded yet.
    }
  }

  componentDidMount() {
    // If statement to check if data has been fetched already or not. Won't run twice.
    if (this.state.isLoaded === false) {
      console.log("componentDidMount - Load list has run.");

      // Retrieve list items from database
      fetch("/getList")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: true,
                items: result.message,
                idArray: result.id,
                userArray: result.user,
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

      // Retrieve usernames and passwords from database
      fetch("/getLogins")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                users: result.users,
                pwords: result.pwords,
              },
              () => {
                console.log("Logins retrieved from db.");
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
    const { error, isLoaded, items, loggedIn, username, idArray, userArray } =
      this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (
      sessionStorage.getItem("loggedIn") === false ||
      this.state.loggedIn === false
    ) {
      return (
        <div className="app">
          <Header
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
            loggedIn={loggedIn}
            handleLogout={this.handleLogout}
          />
          <div className="row">
            <h2 className="redHeading">Please log in</h2>
          </div>
        </div>
      );
    } else {
      let user;
      if (sessionStorage.getItem("currentUser") !== undefined) {
        user = sessionStorage.getItem("currentUser");
      } else {
        user = username;
      }
      return (
        <div className="app">
          <Header
            currentUser={user}
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
            loggedIn={loggedIn}
            handleLogout={this.handleLogout}
          />
          <div className="row">
            <ListForm
              handleAddItem={this.handleAddItem}
              handleItemToAdd={this.handleItemToAdd}
              handleDeleteItem={this.handleDeleteItem}
            />
            <DisplayList
              currentUser={user}
              listItems={items}
              idArray={idArray}
              userArray={userArray}
              handleDeleteItem={this.handleDeleteItem}
            />
          </div>
        </div>
      );

      // End of if statement
    }
  }
}

// Export component so it can be used by index.js
export default App;
