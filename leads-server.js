/*
  Leads Server

  ********** Run scripts ************
  DEVELOPMENT
      development:   npm run dev
  PRODUCTION
      nohup:         npm run prod
        ps aux | grep node
        kill [pid]
      forever:       npm run forever
        forever list
        forever stop [n]
  ************************************
*/
var app              = null
  , cfg              = require('./server/config/config')
  , mongoWrap        = require('./server/tools/mongo-wrap')(cfg.mongo);

// Express Setup, Routes & Authentication (JSON WebTokens)
app = require('./server/express/config')(__dirname, mongoWrap)();

// Start app after db connection has been established
mongoWrap.connect(function(err, db) {  "use strict";
  if(err) throw err;
  app.listen(cfg.express.port);
  runAfterDBConnect();
  console.log('Server started on port: ' + cfg.express.port );
  console.log('**********************************************************');
});

// any routines to run after db & server initialization
function runAfterDBConnect(){
  console.log('MongoWrap was initialized');
}

exports = module.exports = app;

