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
    }
  }; // end return block
};

