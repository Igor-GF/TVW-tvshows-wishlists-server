const { Router } = require("express");
const authRoutes = Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/User.model");
const saltRounds = 10;

authRoutes.post("/signup", (req, res, next) => {
  const { username, email, password, photoUrl } = req.body;

  if (!email || !username || !password) {
    res.status(400).json({ message: "Username, email, and password are required"})
    return;
  }

  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!emailRegexp.test(email)) {
    res.status(500).json({ 
      errorMessage: "Email format is not valid, please, try again."
    });
    return;
  }

  if (!regex.test(password)) {
    res.status(500).json({ 
      errorMessage: "Password needs to have at least 6 characters, and at least 1 lowercase letter, 1 uppercase letter, and 1 number"
    });
    return;
  }

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({ username, email, password: hashedPassword, photoUrl, watchedShows: [], wishLists: [] })
    .then((userFromDB) => {
      res.status(200).json(userFromDB);
    })
    .catch((error) => {
        if (error.code === 11000) {
          res.status(500).json({ 
            errorMessage: "Username or email already used, and both need to be unique."
          });
        } else {
          next(error);
        }
      });
    });
})

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ errorMessage: "Something went wrong when authenticating user"});
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong with the session"});
      return;
      }

      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.get("/loggedin", (req, res) => {
  
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({message: "Unauthorized"});
});

authRoutes.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out success!"})
});

module.exports = authRoutes;