(function (window, angular) {  'use strict';

  angular
    .module('app.services')
    .factory('reminderSvc', ['$resource', function($resource){

      var Reminder = $resource( '/api/reminders/:id', {id: '@id', reminder: '@reminder'},{
        update: { method: 'PUT' },
        save  : { method: 'POST'},
        delete: { method: 'DELETE', url: '/api/reminders/:id/:reminder'}
      });
      Reminder.prototype.remove = function () {
        return this.$delete({id: this._id, reminder: angular.toJson(this.reminders)});
      };

      return Reminder;

    }]);

})(window, window.angular);

