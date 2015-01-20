(function(window, angular, undefined) {  'use strict';

  angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', reportRoutes]);

  function reportRoutes($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('report', {
        url: '/report',
        template: '<div ui-view></div>'
      })
      .state('report.menu', {
        url: '/menu',
        templateUrl: 'app/report/menu/report-menu.html',
        controller: 'ReportMenuCtrl as reportMenu'
      })
      .state('report.generic',{
        url: '/generic/:report/:template/:title/:group',
        controller: 'genericReportCtrl as genericReport',
        templateUrl: function($stateParams) {
          return 'app/report/template/' + $stateParams.template;
        }
      })

  }

  function getTemplatePath(template, report){
    var fullPath = '';
    if(template === undefined){
      fullPath = dashedTemplateUrl(report);
    } else {
      fullPath = getFullTemplatePath(template);
    }
    console.log('getTemplatePath: ' + fullPath);
    return fullPath;
  }
  function dashedTemplateUrl(report){
    var templateStub = report.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    return getFullTemplatePath(templateStub);
  }
  function getFullTemplatePath(template){
    return 'app/report/template/' + template + '.html';
  }

})(window, window.angular);
