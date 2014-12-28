(function (window, angular) {
  'use strict';

  angular
    .module('app')
    .config(['$httpProvider', function($httpProvider) {
      if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
      }
      // force refresh for development
      $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    }])

    .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl as home'
          });

  }]);

})(window, window.angular);

