var express   = require('express')
  , router    = express.Router()
  , leads     = null;

module.exports = function(leadProvider) { 'use strict';

  leads = leadProvider;

  router.get('/', function(req, res, next){
    // leads are owner keyed
    leads.findAll({owner: req.owner}, function(err, data) {
      if(err) return next(err);
      res.json(data);
    });
  });

  router.get('/:id', function(req, res, next) {
    leads.findById({id: req.params.id}, function (err, data) {
      if(err) return next(err);
      res.json(data);
    });
  });

  // PUT /:id
  // update existing lead by id (_id)
  router.put('/:id', function(req, res, next){
    var opts = {
      id:    req.params.id,
      data:  req.body
    };
    leads.update(opts, function(err, code) {
      if(err) return next(err);
      res.json( code );
    });
  });


  // save new lead router.post('/', function(req, res, next) {
  router.post('/:id', function(req, res, next){
    var opts = {
      data:  req.body,
      owner: req.owner
    };
    leads.insert(opts, function(err, code) {
      if(err) next(err);
      res.json(code);
    });
  });

  router.delete('/:id', function(req, res, next) {
    leads.delete({id: req.params.id}, function(err, code) {
      if(err) next(err);
      res.json(code);
    });
  });

  return router;
};
