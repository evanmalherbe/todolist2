// Import login model file
const Login = require("../models/logins.model.js");

// Add new user to collection
exports.create = function (req, res) {
  let loginModel = new Login({
    username: req.body.username,
    loggedin: req.body.loggedin,
  });

  // Save new login to collection
  loginModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while adding login info." });
    } else {
      console.log(data);
      res.send({ message: "Login info has been added" });
    }
  });
};

// Find all list items in collection and display (do not display _id and __v )
exports.findOne = function (req, res) {
  Login.find(
    { username: req.body.username },
    "-_id -username -__v",
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Some error occurred while retrieving login status.",
        });
      } else {
        let status = [];

        result.forEach(function (res) {
          status.push(res.loggedin);
        });

        res.json({ message: `${status}` });
      }
    }
  );
};

// Update an existing user document chosen by username
exports.updateByUser = function (req, res) {
  // Name of user who's info we want to update
  let query = { username: req.body.username };

  // Update user with new info
  Login.findOneAndUpdate(
    query,
    // Fields to update from form input
    {
      loggedin: req.body.loggedin,
    },
    { new: true },
    function (err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
        res.send({ message: "ERROR: Not Updated. " + err });
      }
      res.send({ message: "Updated!" });
    }
  );
};
