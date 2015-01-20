var express   = require('express')
  , router    = express.Router()
  , async     = require('async')
  , reports     = null;

module.exports = function(reportsProvider) { 'use strict';

  reports = reportsProvider;

  router.get('/counts', function(req, res, next){
    reports.getCounts({owner: req.owner}, function(err, data) {
      if(err) return next(err);
      res.json(data);
    });
  });

  router.get('/generic/:report', function(req, res, next){

    var report = req.params.report;

    reports[report]({owner: req.owner}, function(err, data) {
      if(err) return next(err);
      res.json(data);
    });
  });

  router.get('/trackingByLead', function(req, res, next){
    reports.trackingByLead({owner: req.owner}, function(err, data) {
      if(err) return next(err);
      res.json(data);
    });
  });

  return router;
};
