/* ---------------------------------------------------------
 Load Middleware
 ------------------------------------------------------------ */
module.exports = function(app, environ, mongoWrap) {

  var reqSession   = require('./../middleware/req-session')(mongoWrap)
    , errorHandler = require('./../middleware/error-handler')(environ)
    , routeLogger  = require('./../middleware/route-logger')('');

  app.use(reqSession);
  app.use(errorHandler);
  app.use(routeLogger);

};