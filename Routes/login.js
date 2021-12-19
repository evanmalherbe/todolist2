module.exports = function (app) {
  const jwt = require("jsonwebtoken");

  app.post("/login", (req, res) => {
    const usr = req.body.username;
    const pwd = req.body.password;
    if (usr === "evan" && pwd === "jinnscir") {
      payload = {
        name: usr,
        admin: true,
      };

      const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
        algorithm: "HS256",
      });

      res.send({ message: token });
    } else {
      res.status(403).send({ message: "Incorrect login!" });
    }
  });
};
