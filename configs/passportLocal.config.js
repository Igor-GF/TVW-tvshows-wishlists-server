const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},(email, password, next) => {
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false,
        { message: "Incorrect email! Please try again."});
        return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: "Incorrect password! Please try again!"});
      return;
    } 
    next(null, foundUser);
  });
});

module.exports = localStrategy;