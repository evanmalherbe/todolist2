// Import mongoose
const mongoose = require("mongoose");

// Create schema for database entries (each document in db represents a car)
let loginSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  loggedin: {
    type: Boolean,
    required: true,
  },
});

// module.exports makes the model available outside of your module
module.exports = mongoose.model("logins", loginSchema);