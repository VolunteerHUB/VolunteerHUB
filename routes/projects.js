var express = require('express');
var parse = require('../database');

var router = express.Router();

router.get('/', function(req, res, next) {
  // TODO: Add nearby search functionality.
  var query = new parse.Query('Project');
  query.descending('createdAt');
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      var projects = Array();

      for (var i = 0; i < results.length; i++) {
        projects[i] = results[i].toJSON();
      }

      res.render('projects/index', {
        title: 'Project Directory | VolunteerHUB',
        data: projects,
        user: req.cookies.user
      });
    },
    error: function(error) {
      res.render('index/error', {
        title: 'Error | VolunteerHUB',
        error: error,
        user: req.cookies.user
      });
    }
  });
});

router.get('/create', function(req, res, next) {
  if (req.cookies.user) {
    res.render('projects/create', {
      title: 'Create New Project | VolunteerHUB',
      user: req.cookies.user
    });
  } else {
    // TODO: Add return parameter.
    res.redirect('/login');
  }
});

router.post('/create', function(req, res, next) {
  //res.send("Sorry, this page isn't working yet...");
});

router.get('/:project_id', function(req, res, next) {
  var query = new parse.Query('Project');
  query.equalTo('objectId', req.params.project_id);

  query.first({
    success: function(result) {
      var project = result.toJSON();

      res.render('projects/detail', {
        title: project.name + ' | VolunteerHUB',
        project: project,
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

router.get('/:project_id/participants', function(req, res, next) {
  // TODO
});

router.get('/:project_id/hosts', function(req, res, next) {
  // TODO
});

router.get('/:project_id/edit', function(req, res, next) {
  // TODO
});

router.post('/:project_id/edit', function(req, res, next) {
  // TODO
});

module.exports = router;
