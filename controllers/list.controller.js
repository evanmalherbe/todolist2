/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */

// Import car model file
const List = require("../models/list.model.js");

// Add new car to collection
exports.create = function (req, res) {
  // Get form info from req.body and add to new Car model
  let listModel = new List({
    item: req.body.item,
  });

  // Save new car to collection
  listModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while adding list item." });
    } else {
      console.log(data);
      res.send({ message: "The item has been added" });
    }
  });
};

// Find all list items in collection and display (do not display id and __v )
exports.findAll = function (req, res) {
  List.find({}, "-_id -__v", function (err, list) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving list." });
    } else {
      res.json({ message: `${list}` });
    }
  });
};

// Update an existing car document chosen by owner name
exports.updateByOwner = function (req, res) {
  // Name of owner who's car we want to update
  let query = { owner: req.body.ownerName };

  // Update car with new info
  Car.findOneAndUpdate(
    query,
    // Fields to update from form input
    {
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      colour: req.body.colour,
      registration: req.body.regNum,
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

// Update more than one car document. Learned to do this here:
// https://stackoverflow.com/questions/1740023/mongodb-how-to-update-multiple-documents-with-a-single-command
exports.updateMany = function (req, res) {
  // Name of owner who's car we want to update
  let query = { owner: req.body.ownerName };

  // Update cars with new info
  Car.updateMany(query, { colour: req.body.colour }, function (err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
      res.send({ message: "ERROR: Not Updated. " + err });
    }
    res.send({ message: "Updated!" });
  });
};

// Delete car identified by owner name
exports.deleteListItem = function (req, res) {
  // Substitute owner name below with variable later
  Car.findOneAndRemove({ item: req.body.item }, function (err) {
    if (err) {
      console.log("ERROR: Item NOT removed. " + err);
      res.send({ message: "ERROR: Item NOT removed. " + err });
    }
    res.send({ message: "List item removed." });
  });
};
