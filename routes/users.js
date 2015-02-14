var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // TODO
});

/* GET single user. */
router.get('/:username', function(req, res, next) {
  // TODO
});

/* GET single user's participating. */
router.get('/:username/participating', function(req, res, next) {
  // TODO
});

/* GET single user's hosting. */
router.get('/:username/hosting', function(req, res, next) {
  // TODO
});

/* GET single user's settings. */
router.get('/:username/settings', function(req, res, next) {
  // TODO
});

/* POST single user's settings. */
router.post('/:username/settings', function(req, res, next) {
  // TODO
});

module.exports = router;
