var express = require('express');
var parse = require('../parse');

var Project = require('../model/project');
var Participant = require('../model/participant');

var router = express.Router();

/* GET projects listing. */
router.get('/', function(req, res, next) {
  var query = new parse.Query(Project);
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      // TODO: Iterate over each result and add it to `projects` array.

      res.render('projects/index', { title: 'Project List', data: projects });
    },
    error: function(error) {
      // TODO: Print the error to the console and show the 500 error page.
    }
  });
});

/* GET single project. */
router.get('/:project_id', function(req, res, next) {
  var query = parse.Query(Project);
  query.equalTo("project_id", req.params.project_id);

  query.first({
    success: function(result) {
      // TODO: Parse the result.

      res.render('projects/detail', { title: project.name, data: project });
    },
    error: function(error) {
      // TODO: Parse the error and show the 500 or 404 page.
    }
  });
});

/* GET single project's participants. */
router.get('/:project_id/participants', function(req, res, next) {
  var query = parse.Query(Participant);
  query.equalTo("project_id", req.params.project_id);
  query.limit(req.query.limit);
  query.skip(req.query.offset);

  query.find({
    success: function(results) {
      // TODO: Iterate over each result and add it to the `participants` array.

      res.render('projects/participants', { title: 'Participant List', data: participants });
    },
    error: function(error) {
      // TODO: Parse the error and show the 500 error page.
    }
  });
});

module.exports = router;
