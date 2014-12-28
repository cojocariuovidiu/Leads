(function(window, angular, undefined){ 'use strict';
  
  angular
    .module('app')
    .directive('confirmPassword', [function(){
      return {
        require: 'ngModel',
        scope: {
          firstPassword: "=confirmPassword"
        },
        link: function(scope, elem, attrs, ngModel) {
          ngModel.$validators.confirmPassword = function (modelValue) {
            return modelValue === scope.firstPassword;
          };
          scope.$watch('firstPassword', function () {
            ngModel.$validate();
          });
        }
      };
   
   }]);
  
})(window, window.angular);