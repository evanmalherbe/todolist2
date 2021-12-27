module.exports = function (app) {
  const jwt = require("jsonwebtoken");

  app.post("/login", (req, res) => {
    const usr = req.body.username;
    const pwd = req.body.password;
    const users = req.body.users;
    const pwords = req.body.pwords;

    let usersArray = users.split(",");
    let pwordsArray = pwords.split(",");

    for (let i = 0; i <= usersArray.length - 1; i++) {
      if (usr === usersArray[i] && pwd === pwordsArray[i]) {
        payload = {
          name: usr,
          admin: true,
        };

        const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
          algorithm: "HS256",
        });

        return res.send({ message: token });
      }
    }

    // If none of the stored logins match what the user enters, say "incorrect login".
    res.status(403).send({ message: "Incorrect login!" });

    // if (usr === "evan" && pwd === "jinnscir") {
    //   payload = {
    //     name: usr,
    //     admin: true,
    //   };

    //   const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
    //     algorithm: "HS256",
    //   });

    //   res.send({ message: token });
    // } else {
    //   res.status(403).send({ message: "Incorrect login!" });
    // }
  });
};
