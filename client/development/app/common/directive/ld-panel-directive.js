(function (window, angular) {
  'use strict';

  angular
    .module('app')
    .directive('ldPanel', [function() {
      return {
        restrict: 'EA',
        templateUrl: 'app/template/ld-panel-template.html',
        transclude: true,
        scope: {
          panelTitle: '@title'
        }
      };
    }]);

})(window, window.angular);
