(function (window, angular) {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', [
                   '$rootScope', '$location', 'reportSvc',
      function(     $rootScope,   $location,   reportSvc ){
        var vm = this;
        reportSvc.counts().$promise.then(function(results) {
          //vm.user = $rootScope
          vm.leads = results.leads;
          vm.reminders = results.reminders;
          vm.tracking = results.tracking;
          vm.username = $rootScope.user.username;
        });

        console.dir($rootScope);
        /*
         reportSvc.getReport('simple', 'systemTotals').success(function(results) {
         angular.extend(vm, results);
         });
         vm.user = $rootScope.user;
         */


  }]);

})(window, window.angular);

