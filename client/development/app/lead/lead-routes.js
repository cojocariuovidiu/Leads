(function (window, angular) {
  'use strict';

  angular
    .module('app')
    .config( ['$stateProvider',

      function ($stateProvider) {

        $stateProvider
          .state('leads', {
            url: '/leads',
            template: '<div ui-view><div class="text-center" style="font-size:50px;margin-top:50%;color:#dddddd;">Loading..</div></div>'
          })
          .state('leads.list', {
            url: '/list',
            templateUrl: 'app/lead/list/lead-list.html',
            controller: 'LeadListCtrl as leadList',
            resolve: {
              leads: function (leadSvc) {
                return leadSvc.query();
              }
            }
          })
          .state('leads.edit', {
            url: '/edit/:id',
            templateUrl: 'app/lead/edit/lead-edit-wizard.html',
            controller: 'LeadEditCtrl as leadEdit',

            resolve: {
              lead: function (leadSvc, $stateParams) {
                var id = $stateParams.id;
                return leadSvc.get({id: id});
              }
            }
          });
  }]);

})(window, window.angular);
