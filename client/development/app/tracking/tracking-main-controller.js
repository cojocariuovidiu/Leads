(function(window, angular, undefined){ 'use strict';

  angular
    .module('app.tracking')
    .controller('TrackingMainCtrl', ['notifySvc', 'trackingSvc', function(notifySvc, trackingSvc){
      var vm = this;
      vm.tracking = trackingSvc.query();

      vm.delete = function(track) {
        //
        //  Delete stand alone tracking out of lead document.tracking
        //
        track.remove().then(function(result) {
          if(result.success === true){
            var index = vm.tracking.indexOf(track);
            vm.tracking.splice(index, 1);
            notifySvc.success('Successfully delete tracking item.');
          } else {
            notifySvc.error('Oops! Unable to delete tracking item.')
          }
        });
      }
   }]);

})(window, window.angular);