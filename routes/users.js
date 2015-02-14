var express = require('express');

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
    }
  });
});

/* GET single user. */
router.get('/:username', function(req, res, next) {
  var query = new parse.Query(User);
  query.equalTo("username", req.params.username);

  query.first({
    success: function(results) {
      // TODO: Parse the result.

      res.render('users/detail', { title: user.display_name, data: user });
    },
    error: function(error) {
      // TODO: Parse the error and show the 500 or 404 error page.
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
    }
  });
});

module.exports = router;
