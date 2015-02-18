var express = require('express');
var parse = require('../database');

var router = express.Router();

router.get('/', function(req, res, next) {
  var query = new parse.Query(parse.User);
  query.descending('createdAt');
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      var user = Array();

      for (var i = 0; i < results.length; i++) {
        user[i] = results[i].toJSON();
      }

      res.render('users/index', { title: 'User List | VolunteerHUB', data: user });
    },
    error: function(error) {
      res.render('index/error', { error: error });
    }
  });
});

router.get('/:username', function(req, res, next) {
  var query = new parse.Query(parse.User);
  query.equalTo('username', req.params.username);

  query.first({
    success: function(result) {
      var user = result.toJSON();

      res.render('users/detail', { title: user.displayName + ' | VolunteerHUB', user: user });
    },
    error: function(error) {
      res.render('index/error', { error: error });
    }
  });
});

router.get('/:username/participating', function(req, res, next) {
  var query = new parse.Query(parse.User);
  query.equalTo('username', req.params.username);

  query.first({
    success: function(result) {
      relation = result.get('participating').query();
      relation.descending('createdAt');
      relation.limit(req.query.limit);
      relation.skip(req.query.offset);

      relation.find({
        success: function(results) {
          projects = Array();

          for (var i = 0; i < results.length; i++) {
            projects[i] = results[i].toJSON();
          }

          res.render('users/participating', { title: 'Participated Projects | VolunteerHUB', projects: projects });
        },
        error: function(error) {
          res.render('index/error', { error: error });
        }
      });
    },
    error: function(error) {
      res.render('index/error', { error: error });
    }
  });
});

router.get('/:username/hosting', function(req, res, next) {
  var query = new parse.Query(parse.User);
  query.equalTo('username', req.params.username);

  query.first({
    success: function(result) {
      relation = result.get('hosting').query();
      relation.descending('createdAt');
      relation.limit(req.query.limit);
      relation.skip(req.query.offset);

      relation.find({
        success: function(results) {
          projects = Array();

          for (var i = 0; i < results.length; i++) {
            projects[i] = results[i].toJSON();
          }

          res.render('users/hosting', { title: 'Hosted Projects | VolunteerHUB', projects: projects });
        },
        error: function(error) {
          res.render('index/error', { error: error });
        }
      });
    },
    error: function(error) {
      res.render('index/error', { error: error });
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
