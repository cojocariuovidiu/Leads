(function (window, angular) {
  'use strict';

  angular
    .module('app.settings')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('settings', {
          url: '/settings',
          templateUrl: 'app/settings/main/settings-main.html',
          controller: 'SettingsMainCtrl as settingsMain'
        })
        .state('settings.codes', {
          url: '/codes',
          views: {
            'display': {
              templateUrl: 'app/settings/codes/codes-list.html',
              controller: 'CodesMainCtrl as codesMain'
            }
          }/*
          resolve: {
            locations: function(locationSvc) {
              return locationSvc.query();
            }
          }*/
        })
        .state('settings.tracking', {
          url: '/tracking',
          views: {
            'display' : {
              templateUrl: 'app/settings/tracking/tracking-list.html'
              //controller: 'LinesMainCtrl as linessMain'
            }
          }
        })
        .state('settings.user', {
          url: '/user',
          views: {
            'display' : {
              templateUrl: 'app/settings/user/user-edit.html',
              controller: 'UserEditCtrl as userEdit'
            }
          }
        });
  }]);

})(window, window.angular);
