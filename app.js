require('dotenv').config();

const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");

require("./configs/db.configs");
require("./configs/passport.config");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require("./configs/session.config")(app);

app.use(passport.initialize());
app.use(passport.session());

require("./configs/cors.config")(app);

app.use('/', require("./routes/auth.routes"));
app.use('/', require("./routes/user.routes"));
app.use('/', require("./routes/wishList.routes"));
app.use('/', require("./routes/tvshow.routes"));
app.use('/', require("./routes/upload.route"));

if (process.env.NODE_ENV === "production") {
  // set ability to get static values from client build folder
  // static files include all javascript and css files
  app.use(express.static("client/build"));

  // get the index.html that will be rendered on the browser
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../client", "build", "index.html"));
  });
}

module.exports = app;