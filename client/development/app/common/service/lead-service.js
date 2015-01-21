(function (window, angular) {  'use strict';

  angular
    .module('app.services')
    .factory('leadSvc', ['$resource', function($resource){
      var Lead = $resource('/api/leads/:id', {id: '@id'},{
        update: { method: 'PUT' },
        save  : { method: 'POST'},
        delete: { method: 'DELETE'}
      });
      //
      // Extend Lead
      //
      Lead.prototype.update = function() {
        return this.$update({id: this._id});
      };
      Lead.prototype.remove = function () {
        return this.$delete({id: this._id});
      };

      // **************************************
      // Lead Sub-document Methods
      //   * Lead business logic/structure in Lead service
      //
      // put new tracking on lead.tracking array
      Lead.prototype.addTracking = function(track){
        var self = this;
        if(! angular.isArray(self.tracking) ) self.tracking = [];
        self.tracking.unshift(track);
      };

      // remove tracking event from lead.tracking array
      Lead.prototype.deleteTracking = function(track){
        var index = this.tracking.indexOf(track);
        this.tracking.splice(index, 1);
      };
      Lead.prototype.hasTracking = function(){
        return this.tracking && this.tracking.length > 0;
      };

      // put new reminder on lead.reminders array
      Lead.prototype.addReminder = function(reminder){
        var self = this;
        if(! angular.isArray(self.reminders) ) self.reminders = [];
        self.reminders.unshift(reminder);
      };

      // remove reminder from lead.reminders array
      Lead.prototype.deleteReminder = function(reminder){
        var index = this.reminders.indexOf(reminder);
        this.reminders.splice(index, 1);
      };
      Lead.prototype.closeReminder = function(reminder){
        var index = this.reminders.indexOf(reminder);
        this.reminders[index].closed = true;
      };

      Lead.prototype.hasReminders = function(){
        return this.reminders && this.reminders.length > 0;
      };

      return Lead;
  }]);

})(window, window.angular);

