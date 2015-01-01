(function (window, angular) {
  'use strict';

  angular
    .module('app')
    .directive('ldNavbarLogin', [
               '$state','loginSvc',
      function($state, loginSvc) {

        return {
          restrict: 'E',
          templateUrl: 'app/navbar/navbar-login-template.html',
          controller: function($scope) {
            $scope.logout = function() {
              loginSvc.logout();
              $state.go('access.login');
            };
            $scope.login = function () {
              $state.go('access.login');
            };
          }
        };
    }]);

})(window, window.angular);

