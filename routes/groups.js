var express = require('express');
var parse = require('../database');

var router = express.Router();

// router.get('/', function(req, res, next) {
//   var query = new parse.Query('Group');
//   query.descending('createdAt');
//   query.limit(req.query.limit);
//   query.skip(req.query.offset);
//
//   query.find({
//     success: function(results) {
//       var groups = Array();
//
//       for (var i = 0; i < results.length; i++) {
//         groups[i] = results[i].toJSON();
//       }
//
//       res.render('group/index', { title: 'Group Directory | VolunteerHUB', data: groups });
//     },
//     error: function(error) {
//       res.render('index/error', { title: 'Error | VolunteerHUB', error: error });
//     }
//   });
// });

router.get('/create', function(req, res, next) {
  if (parse.User.current()) {
    res.render('groups/create', { title: 'Create New Group | VolunteerHUB' });
  } else {
    // TODO: Add return parameter.
    res.redirect('/login');
  }
});

router.post('/create', function(req, res, next) {
  // TODO
});

router.get('/:group_name', function(req, res, next) {
  var query = new parse.Query('Project');
  query.equalTo('name', req.params.group_name);

  query.first({
    success: function(result) {
      var group = result.toJSON();

      res.render('groups/detail', { title: group.name + ' | VolunteerHUB', group: group });
    },
    error: function(error) {
      res.render('index/error', { error: error });
    }
  });
});

router.get('/:group_name/members', function(req, res, next) {
  var query = new parse.Query('Group');
  query.equalTo('name', req.params.group_name);

  query.first({
    success: function(result) {
      relation = result.get('members').query();
      relation.descending('createdAt');
      relation.limit(req.query.limit);
      relation.skip(req.query.offset);

      relation.find({
        success: function(results) {
          members = Array();

          for (var i = 0; i < results.length; i++) {
            members[i] = results[i].toJSON();
          }

          res.render('groups/members', { title: 'Member List | VolunteerHUB', members: members });
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

router.get('/:group_name/hosting', function(req, res, next) {
  var query = new parse.Query('Group');
  query.equalTo('name', req.params.group_name);

  query.first({
    success: function(result) {
      relation = result.get('hosting').query();
      relation.descending('createdAt');
      relation.limit(req.query.limit);
      relation.skip(req.query.offset);

      relation.find({
        success: function(results) {
          members = Array();

          for (var i = 0; i < results.length; i++) {
            members[i] = results[i].toJSON();
          }

          res.render('groups/members', { title: 'Hosted Projects | VolunteerHUB', members: members });
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

router.get('/:group_name/edit', function(req, res, next) {
  // TODO
});

router.post('/:group_name/edit', function(req, res, next) {
  // TODO
});

module.exports = router;
