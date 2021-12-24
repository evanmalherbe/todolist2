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

exports.findAll = function (req, res) {
  List.find({}, function (err, list) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving list." });
    } else {
      let listItems = [];
      let listIdArray = [];

      list.forEach(function (result) {
        listItems.push(result.item);
      });

      list.forEach(function (result) {
        listIdArray.push(result._id);
      });

      res.json({ message: `${listItems}`, id: `${listIdArray}` });
    }
  });
};

// Delete list item
exports.deleteListItem = function (req, res) {
  //let theId = `ObjectId("${req.body.id}")`;

  List.findOneAndRemove({ _id: req.body.id }, function (err) {
    if (err) {
      console.log("ERROR: Item NOT removed. " + err);
      res.send({ message: "ERROR: Item NOT removed. " + err });
    }
    res.send({ message: "List item removed." });
  });
};
