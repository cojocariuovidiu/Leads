(function(window, angular, undefined){ 'use strict';

  angular
    .module('app.settings')
    .controller('ErrorListCtrl', ['$rootScope', function($rootScope){
      var vm = this;
      vm.errors = $rootScope.errors;
      vm.user = $rootScope.user;
   }]);

})(window, window.angular);