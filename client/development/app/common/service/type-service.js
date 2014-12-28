(function (window, angular) {  'use strict';

  angular
    .module('app')
    .factory('trackingSvc', ['$resource', function($resource){

      var Tracking = $resource( 'api/tracking/:id', {id: '@id'},{
        update: { method: 'PUT' },
        save  : { method: 'POST'}
      });
      return Tracking;

  }]);

})(window, window.angular);


