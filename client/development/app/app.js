(function (window, angular) {  'use strict';

  angular
    .module('app')
    // directive template directory locations
    .value('XS_ACTION_BUTTONS_TEMPLATE_DIR', 'app/common/directive/xybersolve/xs-angular-action-buttons/template')
    .value('XS_WIZARD_TEMPLATE_DIR', 'app/common/directive/xybersolve/xs-angular-wizard/template')

    // 3rd party libraries references
    .value( 'toastr', window.toastr)
    .value( '_', window._ )

    // optimize for production
    .config(['$compileProvider', function($compileProvider) {
      //turn off debug information - new in angular 1.3
      $compileProvider.debugInfoEnabled(false);
    }])

    .run(['$rootScope',  '$route',   '$location',   '$state',   '$stateParams',   'loginSvc',
      function( $rootScope,   $route,   $location,   $state,   $stateParams,   loginSvc ) {

        $rootScope.errors = $rootScope.errors || [];

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.stateHistory = [];
        $rootScope.isLoggedIn = false;
        $rootScope.user = {
          isLoggedIn: false,
          name: '',
          email: ''
        };

        // try background login - using local credentials
        loginSvc.autoLogin().then(function(ourUser){

          if(ourUser === null || ourUser.isLoggedIn === false){
            // login unsuccessful - redirect to login
            //$location.path('/login');
            $state.go('access.login');
          } else if(ourUser && ourUser.isLoggedIn) {
            // Login successful
            $state.go('home');
          }
        }).catch(function() {
          // if login fails for any reason
          // redirect to login page
          $state.go('access.login');
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

          if(! loginSvc.isLoggedIn() ){
            if( toState.name !== 'access.login' && toState.name !== 'access.register' ) {
              event.preventDefault();
              $state.go('access.login');
            }
          } else {
            $rootScope.stateHistory.push(toState.name);
          }
        });

        $rootScope.goBack = function () {
          var prevState = $rootScope.stateHistory.length > 1 ? $rootScope.stateHistory.splice(-2)[0] : "/";
          $state.go(prevState);
        };
    }])

    // global error handler - for uncaught exceptions
    // setting-errors could be used by customer support to solve problems
    .factory('$exceptionHandler', ['$injector', function($injector) {
      return function(exception, cause) {
        var now = new Date();
        var $rootScope = $injector.get('$rootScope');
        // errors array is defined in app.run - above
        $rootScope.errors.push({when: now, message: exception.message, cause: cause});
      };
    }]);



})(window, window.angular);



