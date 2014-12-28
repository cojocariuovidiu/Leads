(function (window, angular, undefined) {  'use strict';

  angular
    .module('xs.action-buttons',[])
    .value('XS_ACTION_BUTTONS_TEMPLATE_DIR', './../template') // user configurable
    .directive('xsActionButtons', ['XS_ACTION_BUTTONS_TEMPLATE_DIR', function(XS_ACTION_BUTTONS_TEMPLATE_DIR) {

        return {
          restrict: 'E',
          replace: true,
          templateUrl: XS_ACTION_BUTTONS_TEMPLATE_DIR + '/xs-action-buttons-template.html',
          scope: {
            // button sizing
            buttonSize: '@',

            // button configuration
            hasNew: '=',
            hasDelete: '=',
            hasClone: '=',
            hasEdit: '=',

            deleteConfirmText: '@',
            deleteCancelText: '@',

            // pass through methods
            onDeleteConfirm: '&',
            onDeleteCancel: '&',
            onClone: '&',
            onEdit: '&',
            onNew: '&'
          },
          controller: 'xsActionButtonCtrl'
        };

    }])
    .controller('xsActionButtonCtrl', ['$scope', function($scope) {
      // button group size
      var buttonSizes = {
        xs:'btn-group btn-group-xs',
        sm:'btn-group btn-group-sm',
        md:'btn-group btn-group-md',
        lg:'btn-group btn-group-lg'
      };
      $scope.$watch('buttonSize', function(newValue, oldValue) {
        var size = newValue;
        $scope.btnGroupClass = buttonSizes[size] ? buttonSizes[size] : 'btn-group btn-group-xs';
      });

      // button display & delete logic
      $scope.isDeleting = false;
      $scope.startDelete = function() {
        $scope.isDeleting = true;
      };
      $scope.cancelDelete = function() {
        $scope.isDeleting = false;
        $scope.onDeleteCancel();
      };
      $scope.confirmDelete = function() {
        $scope.isDeleting = false;
        $scope.onDeleteConfirm();
      };
      $scope.startEdit = function(){
        $scope.onEdit();
      };
      $scope.startClone = function(){
        $scope.onClone();
      };
      $scope.startNew = function(){
        $scope.onNew();
      };


    }])

})(window, window.angular);
