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
        .state('settings.tracking', {
          url: '/tracking',
          views: {
            'display' : {
              templateUrl: 'app/settings/tracking/tracking-config.html',
              controller: 'TrackingConfigCtrl as trackingConfig'
            }
          }
        })
        .state('settings.reminder', {
          url: '/reminder',
          views: {
            'display' : {
              templateUrl: 'app/settings/reminder/reminder-config.html',
              controller: 'ReminderConfigCtrl as reminderConfig'
            }
          }
        })
        .state('settings.user', {
          url: '/user',
          views: {
            'display' : {
              templateUrl: 'app/settings/user/user-config.html',
              controller: 'UserConfigCtrl as userConfig'
            }
          }
        })
        .state('settings.errors', {
          url: '/errors',
          views: {
            'display' : {
              templateUrl: 'app/settings/error/error-list.html',
              controller: 'ErrorListCtrl as errorList'
            }
          }
        });

    }]);

})(window, window.angular);
