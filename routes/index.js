var express = require('express');
var parse = require('../database');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (parse.User.current()) {
    res.render('index/index', { title: 'VolunteerHUB', user: parse.User.current().toJSON() });
  } else {
    res.render('index/index', { title: 'VolunteerHUB', user: null });
  }
});

router.get('/about', function(req, res, next) {
  if (parse.User.current()) {
    res.render('index/about', { title: 'About | VolunteerHUB', user: parse.User.current().toJSON() });
  } else {
    res.render('index/about', { title: 'About | VolunteerHUB', user: null });
  }
});

router.get('/login', function(req, res, next) {
  if (parse.User.current()) {
    // TODO: Send header data to show that the user is already logged in.
    res.append('Message', 'LOGGED_IN').redirect('/user/' + parse.User.current().getUsername());
  } else {
    res.render('index/login', { title: 'Login | VolunteerHUB', message: req.get('Message') });
  }
});

router.post('/login', function(req, res, next) {
  parse.User.logIn(req.body.username, req.body.password, {
    success: function(user) {
      res.append('Message', 'JUST_LOGGED_IN').redirect('/user/' + user.getUsername());
    },
    error: function(user, error) {
      res.append('Message', error).redirect('/login');
    }
  });
});

router.get('/register', function(req, res, next) {
  if (parse.User.current()) {
    // TODO: Send header data to show that the user is already logged in.
    res.append('Message', 'LOGGED_IN').redirect('/user/' + parse.User.current().getUsername());
  } else {
    res.render('index/register', { title: 'Register | VolunteerHUB', message: req.get('Message') });
  }
});

router.post('/register', function(req, res, next) {
  parse.User.signUp(req.body.username, req.body.password, {
    email: req.body.email
  }, {
    success: function(user) {
      res.append('Message', 'NEW_USER').redirect('/user/' + user.getUsername());
    },
    error: function(user, error) {
      res.append('Message', error).redirect('/register');
    }
  });
});

module.exports = router;
