const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const db = require("./auth-model");
const middleware = require("./auth-middleware");
const { signToken } = require("./auth-helpers");

router.post("/register", middleware.validateUser, (req, res) => {
  // implement registration

  const creds = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 10;

  const hash = bcryptjs.hashSync(creds.password, rounds);
  creds.password = hash;

  db.insert(creds)
    .then((user) => {
      res.status(201).json({ data: user });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/login",middleware.validateUser, (req, res) => {
  // implement login
  const { username, password } = req.body;
  db.getBy({ username: username })
    .then(([user]) => {
      if(user && bcryptjs.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({ message: `Welcome ${user.username}, here is your token`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials " });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, error: "From line 40 auth-router"});
    });
});

module.exports = router;
