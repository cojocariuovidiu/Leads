(function (window, angular) {
  'use strict';

  angular
    .module('app.services')
    .factory('userSvc', ['$resource', function($resource){

      var User = $resource('/api/users/:id', {id: '@id'},{

        // secure REST endpoints
        update: { method: 'PUT' },

        // non-secured REST endpoints
        save  : { method: 'POST', url: '/api/access/register'},
        checkDupes : { method: 'POST', url: '/api/access/check-email'}
      });
      User.prototype.update = function() {
        return this.$update({id: this._id});
      };
      User.prototype.checkDupes = function (data) {
        return this.$checkDupes({email: data.email});
      };
      return User;
   }]);

})(window, window.angular);

