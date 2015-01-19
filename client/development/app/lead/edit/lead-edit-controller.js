(function (window, angular) {
  'use strict';

  angular
    .module('app.lead')
    .controller('LeadEditCtrl', [
               '_', '$state', 'leadCacheSvc','notifySvc', 'attributeSvc', 'trackingSvc', 'reminderSvc' ,'leadSvc', 'lead',

      function (_ , $state , leadCacheSvc, notifySvc, attributeSvc, trackingSvc, reminderSvc, leadSvc, lead ) {

        var vm = this;

        /* ---------------------------------------------------------
         Lead Routines
         */
        vm.lead = lead;
        vm.ranks = attributeSvc.ranks;

        // save or update leads
        // shared by sub-document updates
        function updateLead(item , cb){
          var copy = angular.copy(vm.lead);
          copy.update().then(function(result) {
            if(result.success===true){
              notifySvc.success('Successfully updated "' + item + '".');
              if(cb) cb();
            } else {
              notifySvc.error('Oops! Unable to update "' + item + '"!');
            }
          });
        }
        // event: update main lead
        vm.update = function() {
          updateLead('lead', function() {
            $state.go('leads.list');
          });
        };
        /* ---------------------------------------------------------
         Tracking Routines
         */
        vm.trackingTypes = attributeSvc.trackingTypes;
        vm.track = new trackingSvc();

        vm.addTracking = function() {
          // keep business logic in service
          vm.lead.addTracking(vm.track);
          // update the lead (parent document)
          updateLead('tracking', function() {
            vm.track = new trackingSvc();
            //$state.go('leads.list');
          });
        };

        vm.deleteTracking = function(track) {
          vm.lead.deleteTracking(track);
          updateLead('tracking', function() {
            //$state.go('leads.list');
          })
        };

        /* ---------------------------------------------------------
         Reminder Routines
         */
        vm.reminderTypes = attributeSvc.reminderTypes;
        vm.reminder = new reminderSvc();

        vm.addReminder = function () {
          vm.lead.addReminder(vm.reminder);
          updateLead('reminder', function() {
            vm.reminder = new reminderSvc();
            //$state.go('leads.list');
          });
        };

        vm.deleteReminder = function(reminder) {
          vm.lead.deleteReminder(reminder);
          updateLead('reminder', function() {
            //$state.go('leads.list');
          });
        };

      }]);
})(window, window.angular);


