(function (window, angular) {  'use strict';

  angular
    .module('app.services')
    .factory('trackingSvc', ['$resource', function($resource) {

      var Tracking = $resource('/api/tracking/:id/:track', {id: '@id', track: '@track'}, {
        update: { method: 'PUT'},
        save: { method: 'POST'},
        delete: { method: 'DELETE', url: '/api/tracking/:id/:track'}
      });
      Tracking.prototype.remove = function () {
        return this.$delete({id: this._id, track: angular.toJson(this.tracking)});
      };

      return Tracking;
  }]);

})(window, window.angular);


