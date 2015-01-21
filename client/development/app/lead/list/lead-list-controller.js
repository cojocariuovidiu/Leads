(function (window, angular) {
  'use strict';

  angular
    .module('app.lead')
    .controller('LeadListCtrl', [
               '$state','notifySvc', 'attributeSvc', 'leadSvc', 'leads',

      function ($state, notifySvc, attributeSvc, leadSvc, leads ){

        var vm = this;
        vm.leads = leads;
        vm.ranks = attributeSvc.ranks;

        function renewLead(){
          vm.lead = new leadSvc();
        }
        renewLead();
        vm.addNew = function (isValid){
          if(! isValid) return;

          vm.lead.$save().then(function(result) {
            if(result){
              vm.leads.unshift(result);
              notifySvc.success('Successfully saved the new "lead".');
            } else {
              notifySvc.error('Oops! Unable to save "lead".');
            }
            renewLead();
          });
        };
        vm.clearFilters = function() {
          vm.searchByName = '';
          vm.filterByRank = undefined;
        };
        vm.clearFilters(); // initialize

        vm.delete = function(lead) {
          var index = vm.leads.indexOf(lead);
          vm.leads.splice(index, 1);
          lead.remove();
        };
        vm.toggleArchive = function(lead) {
          var copy = angular.copy(lead)
          copy.update().then(function(result) {
            if(result.success === true){
              notifySvc.success('Updated the "lead".');
            } else {
              notifySvc.error('Unable to update "lead".');
            }
          })
        };

        vm.showDetails = function(lead) {
          if(! lead.hasReminders() && ! lead.hasTracking()){
            notifySvc.warn('This "lead" has no "tracking or "reminders to view!');
          } else {
            var newState = !lead.showDetail;
            angular.forEach(vm.leads, function(l) {
              l.showDetail = false;
            });
            lead.showDetail = newState;
          }
        }
  }]);

})(window, window.angular);


