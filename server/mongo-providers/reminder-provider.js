/*
*  Reminder Provider
*
*     Standalone "reminder" is subdocument of "leads"
*     * represent $unwind off of leads
*     * reference lead and reminder in $match or query
*/
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
      //wrap.show(opts.id);wrap.show(opts.reminder);
      leads.update({_id: wrap.ObjectID(opts.id)},
                   {$pull:{reminders: opts.reminder}},
                   {w:1},

        function(err, results){
          if(err) return cb(err);

          cb(null,  {
            success: results >= 1
          });
        })
    },
    toggleClosed: function(opts, cb) {
      wrap.show(opts);
      var leads = wrap.db.collection('leads');
      var query = {
        _id: wrap.ObjectID(opts.id),
           'reminders.when': opts.reminder.when,
           'reminders.type': opts.reminder.type,
           'reminders.what': opts.reminder.what};
      //wrap.show(opts.id);wrap.show(opts.reminder);
      wrap.show(query);
      leads.update(query,
        {$set: { 'reminders.$.closed' : opts.reminder.closed}},
        {w:1},

        function(err, result){
          if(err) return cb(err);
          wrap.show(result);
          cb(null,  {
            success: result === 1
          });
        })

    }

  }; // end return block
};