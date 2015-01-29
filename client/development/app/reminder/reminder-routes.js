(function(window, angular, undefined) {  'use strict';


  angular
    .module('app')
    .config(['$stateProvider', reminderRoute]);

  function reminderRoute($stateProvider){
    $stateProvider
      .state('reminders', {
        url: '/reminders',
        templateUrl: 'app/reminder/reminder-main.html',
        controller: 'ReminderMainCtrl as reminderMain'
      });

  }

})(window, window.angular);
