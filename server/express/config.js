/* ---------------------------------------------------------
 Express Configuration
------------------------------------------------------------ */
var express          = require('express')
  , app              = express()
  , bodyParser       = require('body-parser')
  , methodOverride   = require('method-override')
  , errorHandler     = require('errorhandler')
  , logger           = require('morgan')
  , cfg              = require('./../config/config')
  , jwt              = require('jsonwebtoken');

module.exports = function(baseDir, mongoWrap){

  var environ          = process.env.NODE_ENV
    , rootPath         = baseDir + cfg[environ].rootPath
    , oneDay           = 86400000
    , noAuthRequired    = ['/api/access/login', '/api/access/register','/api/access/check-email'];

  console.log('**********************************************************');
  console.log('CURRENTLY OPERATING IN: ' + environ.toUpperCase() );
  console.log('RootPath: ' + rootPath );

  app.use(bodyParser.json());
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(methodOverride('X-HTTP-Override'));
  app.use(express.static(rootPath, {maxAge:oneDay}));

  // authentication
  require('./authentication')(app, noAuthRequired);
  // middleware
  require('./middleware')(app, environ, mongoWrap);
  // routes
  require('./routes')(app, mongoWrap);

  return function(){
    return app;
  }

};