var express = require('express');
var parse = require('../database');

var User = require('../models/user');
var Project = require('../models/project');
var Participant = require('../models/participant');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = new parse.Query(User);
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      var user = Array();

      console.log(results);

      for (var i = 0; i < results.length; i++) {
        user[i] = results[i].toJSON();
      }

      res.render('users/index', { title: 'User List', data: user });
    },
    error: function(error) {
      res.render('index/error', { error: error });
    }
  });
});

/* GET single user. */
router.get('/:username', function(req, res, next) {
  var query = new parse.Query(User);
  query.equalTo("username", req.params.username);

  query.first({
    success: function(result) {
      var user = result.toJSON();

      res.render('users/detail', { title: user.displayName, user: user });
    },
    error: function(error) {
      res.render('index/error', { error: error });
    }
  });
});

/* GET single user's participating. */
router.get('/:username/participating', function(req, res, next) {
  var query = new parse.Query(Participant);
  query.equalTo("username", req.params.username);
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
        var projects = Array();

        for (var i = 0; i < results.length; i++) {
          projects[i] = results[i].toJSON();
          // var query2 = new parse.Query(Project);
          // query2.equalTo("objectId", results[i].get('project_id'));
          //
          // query2.first({
          //   success: function(result) {
          //     projects[i] = result.toJSON();
          //   },
          //   error: function(error) {
          //     res.render('index/error', { error: error });
          //   }
          // });
        }

        res.render('users/participating', { title: 'Participating List', data: projects });
    },
    error: function(error) {
      res.render('index/error', { error: error });
    }
  });
});

/* GET single user's hosting. */
router.get('/:username/hosting', function(req, res, next) {
  var query = new parse.Query(Project);
  query.equalTo("host_username", req.params.username);
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      var projects = Array();

      for (var i = 0; i < results.length; i++) {
        projects[i] = results[i].toJSON();
      }

      res.render('users/hosting', { title: 'Hosting List', data: projects });
    },
    error: function(error) {
      res.render('index/error', { error: error });
    }
  });
});

module.exports = router;
