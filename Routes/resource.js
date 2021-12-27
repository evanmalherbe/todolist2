module.exports = function (app) {
  const jwt = require("jsonwebtoken");

  app.get("/resource", (req, res) => {
    const auth = req.headers["authorization"];
    const token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "jwt-secret");
      res.send({
        message: `${decoded.name}`,
      });
    } catch (err) {
      res.status(401).send({ message: "Invalid token" });
    }
  });
};
