(function(window, angular, undefined){ 'use strict';

  angular
    .module('app.report')
    .controller('genericReportCtrl', ['$stateParams', 'reportSvc', function($stateParams, reportSvc){
      var vm = this;
      var report = $stateParams.report;

      vm.title = $stateParams.title || '';
      vm.group = $stateParams.group || '';

      reportSvc[report]().$promise.then(function(results) {
        console.dir(results);
        vm.items = results;
      });
   }]);

})(window, window.angular);