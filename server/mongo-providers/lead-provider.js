
module.exports = function(mongoWrap){ 'use strict';

  var wrap = mongoWrap
    , collectionName = 'leads';

  return {
    findAll: function (opts, cb) {
      var query = {
        where: {owner : opts.owner},
        collection: collectionName
      };
      wrap.db.collection(collectionName)
        .find(query.where)
        .sort({updatedOn: -1, createdOn: -1})
        .toArray(function(err, doc) {
          if (err) return cb(err);
          wrap.show(doc);
          cb(null, doc);
        });
    },
    findById: function (opts, cb) {
      opts.collection = collectionName;
      wrap.findById(opts, function(err, doc) {
        if(err) return cb(err);
        cb(null, doc);
      });
    },
    update: function (opts, cb) {
      // update existing status
      wrap.show(opts.data);
      opts.data.updatedOn = new Date();
      opts.collection = collectionName;
      wrap.updateById(opts, function(err, code){
        if(err) return cb(err);
        cb(null, code);
      });
    },

    // POST /leads
    // save new lead
    insert: function (opts, cb) {
      var today = new Date();
      opts.collection = collectionName;
      opts.data.owner = opts.owner;
      opts.data.createdOn = today;
      opts.data.updatedOn = today;

      wrap.insert(opts, function(err, result) {
        if(err) return cb(err);
        cb(null, result);
      });
    },
    delete: function (opts, cb) {
      opts.collection = collectionName;
      wrap.removeById(opts, function(err, code) {
        if(err) return cb(err);
        cb(null, code);
      });
    }
  }; // end return block
};