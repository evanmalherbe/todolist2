module.exports = function (app) {
  const list = require("../controllers/list.controller.js");
  app.get("/getList", list.findAll);
};
