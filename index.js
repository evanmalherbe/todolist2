// Import required depedencies
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Use bodyparser to send data in body of http request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.resolve(__dirname, "frontend/build")));

// Set path to .env file
dotenv.config({ path: ".env" });

//Import routes
require("./routes/display.js")(app);
require("./routes/add.js")(app);
require("./routes/delete.js")(app);
require("./routes/login.js")(app);
require("./routes/getLogins.js")(app);
require("./routes/register.js")(app);
require("./routes/resource.js")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Auth details for connecting to db
const username = "evanmalherbe";

/* Get password from .env file. Needed to consult the following website to get it to work: 
https://stackoverflow.com/questions/65896414/how-can-i-use-environmental-variable-for-database-password-in-nodejs */
const password = process.env.PASSWORD;
const cluster = "cluster0.xrjxb";
const dbname = "lists";

mongoose.Promise = global.Promise;

/* This website was very useful in getting the connection and error handling commands right:
https://mongoosejs.com/docs/connections.html */

// Initial connection to db and error handling if initial connection fails
mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
  )
  .catch((error) =>
    console.log("Failed initial connection to db. Error is: " + error)
  );

// Message if success in connecting to db
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// Error handling if connection to db fails after an initially successful connection
mongoose.connection.on("error", (error) => {
  if (error) {
    console.log("An error occurred after initial connection to db: " + error);
  } else {
    console.log("Connection Established");
  }
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
});

// Set port number
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
