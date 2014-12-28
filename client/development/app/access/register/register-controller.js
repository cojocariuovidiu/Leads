(function (window, angular) {
  'use strict';

  angular
    .module('app')
    .controller('RegisterCtrl', ['$state', 'userSvc', 'notifySvc', RegisterCtrl]);
  function       RegisterCtrl(    $state,   userSvc,   notifySvc) {
    var vm = this;
    vm.newUser = new userSvc();
    vm.submit = function(isValid) {
      if(isValid){
        vm.newUser.$save()
          .then(function(user){
            if(user) {
              notifySvc.success('You have successfully registered with Lead Assistant.','Register');
              $state.go('home');
            }
          })
          .catch(function() {
            vm.failed();
          });
      }
    };
    vm.failed = function() {
      notifySvc.error('Sorry, we were unable to register you at this time!','Registration Failed');
    };
  }

})(window, window.angular);


