var express = require('express');
var passport = require('../auth');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('index/about', { title: 'About' });
});

router.get('/login', function(req, res, next) {
  res.render('index/login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
