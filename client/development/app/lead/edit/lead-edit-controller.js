(function (window, angular) {
  'use strict';

  angular
    .module('app.lead')
    .controller('LeadEditCtrl', [
               '$state', 'leadCacheSvc','notifySvc', 'attributeSvc', 'trackingSvc', 'reminderSvc' ,'leadSvc', 'lead',

      function ($state , leadCacheSvc, notifySvc, attributeSvc, trackingSvc, reminderSvc, leadSvc, lead ) {

        var vm = this;
        var autoClose = false;

        /* ---------------------------------------------------------
         Lead Routines
         */
        vm.lead = lead;
        vm.extendedInput = false;
        vm.ranks = attributeSvc.ranks;

        // save or update entities - leads & sub-documents (tracking & reminders)
        // main update factory
        function updateItem(itemName){
          var item = itemName;
          return function(cb){
            var copy = angular.copy(vm.lead);
            copy.update().then(function(result) {
              if(result.success===true){
                notifySvc.success('Updated "' + item + '".');
                if(cb) cb();
              } else {
                notifySvc.error('Oops! Unable to update "' + item + '"!');
              }
            });
          };
        }
        // specific update routines
        var updateLead = updateItem('lead');
        var updateTracking = updateItem('tracking');
        var updateReminder = updateItem('reminder');

        function gotUpdate(){
          // UI update behavior - back to list?
          if(autoClose) $state.go('leads.list');
        }

        // event: update main lead
        vm.update = function() {
          updateLead('lead', gotUpdate);
        };

        /* ---------------------------------------------------------
         Tracking Routines
         */
        vm.trackingTypes = attributeSvc.trackingTypes;
        vm.track = new trackingSvc();

        vm.addTracking = function(isValid) {
          if(!isValid) return;
          // keep business logic in service
          vm.lead.addTracking(vm.track);
          // update the lead (parent document)
          updateTracking(function() {
            vm.track = new trackingSvc();
            gotUpdate();
          });
        };

        vm.deleteTracking = function(track) {
          vm.lead.deleteTracking(track);
          updateTracking(gotUpdate);
        };

        /* ---------------------------------------------------------
         Reminder Routines
         */
        vm.reminderTypes = attributeSvc.reminderTypes;
        vm.reminder = new reminderSvc();

        vm.addReminder = function(isValid) {
          if(!isValid) return;
          vm.lead.addReminder(vm.reminder);
          updateReminder(function() {
            vm.reminder = new reminderSvc();
            gotUpdate();
          });
        };

        vm.deleteReminder = function(reminder) {
          vm.lead.deleteReminder(reminder);
          updateReminder(gotUpdate);
        };

        vm.toggleReminderClosed = function(reminder) {
          updateReminder(gotUpdate);
        };

      }]);
})(window, window.angular);


