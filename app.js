require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const passport = require("passport");
const localStrategy = require("./configs/passportLocal.config");

require("./configs/db.configs");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require("./configs/session.config")(app);

app.use(passport.initialize());
app.use(passport.session());
require("./configs/serialize.config");
passport.use(localStrategy);

app.locals.title = 'TV Shows Wishlists';

require("./configs/cors.config")(app);

app.use('/', require("./routes/index"));
app.use('/', require("./routes/auth.routes"));
app.use('/', require("./routes/user.routes"));
app.use('/', require("./routes/wishList.routes"));
app.use('/', require("./routes/tvshow.routes"));
app.use('/', require("./routes/upload.route"));

module.exports = app;