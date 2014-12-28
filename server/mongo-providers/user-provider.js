module.exports = function(mongoWrap){ 'use strict';

  var wrap = mongoWrap
    , collectionName = 'users'
    , authenticate  = require('./../authorize/authenticate')(mongoWrap);

  return {
    findAll: function (opts, cb) {
      var query = {
        where: {owner : opts.owner},
        collection: collectionName
      };
      wrap.findAll(query, function (err, doc) {
        if (err) return cb(err);
        cb(null, doc);
      });
    },
    findById: function (opts, cb) {
      opts.collection = collectionName;
      wrap.findById(opts, function(err, doc) {
        if(err) cb(err);
        if(doc.password) delete doc.password;
        cb(null, doc);
      });
    },
    //update existing
    update: function (opts, cb) {
      // update existing status
      opts.collection = collectionName;
      wrap.updateById(opts, function(err, code){
        if(err) return cb(err);
        cb(null, code);
      });
    },
    // save new user
    insert: function (opts, cb) {
      opts.collection = collectionName;
      opts.data.owner = opts.owner;
      if(opts.data.confirmPassword) delete opts.data.confirmPassword

      authenticate.encryptPassword(opts.data, function (err) {
        if (err) return cb(err);

        wrap.insert(opts, function (err, result) {
          if (err) cb(err);
          cb(null, result);
        });
      });
    },
    delete: function (opts, cb) {
      opts.collection = collectionName;
      wrap.delete(opts, function(err, code) {
        if(err) cb(err);
        cb(null, code);
      });
    },
    login: function(user, cb){
      authenticate.checkUser(user, cb);
    },
    checkEmail: function(data, cb) {
      console.log('checkEmail, data:');
      wrap.show(data.data);

      var users = wrap.db.collection('users')
        , query = data.data
        , dupes = 0
        , result = {};

      users.find(query)
           .toArray(function(err, docs) {

          if(err) return cb(err);

          var dupes = docs ? docs.length : 0;

          if(dupes === 0){
            result.validEmail = true;
            result.errorMessage = '';
          } else {
            result.validEmail = false;
            result.errorMessage = 'This email is not available'
          }

          cb(null, result);
        });

    }
}; // end return block
};