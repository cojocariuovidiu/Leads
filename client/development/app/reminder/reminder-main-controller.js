(function(window, angular, undefined){ 'use strict';

  angular
    .module('app.reminder')
    .controller('ReminderMainCtrl', ['notifySvc', 'reminderSvc', function(notifySvc, reminderSvc){
      var vm = this;
      vm.reminders = reminderSvc.query();

      vm.delete = function(reminder){
        //
        // Delete standalone reminder
        //
        reminder.remove().then(function(result) {
          if(result.success === true){
            notifySvc.success('Deleted reminder.');
            var index = vm.reminders.indexOf(reminder);
            vm.reminders.splice(index, 1);
          } else {
            notifySvc.error('Oops! Unable to delete reminder.');
          }
        });
      };

      vm.toggleClosed = function(item){
        //
        // Set standalone reminder closed/open
        //
        var copy = angular.copy(item);
        var state = copy.reminders.closed;
        var stateMsg = state ? 'closed' : 'open';
        copy.toggleClosed().then(function(result) {
          if(result.success === true){
            notifySvc.success('Set reminder to "' + stateMsg + '".');
          } else {
            notifySvc.error('Unable to set reminder to "' + stateMsg + '".');
          }
        });
      };

   }]);

})(window, window.angular);