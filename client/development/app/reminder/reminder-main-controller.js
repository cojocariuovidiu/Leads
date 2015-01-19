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
            notifySvc.success('Successfully delete reminder.');
            var index = vm.reminders.indexOf(reminder);
            vm.reminders.splice(index, 1);
          } else {
            notifySvc.error('Oops! Unable to delete reminder.');
          }
        });
      };

   }]);

})(window, window.angular);