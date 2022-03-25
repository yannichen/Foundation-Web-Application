require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require(passport);

const app = express();

// enable sessions
const session = require('express-session');
const passport = require('passport');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);
