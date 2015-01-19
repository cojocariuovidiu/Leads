module.exports = function(mongoWrap){ 'use strict';

  var wrap = mongoWrap;

  return {
    findAll: function (opts, cb) {
      wrap.db.collection('leads')
        .aggregate(
          {$match:{owner: opts.owner}},
          {$unwind: '$reminders'},
          {'$sort': {'reminders.when': -1}},

        function(err, doc){
          if (err) return cb(err);
          wrap.show(doc);
          cb(null, doc);
        });
    },
    remove: function(opts, cb) {
      // Remove single track from tracking array in lead
      var leads = wrap.db.collection('leads');
      wrap.show(opts.id);
      wrap.show(opts.reminder);
      leads.update({_id: wrap.ObjectID(opts.id)},
                   {$pull:{reminders: opts.reminder}},
                   {w:1},

        function(err, results){
          if(err) return cb(err);

          cb(null,  {
            success: results >= 1
          });
        })
    }

  }; // end return block
};