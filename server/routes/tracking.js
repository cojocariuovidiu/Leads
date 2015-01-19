var express   = require('express')
  , router    = express.Router()
  , tracking     = null;

module.exports = function(trackingProvider) { 'use strict';

  tracking = trackingProvider;

  router.get('/', function(req, res, next){
    // leads are owner keyed
    tracking.findAll({owner: req.owner}, function(err, data) {
      if(err) return next(err);
      res.json(data);
    });
  });

  router.delete('/:id/:track', function(req, res, next){
    // leads are owner keyed
    var opts = {
      id:  req.params.id,
      track: JSON.parse(req.params.track)
    };
    tracking.remove(opts, function(err, result) {
      if(err) return next(err);
      res.json(result);
    });
  });
  return router;
};
