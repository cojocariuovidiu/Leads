(function (window, angular) {
  'use strict';

  angular
    .module('app', [
      // Angular Core Modules
      'ngRoute',
      'ngMessages',

      // Angular-ui Modules
      'ui.router',
      'ui.select',
      'ui.mask',
      'ui.bootstrap.tabs',

      // XyberSolve Modules
      'xs.ui.select',
      'xs.ui.wizard',
      'xs.action-buttons',
      'xs.cache',

      // App Component Modules
      'app.services',
      'app.access',
      'app.lead',
      'app.tracking',
      'app.reminder',
      'app.report',
      'app.settings'
    ]);

  angular.module('app.services', ['ngResource']);
  //angular.module('app.filters',  []);
  //angular.module('app.leads',  ['app.services', 'angularCharts']);

})(window, window.angular);
