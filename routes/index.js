var express = require('express');
var parse = require('../database');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index/index', {
    title: 'VolunteerHUB',
    user: req.cookies.user
  });
});

router.get('/about', function(req, res, next) {
  res.render('index/about', {
    title: 'About | VolunteerHUB',
    user: req.cookies.user
  });
});

router.get('/login', function(req, res, next) {
  if (req.cookies.user) {
    // TODO: Set message to show that the user is already logged in.
    // TODO: Add callback...
    res.redirect('/user/' + req.cookies.user.username);
  } else {
    res.render('index/login', {
      title: 'Login | VoluteerHUB'
    });
  }
});

router.post('/login', function(req, res, next) {
  parse.User.logIn(req.body.username, req.body.password, {
    success: function(user) {
      // TODO: Set welcome message.
      // TODO: Add callback...
      var usr = user.toJSON();
      res.cookie('user', {
        username: usr.username,
        displayName: usr.displayName
      });
      res.redirect('/user/' + usr.username);
    },
    error: function(user, error) {
      // TODO: Set header message to warn user about incorrect login.
      res.redirect('/login');
    }
  });
});

router.get('/logout', function(req, res, next) {
  parse.User.logOut();
  res.clearCookie('user');
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  if (req.cookies.user) {
    // TODO: Set message to show that the user is already logged in.
    res.redirect('/user/' + req.cookies.user.username);
  } else {
    res.render('index/register', {
      title: 'Register | VolunteerHUB'
    });
  }
});

router.post('/register', function(req, res, next) {
  parse.User.signUp(req.body.username, req.body.password, {
    email: req.body.email,
    displayName: req.body.username
  }, {
    success: function(user) {
      // TODO: Set header message to show that the user is already logged in.
      var usr = user.toJSON();
      res.cookie('user', {
        username: usr.username,
        displayName: usr.displayName
      });
      res.redirect('/user/' + user.getUsername());
    },
    error: function(user, error) {
      // TODO: Set header message to warn user about incorrect registration.
      res.redirect('/register');
    }
  });
});

module.exports = router;
