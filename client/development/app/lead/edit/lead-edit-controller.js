(function (window, angular) {
  'use strict';

  angular
    .module('app.lead')
    .controller('LeadEditCtrl', [
               '_','leadCacheSvc','notifySvc', 'leadSvc', 'lead',

      function (_ , leadCacheSvc, notifySvc, leadSvc, lead ) {

        var vm = this;

        /* ---------------------------------------------------------
         Lead Routines
         */
        vm.lead = lead;

        // save new leads
        vm.update = function(cb) {
          var copy = angular.copy(vm.lead);
          copy.update().then(function(result) {
            if(result.success===true){
              notifySvc.success('Successfully saved "lead".');
            } else {
              notifySvc.error('Oops! Unable to save "lead"!');
            }
            if(cb) cb(result.success);
          });
        };

        /* ---------------------------------------------------------
         Tracking Routines
         */
        vm.trackingTypes = leadSvc.trackingTypes;

        function refreshTrack(){
          vm.track = {
            when: undefined,
            what: undefined,
            notes: undefined,
            result: undefined
          };
        }
        refreshTrack();

        // add tracking event into lead.tracking array
        // update lead on server
        // refresh new tracking event
        vm.addTracking = function () {
          if(! vm.lead.tracking) vm.lead.tracking = [];
          vm.lead.tracking.unshift(vm.track);
          vm.update(function() {
            refreshTrack();
          });
        };

        // remove tracking event from lead.tracking array
        // remove from leads arry locally
        // update lead on server
        vm.deleteTracking = function(track) {
          var index = vm.lead.tracking.indexOf(track);
          vm.lead.tracking.splice(index, 1);
          vm.update(function() {
            // finished Lead update
          });
        };


      }]);
})(window, window.angular);


