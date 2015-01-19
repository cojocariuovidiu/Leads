(function(window, angular, undefined) {  'use strict';

  angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', reportRoutes]);

  function reportRoutes($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('report', {
        url: '/report',
        template: '<div ui-view></div>'
      })
      .state('report.menu', {
        url: '/menu',
        templateUrl: 'app/report/menu/report-menu.html',
        controller: 'ReportMenuCtrl as reportMenu'
      });
  }

})(window, window.angular);
