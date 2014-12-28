//
// Overrides Angular select tag to implement placeholder functionality
// usage: (as normally (with "default-text" as placeholder
//
// <select ng-model="..."
//         ng-options="for in as"
//         default-text="My Un-selectable Text">
//
(function (window, angular) {
  'use strict';

  angular
    .module('xs.ui.select', [])
    .directive('select', ['$interpolate', function($interpolate) {
      return {
        restrict: 'E',
        require: 'ngModel',
        link: function(scope, elem, attrs) {
          if(angular.isUndefined(attrs.defaultText)) return;
          scope.defaultText = attrs.defaultText || 'Select...';
          var defaultTemplate = '<option value="" disabled selected style="display:none;">{{defaultText}}</option>';
          elem.prepend($interpolate(defaultTemplate)(scope));
        }
      };
    }]);

})(window, window.angular);


