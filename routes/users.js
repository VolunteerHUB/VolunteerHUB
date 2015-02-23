var express = require('express');
var parse = require('../database');

var router = express.Router();

router.get('/:username', function(req, res, next) {
  var query = new parse.Query(parse.User);
  query.equalTo('username', req.params.username);

  query.first({
    success: function(result) {
      var user = result.toJSON();

      res.render('users/detail', {
        title: user.displayName + ' | VolunteerHUB',
        data: user,
        user: req.cookies.user
      });
    },
    error: function(error) {
      res.render('index/error', {
        error: error,
        user: req.cookies.user
      });
    }
  });
});

router.get('/:username/participating', function(req, res, next) {
  var query = new parse.Query(parse.User);
  query.equalTo('username', req.params.username);

  query.first({
    success: function(result) {
      console.log(result.get('participating'));

      // TODO

      res.render('index/error', {
        error: new Error('NOT YET IMPLEMENTED'),
        user: req.cookies.user
      });
    },
    error: function(error) {
      res.render('index/error', {
        error: new Error(error),
        user: req.cookies.user
      });
    }
  });
});

router.get('/:username/hosting', function(req, res, next) {
  var query = new parse.Query(parse.User);
  query.equalTo('username', req.params.username);

  query.first({
    success: function(result) {
      console.log(result.get('participating'));

      // TODO

      res.render('index/error', {
        error: new Error('NOT YET IMPLEMENTED'),
        user: req.cookies.user
      });
    },
    error: function(error) {
      res.render('index/error', {
        error: new Error(error),
        user: req.cookies.user
      });
    }
  });
});

router.get('/:username/groups', function(req, res, next) {
  var query = new parse.Query(parse.User);
  query.equalTo('username', req.params.username);

  query.first({
    success: function(result) {
      console.log(result.get('groups'));

      // TODO

      res.render('index/error', {
        error: new Error('NOT YET IMPLEMENTED'),
        user: req.cookies.user
      });
    },
    error: function(error) {
      res.render('index/error', {
        error: new Error(error),
        user: req.cookies.user
      });
    }
  });
});

router.get('/:username/edit', function(req, res, next) {
  // TODO
});

router.post('/:username/edit', function(req, res, next) {
  // TODO
});

module.exports = router;
