module.exports = function(mongoWrap){ 'use strict';

  var wrap = mongoWrap
    , collectionName = 'leads';

  return {
    findAll: function (opts, cb) {
      var query = {
        where: {owner : opts.owner},
        collection: collectionName
      };
      wrap.findAll(query, function (err, doc) {
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

      opts.collection = collectionName;
      wrap.updateById(opts, function(err, code){
        if(err) return cb(err);
        cb(null, code);
      });
    },

    // POST /leads
    // save new lead
    insert: function (opts, cb) {
      opts.collection = collectionName;
      opts.data.owner = opts.owner;
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