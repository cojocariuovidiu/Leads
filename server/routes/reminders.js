var express   = require('express')
  , router    = express.Router()
  , reminder     = null;

module.exports = function(reminderProvider) { 'use strict';

  reminder = reminderProvider;

  router.get('/', function(req, res, next){
    // leads are owner keyed
    reminder.findAll({owner: req.owner}, function(err, data) {
      if(err) return next(err);
      res.json(data);
    });
  });
  router.delete('/:id/:reminder', function(req, res, next) {
    // leads are owner keyed
    var opts = {
      id: req.params.id,
      reminder: JSON.parse(req.params.reminder)
    };
    reminder.remove(opts, function (err, result) {
      if(err) return next(err);
      res.json(result);
    });
  });

  // PUT /:id/:reminder
  // update existing reminder by reminder definition & lead id (_id)
  router.put('/:id/:reminder', function(req, res, next){
    var opts = {
      id:    req.params.id,
      reminder: JSON.parse(req.params.reminder)
      //closed: JSON.parse(req.params.closed)
    };
    reminder.update(opts, function(err, code) {
      if(err) return next(err);
      res.json( code );
    });
  });

  router.put('/toggleClosed/:id/:reminder', function(req, res, next) {
    // leads are owner keyed
    var opts = {
      id: req.params.id,
      reminder: JSON.parse(req.params.reminder)
    };
    reminder.toggleClosed(opts, function (err, result) {
      if(err) return next(err);
      res.json(result);
    });
  });

  return router;
};
