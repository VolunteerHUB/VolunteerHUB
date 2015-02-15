var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var parse = require('./database');
var User = require('./models/user');

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  var query = new parse.Query(User);
  query.equalTo("username", id);

  query.first({
    success: function(result) {
      done(null, result.toJSON());
    },
    error: function(error) {
      done(error);
    }
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    var query = new parse.Query(User);
    query.equalTo("username", username);

    query.first({
      success: function(result) {
        if (User.testPassword(username, password, result.get('password'))) {
          done(null, result.toJSON());
        } else {
          done(null, false, { message: "BAD_PASSWORD" });
        }
      },
      error: function(error) {
        done(error);
      }
    });
  }
));

module.exports = passport;
