module.exports = function (app) {
  const logins = require("../controllers/login.controller.js");
  app.get("/getLogins", logins.findAll);
};
