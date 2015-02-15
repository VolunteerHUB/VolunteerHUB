var express = require('express');
var parse = require('../database');

var Project = require('../models/project');
var Participant = require('../models/participant');

var router = express.Router();

/* GET projects listing. */
router.get('/', function(req, res, next) {
  var query = new parse.Query(Project);
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      var projects = Array();

      for (var i = 0; i < results.length; i++) {
        projects[i] = results[i].toJSON();
      }

      res.render('projects/index', { title: 'Project List', data: projects });
    },
    error: function(error) {
      // TODO: Print the error to the console and show the 500 error page.

      res.render('index/error', { error: error });
    }
  });
});

/* GET single project. */
router.get('/:project_id', function(req, res, next) {
  var query = new parse.Query(Project);
  query.equalTo("objectId", req.params.project_id);

  query.first({
    success: function(result) {
      var project = result.toJSON();

      res.render('projects/detail', { title: project.name, project: project });
    },
    error: function(error) {
      // TODO: Parse the error and show the 500 or 404 page.

      res.render('index/error', { error: error });
    }
  });
});

/* GET single project's participants. */
router.get('/:project_id/participants', function(req, res, next) {
  var query = new parse.Query(Participant);
  query.equalTo("project_id", req.params.project_id);
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      var participants = Array();

      for (var i = 0; i < results.length; i++) {
        participants[i] = results[i].toJSON();
      }

      res.render('projects/participants', { title: 'Participant List', data: participants });
    },
    error: function(error) {
      // TODO: Parse the error and show the 500 error page.

      res.render('index/error', { error: error });
    }
  });
});

module.exports = router;
