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

      // new Tracking model, mostly for resetting form
      // tracking is sub-document[] of lead
      Tracking.prototype.reset = function(){
        angular.extend(this, {
          when: undefined,
          what: undefined,
          type: undefined,
          notes: undefined,
          result: undefined
        })
      };


      return Tracking;
  }]);

})(window, window.angular);


