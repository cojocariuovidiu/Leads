(function (window, angular) {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'ngMessages',
      'ui.router',
      'ui.select',
      'ui.mask',
      'xs.ui.select',
      'xs.ui.wizard',
      'xs.action-buttons',
      'xs.cache',

      'app.services',
      'app.access',
      'app.lead',
      'app.settings'
    ]);

  angular.module('app.services', ['ngResource']);
  //angular.module('app.filters',  []);
  //angular.module('app.leads',  ['app.services', 'angularCharts']);

})(window, window.angular);
