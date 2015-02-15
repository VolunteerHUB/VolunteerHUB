var express = require('express');
var parse = require('../database');

var User = require('../models/user');
var Participant = require('../models/participant');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = new parse.Query(User);
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      // TODO: Iterate over each result and add it to the `users` array.

      res.render('users/index', { title: 'User List', data: user });
    },
    error: function(error) {
      // TODO: Print the error to the console and show the 500 error page.

      res.render('index/error', { error: error });
    }
  });
});

/* GET single user. */
router.get('/:username', function(req, res, next) {
  var query = new parse.Query(User);
  query.equalTo("objectId", req.params.username);

  query.first({
    success: function(result) {
      var user = result.toJSON();

      res.render('users/detail', { title: user.display_name, user: user });
    },
    error: function(error) {
      // TODO: Parse the error and show the 500 or 404 error page.

      res.render('index/error', { error: error });
    }
  });
});

/* GET single user's participating. */
router.get('/:username/participating', function(req, res, next) {
  var query = new parse.Query(Participant);
  query.equalTo("username", req.params.participating);

  query.find({
    success: function(results) {
      // TODO: Iterate over each result and add it to the `projects` array.

      res.render('users/participating', { title: 'Participating List', data: projects });
    },
    error: function(error) {
      // TODO: Parse the error and show the 500 error page.

      res.render('index/error', { error: error });
    }
  });
});

/* GET single user's hosting. */
router.get('/:username/hosting', function(req, res, next) {
  var query = new parse.Query(Projects);
  query.equalTo("username", req.params.username);
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      // TODO: Iterate over each result and add it to the `projects` array.

      res.render('users/hosting', { title: 'Hosting List', data: projects });
    },
    error: function(error) {
      // TODO: Parse the error and show the 500 error page.

      res.render('index/error', { error: error });
    }
  });
});

module.exports = router;
