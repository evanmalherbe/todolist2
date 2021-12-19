/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */

// Import list model file
const List = require("../models/list.model.js");

// Add new list item to collection
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

// Find all list items in collection and display (do not display _id and __v )
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

// Delete list item
exports.deleteListItem = function (req, res) {
  List.findOneAndRemove({ item: req.body.item }, function (err) {
    if (err) {
      console.log("ERROR: Item NOT removed. " + err);
      res.send({ message: "ERROR: Item NOT removed. " + err });
    }
    res.send({ message: "List item removed." });
  });
};
