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

  return router;
};
