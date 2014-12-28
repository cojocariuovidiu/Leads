/* ---------------------------------------------------------
 Express Route Configuration
------------------------------------------------------------ */
var cfg  = require('./../config/config');

module.exports = function(app, mongoWrap){

  // mongoDB Native - data providers
  var leadProvider     = require('./../mongo-providers/lead-provider')(mongoWrap)
    , userProvider     = require('./../mongo-providers/user-provider')(mongoWrap);

  // secured REST endpoints (auth via JSON header tokens)
  app.use('/',                require('./../routes/index')    ());
  app.use('/api/users',       require('./../routes/users')    (userProvider));
  app.use('/api/leads',       require('./../routes/leads')    (leadProvider));

  // ONLY unsecured REST endpoint - Login & Registration
  app.use('/api/access',       require('./../routes/access')  (userProvider, cfg.secret));

};

