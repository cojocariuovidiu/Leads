(function (window, angular) {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', [
                   '$rootScope', '$location', 'leadSvc',
      function(     $rootScope,   $location,   leadSvc ){
        var vm = this;
        /*
        reportSvc.getReport('simple', 'systemTotals').success(function(results) {
          angular.extend(vm, results);
        });
        vm.user = $rootScope.user;
         */
        vm.leads = leadSvc.query();
  }]);

})(window, window.angular);

