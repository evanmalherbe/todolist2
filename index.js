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

app.use(express.static(path.join(__dirname, "public")));

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

/* Get password from .env file. Needed to consult the following website to get it to work: 
https://stackoverflow.com/questions/65896414/how-can-i-use-environmental-variable-for-database-password-in-nodejs */
let pword = process.env.PASSWORD;
let collection = "lists";

//Uri for connecting to database from MongoDB Atlas>Connect
const uri = `mongodb+srv://evanmalherbe:${pword}@cluster0.xrjxb.mongodb.net/${collection}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;

/* Really struggled to connect to the database initially, until I read this website:
   https://mongoosejs.com/docs/connections.html
   and figured out that the "useMongoClient: true" option was causing it not to connect, as it is "not supported". Removed the option and now it works. */
mongoose.connect(uri);

// Message if could not connect to db
mongoose.connection.on("error", function () {
  console.log("Connection to Mongo established.");
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

// Message if success in connecting to db
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// Set port number
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
