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
    res.redirect('/user/' + parse.User.current().getUsername());
  } else {
    res.render('index/login', { title: 'Login | VolunteerHUB' });
  }
});

router.post('/login', function(req, res, next) {
  parse.User.logIn(req.body.username, req.body.password, {
    success: function(user) {
      // TODO: Set header message to welcome user.
      res.redirect('/user/' + user.getUsername());
    },
    error: function(user, error) {
      // TODO: Set header message to warn user about incorrect login.
      res.redirect('/login');
    }
  });
});

router.get('/register', function(req, res, next) {
  if (parse.User.current()) {
    // TODO: Set header message to show that the user is already logged in.
    res.redirect('/user/' + parse.User.current().getUsername());
  } else {
    res.render('index/register', { title: 'Register | VolunteerHUB' });
  }
});

router.post('/register', function(req, res, next) {
  parse.User.signUp(req.body.username, req.body.password, {
    email: req.body.email
  }, {
    success: function(user) {
      // TODO: Set header message to show that the user is already logged in.
      res.redirect('/user/' + user.getUsername());
    },
    error: function(user, error) {
      // TODO: Set header message to warn user about incorrect registration.
      res.redirect('/register');
    }
  });
});

module.exports = router;
