(function (window, angular) {
  'use strict';

  angular
    .module('app.access')
    .config([ '$stateProvider',

      function ($stateProvider) {

        $stateProvider
          .state('access', {
            url: '/access',
            abstract: false,
            template: '<div ui-view></div>'
          })
          .state('access.login', {
            url: '/login',
            templateUrl: 'app/access/login/login.html',
            controller: 'LoginCtrl as login'
          })
          .state('access.register', {
            url: '/login',
            templateUrl: 'app/access/register/register.html',
            controller: 'RegisterCtrl as register'
          });
  }]);

})(window, window.angular);
