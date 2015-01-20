(function(window, angular, undefined) {  'use strict';

  angular
    .module('app')
    .config(['$stateProvider', trackingRoutes]);

  function trackingRoutes($stateProvider ){

    $stateProvider
      .state('tracking', {
        url: '/tracking',
        templateUrl: 'app/tracking/tracking-main.html',
        controller: 'TrackingMainCtrl as trackingMain'
      });
  }

})(window, window.angular);
