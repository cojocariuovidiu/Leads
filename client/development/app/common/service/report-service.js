(function (window, angular) {  'use strict';

  angular
    .module('app')
    .factory('reportSvc', ['$resource', function($resource){

      var Report = $resource( '/api/reports/:id', {id: '@id'},{
        update: { method: 'PUT' },
        save  : { method: 'POST'},
        counts: { method: 'GET', url: '/api/reports/counts'}
      });
      return Report;
  }]);

})(window, window.angular);

