module.exports = function (app) {
  const login = require("../controllers/login.controller.js");
  app.post("/updateLogin", login.updateByUser);
};
