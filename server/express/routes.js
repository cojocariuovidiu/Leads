/* ---------------------------------------------------------
 Express Route Configuration
------------------------------------------------------------ */
var cfg  = require('./../config/config');

module.exports = function(app, mongoWrap){

  // mongoDB Native - data providers
  var leadProvider     = require('./../mongo-providers/lead-provider')(mongoWrap)
    , userProvider     = require('./../mongo-providers/user-provider')(mongoWrap)
    , trackingProvider = require('./../mongo-providers/tracking-provider')(mongoWrap)
    , reminderProvider = require('./../mongo-providers/reminder-provider')(mongoWrap)
    , reportProvider   = require('./../mongo-providers/report-provider')(mongoWrap);

  // secured REST endpoints (auth via JSON header tokens)
  app.use('/',                require('./../routes/index')    ());
  app.use('/api/users',       require('./../routes/users')    (userProvider));
  app.use('/api/leads',       require('./../routes/leads')    (leadProvider));
  app.use('/api/tracking',    require('./../routes/tracking') (trackingProvider));
  app.use('/api/reminders',   require('./../routes/reminders')(reminderProvider));
  app.use('/api/reports',     require('./../routes/reports')  (reportProvider));

  // ONLY unsecured REST endpoint - Login & Registration
  app.use('/api/access',       require('./../routes/access')  (userProvider, cfg.secret));

};

