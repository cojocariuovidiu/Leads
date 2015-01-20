var async    = require('async');

module.exports = function(mongoWrap){ 'use strict';

  var wrap = mongoWrap;

  return {
    getCounts: function (opts, cb) {
      var results = {
        leads: 0,
        reminders: 0,
        tracking: 0
      };
      var leads = wrap.db.collection('leads');

      async.series({
        leads: function(cb) {
          leads.find({owner: opts.owner})
            .toArray(function(err, docs) {
              if(err) return cb(err);
              results.leads = docs.length;
              cb(null, docs.length);
            });
        },
        reminders: function(cb) {
          leads.aggregate({$match:{owner: opts.owner}},
                           {$unwind: '$reminders'},
            function(err, docs){
              if(err) return cb(err);
              results.reminders = docs.length;
              cb(null, docs.length);
            });
        },
        tracking: function(cb) {
          leads.aggregate({$match:{owner: opts.owner}},
                          {$unwind: '$tracking'},
            function(err, docs){
              if(err) return cb(err);
              results.tracking = docs.length;
              cb(null, docs.length);
            });
        }
      }, function(err, results){
        if(err) return callback(err);
        cb(null, results);
      });
    },
    trackingByLead: function(opts, cb) {
      var leads = wrap.db.collection('leads');
      leads.aggregate(
        {$match: {owner: opts.owner}},
        {$unwind: '$tracking'},{$group:
          {_id: '$name', 'tracking': { $addToSet: '$tracking'} }}
      ,function(err, result){
         if(err) return cb(err);
         cb(null, result);
      })
    },
    remindersByLead: function(opts, cb) {
      var leads = wrap.db.collection('leads');
      leads.aggregate(
        {$match: {owner: opts.owner}},
        {$unwind: '$reminders'},{$group:
        {_id: '$name', 'reminders': { $addToSet: '$reminders'} }}
        ,function(err, result){
          if(err) return cb(err);
          cb(null, result);
        })
    }


  }; // end return block
};

//db.leads.aggregate({$match: {owner: 'xybersolve@gmail.com'}},{$unwind: '$tracking'},{$group: {_id: '$name', 'tracking': { $addToSet: '$tracking'} }})
//aggregate({$match: {owner: 'xybersolve@gmail.com'}},{$unwind: '$tracking'},{$group: {_id: '$lead'}})
