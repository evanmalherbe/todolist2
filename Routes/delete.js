module.exports = function (app) {
  const list = require("../controllers/list.controller.js");
  app.post("/delete", list.deleteListItem);
};
