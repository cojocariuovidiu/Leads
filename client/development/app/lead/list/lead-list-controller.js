(function (window, angular) {
  'use strict';

  angular
    .module('app.lead')
    .controller('LeadListCtrl', [
               '$state','notifySvc','leadSvc', 'leads',

      function ($state, notifySvc, leadSvc, leads ){

        var vm = this;
        vm.leads = leads;
        vm.leadTypes = leadSvc.leadTypes;
        vm.ranks = leadSvc.ranks;

        function renewLead(){
          vm.lead = new leadSvc();
        }
        renewLead();
        vm.addNew = function (isValid){
          if(! isValid) return;

          vm.lead.$save().then(function(result) {
            if(result){
              vm.leads.push(result);
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
  }]);

})(window, window.angular);


