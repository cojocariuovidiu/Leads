var express   = require('express')
  , router    = express.Router()
  , jwt       = require('jsonwebtoken')
  , user      = null;

module.exports = function(userProvider, secret) { 'use strict';
  var user = userProvider;
  var jwtSecret = secret;

  router.post('/login', function(req, res, next){
    var loginUser = req.body;
    if( !loginUser.email || !loginUser.password ){
      res.json({isLoggedIn: false, message: 'Must provide email and password to login'});
    } else {
      user.login(loginUser, function(err, ourUser, isMatch) {

        if(err) return next(err);

        if(ourUser && ourUser.isLoggedIn){
          // don't send password to client
          if (ourUser.password) delete ourUser.password;
          var token = jwt.sign(ourUser, jwtSecret);
          res.json({token: token, user:ourUser});

        } else {
          res.status(401).json({isLoggedIn:false});
        }
      });
    }

    // save(register) new user
    router.post('/register', function(req, res, next) {
      var opts = {
        data:  req.body
      };
      opts.data.owner = req.owner;

      user.insert(opts, function(err, code) {
        if(err) next(err);
        res.json(code);
      });
    });
  });

  // check for dupe emails
  router.post('/check-email', function(req, res, next) {
    var opts = {
      data:  req.body
    };
    user.checkEmail(opts, function(err, code) {
      if(err) next(err);
      res.json(code);
    });
  });

  return router;
};
