var parse = require('../database');

module.exports = parse.Object.extend("People", {
  // Instance Properties
}, {
  // Class Properties
  testPassword: function(username, password, password_hash) {
    hash(password, username, function(error, hash) {
      if (error) return false;
      if (hash == password_hash) return true;
      return false;
    });
  }
});
