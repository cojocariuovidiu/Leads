/* ---------------------------------------------------------
 Authentication (JSON Web Header Token)
 ------------------------------------------------------------ */
var cfg         = require('./../config/config')
  , expressJwt  = require('express-jwt');

module.exports = function(app, noAuthRequired) {
  // JSON Web header token authorization
  app.use(expressJwt({secret:cfg.secret}).unless({
    path: noAuthRequired
  }));
};